# Architecture audit — Story adapter readback ledger DSK map

## Current architecture

```txt
index.html
  -> src/game.js
  -> src/story-data.js for source descriptors
  -> src/stage-kit.js for visual stage consumption
  -> localStorage for save state
  -> DOM for projection
```

## DSK/domain map

| Domain | Current owner | Gap |
| --- | --- | --- |
| Story source descriptors | `src/story-data.js` | No manifest, fingerprint, or source snapshot layer. |
| Story command dispatch | `src/game.js` | Browser-side function, no command envelope/result id. |
| Story mutation | `src/game.js` | Mutates inspected/clues/route/log inline. |
| Completion policy | `src/game.js` + descriptors | Result is not represented as a serializable record. |
| Save intent | `src/game.js` | Direct `localStorage` write, no adapter-intent row. |
| Interlude route | `src/game.js` | Direct DOM class/text mutation, no interlude-intent row. |
| Stage consumption | `src/stage-kit.js` | Consumes descriptors but does not emit stage-load readback. |
| Hotspot pick | `src/stage-kit.js` | Callback-only, no pick/readback row. |
| Debug projection | `src/game.js` | Ad hoc JSON, not tied to command/result/projection ids. |

## Required seam

```txt
story source
  -> command envelope
  -> preflight/reason
  -> command result
  -> state snapshot
  -> projection record
  -> save/interlude/stage-load adapter intents
  -> browser adapter ledger
  -> StageKit readback
  -> GameHost story diagnostics
  -> DOM-free fixture rows
```

## Architectural rule

Do not rewrite `StageKit` first. Keep it stable and wrap it with additive readback rows after story authority records exist.
