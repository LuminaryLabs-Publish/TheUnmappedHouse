# Gameplay audit: next-scene cross-participant transition loop

**Timestamp:** `2026-07-13T09-03-20-04-00`

## Summary

The authored game loop is small, but scene advancement is a multi-participant gameplay transaction. The current implementation changes the story aggregate before proving that the successor stage, interface and save can be adopted.

## Plan ledger

**Goal:** preserve the authored three-scene progression while making each advance exactly once and failure-safe.

- [x] Trace inspection to completion.
- [x] Trace delayed interlude opening.
- [x] Trace Continue to successor adoption.
- [x] Identify terminal route behavior.
- [ ] Implement typed transition results and fixtures.

## Gameplay loop

```txt
inspect three scene hotspots
  -> grant required clues
  -> mark scene complete
  -> schedule interlude
  -> player presses Continue
  -> advance to authored successor
  -> inspect successor hotspots
  -> after final scene show prototype-complete state
```

## Current transition defects

```txt
Continue has no command ID or repeat policy
completion evidence is read implicitly
currentScene changes before stage success
route and log change before stage success
interlude closes before stage success
terminal completion returns without a terminal transition result
save parity is not verified
```

## Required gameplay result

```txt
Accepted
  successor scene is fully adopted

TerminalAccepted
  final scene completion is projected without an invalid successor

Rejected
  predecessor gameplay remains fully usable
```

## Exactly-once rule

Two Continue activations for the same predecessor revision must resolve to one accepted transition and one duplicate/stale result. They must not skip a scene or duplicate route/log entries.

## Completion proof

The final scene must retain its completed story state, display terminal copy and preserve a coherent durable save without attempting to index beyond the authored scene array.