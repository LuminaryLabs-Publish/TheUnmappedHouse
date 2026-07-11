# Deploy audit: resume transition fixture gate

Timestamp: `2026-07-10T22-21-17-04-00`

## Current deployment contract

The repository is a static browser project. `package.json` exposes `npm run check`, but the check performs syntax validation only. The README states that GitHub Pages deploys from pushes to `main`.

## Deployment risk

The current gate cannot detect:

- completed-scene reload deadlocks;
- invalid or stale save shapes;
- future-scene clues completing the current scene;
- wrong-phase or duplicate Continue behavior;
- terminal state loss after reload;
- story state advancing when stage loading fails;
- story/stage identity divergence.

A syntactically valid deployment can therefore publish a non-resumable route.

## Required headless gate

```txt
node scripts/validate-story-source.mjs
node scripts/validate-save-reconciliation.mjs
node scripts/validate-story-phase-resume.mjs
node scripts/validate-story-command-results.mjs
node scripts/validate-story-stage-transition.mjs
```

These scripts should avoid DOM and WebGL dependencies by testing pure source, save, reducer, command and transaction adapters.

## Required browser gate

```txt
fresh start
  -> complete scene one
  -> reload before interlude readiness
  -> confirm progression resumes
  -> reload with interlude open
  -> continue once
  -> confirm story/stage identity agreement
  -> repeat through terminal
  -> reload terminal
  -> inject stage failure
  -> confirm prior state and stage remain committed
```

## Package integration target

```json
{
  "scripts": {
    "check:syntax": "node --check ...",
    "check:story-source": "node scripts/validate-story-source.mjs",
    "check:save": "node scripts/validate-save-reconciliation.mjs",
    "check:story-phase": "node scripts/validate-story-phase-resume.mjs",
    "check:story-command": "node scripts/validate-story-command-results.mjs",
    "check:story-stage": "node scripts/validate-story-stage-transition.mjs",
    "check": "npm run check:syntax && npm run check:story-source && npm run check:save && npm run check:story-phase && npm run check:story-command && npm run check:story-stage"
  }
}
```

## Deployment acceptance

```txt
all source/save/phase/command/transition fixtures pass
browser route and reload smoke passes
no runtime source or visual regression is hidden by the docs-only audit
Pages publishes only from main
```
