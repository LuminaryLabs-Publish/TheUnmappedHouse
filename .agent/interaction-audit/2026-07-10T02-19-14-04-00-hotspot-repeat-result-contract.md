# Interaction audit: hotspot repeat result contract

Timestamp: `2026-07-10T02-19-14-04-00`

## Interaction inputs

```txt
side-panel hotspot button
StageKit raycast hotspot click
continue button
KeyR reset
```

## Current hotspot flow

```txt
click hotspot
  -> inspectHotspot(hotspot)
  -> if first inspection:
       mutate state.inspected
       grant clues
       append log
       set text
       maybe complete scene
       maybe show interlude
       render UI
       save
  -> if repeat inspection:
       set repeated text/log
       render UI
       save
```

## Gap

Repeat inspection behaves like a legitimate no-mutation command, but it has no typed result.

Current implicit outcomes that need rows:

```txt
accepted / clue_granted
accepted / already_inspected / no_mutation
rejected / unknown_hotspot
rejected / hotspot_not_in_scene
accepted / scene_completed
accepted / interlude_scheduled
accepted / continue_to_next_scene
accepted / terminal_route
```

## Required command contract

```txt
StoryCommandEnvelope {
  id,
  type,
  sceneId,
  hotspotId?,
  issuedAtFrame?,
  source
}

StoryCommandResult {
  commandId,
  status: accepted | rejected | no_mutation,
  reason,
  before,
  after,
  grantedClues,
  projection,
  saveIntent,
  interludeIntent,
  stageLoadIntent,
  terminalIntent
}
```

## Browser adapter contract

After source result creation, `src/game.js` should only consume result records and then report adapter readback:

```txt
DOM projection applied
localStorage write applied
interlude state applied
StageKit load applied
terminal copy applied
debug projection applied
```

## Fixture gate

A DOM-free fixture should prove accepted, rejected, repeated/no-mutation, completion, continue, terminal, save, and projection records before browser changes.
