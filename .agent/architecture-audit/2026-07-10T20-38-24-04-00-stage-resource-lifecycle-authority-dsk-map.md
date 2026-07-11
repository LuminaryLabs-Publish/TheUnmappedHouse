# Architecture audit: Stage resource lifecycle authority

Timestamp: `2026-07-10T20-38-24-04-00`

## Current composition

```txt
story-data-kit
  -> browser-story-runtime-kit
       -> stage-render-kit
            -> scene-descriptor-consumer-kit
            -> anime-material-kit
            -> hotspot-volume-kit
            -> hotspot-picking-kit
            -> camera-parallax-kit
            -> render-target-composition-kit
            -> post-process-kit
            -> aspect-frame-kit
```

## Current authority defect

`stage-render-kit` currently owns too many inseparable concerns:

```txt
host construction
renderer and target allocation
persistent post resources
scene-local resource creation
live scene mutation
camera/fog/post mutation
hotspot identity storage
picking
hover projection
resize listeners
pointer listeners
RAF scheduling
frame submission
```

`loadScene()` is a mutation procedure, not a transaction. It has no pure plan, validation boundary, detached preparation, typed commit result, rollback behavior, resource ledger or epoch.

## Proposed DSK split

### `stage-build-plan-kit`

Inputs:

```txt
scene descriptor
requested scene id
source revision
request id
```

Services:

```txt
normalize descriptor rows
validate required shapes
calculate expected object/resource counts
produce JSON-safe StageBuildPlan
```

Outputs:

```txt
plan id
scene identity
camera/fog/post snapshot
layer rows
prop rows
hotspot rows
expected resource counts
validation result
```

### `stage-resource-owner-kit`

Services:

```txt
register geometry
register material
register texture
register object root
separate scene-local and persistent ownership
prevent duplicate disposal
dispose idempotently
report live and disposed counts
```

### `atomic-stage-commit-kit`

Services:

```txt
prepare detached replacement group
retain prior committed group during preparation
commit group/camera/fog/post together
increment stage epoch after success
dispose retired scene ledger after commit
retain old stage on failure
return typed StageCommitResult
```

### `stage-epoch-kit`

Services:

```txt
issue monotonically increasing epochs
attach epoch to committed scene and hotspot refs
validate pick admission
reject stale interaction results
```

### `frame-loop-lifecycle-kit`

Services:

```txt
start one RAF loop
pause frame submission
resume one loop
retain RAF id
cancel on teardown
report running/paused/disposed state
```

### `event-listener-lifecycle-kit`

Services:

```txt
retain resize/move/click handler references
install once
remove once
report listener lifecycle state
```

### `stage-disposal-kit`

Services:

```txt
dispose committed scene ledger
dispose persistent post resources
dispose render target
dispose renderer
remove canvas if owned
remove listeners
cancel RAF
return idempotent teardown result
```

### `stage-journal-kit`

Services:

```txt
record build request
record validation outcome
record preparation counts
record commit or failure
record retired-resource disposal
record host pause/resume/dispose
bound row count
expose JSON-safe readback
```

## Proposed composition

```txt
story source identity
  -> StageBuildRequest
       -> stage-build-plan-kit
       -> stage-descriptor-validator-kit
       -> detached Three.js preparation adapter
            -> stage-resource-owner-kit
       -> atomic-stage-commit-kit
            -> stage-epoch-kit
            -> hover-reset-kit
            -> retired-ledger disposal
       -> StageCommitResult
       -> stage-journal-kit

host lifecycle
  -> frame-loop-lifecycle-kit
  -> event-listener-lifecycle-kit
  -> render-target-lifecycle-kit
  -> stage-disposal-kit
```

## Boundary rule

Pure kits own decisions, identities, counts and results. The Three.js adapter owns object construction and disposal calls. `src/game.js` should receive only JSON-safe stage results and should not receive raw geometry, material, renderer or scene objects.

## Compatibility rule

The public constructor and `loadScene(scene)` shape may remain temporarily through an adapter, but the adapter must route through the new plan/prepare/commit pipeline. Visual descriptors, camera values, shader code and story pacing remain unchanged.
