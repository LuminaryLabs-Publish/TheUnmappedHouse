# Gameplay audit: Invalid Save Startup Divergence Loop

**Timestamp:** `2026-07-12T17-20-42-04-00`

## Summary

Malformed but parseable browser state is admitted before gameplay. Several values can create divergent state or fail later during inspection and Continue.

## Plan ledger

**Goal:** enumerate concrete gameplay paths that require snapshot validation and reconciliation.

- [x] Inspect every state field consumer.
- [x] Trace unknown scene ids.
- [x] Trace wrong collection types.
- [x] Trace mutation and save ordering.
- [ ] Add executable fixtures.

## Failure loops

```txt
unknown sceneId
  -> first scene rendered
  -> invalid sceneId preserved
  -> full save rewritten
  -> reload repeats divergence
```

```txt
clues = "clue:blank-square"
  -> sceneComplete may use string substring semantics
  -> later grantClues attempts push
  -> action can fail after earlier state/UI work
```

```txt
inspected = null
  -> renderUi or inspectHotspot dereferences current scene
  -> startup or first action fails
```

```txt
route = non-array
  -> scene renders and may save
  -> Continue calls includes/push
  -> transition fails
```

```txt
log = non-array
  -> inspection mutates clue/inspection state
  -> writeLog calls unshift
  -> partial action can fail
```

## Required gameplay policy

```txt
invalid snapshot root: reject
wrong field type: reject or named migration
unknown scene id: explicit reset/reconcile result
unknown clue/hotspot ids: remove only under named reconciliation policy
invalid route: rebuild from accepted manifest and scene only under named policy
future schema: reject without rewrite
fallback startup: publish reason and preserve recoverable raw bytes
```
