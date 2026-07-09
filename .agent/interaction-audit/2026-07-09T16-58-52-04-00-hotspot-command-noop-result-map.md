# Interaction Audit - Hotspot Command No-op Result Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T16-58-52-04-00`

## Current interaction surfaces

```txt
side-panel hotspot buttons
StageKit raycast hotspot click
continue interlude button
KeyR reset
```

## Current interaction flow

```txt
button click or StageKit click
  -> inspectHotspot(hotspot)
  -> branch on state.inspected[currentScene.id][hotspot.id]
  -> repeat path writes text, log, UI, and save then returns
  -> first-inspect path mutates inspected, clues, text, log, completion, interlude timer, UI, and save
```

## Interaction domains

```txt
hotspot-button-domain
stage-raycast-domain
hotspot-command-domain
repeat-inspection-domain
first-inspection-domain
completion-check-domain
continue-scene-domain
reset-key-domain
browser-projection-domain
save-intent-domain
interlude-intent-domain
```

## Missing command/result rows

```txt
inspect_new_hotspot -> accepted / clue_granted
inspect_repeat_hotspot -> accepted / repeated_no_mutation
inspect_missing_hotspot -> rejected / hotspot_not_found
inspect_wrong_scene_hotspot -> rejected / hotspot_not_in_scene
complete_scene -> accepted / completion_met / interlude_intent
continue_scene -> accepted / route_advanced
continue_terminal -> accepted / prototype_complete
reset_route -> accepted / clear_save_intent / reload_intent
```

## Main interaction risk

Repeat inspections are currently not pure no-ops. They write UI, write a log row, save, and return without exposing a typed result.

That makes repeat behavior invisible to fixtures and makes it difficult to prove when mutation is expected, when only projection is expected, and when save intent should fire.

## Next contract

`StoryCommandResult` should include:

```txt
commandId
status
reason
sceneBefore
sceneAfter
stateBeforeHash
stateAfterHash
mutated
saveIntent
interludeIntent
stageProjection
uiProjection
logProjection
debugProjection
adapterPlan
readbackExpectation
```

## Guardrail

Do not add new interaction verbs until inspect, repeat inspect, continue, terminal continue, reset, and ledger readback have typed result rows.
