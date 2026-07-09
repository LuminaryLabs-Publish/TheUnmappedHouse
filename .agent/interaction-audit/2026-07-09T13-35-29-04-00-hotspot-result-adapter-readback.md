# Interaction Audit - Hotspot Result Adapter Readback

**Timestamp:** `2026-07-09T13-35-29-04-00`

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Current interaction path

```txt
side-panel button click
  -> inspectHotspot(hotspot)

StageKit raycast click
  -> clickHotspot()
  -> this.onHotspot(hotspot)
  -> inspectHotspot(hotspot)
```

`inspectHotspot(hotspot)` currently performs command dispatch, mutation, projection, save, and completion checks inline.

## Current behaviors

```txt
first hotspot inspect:
  marks hotspot inspected
  grants clues
  writes visible text
  writes notebook log
  checks scene completion
  may schedule interlude after 450ms
  renders UI
  saves state

repeat hotspot inspect:
  writes visible text
  writes Re-read log line
  renders UI
  saves state
  returns without typed no_mutation result

continue:
  mutates scene route
  hides interlude
  loads StageKit scene
  renders UI
  saves state

reset:
  removes localStorage key
  reloads page
```

## Missing interaction contracts

```txt
StoryCommandEnvelope for story.inspect_hotspot
StoryCommandEnvelope for story.continue_scene
StoryCommandEnvelope for story.reset_save
StoryPreflight for target hotspot validity
StoryPreflight for incomplete continue
StoryCommandResult for first inspect
StoryCommandResult for repeat inspect no_mutation
StoryCommandResult for unknown hotspot rejected
StoryCommandResult for terminal route
StoryBrowserAdapterPlan for DOM changes
BrowserAdapterReadback for consumed result
```

## Required reason codes

```txt
accepted:first_hotspot_inspected
accepted:scene_completed
no_mutation:hotspot_already_inspected
rejected:unknown_hotspot
rejected:scene_incomplete
terminal:prototype_complete
readback:browser_adapter_consumed
readback:repo_local_ledger_matched
readback:central_ledger_matched
```

## Adapter rule

The browser should not invent results.

The browser should consume a result that already says what happened, why it happened, what changed, what to save, what to show, what stage to load, and what diagnostics to expose.

## Main interaction finding

The interaction loop is compact enough to prove with a DOM-free fixture.

The next pass should turn current hotspot and continue behavior into typed command/result rows while preserving existing UI behavior.
