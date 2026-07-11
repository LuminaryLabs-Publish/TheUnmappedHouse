# Gameplay audit: save hydration scene, clue, and route divergence

Timestamp: `2026-07-11T15-30-50-04-00`

## Summary

The current save loader trusts independent `sceneId`, `route`, `inspected`, and `clues` fields without proving they describe one reachable story state. A valid JSON object can therefore skip scenes, forge completion, mark unknown hotspots, or create mutually inconsistent progression.

## Plan ledger

**Goal:** derive gameplay state from one canonical manifest and admitted receipt history rather than independently trusted mutable arrays and maps.

- [x] Trace scene selection from loaded state.
- [x] Trace clue-based completion.
- [x] Trace scene-keyed inspection state.
- [x] Trace route and scene advancement.
- [x] Identify impossible but accepted save combinations.
- [x] Define semantic admission and reconciliation rules.
- [ ] Implement canonical progression validation.

## Current progression fields

```txt
sceneId
route[]
inspected[sceneId][hotspotId]
clues[]
flags
log[]
```

They are shallow-loaded independently and have no shared revision, proof, manifest fingerprint, or semantic validator.

## Divergence cases

### Direct later-scene admission

A save can set `sceneId` to `closet-weather` while route, inspections, and clues remain empty. The browser accepts the final authored scene without proving the earlier scenes were completed.

### Forged completion

Completion uses `requiresToComplete.every(hasClue)`. A save can inject the required clue strings without any accepted inspection receipts. The scene becomes logically complete even though no canonical hotspot interaction produced those clues.

### Inspection and clue disagreement

A save can mark every hotspot inspected while omitting the corresponding clues, or include clues while inspections are absent. The UI checkmarks and completion result can disagree.

### Unknown identities

Unknown scene ids, unknown hotspot ids, unknown clue strings, and arbitrary route values are retained because no manifest-aware admission exists.

### Route inconsistency

The route does not have to be a canonical prefix, end at the current scene, avoid duplicates, or correspond to completion evidence. `nextScene()` only appends the successor if it is not already present.

### Completion-interlude inconsistency

A loaded snapshot can already satisfy completion requirements, but boot does not create an interlude or completion proof. Interlude scheduling only occurs during a new hotspot inspection.

## Required semantic invariants

```txt
sceneId exists in admitted StoryManifest
route is a canonical prefix of scene order
route ends at sceneId
all inspected scene ids are known
all inspected hotspot ids belong to their scene
all clue receipts reference known clues and canonical inspections
completed predecessor scenes have immutable completion proofs
active scene phase agrees with completion/interlude state
terminal phase is explicit and only valid after the final scene
log rows are bounded strings
flags are known and type-correct
snapshot fingerprint covers all canonical progression fields
```

## Reconciliation policy

Reconciliation must be deterministic and explicit. It may remove unknown non-authoritative decoration, migrate known legacy forms, or rebuild derived indexes from accepted receipts. It must not silently invent missing progression evidence or convert an impossible later-scene save into a completed route.

Recommended outcomes:

```txt
safe legacy shape with known semantics -> migrate
known fields with repairable ordering   -> reconcile with receipts
forged or impossible progression       -> reject
unknown manifest or scene identity      -> reject or explicit user reset
malformed raw JSON                      -> quarantine, never auto-overwrite
```

## Required fixtures

```txt
later-scene-with-empty-route-rejected
route-must-end-at-current-scene
route-duplicates-rejected-or-canonicalized
unknown-route-scene-rejected
unknown-inspection-scene-rejected
unknown-hotspot-id-rejected
unknown-clue-rejected
clue-without-inspection-provenance-rejected
inspection-without-grant-reconciled-deterministically
complete-scene-without-proof-does-not-open-transition
terminal-phase-only-after-final-scene
roundtrip-preserves-canonical-progression-fingerprint
```

## Validation status

No current test validates loaded progression against the authored scene graph or proves inspection, clue, route, phase, and completion evidence remain coherent.