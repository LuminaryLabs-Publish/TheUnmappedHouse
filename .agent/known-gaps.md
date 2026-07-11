# Known gaps: The Unmapped House

Timestamp: `2026-07-11T12-08-47-04-00`

## Plan ledger

**Goal:** keep story, persistence, inspection, completion, transition, lifecycle, render-resource, and validation gaps explicit while promoting inspection-command authority and scene completion proof into an implementation-ready contract.

- [x] Preserve StoryManifest and persistence prerequisites.
- [x] Trace side-panel and raycast descriptor ingress.
- [x] Trace stale-scene, duplicate, clue-provenance, completion, timeout, and persistence behavior.
- [x] Define inspection-command, canonical-resolution, completion-proof, and dual-ingress fixture gaps.
- [x] Preserve atomic Continue and runtime lifecycle follow-on gates.

## Story-manifest and persistence gaps

- No stable story manifest id, schema version, canonical scene/hotspot/clue indexes, or definition fingerprint exists.
- Nested story and render descriptors remain mutable.
- The `.v1` storage key contains an unversioned raw object.
- Parsed save data is shallow-merged without field validation.
- Unknown scenes, hotspots, clues, route entries, and malformed collection types are not reconciled safely.
- Story revision, save revision, explicit phase, state fingerprint, typed load/save results, and bounded persistence journal are absent.
- Live state and DOM can mutate before storage success is known.

## Inspection command gaps

- Side-panel buttons capture and submit full hotspot descriptor objects.
- Raycast meshes store and submit full hotspot descriptor objects through `userData`.
- No `commandId`, input sequence, source, scene id, expected story revision, expected stage epoch, or observed frame id exists.
- The mutation path does not resolve a canonical hotspot after admission.
- Caller-supplied `id`, `grants`, `label`, `text`, and `changesText` are trusted.
- No typed applied, duplicate, stale, unknown, rejected, persistence-failed, or completion-produced result exists.
- No bounded command/result journal exists.

## Stale scene and stage gaps

- `inspectHotspot()` chooses the inspection ledger from `currentScene.id` at callback execution time.
- A retained old button closure can submit a scene-one descriptor after scene two becomes current.
- A stale descriptor can be recorded under the new scene while granting old-scene clues and copy.
- Pick results contain no `stageEpoch`, frame id, or scene revision.
- Retired stage observations cannot be rejected deterministically.
- Old and current ingress have no session-generation fence.

## Inspection ledger gaps

- Inspections are stored as scene-keyed booleans rather than immutable receipts.
- Receipt identity, command identity, source, accepted revision, stage epoch, timestamp, and before/after fingerprints are absent.
- Re-read behavior still mutates text, log, DOM, and persistence without an explicit presentation-only result.
- Duplicate command sequence and duplicate hotspot inspection are not distinguished.
- Exactly-once mutation cannot be proven.

## Clue provenance gaps

- Clues are global strings with no declared owner or grant provenance.
- Any submitted descriptor can grant arbitrary clue strings.
- A clue does not identify the accepted scene, hotspot, inspection receipt, command, or story revision that produced it.
- Cross-scene clue grants are not rejected.
- Migration or forged save values can satisfy requirements without canonical inspection.
- Duplicate grants are silently ignored but produce no explicit idempotency receipt.

## Completion-proof gaps

- Completion is derived from `requiresToComplete.every(hasClue)` against global clue strings.
- Completion does not require accepted current-scene inspection receipts.
- No immutable `SceneCompletionProof` exists.
- Proof id, fingerprint, required hotspot set, receipt set, story revision, and consumption state are absent.
- Duplicate completion detection is absent.
- A newly accepted descriptor after completion can schedule another interlude timeout.
- Continue cannot admit against a specific unconsumed proof.

## Projection and persistence gaps

- Inspection mutates in-memory state and text before persistence success is known.
- `localStorage.setItem()` has no typed success/failure result.
- A quota or security failure can leave live state and persisted state divergent.
- UI and debug projection are not correlated to a committed story revision.
- The 450 ms interlude lease is not correlated to a completion proof.
- No rollback path restores the prior live projection on persistence failure.

## Dual-ingress parity gaps

- Side-panel and raycast paths are assumed equivalent but have no command-level proof.
- Raycast output includes a descriptor object while side-panel output comes from a closure; neither produces a normalized observation.
- No fixture proves equal result, revision, receipt, clue grants, proof identity, persistence, or journal output.
- Mixed button/raycast repeats can only be inspected through aggregate state, not typed idempotency results.

## Continue and transition gaps

- Continue is a direct button callback with no completion-proof admission or duplicate guard.
- Story identity and route mutate before stage preparation or persistence succeeds.
- `StageKit.loadScene()` clears the live stage before replacement success.
- No detached successor group, transition id, rollback result, or durable terminal phase exists.
- Story, stage, DOM, persistence, and first rendered frame have no shared transaction identity.

## Runtime-session and resource gaps

- No `sessionId`, monotonic session generation, or lifecycle state machine exists.
- RAF, listeners, hotspot-button closures, and interlude timeouts are not owned by leases.
- `stageGroup.clear()` detaches objects without disposing geometry or material allocations.
- Scene loads have no `stageEpoch` or resource inventory.
- Render target, post resources, renderer, canvas, and WebGL context have no explicit teardown result.
- Stop, dispose, and reset idempotency cannot be proven.

## Validation gaps

- `npm run check` performs syntax checks only.
- No StoryManifest or StorySnapshot fixture exists.
- No inspection-command admission fixture exists.
- No stale-scene, stale-revision, or stale-stage fixture exists.
- No duplicate inspection or input-sequence fixture exists.
- No clue-provenance or cross-scene grant fixture exists.
- No scene-completion-proof or duplicate-interlude fixture exists.
- No inspection persistence rollback fixture exists.
- No side-panel/raycast parity fixture or browser smoke exists.
- Atomic Continue, lifecycle, callback, resource-retirement, and teardown fixtures remain absent.

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
