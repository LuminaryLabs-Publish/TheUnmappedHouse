# Route Save Fixture Loop

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T02-02-03-04-00`

## Current gameplay loop

The playable loop is small and deterministic enough for fixture-first proof:

```txt
load state
  -> inspect hotspots in current scene
  -> collect clues
  -> complete scene when all required clues are present
  -> show interlude
  -> continue to next scene
  -> save after each mutation
  -> reset with KeyR
```

## Current gameplay authority in source

```txt
createInitialState:
  returns first scene id, clues, flags, inspected, route, log

loadState:
  shallow-merges localStorage JSON over initial state

saveState:
  writes whole state to SAVE_KEY

sceneComplete:
  checks currentScene.requiresToComplete against state.clues

inspectHotspot:
  mutates inspected/clues/log/text/completion/save

nextScene:
  mutates currentScene/sceneId/route/interlude/stage/UI/save
```

## Route facts

```txt
scene order:
  library-blank-map
  repeating-hallway
  closet-weather

terminal state:
  no next scene after closet-weather; interlude text becomes prototype complete
```

## Save facts

```txt
SAVE_KEY:
  the-unmapped-house.stage-prototype.v1

save payload fields:
  sceneId
  clues
  flags
  inspected
  route
  log
```

## Missing gameplay proof

```txt
No ActionResult or StoryCommandResult exists.
No command journal exists.
No route journal exists.
No save journal exists.
No load normalization row exists.
No reset result exists.
No prototype-complete terminal result exists.
No fixture proves complete route progression without DOM/localStorage/StageKit.
```

## Fixture loop required next

```txt
source_manifest_created
source_snapshot_created
initial_state
load_empty_state
load_malformed_state
source_preflight_passes
duplicate_scene_descriptor_rejected
duplicate_hotspot_descriptor_rejected
ungrantable_required_clue_rejected
inspect_first_hotspot
repeat_hotspot
unknown_hotspot
scene_incomplete_continue
complete_library_scene
continue_to_hallway
complete_full_route
prototype_complete_continue
save_state
load_state
reset_save
stage_scene_snapshot
story_projection
save_projection
interlude_projection
stage_projection
browser_adapter_plan
browser_adapter_readback
GameHost_projection
central_ledger_snapshot
```

## Acceptance boundary

The next implementation should pass the full fixture loop before adding rooms, writing new story content, changing the visual stage, or adding browser automation.
