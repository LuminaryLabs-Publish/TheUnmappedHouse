# Deploy audit: story command fixture gate

Timestamp: `2026-07-10T11-30-28-04-00`

## Current package scripts

```txt
npm run serve
npm run check
```

`npm run check` currently syntax-checks:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

## Current deploy posture

The repo is a static browser route deployed from `main` through GitHub Pages workflow state already noted in the repository docs.

This pass did not change runtime source, package scripts, workflow files, or build outputs.

## Missing gate

There is no DOM-free story command fixture yet.

The next validation gate should add:

```txt
scripts/validate-story-authority.mjs
npm run check
node scripts/validate-story-authority.mjs
```

## Required fixture proof

```txt
source manifest is stable
source fingerprint is stable
initial scene resolves
valid inspect accepts
repeat inspect returns no_mutation
unknown inspect rejects
scene-mismatch inspect rejects
completion emits interlude intent
continue emits stage-load intent
final continue emits terminal intent
save/projection/adapter/readback rows are serializable
```

## Validation this pass

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free story fixture: not run because proof files do not exist yet
pushed to main: yes
central ledger updated: pending in this run
```
