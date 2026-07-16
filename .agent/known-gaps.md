# Known gaps: The Unmapped House story content graph validation

**Timestamp:** `2026-07-16T04-02-40-04-00`  
**Status:** `audited`

## Summary

The authored story graph is trusted as executable data. The product has no content revision, schema version, semantic validator, reachability proof, typed rejection result, invalid-content fallback, or validated-frame acknowledgement.

## Plan ledger

**Goal:** make content identity, reference integrity, descriptor safety, adoption, and proof explicit.

- [x] Trace scene, hotspot, clue, route, completion, stage, material, and post consumption.
- [x] Confirm the package check is syntax-only.
- [x] Define missing identities, policies, results, and acknowledgements.
- [ ] Implement and execute them.

## Identity and version gaps

```txt
StorySchemaVersion: absent
ContentRevision: absent
ValidationPolicyVersion: absent
SceneIdentityRegistry: absent
HotspotIdentityRegistry: absent
ClueIdentityRegistry: absent
ValidatedContentFingerprint: absent
FirstValidatedStoryFrameAck: absent
```

## Reference and reachability gaps

```txt
duplicate scene-ID rejection: absent
duplicate hotspot-ID rejection: absent
unknown clue-reference rejection: absent
clue-grant index: absent
completion satisfiability proof: absent
initial-scene validation: absent
route-order validation: absent
terminal-boundary validation: absent
unreachable-scene result: absent
```

## Descriptor gaps

```txt
camera tuple validation: absent
finite FOV/fog validation: absent
stage layers/props shape validation: absent
supported prop-kind validation: absent
position/rotation/scale tuple validation: absent
hotspot size/position validation: absent
material color cardinality validation: absent
post-process numeric validation: absent
non-finite number rejection: absent
```

## Admission and fallback gaps

```txt
StoryContentValidationCommand: absent
StoryContentValidationResult: absent
StoryContentAdoptionCommand: absent
StoryContentAdoptionResult: absent
stale content-result rejection: absent
invalid-content semantic fallback: absent
renderer adoption gate: absent
interactive-control adoption gate: absent
```

## Proof gaps

```txt
valid manifest fixture: absent
duplicate scene fixture: absent
duplicate hotspot fixture: absent
unknown clue fixture: absent
impossible completion fixture: absent
invalid route fixture: absent
malformed camera/stage fixture: absent
non-finite descriptor fixture: absent
stale validation-result fixture: absent
source/artifact/Pages parity: absent
```

## Retained independent gaps

```txt
browser startup readiness and retry
story save writer lease and revision
story audio event projection
inspection control focus continuity
motion preference visual-effect admission
story announcement semantic projection
interlude focus and route admission
page lifecycle suspension and resume
terminal completion settlement
WebGL context recovery
story-save schema and manifest admission
viewport authority
scene-transition composition
renderer-provider admission
hotspot picking
same-document save commit/reset convergence
interlude progression timing
stage resource lifecycle
```

## Completion boundary

Do not claim authored-content safety until every accepted content revision has a schema version, stable fingerprint, unique identities, valid references, satisfiable completion, valid render descriptors, one typed terminal result, and matching source/artifact/Pages proof.
