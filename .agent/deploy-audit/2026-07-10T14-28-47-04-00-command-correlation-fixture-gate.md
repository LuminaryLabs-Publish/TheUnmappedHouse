# Deploy audit: Command Correlation Fixture Gate

Timestamp: `2026-07-10T14-28-47-04-00`

## Available scripts

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

## Missing automated gate

No DOM-free test proves story source identity, command outcomes, transition parity, browser effect intents, save observations, StageKit observations, or replay equality.

## Required next files

```txt
src/story-authority/source-manifest.js
src/story-authority/state.js
src/story-authority/commands.js
src/story-authority/preflight.js
src/story-authority/results.js
src/story-authority/correlation.js
src/story-authority/replay.js
src/story-authority/effects.js
src/story-authority/diagnostics.js
scripts/validate-story-correlation.mjs
```

## Required package gate

```json
{
  "scripts": {
    "check": "node --check ... && node scripts/validate-story-correlation.mjs",
    "test:story": "node scripts/validate-story-correlation.mjs"
  }
}
```

The existing syntax checks should remain and expand to the new modules.

## Required fixture rows

```txt
source-manifest-stable
source-fingerprint-stable
initial-state
inspect-accepted-side-panel
inspect-accepted-stage-raycast
inspect-origin-result-parity
inspect-repeat-no-mutation
inspect-unknown-rejected
inspect-scene-mismatch-rejected
scene-completion-single-transition
continue-incomplete-rejected
continue-next-scene
continue-terminal
projection-correlation
interlude-intent-readback
terminal-intent-readback
save-write-readback
save-load-round-trip
stage-load-observation
stage-pick-observation
replay-equality
gamehost-json-safe
```

## Browser smoke target

After the DOM-free gate passes, browser smoke should prove:

1. The first scene loads with matching source and stage observation ids.
2. Side-panel and raycast inspection create equivalent story results.
3. Completion opens one interlude.
4. Continue loads the expected next scene and correlates the StageKit observation.
5. Reload restores a source-compatible save.
6. Reset records a clear observation before reload where supported.

## This pass validation

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free story correlation fixture: not run because proof modules do not exist yet
pushed to main: yes
```
