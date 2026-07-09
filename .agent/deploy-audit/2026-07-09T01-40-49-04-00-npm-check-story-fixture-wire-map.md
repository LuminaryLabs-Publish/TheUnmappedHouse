# Deploy Audit — npm Check Story Fixture Wire Map

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Generated:** `2026-07-09T01-40-49-04-00`

## Current validation surface

`package.json` currently exposes:

```txt
npm run serve
npm run check
```

`npm run check` is syntax-only:

```txt
node --check src/aspect-frame.js
node --check src/game.js
node --check src/stage-kit.js
node --check src/story-data.js
```

## Deploy stance

No deploy workflow or runtime source file was changed in this documentation pass.

The next implementation should add fixture validation before changing deployment behavior.

## Missing validation pieces

```txt
scripts/validate-story-authority.mjs
src/story-authority/*.js syntax coverage
story-authority fixture rows
adapter readback fixture rows
GameHost diagnostics fixture rows
central ledger readback fixture row
npm script for story authority validation
```

## Recommended validation sequence after source implementation

```txt
npm run check
node scripts/validate-story-authority.mjs
python3 -m http.server 8080
```

Manual browser readback after the fixture passes:

```txt
index.html boots
first scene renders
hotspot hover works
hotspot click updates text and grants clue
repeat hotspot does not duplicate clue
scene completion opens interlude
continue advances to next scene
final continue reaches prototype-complete state
KeyR reset preserves current behavior
window.GameHost.getState().story is additive and read-only
```

## Do not wire yet

```txt
Pages workflow changes
browser automation
screenshot automation
new deploy target
new bundler
new renderer smoke
```

Add those only after the pure story fixture can explain source manifest, preflight, command result, projection, adapter plan, adapter readback, GameHost diagnostics, and central ledger freshness.
