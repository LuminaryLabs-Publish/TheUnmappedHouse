# Story Command Result Acceptance Ledger

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T08:21:49-04:00`

## Summary

This ledger turns the existing story-authority diagnosis into an implementation-facing acceptance target.

The next source change should add command envelopes, typed results, stable reasons, journals, and fixtures without changing the current route or visuals.

## Current interaction authority

```txt
renderer click or side-panel button
  -> inspectHotspot(hotspot)
  -> sceneSeen[hotspot.id] = true
  -> grantClues(hotspot.grants)
  -> text.textContent = hotspot.text
  -> writeLog(...)
  -> if sceneComplete(currentScene) setTimeout(showInterlude, 450)
  -> renderUi()
  -> saveState()
```

```txt
continue button
  -> nextScene()
  -> find current scene index
  -> select scenes[index + 1]
  -> mutate currentScene and state.sceneId
  -> push state.route
  -> close interlude
  -> StageKit.loadScene(currentScene)
  -> renderUi()
  -> saveState()
```

## Required command envelopes

```txt
StoryCommandEnvelope
  id: string
  type: inspect_hotspot | continue_scene | load_save | save_state | reset_save
  sceneId?: string
  hotspotId?: string
  source: renderer_hotspot | side_panel_button | continue_button | boot | keyboard_reset | fixture
  issuedAtFrame?: number
  payload?: object
```

## Required result shape

```txt
StoryCommandResult
  accepted: boolean
  kind: inspection | repeat_inspection | completion | transition | prototype_complete | save | load | reset | rejected
  reason: StoryCommandReason
  before: StoryStateSnapshot
  after: StoryStateSnapshot
  events: StoryResultEvent[]
  journalEntry: CommandJournalEntry
  projection: StoryUiProjection
```

## Required reason codes

```txt
OK
HOTSPOT_ALREADY_INSPECTED
SCENE_COMPLETED
SCENE_TRANSITIONED
PROTOTYPE_COMPLETE
SAVE_LOADED
SAVE_WRITTEN
SAVE_RESET
UNKNOWN_SCENE
UNKNOWN_HOTSPOT
SCENE_INCOMPLETE
MALFORMED_SAVE
INVALID_COMMAND
```

## Required result events

```txt
inspection.text_shown
inspection.clues_granted
inspection.repeated
scene.completed
scene.transitioned
scene.prototype_complete
route.journaled
save.loaded
save.written
save.reset
command.rejected
```

## Fixture matrix

| Case | Command sequence | Expected result |
| --- | --- | --- |
| initial state | load_save with empty storage | first scene is `library-blank-map` |
| inspect map | inspect_hotspot `map` | accepted, grants `clue:blank-square` |
| repeat map | inspect_hotspot `map` twice | second accepted repeat, no duplicate clue |
| unknown hotspot | inspect_hotspot `missing` | rejected `UNKNOWN_HOTSPOT` |
| premature continue | continue_scene before completing room | rejected `SCENE_INCOMPLETE` |
| complete first room | inspect `map`, `window`, `shelf-gap` | emits `SCENE_COMPLETED` |
| continue first room | continue_scene after completion | route includes `repeating-hallway` |
| complete route | inspect required hotspots in all three scenes and continue | emits `PROTOTYPE_COMPLETE` at final continue |
| save/load | save after clue grants then load | restored state matches saved scene/clues/route/inspected |
| reset | reset_save | state returns to initial scene and empty clues |
| duplicate hotspot descriptor | validate scene descriptor | rejects duplicate hotspot ids |
| ungrantable required clue | validate scene descriptor | rejects `requiresToComplete` clue not granted by any hotspot |

## File boundary target

```txt
src/story-authority/story-snapshot.js
  createStorySourceSnapshot
  createStoryStateSnapshot
  createStageSceneSnapshot

src/story-authority/story-commands.js
  StoryCommandReason
  createStoryCommandEnvelope
  validateStoryCommand
  applyStoryCommand
  applyInspectionCommand
  applyContinueSceneCommand
  applyLoadSaveCommand
  applyResetSaveCommand

src/story-authority/story-results.js
  createInspectionResult
  createSceneCompletionResult
  createSceneTransitionResult
  createSaveResult
  createRejectedResult

scripts/validate-story-fixtures.mjs
  run DOM-free fixture matrix

src/game.js
  keep DOM and StageKit ownership
  consume command results
  project UI from result.projection
  persist through save adapter
  expose additive window.GameHost.getState()
```

## Acceptance gates

```txt
npm run check
node scripts/validate-story-fixtures.mjs
```

Expected fixture outcome:

```txt
all story command fixture cases pass
```

## Non-goals

```txt
no new story rooms
no new visuals
no StageKit rewrite
no save-key change
no branch creation
no Pages workflow rewrite
no central status-summary schema change
```

## Stop condition

Stop the implementation ledge when the live UI still behaves the same, but all story commands can be replayed without DOM, Three.js, browser input, or localStorage.