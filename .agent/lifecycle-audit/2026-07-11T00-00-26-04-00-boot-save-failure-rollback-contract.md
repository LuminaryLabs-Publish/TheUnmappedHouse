# Lifecycle audit: Boot save-failure rollback contract

Timestamp: `2026-07-11T00-00-26-04-00`

## Current boot acquisition order

```txt
query DOM nodes
load state
construct StageKit
  -> create WebGLRenderer
  -> append canvas
  -> create render target and post resources
  -> add window resize listener
  -> add canvas mousemove listener
  -> add canvas click listener
  -> start recursive requestAnimationFrame
load current scene resources
render story UI
register Continue listener
register KeyR listener
write localStorage
```

The final write can throw after all render-host resources and listeners are live. Module evaluation then fails without a controller, cleanup stack or fatal transition that can release them.

## Missing ownership

```txt
runtime session id
boot attempt id
acquisition ledger
cleanup stack
RAF id
listener remover functions
StageKit.dispose()
global fatal state
persistence mode
boot result
```

## Proposed lifecycle states

```txt
constructing
admitting-persistence
loading-save
preparing-stage
committing-initial-save
running
recovering
fatal
disposing
disposed
```

## Acquisition rule

Every acquisition must immediately register its inverse:

```txt
canvas append -> canvas remove
resize listener -> remove listener
mousemove listener -> remove listener
click listener -> remove listener
RAF request -> cancel RAF
render target -> dispose
post material/geometry -> dispose
scene geometry/material -> dispose
renderer -> dispose and context cleanup
keyboard listener -> remove listener
Continue listener -> remove listener
```

## Boot result

```js
{
  bootAttemptId,
  status: "running" | "ephemeral" | "fatal",
  persistence: { status, reason },
  story: { saveRevision, stateFingerprint },
  stage: { sceneId, commitId, epoch },
  acquiredResourceCount,
  cleanupRegistrationCount
}
```

## Failure behavior

```txt
persistence unavailable before StageKit:
  choose explicit ephemeral or fatal policy before GPU acquisition

initial save failure after StageKit preparation:
  run cleanup stack in reverse order
  leave no canvas, RAF or listener
  return fatal or explicit ephemeral result

scene preparation failure:
  dispose prepared resources
  release session on terminal boot failure

repeated dispose:
  return already-disposed without repeating effects
```

## Fixture rows

```txt
storage-denied-before-stage-acquisition
initial-save-failure-cancels-raf
initial-save-failure-removes-listeners
initial-save-failure-disposes-gpu-resources
fatal-boot-leaves-no-canvas
successful-boot-has-matched-acquisition-cleanup-counts
dispose-is-idempotent
remount-after-dispose-owns-one-raf-and-one-listener-set
```

## Scope

This is a lifecycle contract only. It does not change scene art, shader output, camera framing or story content.