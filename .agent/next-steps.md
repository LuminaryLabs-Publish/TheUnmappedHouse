# Next steps: The Unmapped House browser startup readiness authority

**Timestamp:** `2026-07-15T23-00-03-04-00`  
**Status:** `audited`

## Summary

The smallest safe implementation is a shell-owned dynamic bootstrap that can catch module/provider failure before `game.js` runs, followed by one typed runtime startup transaction that prepares story, scene, renderer, UI, and first-frame state under a shared attempt identity.

## Plan ledger

**Goal:** add bounded startup readiness and recovery without changing authored scenes or the active story loop.

- [ ] Replace the static module entry with a minimal shell bootstrap that dynamically imports the runtime.
- [ ] Define `StartupAttemptId`, `DocumentGeneration`, `ProviderRevision`, `StagePreparationRevision`, and `RenderGeneration`.
- [ ] Publish monotonic startup phases.
- [ ] Add an explicit startup deadline.
- [ ] Admit and verify the expected Three.js provider identity.
- [ ] Observe WebGL/context/render-target capability before adopting the stage.
- [ ] Prepare the restored story snapshot and first scene before enabling controls.
- [ ] Convert StageKit construction into a typed preparation result.
- [ ] Define stable failure classes for module, policy, provider, graphics, shader, target, story, scene, and first-frame failures.
- [ ] Project a semantic fallback that does not depend on Three.js.
- [ ] Add Retry as a new attempt rather than reusing failed mutable state.
- [ ] Reject stale and duplicate callbacks from older attempts.
- [ ] Retire renderer, target, material, geometry, listener, and RAF resources from failed attempts.
- [ ] Publish `FirstReadyUiAck` and `FirstPresentedStoryFrameAck`.
- [ ] Preserve valid save state across startup failure and retry.
- [ ] Add source, artifact, and Pages fixtures for success, failure, retry, timeout, retirement, and parity.

## Ordered implementation

### 1. Shell bootstrap

Keep the static HTML and CSS usable without Three.js. Dynamically import the game entry from a bootstrap module, catch rejection, enforce a deadline, and render a stable fallback with Retry.

### 2. Attempt and phase model

Allocate a new attempt and document generation on navigation or retry. Permit only monotonic transitions from shell parsed through first frame. Reject all late work from superseded generations.

### 3. Provider and graphics admission

Resolve the expected Three.js provider, record the version/source, observe WebGL capability, and prepare renderer and render-target resources without exposing ready state.

### 4. Story and first-scene preparation

Restore and validate the story snapshot, resolve the current scene, and build the complete stage candidate. Do not enable hotspot controls until the candidate and semantic UI agree.

### 5. First-frame settlement

Present the stage and post passes, then publish the first-frame acknowledgement. Only then transition the shell to ready.

### 6. Failure and retry

Publish one stable terminal result, preserve save data, retire partial resources, expose authored failure copy, and admit Retry as a new attempt.

### 7. Proof

Inject module, provider, WebGL, shader, target, descriptor, and first-frame failures. Capture matching results, DOM snapshots, screenshots, provider identity, and commit/artifact correlation for source, artifact, and Pages.

## Do not combine yet

Keep save concurrency, story audio, focus continuity, motion preference, announcements, interlude routing, page lifecycle, terminal settlement, WebGL recovery, save schema, viewport, scene-transition composition, provider admission, hotspot picking, and resource lifecycle as retained independent authorities.