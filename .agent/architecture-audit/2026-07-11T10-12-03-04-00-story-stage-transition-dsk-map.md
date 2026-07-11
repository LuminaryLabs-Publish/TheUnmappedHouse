# Architecture audit: Story/Stage Continue transition DSK map

Timestamp: `2026-07-11T10-12-03-04-00`

## Goal

Define the DomainServiceKit composition that turns Continue from sequential side effects into one admitted, durable, atomic and observable transition.

## Current ownership map

```txt
browser-story-runtime-kit
  -> currentScene and mutable state
  -> completion check
  -> interlude scheduling
  -> nextScene callback
  -> DOM projection
  -> persistence call
  -> StageKit call

stage-render-kit
  -> live THREE.Scene and stageGroup
  -> renderer, target and post pass
  -> camera, lights and RAF
  -> listeners

scene-descriptor-consumer-kit
  -> live layer/prop/hotspot construction
  -> direct background/fog/camera/post mutation

localstorage-save-kit
  -> full mutable object write
```

## Failure boundary today

```txt
story mutation
  -> DOM mutation
  -> destructive live-stage clear
  -> replacement construction
  -> persistence write
  -> eventual visible frame
```

No shared identity or rollback spans these steps.

## Required parent domain

```txt
the-unmapped-house-story-stage-transition-domain
```

## Existing kits to update first

```txt
browser-story-runtime-kit
scene-route-kit
interlude-timer-kit
terminal-route-kit
localstorage-save-kit
stage-render-kit
scene-descriptor-consumer-kit
debug-json-projection-kit
```

## Missing coordinating kits

| Kit | Owned service |
|---|---|
| `continue-command-kit` | Canonical Continue intent with command id, expected story revision, expected stage epoch and completion proof. |
| `continue-admission-kit` | Stale, duplicate, blocked, terminal and accepted classification. |
| `scene-transition-plan-kit` | Immutable source/target scene, revision, epoch, fingerprint and save plan. |
| `detached-stage-preparation-kit` | Build and validate candidate Three.js resources outside the live group. |
| `story-transition-candidate-kit` | Build the candidate StorySnapshot without live mutation. |
| `durable-story-commit-kit` | Persist the candidate snapshot with expected-revision semantics. |
| `atomic-stage-commit-kit` | Swap prepared resources and advance stage epoch exactly once. |
| `transition-rollback-kit` | Retain or restore the prior committed state after failure. |
| `transition-result-kit` | Typed, JSON-safe final result. |
| `stage-epoch-kit` | Monotonic rendered-scene generation. |
| `first-frame-acknowledgement-kit` | Receipt for the first frame containing the committed stage. |
| `retired-stage-resource-kit` | Per-epoch geometry, material, mesh and listener inventory. |
| `stage-resource-disposal-kit` | Ordered idempotent disposal. |
| `interlude-timeout-lease-kit` | Cancellable, revision-fenced completion delay. |
| `transition-journal-kit` | Bounded before/after revisions, fingerprints, results and resource counts. |
| `continue-transition-fixture-kit` | DOM-free deterministic transaction rows. |
| `browser-first-frame-smoke-kit` | Browser proof of stage swap and visible-frame correlation. |

## Required contract

```txt
prepare(plan) -> PreparedStageResult
persist(candidate, expectedSaveRevision) -> StorySaveResult
commit(prepared, persisted) -> StageCommitResult
acknowledge(frame) -> FirstFrameReceipt
retire(previousBundle) -> ResourceRetirementResult
rollback(context) -> TransitionRollbackResult
```

Every result must include:

```txt
transitionId
sourceSceneId
targetSceneId
manifestFingerprint
sourceStoryRevision
targetStoryRevision
sourceStageEpoch
targetStageEpoch
expectedSaveRevision
actualSaveRevision
status
reason
beforeFingerprint
afterFingerprint
```

## Composition rule

The transition domain must not become a second story, persistence or render engine. It coordinates canonical services from the existing domains and owns only transaction identity, admission, ordering, rollback and observation.

## Implementation prerequisite

The transition plan must consume the future canonical StoryManifest, StorySnapshot and inspection completion proof. Do not implement it against raw descriptor objects or global clue strings.
