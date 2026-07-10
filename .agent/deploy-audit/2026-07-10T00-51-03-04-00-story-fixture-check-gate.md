# Deploy audit: story fixture check gate

Timestamp: `2026-07-10T00-51-03-04-00`

## Current package scripts

```txt
npm run serve
npm run check
```

`npm run check` currently runs syntax checks only:

```txt
node --check src/aspect-frame.js
node --check src/game.js
node --check src/stage-kit.js
node --check src/story-data.js
```

## Current deploy/check risk

Syntax checks cannot prove story behavior.

They do not cover:

- accepted hotspot commands;
- repeated/no-mutation hotspot commands;
- unknown/stale hotspot rejection;
- completion/interlude intent;
- continue-to-next-scene intent;
- terminal route intent;
- save projection;
- StageKit load intent;
- browser adapter readback.

## Required next gate

Add a fixture script before any content or visual expansion:

```txt
scripts/validate-story-authority.mjs
```

Then wire package validation to include it:

```txt
npm run check
node scripts/validate-story-authority.mjs
```

or update `npm run check` to run both syntax checks and fixture rows.

## Recommended fixture output

```txt
case id
command envelope
preflight result
before snapshot
command result
projection records
save intent
stage/interlude/terminal intent
adapter expectation
```

## This pass validation

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free story fixture: not run because fixture files do not exist yet
```

## Main deploy finding

The app can still be statically served, but release confidence should not advance until story command fixtures exist and are wired into `npm run check`.
