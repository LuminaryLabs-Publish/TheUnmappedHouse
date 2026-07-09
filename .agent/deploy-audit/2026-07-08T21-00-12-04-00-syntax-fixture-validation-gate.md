# Syntax Fixture Validation Gate

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T21-00-12-04-00`

## Current validation scripts

`package.json` exposes:

```txt
npm run serve -> python3 -m http.server 8080
npm run check -> node --check src/aspect-frame.js && node --check src/game.js && node --check src/stage-kit.js && node --check src/story-data.js
```

## Gap

The current check only proves syntax. It does not prove story source descriptors, command results, projection outputs, adapter plan shape, save/reset results, stage snapshots, or GameHost diagnostics.

## Next validation target

Add:

```txt
scripts/validate-story-authority.mjs
```

Then either add a dedicated script:

```txt
npm run check:story-authority
```

or include the fixture in `npm run check` after syntax-only checks continue to pass.

## Fixture constraints

```txt
no DOM
no WebGL
no localStorage
no setTimeout
no StageKit raycasting
no story copy changes
no route changes
no SAVE_KEY changes
```

## Browser smoke after fixture

```txt
index.html boots
first scene renders
hotspots hover/click
repeat hotspot stays no-duplicate
room completion opens interlude
continue changes scene
KeyR clears save
GameHost state includes additive story adapter diagnostics
```

## Stop condition

Do not rely on browser smoke to discover story authority defects. Prove the source/reducer/projection/adapter rows first, then browser-smoke the existing route.
