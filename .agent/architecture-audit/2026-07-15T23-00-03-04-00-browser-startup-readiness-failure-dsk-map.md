# Architecture audit: browser startup readiness and failure DSK map

**Timestamp:** `2026-07-15T23-00-03-04-00`  
**Status:** `browser-startup-readiness-failure-authority-audited`

## Summary

Startup is currently an implicit side effect of the browser module graph and StageKit constructor. The missing architecture is one parent DSK that owns the attempt, phases, provider/capability admission, first-scene preparation, terminal result, fallback, retry, resource retirement, and first-frame proof.

## Plan ledger

**Goal:** separate startup truth from the static shell, external provider, story runtime, and renderer adapters.

- [x] Map current startup participants.
- [x] Identify implicit mutation and failure boundaries.
- [x] Define parent authority and coordinating kits.
- [x] Define commands, results, revisions, and acknowledgements.
- [ ] Implement and prove the contract.

## Current domain composition

```txt
static-page-shell-kit
  -> initial Loading projection
  -> module entry declaration

browser module host
  -> game.js
  -> story-data.js
  -> stage-kit.js
  -> external Three.js provider

browser-story-runtime-kit
  -> save restore
  -> scene resolution
  -> StageKit construction
  -> initial UI and save projection

stage-render-kit
  -> WebGLRenderer
  -> scene/camera/lights/render target
  -> materials and post process
  -> initial descriptor adoption
  -> recursive RAF
```

The browser and constructors currently decide success or failure by throwing or continuing. No product-level startup result joins these participants.

## Required parent DSK

`the-unmapped-house-browser-startup-readiness-failure-authority-domain`

### Owned identities

```txt
StartupAttemptId
DocumentGeneration
ModuleGraphRevision
ProviderRevision
GraphicsCapabilityRevision
StoryBootstrapRevision
StagePreparationRevision
FirstSceneRevision
RenderGeneration
StartupDeadline
```

### Commands

```txt
StartupAttemptCommand
StartupRetryCommand
StartupCancelCommand
StartupRetireCommand
```

### Results

```txt
StartupReady
StartupFailedModuleGraph
StartupFailedProviderUnavailable
StartupFailedProviderRejected
StartupFailedWebGLUnavailable
StartupFailedStageConstruction
StartupFailedStoryBootstrap
StartupFailedScenePreparation
StartupFailedFirstFrameTimeout
StartupRejectedDuplicate
StartupRejectedStale
StartupSuperseded
StartupRetired
```

### Acknowledgements

```txt
FirstReadyUiAck
FirstPresentedStoryFrameAck
StartupFallbackFrameAck
StartupArtifactParityAck
```

## Coordinating kits

1. `startup-attempt-identity-kit` — stable attempt and generation identity.
2. `startup-phase-state-kit` — monotonic phase transitions.
3. `module-graph-load-admission-kit` — entry/dependency resolution result.
4. `external-provider-resolution-kit` — Three.js source resolution.
5. `provider-integrity-version-policy-kit` — expected provider identity and policy.
6. `webgl-capability-observation-kit` — WebGL/context/render-target capability.
7. `stage-construction-preparation-kit` — detached renderer/stage preparation.
8. `story-bootstrap-preparation-kit` — restore and validate initial story snapshot.
9. `first-scene-admission-kit` — prepare the resolved descriptor.
10. `startup-deadline-timeout-kit` — bounded readiness deadline.
11. `startup-failure-taxonomy-kit` — stable failure classification.
12. `startup-result-kit` — terminal typed result.
13. `startup-fallback-projection-kit` — semantic visible failure state.
14. `startup-retry-command-kit` — explicit retry admission.
15. `stale-startup-attempt-rejection-kit` — reject late work.
16. `startup-resource-retirement-kit` — dispose failed/superseded candidates.
17. `first-ready-ui-ack-kit` — UI readiness proof.
18. `first-presented-story-frame-ack-kit` — renderer proof.
19. `source-artifact-pages-startup-fixture-kit` — parity and failure injection.

## Adoption rule

The shell may expose `Loading` only while one current attempt is pending. The story controls and visible stage become ready only after the same attempt has prepared the story snapshot, first scene, DOM projection, renderer resources, and first presented frame. Every terminal failure must replace `Loading` with authored status and a bounded retry action.

## Non-goals

This audit does not replace Three.js, rewrite the story domain, change scene content, add a build system, or claim runtime readiness.