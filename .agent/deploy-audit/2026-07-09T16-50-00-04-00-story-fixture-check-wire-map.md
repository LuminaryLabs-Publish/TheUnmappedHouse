# Deploy Audit: Story Fixture Check Wire Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T16-50-00-04-00`

## Summary

Deployment validation is currently syntax-only. The next deploy-safe gate should wire story command/result fixtures into `npm run check` before any Pages artifact copy.

## Current validation/deploy surface

```txt
package.json scripts:
  serve: python3 -m http.server 8080
  check: node --check src/aspect-frame.js && node --check src/game.js && node --check src/stage-kit.js && node --check src/story-data.js
```

## Current gaps

```txt
no reducer fixture runner
no DOM-free story command tests
no adapter readback tests
no source manifest validation
no malformed save fixture
no StageKit readback fixture
no central ledger readback fixture
no Pages gate that requires fixture proof
```

## Required check expansion after implementation

```txt
node --check src/aspect-frame.js
node --check src/game.js
node --check src/stage-kit.js
node --check src/story-data.js
node --check src/story-source-manifest.js
node --check src/story-snapshots.js
node --check src/story-commands.js
node --check src/story-preflight.js
node --check src/story-results.js
node --check src/story-reducer.js
node --check src/story-projections.js
node --check src/browser-adapter-plan.js
node tests/fixtures/story-command-results.mjs
```

## Fixture gate rows

```txt
source_manifest_valid
scene_descriptor_ids_unique
hotspot_ids_unique_per_scene
load_empty_storage
load_malformed_storage
inspect_new_hotspot
inspect_repeat_hotspot
complete_scene
continue_next_scene
continue_terminal
reset_story
projection_matches_expected_debug
repo_local_ledger_pointers_match
central_ledger_pointers_match
```

## Deploy rule

Do not treat a browser smoke as the first proof layer.

The source fixture runner should pass first, then browser smoke can confirm that the adapter still applies the proven projections.

## Main finding

`npm run check` needs to become the fixture gate for story authority. Syntax-only validation is not enough for the next source-boundary change.
