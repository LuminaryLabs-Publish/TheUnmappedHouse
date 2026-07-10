# Architecture audit: atomic StageKit scene commit DSK map

Timestamp: `2026-07-10T17-29-23-04-00`

## Current composition

```txt
story-data-kit
  -> browser-story-runtime-kit
       -> scene-route-kit
       -> clue-ledger-kit
       -> inspection-ledger-kit
       -> localstorage-save-kit
       -> stage-render-kit
            -> scene-descriptor-consumer-kit
            -> anime-material-kit
            -> hotspot-volume-kit
            -> hotspot-picking-kit
            -> post-process-kit
```

The problem is not missing composition. It is that `scene-descriptor-consumer-kit` mutates the active render host directly and exposes no transaction boundary.

## Current authority collision

```txt
story transition authority
  src/game.js mutates currentScene/state.sceneId/route

render scene authority
  StageKit.loadScene clears and rebuilds live resources

presentation authority
  StageKit RAF renders whatever partial/live state currently exists
```

No shared record proves these three authorities agree.

## Required DSK boundaries

### `scene-descriptor-preflight-kit`

Services:

```txt
validate schema/version
normalize camera/fog/post values
validate layer and prop geometry
validate material presets
validate unique hotspot ids
return stable validation rows and reason codes
```

### `stage-build-plan-kit`

Services:

```txt
convert validated descriptors to detached build instructions
assign sourceSceneId/buildPlanId/sceneEpochId
predict resource counts
retain descriptor-to-resource mappings
```

### `stage-resource-registry-kit`

Services:

```txt
register provisional and active resources
classify geometry/material/mesh/hotspot/target/listener/RAF ownership
snapshot created/active/retired/disposed counts
prevent unowned retirement
```

### `stage-load-result-kit`

Services:

```txt
accepted/rejected/failed/rolled_back status
stable reason code
request/build/epoch/commit ids
resource counts
before/after active epoch
JSON-safe error projection
```

### `stage-commit-transaction-kit`

Services:

```txt
build under detached group
retain prior epoch until readiness
atomically swap group/background/fog/camera/post
publish one active epoch
retire prior epoch after commit
```

### `stage-rollback-kit`

Services:

```txt
dispose provisional resources
restore prior active epoch
restore camera/fog/post state
return rollback result and counts
```

### `stage-resource-disposal-kit`

Services:

```txt
dispose geometry/material/target resources exactly once
clear retired hotspot references
record disposal evidence
support idempotent host teardown
```

### `stage-frame-ack-kit`

Services:

```txt
acknowledge first frame for committed epoch
record frame id/viewport/camera fingerprint/resource counts
reject acknowledgement for retired epoch
```

### `story-stage-correlation-kit`

Services:

```txt
link story transition id to stage load request
link stage commit id to scene id
link first-frame acknowledgement to expected story scene
expose mismatch diagnostics
```

### `dom-free-stage-fixture-kit`

Services:

```txt
fake descriptor source
fake resource factory
failure injection
commit/rollback assertions
resource lifetime assertions
story-stage correlation assertions
```

## Dependency order

```txt
preflight
  -> build plan
  -> provisional resource registry
  -> typed load result
  -> atomic commit or rollback
  -> retired resource disposal
  -> first-frame acknowledgement
  -> story-stage correlation
  -> DOM-free fixture gate
```

## Boundary rule

Do not make the story runtime own Three.js resources, and do not make StageKit own story progression. The shared contract is a JSON-safe scene-load transaction keyed by stable scene and epoch identifiers.
