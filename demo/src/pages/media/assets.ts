/**
 * Shared sample media for the media group's sink pages. Public test
 * assets, nothing vendored.
 */
export const SAMPLE_VIDEO = "https://media.w3.org/2010/05/sintel/trailer.mp4"
export const SAMPLE_LOOP = "https://media.w3.org/2010/05/bunny/trailer.mp4"

/** Deliberately dead URL: exercises the player's onError -> error state. */
export const DEAD_VIDEO = "https://media.w3.org/2010/05/does-not-exist/missing.mp4"

export const img = (seed: string, w = 800, h = 450) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`
