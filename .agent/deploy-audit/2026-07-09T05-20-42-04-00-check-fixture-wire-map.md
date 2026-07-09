# Deploy Audit: Check + Fixture Wire Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T05-20-42-04-00`

## Current validation command

```txt
npm run check
```

Current package script:

```txt
node --check src/aspect-frame.js && node --check src/game.js && node --check src/stage-kit.js && node --check src/story-data.js
```

## Current limitation

The check is syntax-only. It does not validate story behavior, route completion, source descriptors, save/load normalization, StageKit projection expectations, browser adapter plans, GameHost diagnostics, or central ledger readback.

## Fixture script to add next

```txt
scripts/validate-story-authority.mjs
```

## Fixture should validate

```txt
source manifest creation
source snapshot creation
initial state creation
malformed save normalization
scene descriptor uniqueness
hotspot descriptor uniqueness
completion requirements against grantable clues
inspect first hotspot
repeat hotspot no-mutation
unknown hotspot rejection
continue before completion rejection
scene completion acceptance
continue to next scene acceptance
terminal prototype result
save projection
interlude projection
stage projection
browser adapter plan
browser adapter readback
GameHost story diagnostics shape
central ledger snapshot row
```

## Package script sequencing

Do not add the fixture to `npm run check` until the fixture runs directly.

Target final command:

```txt
node --check src/aspect-frame.js && node --check src/game.js && node --check src/stage-kit.js && node --check src/story-data.js && node scripts/validate-story-authority.mjs
```

## Deployment stance

No deploy workflow change is recommended in this docs pass.

The static route should stay intact while source authority fixtures are added.
