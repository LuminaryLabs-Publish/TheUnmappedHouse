# Architecture audit: Notebook Observability Projection DSK Map

**Timestamp:** `2026-07-12T15-08-07-04-00`

## Summary

The current architecture collapses player notebook presentation and developer diagnostics into `debug-json-projection-kit`. This audit defines a parent domain that keeps story state authoritative while producing separate admitted projections.

## Plan ledger

**Goal:** define the domain boundary, kit composition and dependency direction required for safe player and developer projections.

- [x] Identify the current projection owner.
- [x] Separate state mutation from projection.
- [x] Separate player notebook semantics from developer diagnostics.
- [x] Define identity, admission, classification, redaction, commit and proof kits.
- [ ] Implement the domain.

## Current composition

```txt
browser-story-runtime-kit
  -> owns mutable state
  -> directly calls renderUi()
  -> directly serializes aggregate fields
  -> writes #state-debug

notebook-log-kit
  -> owns authored narrative log rows

debug-json-projection-kit
  -> mixes narrative log with internal ids and booleans
  -> has no explicit channel or result
```

## Required parent domain

```txt
the-unmapped-house-notebook-observability-projection-authority-domain
```

## Proposed composition

```txt
notebook identity
  notebook-surface-id-kit
  notebook-projection-id-kit
  notebook-projection-revision-kit

channel admission
  notebook-channel-policy-kit
  notebook-build-channel-kit
  notebook-capability-admission-kit

classification and redaction
  notebook-field-classification-kit
  notebook-redaction-profile-kit

projection models
  player-notebook-entry-kit
  developer-diagnostic-model-kit
  notebook-projection-plan-kit

transaction and results
  notebook-projection-result-kit
  notebook-projection-commit-kit
  stale-notebook-projection-rejection-kit

observation and proof
  notebook-visible-frame-ack-kit
  notebook-observation-kit
  notebook-journal-kit

fixtures
  public-notebook-fixture-kit
  developer-diagnostics-fixture-kit
  browser-notebook-smoke-kit
  pages-notebook-smoke-kit
```

## Dependency direction

```txt
CommittedStoryState
  -> field classification
  -> channel and capability admission
  -> redaction profile
  -> player or developer projection model
  -> typed projection result
  -> DOM adapter
  -> visible frame acknowledgement
```

The DOM adapter must not read the mutable aggregate directly. Diagnostics must not be the source of player notebook content.

## Domain responsibilities

| Domain | Owns | Must not own |
|---|---|---|
| Story aggregate | Canonical scene, clues, route, inspected state and log. | DOM serialization or build-channel policy. |
| Player notebook | Authored player-safe entries and progress wording. | Raw internal ids and diagnostic fields. |
| Diagnostics | Classified internal observations and support exports. | Player-facing narrative semantics. |
| Projection authority | Channel admission, redaction, revision, result and visible proof. | Story mutation or Three.js rendering. |
| DOM adapter | Apply committed player or diagnostic model. | Selecting fields from mutable state. |

## Required immutable inputs

```txt
storyRevision
sceneGeneration
projectionRevision
buildChannel
requestedChannel
capabilityToken
classificationRevision
redactionProfileId
redactionProfileRevision
```

## Required outputs

```txt
NotebookProjectionResult
  resultId
  status
  storyRevision
  sceneGeneration
  priorProjectionRevision
  committedProjectionRevision
  channel
  includedFields
  redactedFields
  omittedFields
  modelFingerprint
  firstVisibleFrameId
```

## DSK promotion boundary

This authority is product-neutral enough to become a reusable observability/presentation pattern only after a second implementation proves the same player-versus-diagnostic separation. Until then it should remain a product-owned domain under `TheUnmappedHouse`.

## Completion boundary

Architecture is not complete until the visible Notebook consumes only committed projection results and a public build fixture proves that unadmitted developer diagnostics are absent.