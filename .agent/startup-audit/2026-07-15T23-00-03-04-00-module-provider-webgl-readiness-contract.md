# Startup audit: module, provider, WebGL, and first-frame readiness contract

**Timestamp:** `2026-07-15T23-00-03-04-00`

## Summary

The startup contract must cover work that currently occurs before product code can catch errors. Static module loading and the external Three.js import require a shell-level bootstrap boundary; StageKit and first-scene construction require prepared candidates and typed terminal results.

## Plan ledger

**Goal:** define a bounded startup protocol that can report failures occurring before, during, and after runtime construction.

- [x] Partition startup into phases.
- [x] Define identities, deadlines, results, fallback, retry, and retirement.
- [x] Define first-ready and first-frame acknowledgements.
- [ ] Implement the bootstrap boundary and fixtures.

## Phase contract

```txt
ShellParsed
  -> BootstrapLoading
  -> ModuleGraphResolved
  -> ProviderAdmitted
  -> GraphicsCapabilityAccepted
  -> StoryPrepared
  -> StagePrepared
  -> FirstScenePrepared
  -> ReadyUiProjected
  -> FirstFramePresented
```

Every transition is monotonic for one `StartupAttemptId`. Any failure moves directly to one terminal result.

## Pre-module boundary

Because static import rejection can prevent `game.js` from running, a small shell-owned bootstrap must be capable of:

- dynamically importing the entry module;
- enforcing a deadline;
- catching module/provider rejection;
- projecting failure without depending on Three.js;
- admitting Retry as a new attempt;
- preventing stale attempts from replacing newer state.

## Runtime boundary

After module resolution, runtime startup must prepare and settle:

```txt
validated restored story snapshot
resolved first scene
WebGL capability
renderer and context
render target and post resources
scene geometry materials hotspots camera fog
DOM story projection
first public frame
```

## Failure taxonomy

```txt
module-network
module-policy-or-CSP
provider-version-or-contract
webgl-unavailable
context-or-renderer-construction
shader-or-program
render-target-allocation
story-restore-or-validation
scene-descriptor-construction
first-frame-timeout
unknown
```

## Retry and retirement

Retry preserves the durable story slot, allocates a new attempt and render generation, and retires all resources from the failed attempt. A late promise, callback, or RAF from an older attempt must be rejected by generation before it can mutate the shell.

## Readiness proof

`StartupReady` is insufficient by itself. Production readiness requires both:

```txt
FirstReadyUiAck
FirstPresentedStoryFrameAck
```

The acknowledgements must cite the same attempt, document, story, scene, stage, and render generations.