# Interaction Audit: Story Result Fixture Rows

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T12-59-11-04-00`

## Current interaction authority

Story interaction is currently direct and mutable.

```txt
hotspot click
  -> inspectHotspot(hotspot)
  -> direct inspected mutation
  -> direct clue grant mutation
  -> direct text/log mutation
  -> sceneComplete(currentScene)
  -> direct interlude scheduling
  -> renderUi()
  -> saveState()
```

```txt
continue click
  -> nextScene()
  -> direct currentScene mutation
  -> direct route mutation
  -> StageKit.loadScene(next)
  -> renderUi()
  -> saveState()
```

```txt
KeyR
  -> localStorage.removeItem(SAVE_KEY)
  -> location.reload()
```

## Missing command result boundary

The next source pass needs a pure story reducer that produces rows before the DOM and StageKit consume them.

## Fixture matrix

| Fixture row | Command | Expected status | Required proof |
|---|---|---:|---|
| `initial_state` | `project_state` | `projection` | scene starts at `library-blank-map`; route has first scene only |
| `inspect_first_hotspot` | `inspect_hotspot:map` | `accepted` | clue `clue:blank-square` granted; inspected flag set |
| `repeat_hotspot` | `inspect_hotspot:map` again | `no_mutation` | no duplicate clue; log records repeat |
| `unknown_hotspot` | `inspect_hotspot:not-real` | `rejected` | state unchanged; reason `hotspot_unknown` |
| `scene_incomplete_continue` | `continue_scene` before all clues | `rejected` | route unchanged; reason `scene_incomplete` |
| `complete_library_scene` | inspect all library hotspots | `complete` | scene completion result true |
| `continue_to_hallway` | `continue_scene` after completion | `accepted` | scene id becomes `repeating-hallway` |
| `complete_full_route` | inspect/continue all scenes | `accepted` | route includes all authored scenes |
| `prototype_complete_continue` | continue after final scene | `prototype_complete` | no missing next scene mutation |
| `save_state` | `save_state` | `saved` | save projection contains same story state |
| `load_state` | `load_state` | `loaded` | loaded state normalized before use |
| `reset_save` | `reset_save` | `reset` | reset projection returns initial state and clear-save intent |
| `duplicate_scene_descriptor_rejected` | source validation | `rejected` | duplicate scene ids are rejected |
| `duplicate_hotspot_descriptor_rejected` | source validation | `rejected` | duplicate hotspot ids within a scene are rejected |
| `ungrantable_required_clue_rejected` | source validation | `rejected` | every required clue is grantable by at least one hotspot |
| `stage_scene_snapshot` | `project_state` | `projection` | camera/layer/prop/hotspot counts are descriptor-derived |
| `story_projection` | `project_state` | `projection` | UI-ready title/text/hotspot rows/debug state emitted |
| `GameHost_projection` | `project_state` | `projection` | additive host state includes latest result and fixture summary |

## Required result fields

```txt
commandId
commandType
source
status
reason
accepted
mutated
sceneIdBefore
sceneIdAfter
cluesBefore
cluesAfter
routeBefore
routeAfter
events
projection
saveProjection
diagnostics
```

## Required event records

```txt
hotspot.inspected
hotspot.repeated
clue.granted
scene.completed
scene.transitioned
prototype.completed
state.saved
state.loaded
state.reset_requested
command.rejected
projection.created
```

## Consumer rule

The browser UI should become a consumer of `StoryCommandResult`, not the authority that defines whether the command succeeded.

## Stop condition

The fixture rows must pass without DOM, WebGL, Three.js, browser input, localStorage, `setTimeout`, or StageKit raycasting.
