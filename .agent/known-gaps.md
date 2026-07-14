# Known gaps: The Unmapped House story-save schema and manifest admission

**Timestamp:** `2026-07-13T19-58-19-04-00`  
**Status:** `audited`

## Summary

Raw localStorage content has no schema, manifest or identifier admission boundary. Parseable values can become live state and durable writeback even when their shapes or authored references are invalid.

## Plan ledger

**Goal:** make every save classification, migration, quarantine, adoption and visible-state mismatch explicit and testable.

- [x] Trace raw read, parse, merge, scene resolution and writeback.
- [x] Trace every persisted field to its consumers.
- [x] Identify manifest compatibility and visible-scene gaps.
- [x] Define the authority and result contract.
- [ ] Implement and execute it.

## Identity and compatibility gaps

```txt
StorySchemaVersion: absent
StoryManifestFingerprint: absent
StoryRunId: absent
SaveRevision at admission: absent
raw document fingerprint: absent
canonical state fingerprint: absent
startup generation: absent
admitted scene generation: absent
```

## Shape gaps

```txt
top-level object admission: absent
sceneId validation: absent
clues array and ID validation: absent
flags plain-record policy: absent
inspected nested-record and hotspot validation: absent
route array and scene validation: absent
log array, string and bound validation: absent
unknown-field policy: absent
```

## Migration and containment gaps

```txt
save classification: absent
explicit version migration graph: absent
identifier remap/drop/fail policy: absent
migration receipts: absent
incompatible-save quarantine: absent
malformed-save quarantine: absent
quarantine retry policy: absent
canonical fallback result: absent
```

## Reachable failures and divergence

```txt
unknown scene ID
  -> currentScene falls back to scenes[0]
  -> state.sceneId remains unknown
  -> first scene is visible
  -> invalid ID is rewritten

wrong-type clues
  -> string can use substring includes semantics
  -> object/null can fail includes or push

wrong-type inspected
  -> nested lookup or assignment can fail on interaction

wrong-type route
  -> nextScene can fail at includes or push

wrong-type log
  -> inspection can fail at unshift or slice

story-data revision
  -> orphan scene/hotspot/clue IDs remain admitted
  -> no migration or incompatibility result
```

## Commit and presentation gaps

```txt
canonical startup candidate: absent
atomic state/currentScene adoption: absent
terminal StorySaveAdmissionResult: absent
canonical-only writeback: absent
admission diagnostics: absent
stage/UI/Notebook state envelope: absent
first admitted-story frame acknowledgement: absent
interaction readiness lease: absent
```

## Validation gaps

```txt
pure parser fixtures: absent
field-shape fixtures: absent
authored-ID fixtures: absent
manifest fingerprint fixtures: absent
migration fixtures: absent
quarantine fixtures: absent
canonical writeback fixture: absent
first interaction after fallback fixture: absent
first visible admitted-scene fixture: absent
built-output and Pages fixtures: absent
```

## Retained independent gaps

```txt
viewport authority
scene-transition composition
renderer-provider admission
hotspot input and raycast picking
durable save commit/reset convergence
interlude progression and modal focus
stage resource lifecycle and runtime stop
```

## Completion boundary

Do not claim persistence compatibility because malformed JSON falls back safely. Completion requires strict shape and identifier validation, a state-relevant manifest fingerprint, explicit migrations, quarantine, canonical adoption/writeback, interaction gating and a first visible scene tied to the admitted state.