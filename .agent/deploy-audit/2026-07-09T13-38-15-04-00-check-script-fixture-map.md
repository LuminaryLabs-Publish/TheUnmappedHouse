# Check Script Fixture Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T13-38-15-04-00`

## Current scripts

```txt
npm run serve
npm run check
```

Current `npm run check` is syntax-only:

```txt
node --check src/aspect-frame.js
node --check src/game.js
node --check src/stage-kit.js
node --check src/story-data.js
```

## Missing deploy gate

There is no source-owned fixture gate before static publishing.

There is no DOM-free story command fixture.

There is no adapter readback fixture.

There is no ledger readback fixture.

## Required next script map

```txt
node --check src/aspect-frame.js
node --check src/game.js
node --check src/stage-kit.js
node --check src/story-data.js
node --check src/story-authority/*.js
node scripts/story-authority-fixture.mjs
```

## Validation rows to add

```txt
story manifest validity
scene/hotspot descriptor validity
state load fallback
inspect accepted
inspect repeated no_mutation
scene complete interlude intent
continue stage projection
terminal complete result
adapter plan/readback skeleton
repo-local ledger pointer readback
central ledger pointer readback
```

## Deployment decision

Do not change Pages or static hosting in the next cut. Add fixture validation first, then wire browser behavior.
