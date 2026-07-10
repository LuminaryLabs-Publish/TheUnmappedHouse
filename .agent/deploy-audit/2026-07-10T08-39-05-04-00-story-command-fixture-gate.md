# Deploy audit: story command fixture gate

Timestamp: `2026-07-10T08-39-05-04-00`

## Current package scripts

`package.json` exposes:

```txt
npm run serve
npm run check
```

`npm run check` currently runs syntax checks:

```txt
node --check src/aspect-frame.js
node --check src/game.js
node --check src/stage-kit.js
node --check src/story-data.js
```

## Current deploy risk

A syntax-only check cannot prove story-command behavior, adapter ledger consumption, StageKit load parity, or terminal route behavior. Browser smoke alone would also miss command result reasons unless readback rows exist.

## Required next validation gate

Add a DOM-free story fixture before story expansion or visual changes.

Suggested files:

```txt
src/story-authority/source-manifest.js
src/story-authority/source-fingerprint.js
src/story-authority/state-snapshot.js
src/story-authority/commands.js
src/story-authority/reasons.js
src/story-authority/preflight.js
src/story-authority/results.js
src/story-authority/projections.js
src/story-authority/story-adapter-ledger.js
src/story-authority/browser-adapter-readback.js
scripts/validate-story-authority.mjs
```

## Required fixture cases

```txt
initial-state-resolves-first-scene
inspect-first-hotspot-accepted
inspect-repeat-no-mutation
inspect-unknown-hotspot-rejected
inspect-scene-mismatch-rejected
scene-complete-emits-interlude-intent
continue-next-scene-emits-stage-load-intent
continue-final-emits-terminal-intent
projection-record-serializable
save-intent-serializable
story-adapter-ledger-row-serializable
browser-adapter-readback-serializable
```

## Gate target

```txt
node scripts/validate-story-authority.mjs
npm run check
```

After the fixture exists, wire it into `npm run check`.

## Validation for this pass

Docs-only. Runtime source, package scripts, branches, PRs, and browser state were not changed.
