# Validation: The Unmapped House

Timestamp: `2026-07-10T19-00-19-04-00`

## This pass

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run in connector-only environment
browser smoke: not run
story manifest fixture: unavailable
save reconciliation fixture: unavailable
story command fixture: unavailable
completion proof fixture: unavailable
source/save/render identity fixture: unavailable
repo-local docs pushed to main: yes
central ledger sync: pending until repo-local commit sequence completes
```

## Available validation

`package.json` exposes:

```txt
npm run serve
npm run check
```

`npm run check` syntax-checks:

```txt
src/aspect-frame.js
src/game.js
src/stage-kit.js
src/story-data.js
```

## Required next validation gate

```txt
node scripts/validate-story-manifest.mjs
node scripts/validate-save-reconciliation.mjs
node scripts/validate-story-command-authority.mjs
node scripts/validate-completion-proof.mjs
node scripts/validate-source-save-render-identity.mjs
npm run check
```

## Required story manifest rows

```txt
manifest-schema-version-present
manifest-id-stable
source-fingerprint-stable
three-scenes-indexed
nine-hotspots-indexed
nine-required-clues-indexed
scene-ids-unique
hotspot-ids-unique-per-scene
all-grants-known
all-requirements-known
route-order-valid
normalized-source-json-safe
```

## Required save reconciliation rows

```txt
empty-save-initializes
current-save-accepted
malformed-json-reset
wrong-clues-type-repaired
wrong-inspected-type-repaired
wrong-route-type-repaired
unknown-scene-id-repaired-and-persisted
unknown-hotspot-ids-removed
unknown-clue-ids-removed
route-rebuilt-as-valid-prefix
clues-derived-from-inspections
stale-source-migrated-or-reset
future-schema-rejected
repair-rows-json-safe
canonical-state-fingerprint-stable
```

## Required command rows

```txt
side-panel-command-accepted
raycast-command-accepted
input-origin-retained
repeated-inspection-result
unknown-scene-rejected
wrong-active-scene-rejected
unknown-hotspot-rejected
stale-source-command-rejected
descriptor-object-not-required
before-after-fingerprints-recorded
command-result-json-safe
```

## Required completion rows

```txt
incomplete-before-required-inspections
complete-after-canonical-inspections
injected-clue-does-not-complete
unknown-inspection-does-not-complete
one-completion-proof-per-scene
completion-proof-source-correlated
interlude-effect-command-correlated
stale-interlude-effect-rejected
terminal-state-round-trips
```

## Required render identity rows

```txt
persisted-scene-id-canonical
resolved-scene-id-canonical
stage-load-source-fingerprint-present
hotspot-mesh-stores-canonical-ref
pick-result-source-correlated
rendered-scene-matches-save-scene
fallback-repair-visible-in-diagnostics
atomic-stage-commit-plan-preserved
```

## Browser smoke after fixtures

```txt
load a clean save
load and repair a corrupted save
inspect with both input origins
complete each scene through canonical commands
open exactly one interlude per scene
advance through all three scenes
reload and preserve canonical state
finish and reload terminal state
reset to the clean source-derived initial state
confirm current visuals, copy, route and pacing remain unchanged
```
