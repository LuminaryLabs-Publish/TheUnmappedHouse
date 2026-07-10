# Known gaps: The Unmapped House

Timestamp: `2026-07-10T19-00-19-04-00`

## Story source gaps

- `story-data.js` has no schema version, manifest id, source fingerprint or validation result.
- Scene, hotspot and clue ids are implicit strings with no canonical indexes.
- Duplicate scene ids, duplicate hotspot ids, unknown completion requirements and invalid grants are not rejected.
- Route order is inferred from array position and is not represented as a validated graph.
- No normalized, frozen story-source snapshot exists for command or save authority.

## Save-envelope gaps

- Syntactically valid JSON is shallow-merged directly into live state.
- Save fields have no schema version, source fingerprint, created/updated revision or migration history.
- `clues`, `route`, `log`, `flags` and `inspected` are not type-checked before use.
- Unknown scene, hotspot and clue ids are not removed or reported.
- An invalid persisted `sceneId` falls back visually without repairing `state.sceneId`.
- Route order is not reconciled to the authored scene sequence.
- Clues and inspections can disagree because they are persisted as separate authorities.
- Interlude and terminal state do not round-trip.

## Interaction-command gaps

- Side-panel and raycast inputs pass live hotspot descriptor objects into mutation.
- No canonical `{sceneId, hotspotId, inputOrigin, commandId}` request exists.
- Hotspot membership in the active scene is not checked by contract.
- Input origin is lost before state mutation.
- Accepted, repeated, rejected, repaired and no-op outcomes are not typed.
- Stale descriptors from a prior source or stage epoch cannot be rejected by source identity.

## Completion gaps

- Completion trusts global persisted clue strings.
- Clues are not derived from canonical inspected hotspots.
- A repaired or manually edited save can satisfy requirements without valid inspection evidence.
- There is no completion proof containing source fingerprint, scene id, inspected hotspot ids and derived clue ids.
- Anonymous interlude timers have no command, scene or source correlation.
- Terminal projection is not represented in persisted state.

## Render/source correlation gaps

- StageKit receives the resolved descriptor object but no source manifest id or source fingerprint.
- A fallback-rendered scene can disagree with the uncorrected persisted `state.sceneId`.
- Pick meshes retain full live hotspot descriptor objects rather than canonical source references.
- Debug JSON exposes aggregate state but not save validation, repair rows, source identity or command results.
- The existing atomic StageKit, resource disposal and frame acknowledgement gaps remain unresolved.

## Validation gaps

- `npm run check` performs syntax checks only.
- No story manifest or graph validator fixture exists.
- No malformed, stale, future-version or content-drift save matrix exists.
- No canonical hotspot command fixture exists.
- No clue derivation or completion proof fixture exists.
- No source/save/render identity fixture exists.
- No browser smoke automation exists.

## Deferred work

```txt
new story rooms or branches
inventory
audio
renderer replacement
new shader work
camera retuning
visual polish
```
