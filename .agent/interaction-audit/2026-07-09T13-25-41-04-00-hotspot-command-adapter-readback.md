# Interaction Audit: Hotspot Command Adapter Readback

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T13-25-41-04-00`

## Current interaction inputs

```txt
side-panel button click
StageKit raycast click
continue button click
KeyR reset
initial load
localStorage load
save write
```

## Current hotspot flow

```txt
button.addEventListener("click", () => inspectHotspot(hotspot))
StageKit clickHotspot() -> onHotspot(hotspot)
inspectHotspot(hotspot)
  -> if repeated, write text/log/UI/save and return
  -> mark inspected
  -> grant clues
  -> write hotspot text
  -> write log
  -> if scene complete, schedule showInterlude(currentScene) after 450ms
  -> renderUi()
  -> saveState()
```

## Missing command authority

```txt
inspect_hotspot command envelope
hotspot target normalization
current scene preflight
hotspot exists preflight
repeat-inspection result
clue grant result
scene-complete result
interlude intent result
save intent result
UI projection result
browser adapter readback
GameHost story diagnostics
```

## Reason codes needed

```txt
accepted_first_inspection
accepted_scene_complete
no_mutation_repeat_inspection
rejected_missing_scene
rejected_missing_hotspot
rejected_malformed_command
rejected_source_descriptor_invalid
rejected_save_state_invalid
accepted_terminal_prototype
accepted_reset_requested
accepted_load_empty_state
accepted_load_valid_state
normalized_malformed_save_state
```

## Adapter contract

The next pass should make `inspectHotspot` a thin adapter:

```txt
browser event
  -> create StoryCommandEnvelope
  -> run source preflight
  -> run reducer
  -> receive StoryCommandResult
  -> create StoryBrowserAdapterPlan
  -> apply DOM/StageKit/localStorage effects
  -> collect BrowserAdapterReadback
  -> expose additive diagnostics
```

## Guardrail

Preserve current click behavior, button labels, hover labels, clue grants, interlude copy, and repeat-inspection copy while making command results explicit.
