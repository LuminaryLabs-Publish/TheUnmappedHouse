# Validation

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-09T19-00-15-04-00`

## Current validation status

```txt
Runtime files changed in this pass: no
Agent docs changed in this pass: yes
Central ledger changed in this pass: yes
Local build run: no, connector-only documentation/audit pass
Browser smoke run: no, connector-only documentation/audit pass
Fixture script created: no
Fixture script run: no
GitHub Pages live route checked: no
Current public LuminaryLabs-Publish repo list compared to central ledger/root agent state: yes
Chosen repo root .agent exists before this pass: yes
Central ledger updated: yes
Branch created: no
Pull request created: no
Pushed only to main: yes
```

## Evidence read this pass

```txt
Current public LuminaryLabs-Publish repository list
LuminaryLabs-Dev/LuminaryLabs repo-ledger entries for public non-Cavalry Publish repos
LuminaryLabs-Publish/TheUnmappedHouse:.agent/START_HERE.md
LuminaryLabs-Publish/TheUnmappedHouse:.agent/current-audit.md
LuminaryLabs-Publish/TheUnmappedHouse:.agent/known-gaps.md
LuminaryLabs-Publish/TheUnmappedHouse:.agent/next-steps.md
LuminaryLabs-Publish/TheUnmappedHouse:.agent/validation.md
LuminaryLabs-Publish/TheUnmappedHouse:.agent/kit-registry.json
LuminaryLabs-Publish/TheUnmappedHouse:package.json
LuminaryLabs-Publish/TheUnmappedHouse:src/game.js
LuminaryLabs-Publish/TheUnmappedHouse:src/stage-kit.js
LuminaryLabs-Publish/TheUnmappedHouse:src/story-data.js
```

## Validation interpretation

This is a documentation-only breakdown pass.

The repo-local `.agent` state and central ledger were updated to point to the story adapter ledger refresh and browser fixture gate.

No runtime correctness claim is made for story command fixtures because those fixtures do not exist yet.

## Next validation gate

The next implementation must run:

```txt
npm run check
```

After the fixture runner is added, `npm run check` should include:

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
node --check src/browser-adapter-readback.js
node --check src/story-host-diagnostics.js
node tests/fixtures/story-command-results.mjs
```

## Manual browser smoke still required after implementation

```txt
open index.html
inspect all three library hotspots
confirm interlude opens
continue to repeating hallway
repeat inspect an already-seen hotspot
complete all rooms
press R and confirm save reset
verify debug JSON matches host readback projection
```
