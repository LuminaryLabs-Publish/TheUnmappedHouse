# Story content audit: identity, reference, and reachability contract

**Timestamp:** `2026-07-16T04-02-40-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Status:** `story-content-graph-validation-authority-audited`

## Summary

This contract defines the minimum semantic rules for admitting a TheUnmappedHouse story manifest.

## Plan ledger

**Goal:** make story authoring failures deterministic, localizable, and non-destructive.

- [x] Define manifest identities and versions.
- [x] Define scene, hotspot, clue, route, and descriptor invariants.
- [x] Define validation issue paths and result states.
- [x] Define runtime and render adoption gates.
- [ ] Implement the contract.

## Manifest contract

```txt
StoryManifest
  schemaVersion
  contentRevision
  initialSceneId
  scenes[]
```

`contentRevision` must identify the exact authored payload used by runtime, renderer, fixtures, artifacts, and Pages.

## Identity rules

- Every `scene.id` is non-empty and globally unique.
- Every `hotspot.id` is non-empty and unique within its scene.
- Clue identifiers are non-empty and normalized.
- The initial scene references exactly one registered scene.
- Runtime state keys use only accepted normalized identities.

## Reference rules

- Every completion clue is present in the clue registry.
- Every completion clue is grantable from a hotspot reachable before the transition it gates.
- Every route entry references one registered scene.
- The authored route has no ambiguous duplicate scene identity.
- Unknown references reject the whole content revision.

## Reachability rules

For the current linear route:

```txt
start at initialSceneId
  -> evaluate current and accumulated clue grants
  -> prove current completion requirements satisfiable
  -> advance to the next authored scene
  -> repeat
  -> reach exactly one terminal boundary
```

The validator must report the first unsatisfied requirement and the full scene/clue path.

## Descriptor rules

- Camera position/lookAt contain three finite numbers.
- FOV is finite and within the adopted policy range.
- Layer, prop, and hotspot tuples have expected lengths and finite values.
- Prop kinds belong to the supported geometry set.
- Material colors meet required cardinality and parse successfully.
- Fog and post-process values are finite and policy-bounded.
- Missing optional collections normalize to empty arrays; missing required objects reject content.

## Result contract

```txt
StoryContentValidationResult
  contentRevision
  schemaVersion
  policyVersion
  status
  normalizedIndexes
  issues[]
  fingerprint
```

Issues include a stable code, JSON-style path, owning identity, expected rule, and observed value category.

## Adoption contract

Only `StoryContentAccepted` may reach the story runtime, StageKit, DOM hotspot projection, canvas hotspot projection, or save-state normalization. Rejected content projects a semantic fallback and no partial stage.
