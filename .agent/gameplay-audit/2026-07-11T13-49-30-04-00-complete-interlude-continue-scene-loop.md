# Gameplay audit: complete, interlude, Continue, scene loop

Timestamp: `2026-07-11T13-49-30-04-00`

## Goal

Map how completion currently advances gameplay and where exactly-once transition authority is missing.

## Current loop

```txt
inspect hotspot
  -> grant clue strings
  -> sceneComplete(currentScene)
  -> schedule 450 ms timeout
  -> show interlude
  -> player clicks Continue
  -> nextScene mutates current scene and route
  -> live stage replacement
  -> UI projection
  -> save
```

## Findings

- Completion has no immutable proof.
- The timeout reads mutable `currentScene` when it fires.
- Continue is not admitted against completion, scene revision, or stage epoch.
- Repeated Continue can advance more than once.
- The final scene produces copy only, not a durable terminal phase.
- Stage or persistence failure cannot return gameplay to a known predecessor state.

## Required gameplay result

A successful Continue must consume one completion proof, advance exactly one canonical successor, commit one story revision and one stage epoch, persist one candidate snapshot, acknowledge one first visible frame, and publish one immutable result. Failed work must not change the active scene.