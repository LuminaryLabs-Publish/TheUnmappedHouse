# Hotspot Command Result Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T11-00-39-04-00`

## Current interaction seams

```txt
side-panel button click -> inspectHotspot(hotspot)
StageKit raycast click -> clickHotspot() -> onHotspot(hotspot) -> inspectHotspot(hotspot)
continue button click -> nextScene()
KeyR -> localStorage.removeItem(SAVE_KEY) -> location.reload()
```

## Main interaction gap

The repeat-hotspot path is a UI branch, not a command result.

Target repeat path:

```txt
story.inspect_hotspot
  -> StoryPreflight accepted
  -> StoryCommandResult status no_mutation
  -> reason hotspot_already_inspected
  -> StoryProjection
  -> SaveProjection no_write
  -> BrowserAdapterPlan
  -> BrowserAdapterReadback
```

## Reason codes needed

```txt
hotspot_inspected
hotspot_already_inspected
unknown_hotspot
scene_completed
scene_incomplete
continue_rejected_scene_incomplete
continued_to_next_scene
terminal_prototype_complete
load_state_normalized
load_state_malformed
save_write_requested
save_clear_requested
repo_local_ledger_mismatch
central_ledger_mismatch
```
