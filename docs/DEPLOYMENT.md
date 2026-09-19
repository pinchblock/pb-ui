# Showcase CI and deployment

`.github/workflows/ci.yml` validates pull requests. It installs
the library before the linked demo using both lockfiles, runs token freshness and
TypeScript checks and builds the demo. No new tests are added. Validation
has no Vercel credentials.

For fast releases, a push to `main` or a manual workflow on `main` deploys that
exact commit to `https://ui.pinchblock.app` without repeating PR checks or building
twice. Vercel performs the single production build. The deployment
job uses only Node's built-in APIs; it installs no dependencies. It authenticates
to Vercel as `eriklevoll`, checks the fixed project/team/Git connection and domain,
then requests a production build through the Vercel API. Git authorship remains
unchanged. This is the same owner-authenticated Git-source deployment path used
to restore the showcase, rather than Vercel's commit-triggered Git executor.

`vercel.json` disables native Git-triggered deployments. Keep the Git connection:
the API uses it to fetch the immutable source revision. Vercel also installs both
lockfiles, then runs the demo build. Configure main branch protection to enforce PR checks;
direct pushes do not run them. Failed Vercel builds leave the previous production
deployment serving traffic.

## One-time activation

1. In `pinchblock/pb-ui`, create the GitHub environment `production`. Restrict its
   deployment branches to `main`. Protect `main` with review and the `Test and
   build` required check; review workflow and deployment-script changes carefully.
2. As `eriklevoll`, create a dedicated Vercel access token scoped to the Pinchblock
   team with an explicit expiry. Store it as environment secret `VERCEL_TOKEN`.
   A team-scoped owner token can access other team projects: keep it restricted
   to this environment and trusted main-branch code. Do not copy the local CLI's
   short-lived login/refresh credentials into CI. Track expiry and rotate the token.
3. Publish this workflow/configuration together to `main`, then inspect the first
   `CI and deploy` run. Publishing disables the old Git executor, so configure the
   environment secret first. The job summary records revision and deployment ID.
4. Confirm Vercel reports `READY` for that SHA and `ui.pinchblock.app` points to its
   deployment ID. The script verifies this mapping and an HTTP 200 response.

No new paid designer role is needed. Contributors still need their normal GitHub
merge rights; only the deployment job uses Erik's Vercel credential.

## Failure and concurrency behavior

Production jobs serialize without canceling a running provider mutation. Before
creating a deployment, the script skips any queued revision superseded on
`main`. A newer commit arriving during a build waits for the current deployment;
its job deploys next. This is not an atomic latest-head-only cutover.

Build failure or alias mismatch fails the job and links the Vercel deployment.
On timeout or an interrupted run, inspect that deployment before retrying: it may
still finish remotely. To retry the current main revision, dispatch `CI and deploy`
on `main`; Vercel builds again. An expired/wrong-owner token fails before creation.

This pipeline deploys the showcase only. Library consumers continue pinning
version tags; this workflow does not publish tags or change their dependencies.

## Local validation

Use Node 24.19.0:

```sh
npm ci
npm ci --prefix demo
npm test
npm --prefix demo run build
```

Provider references: [Git deployment configuration](https://vercel.com/docs/project-configuration/git-configuration)
and [deployment API](https://vercel.com/docs/rest-api/deployments/create-a-new-deployment).
