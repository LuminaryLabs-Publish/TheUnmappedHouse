# Story Authority Source File Cutover Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T16-19-57-04-00`

## Contract

Move rules out of `src/game.js` by adding pure story-authority files first, then adapt the DOM host to consume their outputs.

## Source file boundary

```txt
src/story-authority/story-source-snapshot.js
  validates static story descriptors and creates source facts.

src/story-authority/story-state-snapshot.js
  creates, clones, and normalizes story state.

src/story-authority/stage-scene-snapshot.js
  serializes stage descriptor facts without importing Three.js.

src/story-authority/story-command-envelope.js
  wraps inspect, continue, load, save, reset, project, validate, and snapshot intents.

src/story-authority/story-command-reasons.js
  centralizes stable reason constants.

src/story-authority/story-command-result.js
  owns accepted/rejected/no_mutation/terminal result shape.

src/story-authority/story-event-record.js
  owns journal/event row shape.

src/story-authority/story-reducer.js
  applies commands and returns results.

src/story-authority/story-projection.js
  creates title/text/hotspot/notebook/debug projection.

src/story-authority/save-projection.js
  creates write/clear/noop save intent.

src/story-authority/interlude-projection.js
  creates open/close/terminal interlude intent.

src/story-authority/gamehost-story-diagnostics.js
  creates additive GameHost diagnostics.

src/story-authority/story-fixture-cases.js
  defines fixture rows.

scripts/validate-story-authority.mjs
  runs fixture rows in Node.
```

## Required reducer commands

```txt
story.inspect_hotspot
story.continue_scene
story.load_state
story.save_state
story.reset_save
story.project
story.validate_source
story.snapshot_stage
```

## Required fixture proof

```txt
accepted mutation: first hotspot inspect
no mutation: repeated hotspot inspect
rejected: unknown hotspot
rejected: continue while incomplete
accepted route transition: complete room then continue
terminal: continue after final scene
accepted save: write projection emitted
accepted reset: clear projection emitted
rejected source: duplicate scene id
rejected source: duplicate hotspot id
rejected source: ungrantable required clue
accepted stage snapshot: all scenes serializable
accepted GameHost projection: additive diagnostics stable
```

## Host splice rule

`src/game.js` may keep DOM lookup, StageKit construction, renderUi, localStorage adapter calls, and event binding, but each of those must consume result/projection objects instead of deciding story authority locally.
