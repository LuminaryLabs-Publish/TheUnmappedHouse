# Save-system audit: LocalStorage Source Version Readback Gap

Timestamp: `2026-07-10T14-28-47-04-00`

## Current save path

```txt
SAVE_KEY = the-unmapped-house.stage-prototype.v1
loadState()
  -> read localStorage string
  -> JSON.parse
  -> shallow-merge over createInitialState()
  -> fall back to initial state on parse failure

saveState()
  -> JSON.stringify live state
  -> localStorage.setItem

KeyR
  -> localStorage.removeItem
  -> location.reload
```

## Current strengths

- Save key is stable and scoped to the prototype.
- Parse failure safely falls back to initial state.
- State is JSON-compatible.
- Reload restores scene, clues, inspected hotspots, route, and notebook log.

## Gaps

- No explicit save schema version exists inside the payload.
- No story source id or fingerprint is saved.
- Shallow merge can accept stale or malformed nested values.
- Saved `sceneId`, clue ids, and hotspot ids are not validated against current source data.
- No migration or invalidation policy exists when story descriptors change.
- Save writes are not tied to a command/result/projection.
- Save failures are not captured as stable reason codes or readback rows.
- Reset clears the save without preserving a final reset observation.

## Required records

### SaveIntentRecord

```js
{
  intentId,
  commandId,
  resultId,
  stateId,
  sourceFingerprint,
  saveKey,
  operation: "write" | "clear"
}
```

### SaveWriteObservation

```js
{
  observationId,
  intentId,
  commandId,
  resultId,
  saveKey,
  operation,
  status: "applied" | "failed",
  bytes,
  reasonCode
}
```

### SaveEnvelope

```js
{
  schemaVersion: 1,
  sourceId,
  sourceFingerprint,
  state
}
```

## Load policy

```txt
parse envelope
  -> validate schema version
  -> validate source id
  -> compare source fingerprint
  -> validate scene/clue/hotspot ids
  -> accept, migrate, or invalidate explicitly
  -> return a LoadObservation row
```

## Fixture requirements

```txt
no-save initial load
valid-save restore
invalid-json fallback
unknown-scene invalidation
stale-source-fingerprint invalidation or migration
successful write observation
failed write observation via injected storage adapter
clear observation
replay equality after save/load round trip
```

The first proof should use an injected storage adapter in Node rather than requiring browser `localStorage`.
