import { appendFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

// This script has no npm dependencies and only deploys the public showcase.
const target = Object.freeze({
  repository: 'pinchblock/pb-ui',
  repoId: 1322732453,
  team: 'team_SojNImHxyEZKkwJpOObM26rA',
  project: 'prj_0ESqd5FSzf3VGUZYlVNI9NnJwV6m',
  owner: 'AkMwOPJXwpgJ8GPpjcvPCsCa',
  domain: 'ui.pinchblock.app',
})

async function deploy(env) {
  if (env.GITHUB_ACTIONS !== 'true' || env.GITHUB_REPOSITORY !== target.repository ||
      env.GITHUB_REF !== 'refs/heads/main' ||
      !['push', 'workflow_dispatch'].includes(env.GITHUB_EVENT_NAME) ||
      !/^[a-f0-9]{40}$/.test(env.GITHUB_SHA ?? '')) {
    throw new Error('Only a main push or manual main workflow may deploy.')
  }
  if (!env.VERCEL_TOKEN || !env.GH_TOKEN) throw new Error('Deployment credentials are missing.')

  async function api(provider, path, body) {
    const vercel = provider === 'vercel'
    const url = new URL(path, vercel ? 'https://api.vercel.com' : 'https://api.github.com')
    if (vercel) url.searchParams.set('teamId', target.team)
    const response = await fetch(url, {
      method: body === undefined ? 'GET' : 'POST',
      headers: {
        Authorization: `Bearer ${vercel ? env.VERCEL_TOKEN : env.GH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      redirect: 'error',
      signal: AbortSignal.timeout(30_000),
    })
    // Never print provider bodies: they can contain source-controlled text or credentials.
    if (!response.ok) throw new Error(`${provider} ${path}: HTTP ${response.status}`)
    return response.json()
  }

  const { user } = await api('vercel', '/v2/user')
  if (user?.id !== target.owner) throw new Error('VERCEL_TOKEN must belong to eriklevoll.')
  const project = await api('vercel', `/v9/projects/${target.project}`)
  if (project.id !== target.project || project.accountId !== target.team ||
      project.link?.type !== 'github' || project.link?.repoId !== target.repoId ||
      project.link?.productionBranch !== 'main') {
    throw new Error('Vercel project or Git connection does not match the showcase.')
  }
  const { domains } = await api('vercel', `/v9/projects/${target.project}/domains`)
  if (!domains?.some((domain) => domain.name === target.domain && domain.verified &&
      !domain.gitBranch && !domain.redirect)) throw new Error('Production domain is not configured.')

  const head = await api('github', `/repos/${target.repository}/git/ref/heads/main`)
  if (!/^[a-f0-9]{40}$/.test(head.object?.sha ?? '')) throw new Error('Invalid main revision response.')
  if (head.object?.sha !== env.GITHUB_SHA) {
    console.log('Skipped superseded main revision.')
    return { status: 'superseded' }
  }
  // Explicit owner-authenticated Git API deployment: no commit author rewriting.
  // Pin the triggering revision; Vercel performs the only production build.
  const created = await api('vercel', '/v13/deployments', {
    name: 'pb-ui',
    project: target.project,
    target: 'production',
    gitSource: { type: 'github', repoId: target.repoId, ref: 'main', sha: env.GITHUB_SHA },
  })
  if (!/^dpl_[a-zA-Z0-9]+$/.test(created.id ?? '')) throw new Error('Invalid deployment response.')
  const id = created.id
  console.log(`Deployment: https://vercel.com/pinchblock/pb-ui/${id.slice(4)}`)

  for (let attempt = 0; attempt < 80; attempt++) {
    const deployment = await api('vercel', `/v13/deployments/${id}`)
    if (deployment.projectId !== target.project || deployment.gitSource?.sha !== env.GITHUB_SHA ||
        deployment.target !== 'production' || deployment.creator?.uid !== target.owner) {
      throw new Error('Deployment identity does not match the requested release.')
    }
    if (['ERROR', 'CANCELED'].includes(deployment.readyState) || deployment.aliasError) {
      throw new Error(`Deployment ${id} failed; inspect its Vercel build log.`)
    }
    if (deployment.readyState === 'READY' && deployment.aliasAssigned) {
      const alias = await api('vercel', `/v4/aliases/${target.domain}`)
      if (alias.deploymentId !== id || alias.projectId !== target.project) {
        throw new Error('Live domain does not point to this deployment.')
      }
      const response = await fetch(`https://${target.domain}`, {
        redirect: 'error', signal: AbortSignal.timeout(30_000),
      })
      if (response.status !== 200) throw new Error(`Live showcase returned HTTP ${response.status}.`)
      console.log(`Live: https://${target.domain} at ${env.GITHUB_SHA}`)
      return { status: 'deployed', id, revision: env.GITHUB_SHA }
    }
    await new Promise((resolve) => setTimeout(resolve, 15_000))
  }
  throw new Error(`Deployment ${id} timed out; it may still complete. Inspect before retrying.`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const result = await deploy(process.env)
    if (process.env.GITHUB_STEP_SUMMARY) {
      await appendFile(process.env.GITHUB_STEP_SUMMARY,
        result.status === 'deployed'
          ? `Deployed \`${result.revision}\` to https://${target.domain}. Deployment: \`${result.id}\`.\n`
          : 'Skipped: a newer main revision is queued for deployment.\n')
    }
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
