# Interaction audit: Save-document admission and result map

**Timestamp:** `2026-07-13T19-58-19-04-00`

## Summary

Startup currently has no command boundary between raw localStorage content and live interaction state. This map defines the evidence required before pointer, button or keyboard commands are admitted.

## Plan ledger

**Goal:** make startup interaction admission depend on one terminal save-admission result and one matching visible-state acknowledgement.

- [x] Map raw document, parser, manifest, migration, state and projection participants.
- [x] Define terminal results.
- [x] Define interaction gating.
- [ ] Implement and fixture the result map.

## Result map

```txt
no save
  -> EmptyInitialized
  -> canonical initial state
  -> initial scene projection

current valid save
  -> CurrentAccepted
  -> exact canonical state
  -> matching saved scene projection

known predecessor schema
  -> MigratedAccepted
  -> migration receipts
  -> canonical successor state

malformed JSON or shape
  -> MalformedQuarantined
  -> preserve raw evidence outside active key
  -> canonical initial fallback

unknown manifest or identifiers
  -> IncompatibleQuarantined / UnknownIdentifierRejected
  -> no raw-state adoption
  -> explicit fallback diagnostics

migration failure
  -> MigrationFailed
  -> no partial state adoption
  -> canonical fallback or blocked startup policy
```

## Interaction gate

```txt
pointer hotspot command
continue command
reset command

may execute only when:
  StorySaveAdmissionResult is terminal and accepted/fallbacked
  StoryStateRevision is current
  visible stage/UI generation matches the admitted scene
```

## Evidence chain

```txt
raw document fingerprint
  -> parse result
  -> schema result
  -> manifest compatibility result
  -> migration/quarantine result
  -> canonical state fingerprint
  -> adoption result
  -> visible frame acknowledgement
  -> interaction lease
```

No interaction implementation changed during this audit.