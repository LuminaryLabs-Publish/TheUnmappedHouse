# Known gaps: The Unmapped House

**Timestamp:** `2026-07-12T17-20-42-04-00`

## Summary

The newest documented gap is StoryManifest and StorySnapshot startup admission. Raw content descriptors and any parseable save object are consumed without version, schema, semantic validation, migration, compatibility, canonicalization or typed startup results.

## Plan ledger

**Goal:** fail closed on invalid content or state while preserving deterministic recovery and explicit evidence.

- [x] Trace raw manifest definition and all startup consumers.
- [x] Trace save parse, shallow merge, scene fallback and immediate rewrite.
- [x] Identify type, identifier, compatibility and provenance gaps.
- [x] Define candidate authority kits and fixture rows.
- [ ] Implement and execute the authority.

## Manifest gaps

```txt
manifest id: absent
semantic version: absent
schema version: absent
content fingerprint: absent
unique scene-id validation: absent
unique hotspot-id validation: absent
clue index and reference validation: absent
route graph validation: absent
entry and terminal scene declarations: absent
camera/stage/material/post shape validation: absent
deep freeze: absent
```

## Snapshot gaps

```txt
snapshot schema version: absent
snapshot revision: absent
manifest identity/fingerprint binding: absent
non-object root rejection: absent
field type validation: absent
unknown-field rejection: absent
collection bounds: absent
migration chain: absent
stale-id reconciliation: absent
typed parse/admission result: absent
storage rewrite barrier: absent
```

## Concrete startup risks

```txt
unknown sceneId renders the first scene while preserving the invalid persisted id
null inspected can fail UI or inspection access
string clues can pass includes checks and later fail push
non-array route can fail Continue
non-array log can fail writeLog
unknown fields are retained and republished
duplicate content ids resolve by first match
array order silently defines route semantics
content updates have no save compatibility signal
```

## Presentation and proof gaps

```txt
manifest fingerprint is absent from scene/UI/render state
snapshot revision is absent from scene/UI/render state
startup result is absent
migration and reconciliation receipts are absent
first visible startup frame acknowledgement is absent
browser startup fixture matrix is absent
Pages startup fixture matrix is absent
```

## Retained downstream gaps

```txt
storage revision and cross-tab convergence
destructive reset admission
pointer/canvas/side-panel input parity
inspection and completion proof
completion timer generation
modal focus and Continue admission
atomic Continue transition
narrative and Notebook projection
runtime callback and scene-resource lifecycle
WebGL context recovery
render-surface resolution authority
committed-frame diagnostics
```

## Completion boundary

Do not claim save compatibility or safe startup because parse errors fall back to defaults. Completion requires structural and semantic manifest validation, versioned snapshot migration, explicit reconciliation, typed results, storage-write barriers and visible provenance.
