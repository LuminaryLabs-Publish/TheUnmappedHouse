# Deploy Audit - Story Fixture Check Central Gate

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T16-58-52-04-00`

## Current deploy/check state

`package.json` exposes:

```txt
npm run serve
npm run check
```

`npm run check` is currently syntax-only across:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

The README states that GitHub Pages deploys on pushes to `main`.

## Current gap

The deploy/check gate does not prove story commands, route advancement, no-op behavior, malformed-save fallback, adapter readback, or repo-local/central ledger pointer parity.

## Next gate

After adding the story authority modules, `npm run check` should run syntax checks and a DOM-free fixture runner.

```txt
node --check src/aspect-frame.js
node --check src/game.js
node --check src/stage-kit.js
node --check src/story-data.js
node --check src/story-source-manifest.js
node --check src/story-commands.js
node --check src/story-preflight.js
node --check src/story-results.js
node --check src/story-reducer.js
node --check src/story-projections.js
node tests/fixtures/story-command-results.mjs
```

## Fixture rows required before deploy confidence

```txt
load_empty_storage
load_malformed_storage
inspect_new_map
inspect_repeat_map
inspect_invalid_hotspot
complete_library
continue_to_repeating_hallway
continue_terminal
reset_route
adapter_readback_current_scene
repo_local_ledger_readback
central_ledger_readback
```

## Validation status this pass

```txt
Runtime source changed: no
Docs changed: yes
Local npm check run: no
Browser smoke run: no
Fixture run: no
Branch created: no
PR created: no
Push target: main
```
