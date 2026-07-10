# Deploy audit: Story Authority Fixture Gate

Timestamp: `2026-07-10T13-01-11-04-00`

## Available scripts

```txt
npm run serve
npm run check
```

`npm run check` syntax-checks:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

## Missing fixture

No DOM-free story authority fixture exists yet.

## Required next fixture

```txt
scripts/validate-story-authority.mjs
```

## Required assertions

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
stage-load-readback
stage-pick-readback
projection-record
story-adapter-ledger-row
browser-adapter-readback
gamehost-story-diagnostics
```

## This pass validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free story fixture: not run because proof files do not exist yet
pushed to main: yes
```
