# Deploy Audit: Story Fixture Check Gate

**Timestamp:** `2026-07-10T05-40-17-04-00`

## Current scripts

```txt
npm run serve -> python3 -m http.server 8080
npm run check -> node --check src/aspect-frame.js && node --check src/game.js && node --check src/stage-kit.js && node --check src/story-data.js
```

## Current validation gap

`npm run check` only syntax-checks source files.

It does not prove story authority, command results, replay rows, browser adapter readback, save intents, interlude intents, terminal intents, or StageKit load intents.

## Required next gate

```txt
node scripts/validate-story-authority.mjs
npm run check
```

Wire the story authority fixture into `npm run check` after the fixture exists.

## Fixture rows required

```txt
initial-state
inspect-accepted
inspect-repeat-no-mutation
inspect-unknown-rejected
inspect-scene-mismatch-rejected
scene-complete
continue-next-scene
continue-terminal
save-intent
interlude-intent
stage-load-intent
projection-record
browser-adapter-readback
```

## Current pass validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free story fixture: not run because proof files do not exist yet
```
