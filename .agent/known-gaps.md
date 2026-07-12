# Known gaps: The Unmapped House

Timestamp: `2026-07-12T00-01-25-04-00`

## Plan ledger

**Goal:** keep content, persistence, pointer, inspection, transition, narrative, lifecycle, rendering, WebGL recovery, diagnostics and validation gaps explicit.

- [x] Trace narrative copy through boot, inspection, completion, Continue, terminal and reload paths.
- [x] Confirm DOM output is also used as hidden runtime state.
- [x] Confirm predecessor hotspot copy can survive a successor scene commit.
- [x] Define source, revision, persistence, DOM, accessibility, observation and first-frame gaps.
- [ ] Implement and execute the Narrative Projection Authority gate.

## Narrative projection gaps

- No authoritative `NarrativeProjection` state exists.
- `#scene-text` stores whichever string was written most recently.
- `renderUi()` reads DOM contents to decide whether to write opening copy.
- Narrative copy has no projection id, revision, scene id, source kind or source id.
- Inspection writes hotspot copy directly into the DOM.
- Completion and terminal copy are stored directly in interlude elements.
- No typed narrative projection result exists.
- No stale, duplicate, conflict or rollback result exists.
- No detached narrative observation or bounded journal exists.

## Scene-transition copy gaps

- `nextScene()` does not clear or replace `#scene-text`.
- A successor title, stage, hotspot list, route and save can coexist with predecessor hotspot copy.
- Predecessor narrative projection has no retirement result.
- Successor opening copy is not prepared with the transition candidate.
- No first successor-frame acknowledgement includes narrative identity.
- Terminal copy is not represented as a durable terminal projection.

## Persistence-policy gaps

- No explicit policy chooses between restoring the canonical scene opening and restoring the exact last narrative source.
- In-session Continue and page reload currently follow different implicit policies.
- Arbitrary displayed copy is not persisted, but no canonical source reference is persisted either.
- No migration rule exists for narrative source ids across content versions.
- No typed load result reports narrative reconciliation.

## Accessibility gaps

- `#story-panel` is `aria-live="polite"`, but announcements have no projection revision.
- No adapter ensures only committed narrative copy is announced.
- A stale predecessor string can be announced under a successor title.
- No accessibility fixture proves one announcement per accepted projection.

## StoryManifest gaps

- No root StoryManifest, schema version, content version or deterministic fingerprint exists.
- No canonical scene, hotspot, clue, requirement or successor indexes exist.
- Progression is inferred from array position.
- Terminal state is inferred from a missing next element.
- Authored descriptors are mutable and shared by reference.
- No manifest-to-stage or manifest-to-frame provenance exists.

## StorySnapshot gaps

- The `.v1` save is a raw shallow-merged object.
- Saved data cites no manifest identity or snapshot schema.
- An unknown saved scene can render the first scene while retaining the invalid id.
- No migration, quarantine, reconciliation, rollback or typed persistence result exists.

## Pointer and inspection gaps

- Canvas click uses ambient pointer state instead of activation-event coordinates.
- Canvas and side-panel paths pass complete mutable descriptors.
- No canonical pointer sample, pick result, inspection command or immutable receipt exists.
- Completion is derived from global clue strings rather than current-scene receipts.

## Runtime lifecycle and resource gaps

- RAF, resize, pointer, click, keyboard, button and timeout callbacks are not revocable leases.
- `stageGroup.clear()` detaches resources without disposing geometries or materials.
- No session id, generation, callback fence or idempotent disposal result exists.

## Render composition and resolution gaps

- CSS frame size and GPU render resolution are coupled.
- No product pixel policy, surface revision, atomic resize commit or rollback exists.
- No visible frame cites matching story, narrative, stage and hotspot revisions.

## WebGL context gaps

- No context-loss or restoration listeners exist.
- No context state, context generation, resource generation or recovery transaction exists.
- Pointer and narrative projection are not fenced during context failure.

## Diagnostics gaps

- Debug output includes scene, clues, route and inspection state but no narrative source or revision.
- No committed frame observation correlates content, snapshot, story, narrative, stage, surface and context identity.
- No clone-safe public readback exists.

## Validation gaps

- `npm run check` is syntax-only.
- No fixture executes Continue and verifies successor opening copy.
- No fixture proves predecessor text retirement.
- No fixture proves title, body, stage, hotspot list and save parity.
- No fixture proves reload narrative policy.
- No fixture proves committed `aria-live` announcements.
- No deployed browser artifact captures narrative revision and first-frame acknowledgement.

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
