# Story authority audit: source command readback contract

Timestamp: `2026-07-10T11-30-28-04-00`

## Current source of truth

`src/story-data.js` is the descriptor source of truth for scenes, hotspots, clue grants, requirements, interlude copy, cameras, stage objects, and post settings.

`src/game.js` is the operational source of truth for state mutation and browser effects.

## Contract problem

The repo has descriptors, but it does not yet have a source-owned command/result contract.

Current browser functions answer important questions implicitly:

```txt
Was this hotspot valid?
Was it already inspected?
Did it grant clues?
Did the scene become complete?
Should an interlude open?
Should the next scene load?
Should terminal copy show?
Should state save?
Which DOM projection changed?
Which StageKit load happened?
```

Those answers need rows.

## Proposed contract rows

```txt
StorySourceManifest
StorySourceFingerprint
StorySourceSnapshot
StoryCommandEnvelope
StoryCommandPreflight
StoryCommandReason
StoryCommandResult
StoryStateSnapshot
StoryProjectionRecord
SaveIntentRecord
InterludeIntentRecord
TerminalRouteIntentRecord
StageLoadIntentRecord
StageLoadReadback
StagePickReadback
StoryAdapterLedgerRow
BrowserAdapterReadback
GameHostStoryDiagnostics
```

## Fixture matrix

```txt
initial-state -> first scene selected
inspect-valid -> accepted + clue granted + save/projection rows
inspect-repeat -> no_mutation + already_inspected reason
inspect-unknown -> rejected + unknown_hotspot reason
inspect-scene-mismatch -> rejected + scene_mismatch reason
scene-complete -> accepted + interlude intent
continue-middle -> next scene + stage load intent
continue-final -> terminal route intent
reset -> reset save intent
```

## Success criteria

- `src/game.js` can stay as the browser adapter.
- Visible behavior stays the same.
- The story authority can be tested without DOM.
- Browser adapter readback can prove which rows it consumed.
- `StageKit` can add readback without being rewritten.
