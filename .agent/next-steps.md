# Next steps: The Unmapped House

Timestamp: `2026-07-12T00-01-25-04-00`

## Goal

Preserve the current three-scene story, 450 ms pacing, fixed 16:9 composition, side-panel accessibility path and Three.js presentation while making content, state, picking, inspection, transitions, narrative copy, lifecycle and visible-frame proof deterministic.

## Plan ledger

### 1. Canonical StoryManifest

- [ ] Create one root `StoryManifest` with stable id, schema version, content version and fingerprint.
- [ ] Validate and index scenes, hotspots, clues, requirements, successors and terminal declarations.
- [ ] Canonicalize and deep-freeze the admitted graph.
- [ ] Validate render descriptors before StageKit allocation.
- [ ] Publish typed admission, observation and journal results.

### 2. Versioned StorySnapshot startup authority

- [ ] Replace the raw `.v1` object with a versioned envelope citing manifest identity.
- [ ] Separate read, parse, migration, admission, reconciliation and commit results.
- [ ] Explicitly reconcile unknown scene, hotspot and clue ids.
- [ ] Delay StageKit allocation until manifest and snapshot candidates are accepted.
- [ ] Preserve rejected raw saves for diagnosis instead of overwriting them.

### 3. Pointer observation and hotspot-pick authority

- [ ] Use one pointer-event adapter for hover and activation.
- [ ] Capture activation coordinates from the activation event.
- [ ] Add pointer sample ids, modality and surface/camera provenance.
- [ ] Return canonical hotspot ids instead of mutable descriptors.
- [ ] Make canvas and side-panel activation produce the same command/result shape.

### 4. Inspection and completion proof

- [ ] Admit id-only `InspectionCommand` values.
- [ ] Resolve hotspots through canonical indexes.
- [ ] Record immutable inspection receipts and clue provenance.
- [ ] Derive one `SceneCompletionProof` from accepted current-scene receipts.

### 5. Atomic Continue transition

- [ ] Resolve successors through the admitted graph.
- [ ] Prepare successor story, stage, hotspot and persistence candidates before mutation.
- [ ] Commit them under one transition revision.
- [ ] Retire predecessor authority only after the first successor-frame acknowledgement.
- [ ] Roll back on preparation, persistence, projection or frame failure.

### 6. Narrative Projection Authority

- [ ] Remove all story behavior that reads `#scene-text.textContent`.
- [ ] Add `NarrativeProjection` state with source kind, source id, scene id and revision.
- [ ] Derive scene-opening copy from the admitted scene.
- [ ] Derive hotspot copy from an accepted inspection result.
- [ ] Derive completion copy from a completion proof.
- [ ] Derive terminal copy from a durable terminal result.
- [ ] Commit successor opening copy inside the Continue transaction.
- [ ] Retire predecessor hotspot and interlude projections on scene change.
- [ ] Select and document a reload persistence policy.
- [ ] Project through one DOM and `aria-live` adapter.
- [ ] Correlate the first visible frame with story, narrative, stage and hotspot revisions.
- [ ] Publish detached observations and a bounded journal.

### 7. Runtime lifecycle and scene-resource retirement

- [ ] Add stable session identity and generation.
- [ ] Fence RAF, pointer, timeout, resize, reset, context and frame work.
- [ ] Retain and revoke listener, timeout, renderer, target, stage and context leases.
- [ ] Dispose geometries and materials instead of only clearing groups.
- [ ] Add ordered idempotent stop, reset, restart and dispose results.

### 8. Render Surface Resolution Authority

- [ ] Separate CSS aspect-frame composition from internal GPU resolution.
- [ ] Add immutable quality tiers and pixel budgets.
- [ ] Commit CSS frame, camera projection, renderer buffer, target and pointer surface under one revision.
- [ ] Acknowledge the first visible frame for each surface revision.

### 9. WebGL Context Recovery Authority

- [ ] Add context loss/restoration listeners and canonical context states.
- [ ] Suspend pointer and ready-frame admission after accepted loss.
- [ ] Rebuild one complete replacement resource generation.
- [ ] Return to ready only after a recovered visible frame is acknowledged.

### 10. Committed-frame diagnostics

- [ ] Correlate manifest fingerprint, snapshot revision, story revision, narrative revision, scene id, stage revision, hotspot-set revision, surface revision, context generation and frame id.
- [ ] Expose detached clone-safe observations.
- [ ] Record bootstrap, inspection, completion, transition, resize, recovery, rollback and retirement acknowledgements.

## Required narrative fixture rows

```txt
dom-is-output-only
boot-initial-scene-opening-copy
inspect-hotspot-projects-copy
reinspect-hotspot-projects-canonical-copy
completion-proof-projects-interlude
continue-projects-successor-opening
predecessor-hotspot-copy-retired
successor-title-body-stage-parity
successor-hotspot-list-parity
reload-policy-deterministic
terminal-projection-durable
stale-scene-projection-rejected
stale-session-projection-rejected
duplicate-command-idempotent
aria-live-committed-revision-only
narrative-observation-detached-json-safe
narrative-journal-bounded
first-visible-frame-cites-narrative-revision
```

## Browser narrative smoke

```txt
clear storage
boot scene A and capture opening copy
inspect all scene A hotspots
wait for completion interlude
press Continue
capture the first scene B frame
verify scene B title, opening body, stage and hotspot list agree
repeat through scene C and terminal projection
reload each saved scene and verify the declared persistence policy
```

## Implementation order

```txt
1. StoryManifest Authority
2. StorySnapshot startup authority
3. Pointer and hotspot-pick authority
4. Inspection and completion authority
5. Atomic Continue transition
6. Narrative Projection Authority
7. Runtime lifecycle and resource retirement
8. Render Surface Resolution Authority
9. WebGL Context Recovery Authority
10. Committed-frame diagnostics
```

## Next safe ledge

```txt
TheUnmappedHouse Narrative Projection Authority
+ Successor Opening Copy Commit
+ Narrative Persistence Policy
+ Story / Stage / Copy First-Frame Parity Gate
```

## Do not do first

```txt
new story rooms or branches
inventory
audio or voice work
renderer replacement
shader redesign
camera retuning
visual polish
```
