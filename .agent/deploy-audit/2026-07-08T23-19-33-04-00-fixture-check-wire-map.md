# Fixture Check Wire Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T23-19-33-04-00`

## Current validation surface

```txt
npm run serve
npm run check
```

`npm run check` is syntax-only for:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

## Missing validation surface

```txt
scripts/validate-story-authority.mjs
story authority fixture rows
stage scene snapshot fixture rows
browser adapter readback fixture rows
GameHost diagnostics fixture rows
central ledger snapshot row
```

## Required next package wiring

```txt
npm run check
  -> existing node --check files
  -> node --check new story-authority files
  -> node scripts/validate-story-authority.mjs
```

Keep static hosting unchanged until fixture rows pass.

## Browser smoke after fixture pass

```txt
index.html boots
first scene appears
hotspot hover label appears
hotspot click produces StoryCommandResult
repeat hotspot produces no_mutation result
completion produces InterludeProjection
continue produces StageProjection
GameHost getState story diagnostics are additive
```

No deployment workflow or runtime source changed in this pass.
