# Story authority audit: source command result adapter contract

Timestamp: `2026-07-10T02-19-14-04-00`

## Current authority problem

`src/game.js` is both the source authority and the browser adapter. It interprets user intent, mutates state, writes save state, schedules interludes, loads StageKit scenes, writes terminal DOM, and produces ad hoc debug JSON.

## Target boundary

```txt
source descriptors
  -> source manifest/fingerprint
  -> state snapshot
  -> command envelope
  -> preflight
  -> command result
  -> projection/intents
  -> browser adapter plan
  -> adapter readback
```

## Required result reasons

```txt
initial_state
hotspot_inspected
already_inspected
unknown_hotspot
hotspot_not_in_scene
clue_granted
scene_not_complete
scene_completed
interlude_ready
continue_next_scene
continue_terminal
save_requested
stage_load_requested
projection_requested
reset_requested
```

## Compatibility rule

Visible behavior should remain unchanged while the authority layer is introduced. The first implementation should preserve current story copy, scene order, hotspot labels, interlude behavior, localStorage key, debug usefulness, and StageKit visual behavior.

## First implementation files

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
scripts/validate-story-authority.mjs
```

## Browser splice

After fixture proof, update `src/game.js` to consume the source-owned plan:

```txt
DOM event
  -> command envelope
  -> source result
  -> projection/save/interlude/stage-load/terminal intents
  -> browser adapter applies effects
  -> adapter readback row
```

## Stop condition

Do not start a StageKit rewrite until source command result and adapter readback rows exist.
