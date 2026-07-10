# Validation: The Unmapped House

Timestamp: `2026-07-10T13-01-11-04-00`

## This pass

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free story fixture: not run because proof files do not exist yet
repo-local docs pushed to main: yes
central ledger updated: pending
```

## Available validation

`package.json` exposes:

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

## Missing validation

- No DOM-free story authority fixture.
- No adapter ledger/readback fixture.
- No result rows for accepted/rejected/no-mutation commands.
- No projection rows for DOM updates.
- No fixture rows for continue, terminal, save, interlude, projection, stage-load, pick, or reset intents.
- No stable `GameHost` story diagnostics.

## Required next validation gate

```txt
node scripts/validate-story-authority.mjs
npm run check
```

## Required fixture rows

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
