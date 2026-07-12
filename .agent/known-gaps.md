# Known gaps: The Unmapped House

**Timestamp:** `2026-07-12T15-08-07-04-00`

## Summary

The newest documented gap is notebook-observability projection authority. The player-facing `Notebook` is currently the raw developer-state projection. Internal scene and clue ids, route ids, current inspection booleans, exact completion state and log rows are serialized into the visible public UI without channel admission, field classification, redaction or projection provenance.

## Plan ledger

**Goal:** separate player notebook semantics from developer diagnostics and prevent accidental publication of internal aggregate shape.

- [x] Trace the visible Notebook shell and CSS.
- [x] Trace every field serialized by `renderUi()`.
- [x] Confirm the projection runs at boot, inspection and scene transition.
- [x] Confirm no build, role, query or capability gate exists.
- [x] Confirm no player-versus-developer field classification exists.
- [x] Define projection, redaction, observation and fixture requirements.
- [ ] Implement and execute the notebook-observability authority.

## Channel and admission gaps

```txt
notebook channel kind: absent
public player channel policy: absent
developer diagnostic channel policy: absent
build-channel admission: absent
capability admission: absent
support/export channel: absent
channel revocation: absent
```

## Classification and redaction gaps

```txt
field classification registry: absent
player-safe field set: absent
developer-only field set: absent
redaction profile id: absent
redaction profile revision: absent
internal-id mapping policy: absent
unknown-field rejection: absent
recursive serialization limits: absent
```

## Projection and lifecycle gaps

```txt
notebook surface id: absent
projection id: absent
projection revision: absent
story-state revision binding: absent
scene generation binding: absent
projection plan: absent
typed projection result: absent
stale projection rejection: absent
atomic DOM commit result: absent
first-visible notebook frame acknowledgement: absent
projection observation: absent
bounded projection journal: absent
```

## Current visible fields

```txt
game title
internal scene id
acquired internal clue ids
internal route ids
current-scene inspection booleans
exact completion boolean
recent narrative log entries
```

The current code does not expose future `requiresToComplete` arrays directly. The defect is the unclassified public promotion of internal aggregate fields and identifiers, not a claim that every future puzzle answer is disclosed.

## Concrete risks

```txt
player-facing Notebook is implementation JSON rather than authored product copy
internal ids become an accidental public compatibility contract
localization and accessibility cannot evolve independently from state shape
new aggregate fields can be published by a seemingly harmless projection edit
developer diagnostics cannot be disabled independently in public builds
support diagnostics cannot be redacted or exported through an explicit result
screenshots and DOM reads cannot cite the story revision that produced them
```

## Retained upstream and downstream gaps

```txt
StoryManifest and StorySnapshot authorities remain unimplemented
storage revision and cross-tab convergence remain unimplemented
destructive reset admission remains unimplemented
pointer/canvas/side-panel input parity remains unimplemented
inspection and completion proof remain unimplemented
completion timer generation remains unimplemented
modal focus and Continue admission remain unimplemented
atomic Continue transition remains unimplemented
narrative projection remains unrevisioned
runtime callback and scene-resource lifecycle remains unimplemented
WebGL context recovery remains unimplemented
render-surface resolution authority remains unimplemented
committed-frame diagnostics remain unimplemented
```

## Validation gaps

- `npm run check` is syntax-only.
- No pure projection fixture proves player and developer channel separation.
- No fixture rejects developer-only fields in a public player projection.
- No fixture proves internal ids are mapped or redacted.
- No fixture proves stale story revisions cannot overwrite the notebook.
- No browser smoke proves the public Pages build omits developer diagnostics.
- No visible-frame receipt cites notebook and story revisions.

## Completion boundary

Do not claim the Notebook is production-safe because it contains only client-local data. Completion requires explicit channel policy, classification, redaction, typed results, public-build fixtures and visible projection provenance.