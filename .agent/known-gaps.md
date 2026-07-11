# Known gaps: The Unmapped House

Timestamp: `2026-07-11T15-30-50-04-00`

## Plan ledger

**Goal:** keep manifest, StorySnapshot, bootstrap, inspection, Continue, lifecycle, render, and validation gaps explicit while promoting startup admission into an implementation-ready contract.

- [x] Preserve StoryManifest as the canonical descriptor prerequisite.
- [x] Trace raw read, parse, shallow merge, scene fallback, renderer allocation, live stage construction, UI projection, startup write, reset, and reload.
- [x] Define version, migration, semantic admission, reconciliation, quarantine, bootstrap rollback, first-frame, result, journal, and fixture gaps.
- [x] Preserve inspection, Continue, lifecycle, retirement, and committed-frame follow-on gates.

## StoryManifest gaps

- No stable manifest id, schema version, canonical indexes, deep freeze, or manifest fingerprint exists.
- Scene, hotspot, clue, requirement, successor, stage, camera, and post descriptors are not admitted before runtime use.
- No alias or compatibility policy exists for renamed ids.

## Raw persistence ingress gaps

- The `.v1` save is an unversioned raw object.
- Storage read and JSON parse share one broad catch.
- Malformed raw input is not retained or quarantined.
- A failed read is indistinguishable from an absent save.
- Module boot writes state back unconditionally, so rejected or unreadable input can be destroyed.
- No typed raw-read, parse, load, save, clear, or reset result exists.

## StorySnapshot schema gaps

- No envelope version, manifest identity, save id, save revision, story revision, story phase, or snapshot fingerprint exists.
- `sceneId`, `clues`, `flags`, `inspected`, `route`, and `log` are shallow-merged without field admission.
- Invalid arrays, objects, strings, ids, sizes, and nested values can enter the candidate.
- No immutable canonical snapshot or detached read model exists.

## Semantic admission gaps

- Unknown scene ids are not rejected.
- An unknown `sceneId` can display scene one while persistence retains the unknown id.
- A later authored scene can be loaded without predecessor completion.
- Route does not have to be a canonical scene-order prefix or end at the current scene.
- Unknown scene and hotspot inspection ids are retained.
- Global clue strings can be forged without inspection provenance.
- Inspections and clues can disagree.
- Completed state, interlude state, terminal state, route, and scene identity are not reconciled.
- Flags and logs have no known-key or size policy.

## Migration and reconciliation gaps

- No supported-version registry or pure migration chain exists.
- No migration receipt records input/output fingerprints.
- Unknown future versions are not explicitly rejected.
- No deterministic reconciliation policy distinguishes repairable legacy state from impossible progression.
- No reconciliation receipts or warnings are published.

## Bootstrap gaps

- StageKit is allocated before StorySnapshot admission succeeds.
- Renderer, canvas, render target, post resources, listeners, and recursive RAF can become live before UI projection or persistence succeeds.
- No detached bootstrap candidate, bootstrap generation, stage preparation result, or resource inventory exists.
- UI projection is not staged or validated before commit.
- Startup storage failure has no rollback or offline-mode result.
- Failed bootstrap can leave renderer and frame work alive.
- No retry contract proves one canvas, one listener set, and one RAF chain.

## Render and first-frame gaps

- The first visible frame has no load result id, manifest fingerprint, snapshot fingerprint, bootstrap generation, stage epoch, or story revision.
- No barrier proves stage, UI, persistence, and rendered output consumed the same accepted snapshot.
- No first-bootstrap-frame acknowledgement exists.

## Recovery gaps

- Rejected raw input has no explicit retry, quarantine, export, temporary-default, or clear path.
- KeyR removes storage and reloads without a clear result.
- Clear failure cannot prevent reload because no result is checked.
- Reset does not advance a session generation or fence stale callbacks.

## Inspection and completion-proof gaps

- Side-panel and raycast paths submit full hotspot descriptors.
- No command identity, sequence, scene/revision/stage admission, immutable inspection receipt, clue provenance, or typed result exists.
- Completion is derived from global clue strings rather than accepted current-scene receipts.
- No immutable `SceneCompletionProof`, consumption state, or exactly-once interlude lease exists.

## Continue and transition gaps

- Continue is a direct callback with no proof admission or transition lock.
- Story state mutates before successor stage preparation.
- `StageKit.loadScene()` clears live ownership before replacement success is known.
- Persistence occurs after live story, stage, and UI mutation.
- No rollback, stage epoch, first-successor-frame, or retirement result exists.
- Terminal state remains projection-only.

## Resource lifecycle gaps

- `stageGroup.clear()` detaches resources without disposing geometry or materials.
- Resetting `materials` and `hotspots` loses ownership references.
- RAF, resize, pointer, click, keyboard, button closures, and timeouts are not revocable.
- Renderer, render target, post resources, canvas, and WebGL context have no explicit teardown result.

## Validation gaps

- `npm run check` performs syntax checks only.
- No StoryManifest validator exists.
- No StorySnapshot schema, migration, semantic, reconciliation, fingerprint, or roundtrip fixture exists.
- No storage failure, quarantine, bootstrap rollback, retry, or first-frame browser smoke exists.
- No inspection, Continue, terminal, lifecycle, resource retirement, or committed-frame fixture exists.

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