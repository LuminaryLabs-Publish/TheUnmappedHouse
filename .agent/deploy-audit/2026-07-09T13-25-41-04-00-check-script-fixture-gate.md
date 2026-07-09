# Deploy Audit: Check Script Fixture Gate

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T13-25-41-04-00`

## Current scripts

```txt
npm run serve:
  python3 -m http.server 8080

npm run check:
  node --check src/aspect-frame.js
  node --check src/game.js
  node --check src/stage-kit.js
  node --check src/story-data.js
```

## Current deploy status

The current route is static browser JavaScript.

This pass did not change runtime source, package scripts, Pages workflow, or deploy output.

## Required next gate

Add a DOM-free story fixture before any browser adapter splice is considered complete.

```txt
scripts/validate-story-authority.mjs
```

Then extend `npm run check` to include the fixture.

```txt
node --check src/story-authority/*.js
node scripts/validate-story-authority.mjs
```

## Fixture should prove

```txt
source manifest parity
source snapshot parity
scene descriptor validation
hotspot descriptor validation
initial state normalization
save-state normalization
inspect hotspot accepted result
repeat inspect no_mutation result
scene completion result
interlude intent projection
continue scene accepted result
terminal continuation result
reset clear-save intent
stage projection
browser adapter plan
adapter readback shape
GameHost story diagnostics shape
repo-local ledger pointer parity
central ledger pointer parity
```

## Validation performed this pass

```txt
runtime source changed: no
local npm run check: no
browser smoke: no
fixture run: no
branch created: no
pull request created: no
main push: yes
```
