# Notebook observability audit: Classification, Redaction and Projection Contract

**Timestamp:** `2026-07-12T15-08-07-04-00`

## Summary

This contract separates player notebook content, developer diagnostics and support exports. It treats field classification and redaction as first-class product policy rather than ad hoc `JSON.stringify` behavior.

## Plan ledger

**Goal:** define fail-closed rules for every field that may enter a visible or exported Notebook projection.

- [x] Define channel kinds.
- [x] Define field classes.
- [x] Define redaction profiles.
- [x] Define projection transaction and result.
- [x] Define visibility and journal proof.
- [ ] Implement and test the contract.

## Channel kinds

```txt
PlayerNotebook
DeveloperDiagnostics
SupportExport
Disabled
```

## Field classes

```txt
PlayerNarrative
PlayerProgress
DeveloperIdentity
DeveloperState
SupportSafe
Prohibited
Unknown
```

Unknown fields must fail closed. Adding a property to the aggregate must not automatically publish it.

## Current field classification proposal

| Current field | Classification | Public handling |
|---|---|---|
| `game` | PlayerNarrative or SupportSafe | Use authored product title. |
| `scene` | DeveloperIdentity | Map to authored title or omit internal id. |
| `clues` | DeveloperIdentity/DeveloperState | Project authored note entries; omit raw ids. |
| `route` | DeveloperIdentity/DeveloperState | Project authored chapter history; omit raw ids. |
| `inspected` | DeveloperState | Project player-safe counts or omit booleans. |
| `complete` | PlayerProgress | Project authored wording, not raw authority flag. |
| `latest` | PlayerNarrative | Preserve typed authored entries. |

## Redaction profiles

```txt
public-player-v1
  include PlayerNarrative and admitted PlayerProgress
  map internal ids to authored copy
  omit DeveloperIdentity and DeveloperState
  reject Unknown and Prohibited

developer-local-v1
  include classified diagnostic fields
  preserve ids only with admitted capability
  bound depth, array length and serialized bytes

support-export-v1
  include SupportSafe fields
  pseudonymize or omit internal/session identifiers
  include profile and schema versions
```

## Projection transaction

```txt
CommittedStoryState
  -> resolve NotebookChannelPolicy
  -> validate capability and build channel
  -> enumerate candidate fields
  -> classify every field
  -> reject Unknown or Prohibited fields
  -> apply RedactionProfile
  -> build immutable model
  -> calculate model fingerprint
  -> reject stale story/projection revision
  -> commit NotebookProjectionResult
  -> apply to intended DOM surface
  -> acknowledge visible frame
  -> append bounded observation
```

## Required budgets

```txt
maximum projection depth
maximum field count
maximum array length
maximum string length
maximum serialized bytes
maximum journal entries
maximum journal bytes
```

## Required observations

```txt
projection id and revision
story revision and scene generation
channel and build channel
classification revision
redaction profile id and revision
included, redacted and omitted field names
model fingerprint
serialized byte count
commit status
visible frame id
```

Observations must not contain the prohibited values they report as omitted.

## Required fixtures

```txt
unknown-field-fails-closed
prohibited-field-never-serializes
public-player-omits-internal-ids
public-player-renders-authored-log
player-progress-uses-authored-copy
developer-channel-requires-capability
support-export-applies-redaction
projection-byte-budget-enforced
stale-story-revision-rejected
stale-projection-revision-rejected
visible-frame-cites-projection
journal-bounded-without-secret-values
```

## Gate

No field may enter the player Notebook, developer diagnostics or support export merely because it exists on the mutable story aggregate. Every field must pass explicit classification and channel policy.