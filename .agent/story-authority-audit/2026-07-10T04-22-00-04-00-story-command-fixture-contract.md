# Story Authority Audit: Story Command Fixture Contract

**Timestamp:** `2026-07-10T04-22-00-04-00`

## Goal

Move story command authority out of browser effects while preserving the visible route.

## Required source modules next

```txt
src/story-authority/source-manifest.js
src/story-authority/source-fingerprint.js
src/story-authority/state-snapshot.js
src/story-authority/commands.js
src/story-authority/reasons.js
src/story-authority/preflight.js
src/story-authority/results.js
src/story-authority/projections.js
src/story-authority/replay.js
src/story-authority/browser-adapter-plan.js
```

## Required validation next

```txt
scripts/validate-story-authority.mjs
```

## Required command envelopes

```txt
inspect-hotspot
continue-story
reset-story
load-scene
project-ui
save-state
show-interlude
terminal-route
```

## Required stable reason codes

```txt
accepted
already_inspected
unknown_hotspot
scene_mismatch
scene_incomplete
scene_complete
next_scene
final_scene_terminal
save_required
stage_load_required
projection_required
reset_requested
```

## Required result fields

```txt
id
commandId
type
status
accepted
reason
sceneId
hotspotId
before
after
clueDelta
logDelta
routeDelta
completion
projection
saveIntent
interludeIntent
stageLoadIntent
terminalIntent
mutationApplied
```

## Required fixture cases

```txt
initial state resolves first scene
first hotspot inspection accepts and grants clue
repeat hotspot inspection returns no_mutation
unknown hotspot rejects with stable reason
scene completion emits interlude intent
continue emits next scene and stage-load intent
final continue emits terminal route intent
save/projection/stage-load intents are serializable
replay rows are deterministic
```

## Browser adapter contract

After fixture proof, `src/game.js` should become the browser adapter:

```txt
DOM event
  -> source-owned command envelope
  -> story command runner
  -> result record
  -> browser adapter plan
  -> DOM/save/StageKit/interlude effects
  -> adapter readback row
```

## Main authority finding

Do not rewrite `StageKit` or add story content first.

The source-authority cut is the durable next step because it gives agents and the future headless editor a repeatable control surface for the story route.
