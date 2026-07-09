# Validation

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Updated:** `2026-07-09T16-50-00-04-00`

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
Full LuminaryLabs-Publish repo list compared to central ledger/root agent state: yes
Chosen repo root .agent exists before this pass: yes
Central ledger updated: yes
Branch created: no
Pull request created: no
Pushed only to main: yes
```

## Evidence read this pass

```txt
LuminaryLabs-Publish full accessible repository list from installation 142700432
LuminaryLabs-Dev/LuminaryLabs repo-ledger entries for non-Cavalry Publish repos
LuminaryLabs-Publish/TheUnmappedHouse:.agent/START_HERE.md
LuminaryLabs-Publish/TheUnmappedHouse:src/game.js
LuminaryLabs-Publish/TheUnmappedHouse:src/stage-kit.js
LuminaryLabs-Publish/TheUnmappedHouse:src/story-data.js
LuminaryLabs-Publish/TheUnmappedHouse:package.json
```

## Validation interpretation

This is a documentation-only breakdown pass.

The repo-local `.agent` state and central ledger were updated to point to the latest story fixture/readback ledge.

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
node --check src/story-commands.js
node --check src/story-preflight.js
node --check src/story-results.js
node --check src/story-reducer.js
node --check src/story-projections.js
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
