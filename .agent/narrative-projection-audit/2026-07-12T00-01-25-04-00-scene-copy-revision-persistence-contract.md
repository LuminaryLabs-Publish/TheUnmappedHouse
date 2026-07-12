# Narrative projection audit: Scene-copy revision and persistence contract

Timestamp: `2026-07-12T00-01-25-04-00`

## Problem statement

Narrative copy is currently stored in DOM elements rather than in an authoritative state model. The code reads `#scene-text.textContent` to decide whether to project a scene opening, so visual output feeds back into runtime behavior.

## Current implicit states

```txt
empty body
Loading body
scene opening body
hotspot body
completion interlude
terminal interlude
```

Only the final string value is observable. The runtime cannot identify which state produced it, which scene owns it, or whether it is stale.

## Required projection model

```txt
NarrativeProjection
  projectionId
  revision
  sceneId
  phase
  sourceKind
  sourceId
  title
  body
  createdByResultId
  storyRevision
  persistencePolicy
  status
```

## Source kinds

```txt
scene-opening
hotspot-inspection
scene-completion
terminal
system-error
```

`system-error` is reserved for future typed bootstrap or runtime failures. It must not be mixed with authored story copy.

## Persistence policy

The product must select and document one policy:

```txt
canonical-scene-opening
  persist story state only
  restore the canonical opening copy for the admitted saved scene

exact-projection
  persist the narrative source kind and canonical source id
  re-derive the same copy after manifest and snapshot admission
```

Persisting arbitrary rendered strings is not allowed. Copy must be re-derived from canonical content so saves remain bounded and version-aware.

## Transition contract

```txt
prepare successor story state
prepare successor stage plan
prepare successor opening projection
prepare successor hotspot list
commit all candidates under one transition revision
project DOM
submit frame
acknowledge scene, narrative, stage and frame identity
retire predecessor projection
```

## Stale-work rules

Reject a projection when any of these differ from current authority:

```txt
session generation
manifest fingerprint
story revision
scene id
phase
inspection result id
completion proof id
transition id
```

## Observation

A detached observation must expose:

```txt
sceneId
phase
projectionId
projectionRevision
sourceKind
sourceId
storyRevision
visibleFrameId
lastResult
```

It must not expose live DOM nodes, mutable descriptors or Three.js objects.

## Required fixtures

```txt
dom-is-output-only
scene-opening-projection-is-deterministic
hotspot-projection-cites-inspection-result
completion-projection-cites-proof
continue-retires-predecessor-projection
reload-canonical-opening-policy
reload-exact-projection-policy
unsupported-policy-rejected
stale-scene-projection-rejected
stale-session-projection-rejected
duplicate-command-idempotent
observation-detached-json-safe
journal-bounded
```
