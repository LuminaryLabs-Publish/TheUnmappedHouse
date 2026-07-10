# Validation: The Unmapped House

Timestamp: `2026-07-10T14-28-47-04-00`

## This pass

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm run check: not run
browser smoke: not run
DOM-free story correlation fixture: not run because proof modules do not exist yet
repo-local docs pushed to main: yes
central ledger updated: yes
```

## Available validation

`package.json` exposes:

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

## Missing validation

- No source manifest or fingerprint stability test.
- No DOM-free story command/preflight/result test.
- No accepted/rejected/no-mutation correlation rows.
- No side-panel versus StageKit raycast result-parity test.
- No single-completion/interlude scheduling test.
- No continue-incomplete, next-scene, or terminal result test.
- No browser-effect intent/readback test.
- No source-versioned save round-trip or failure-injection test.
- No StageKit load/pick observation test.
- No replay equality test.
- No JSON-safe `GameHost` diagnostics test.

## Required next validation gate

```txt
node scripts/validate-story-correlation.mjs
npm run check
```

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

## Browser smoke after the DOM-free gate

```txt
first scene source/stage observation parity
side-panel inspect result
raycast inspect result
interlude opens once
continue loads expected scene
save survives reload with matching source fingerprint
reset clears save and records readback where supported
```
