# Architecture audit: story lifecycle transaction DSK map

Timestamp: `2026-07-10T15-58-47-04-00`

## Runtime composition

```txt
index.html
  -> src/game.js
       -> src/story-data.js
       -> src/stage-kit.js
            -> src/aspect-frame.js
            -> Three.js 0.160.0 CDN
       -> localStorage
       -> browser DOM/timers/location
```

## Authority boundaries

| Boundary | Current owner | Current output | Missing proof surface |
|---|---|---|---|
| Story source | `src/story-data.js` | Three scenes, nine hotspots, nine required clues, camera/stage/post descriptors | Manifest, schema version, fingerprint, detached snapshot |
| Story state | `src/game.js` | `sceneId`, clues, flags, inspected, route, log | Detached snapshots and lifecycle state |
| Command policy | `src/game.js` | Direct inspect, continue, and reset behavior | Envelopes, preflight, typed results, stable reasons |
| Scene lifecycle | `src/game.js` + DOM timer | Completion check, delayed interlude, route advance, terminal copy | Explicit state machine and exactly-once transactions |
| Persistence | `src/game.js` + localStorage | Parse, shallow merge, write, remove | Source reconciliation, schema migration, observations |
| Render host | `src/stage-kit.js` | Descriptor consumption, WebGL frame loop, picks | Load/pick/frame/resource observations and teardown |
| Projection | `src/game.js` + `StageKit` | Story copy, buttons, hover label, debug JSON, interlude | Effect intents/readbacks correlated to command/result |

## Current DSK decomposition

```txt
story-source-domain
  story-data-kit

story-runtime-domain
  browser-story-runtime-kit
  clue-ledger-kit
  inspection-ledger-kit
  notebook-log-kit
  scene-route-kit
  interlude-timer-kit
  terminal-route-kit

persistence-domain
  localstorage-save-kit

interaction-domain
  side-panel-input
  raycast-input
  keyboard-reset-input
  hotspot-picking-kit

render-domain
  aspect-frame-kit
  stage-render-kit
  scene-descriptor-consumer-kit
  anime-material-kit
  post-process-kit
  hotspot-volume-kit

projection-domain
  static-page-shell-kit
  debug-json-projection-kit

operations-domain
  repo-local-agent-ledger-kit
  central-ledger-sync-kit
```

## Current kit services

| Kit | Service contract today |
|---|---|
| `story-data-kit` | Returns mutable live descriptor objects for scenes and hotspots. |
| `browser-story-runtime-kit` | Couples bootstrap, policy, mutation, timers, effects, persistence, StageKit, and diagnostics. |
| `clue-ledger-kit` | Adds unique clue strings and checks required clue membership. |
| `inspection-ledger-kit` | Stores scene-keyed hotspot booleans. |
| `notebook-log-kit` | Prepends text rows and retains eight. |
| `scene-route-kit` | Selects the scene and appends unique route ids. |
| `interlude-timer-kit` | Defers interlude projection by 450 ms. |
| `terminal-route-kit` | Writes terminal copy without a persisted terminal state. |
| `localstorage-save-kit` | Loads, shallow-merges, writes, and clears the v1 state blob. |
| `stage-render-kit` | Owns long-lived renderer, scene, camera, lights, render target, and frame loop. |
| `scene-descriptor-consumer-kit` | Rebuilds live layers, props, hotspot volumes, fog, camera, and post uniforms. |
| `anime-material-kit` | Allocates one shader material per layer/prop. |
| `post-process-kit` | Renders scene to target then runs the full-screen post pass. |
| `hotspot-volume-kit` | Creates invisible box meshes carrying hotspot descriptor objects. |
| `hotspot-picking-kit` | Raycasts and invokes the supplied callback. |
| `debug-json-projection-kit` | Emits an aggregate state snapshot without causal rows. |

## Required transaction cut

```txt
StorySourceManifest
StorySourceFingerprint
StoryStateSnapshot
StoryLifecycleState
StoryInputRecord
StoryCommandEnvelope
StoryPreflightRecord
StoryCommandResult
StoryTransitionRecord
StoryEffectIntent
StoryEffectReadback
StoryLifecycleTransaction
SaveEnvelope
SaveReconciliationRecord
StageLoadObservation
StagePickObservation
StageResourceObservation
GameHostStoryDiagnostics
```

## Lifecycle states

```txt
booting
exploring
completion_pending
interlude_open
advancing
terminal
resetting
```

The source-owned authority should decide lifecycle transitions. Browser code should only execute declared effects and return readbacks.

## Required invariants

- Every input origin produces one command envelope.
- Every command produces one typed result.
- Every accepted mutation produces detached before/after snapshots.
- Scene completion transitions once per scene.
- One completion transaction creates at most one interlude-open intent.
- Continue is accepted only from `interlude_open`.
- Final continue produces and persists `terminal` state.
- Save payloads identify source schema and fingerprint.
- Stage loads and picks return JSON-safe observations.
- Scene replacement records resource counts and disposal outcomes.
- Side-panel and raycast inputs produce equivalent story results for the same hotspot.

## Ownership rule

Do not turn `StageKit` into story authority. Keep it as a renderer/input adapter. Move lifecycle policy into pure source-owned modules and let browser, storage, and render surfaces acknowledge effect intents.

## Next safe ledge

```txt
TheUnmappedHouse Story Lifecycle Transaction Ledger + StageKit Resource Observation Fixture Gate
```