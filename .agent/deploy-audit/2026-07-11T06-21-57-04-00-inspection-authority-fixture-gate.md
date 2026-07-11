# Deploy audit: inspection authority fixture gate

Timestamp: `2026-07-11T06-21-57-04-00`

## Current gate

`npm run check` syntax-checks the four JavaScript source files. Static Pages deployment can therefore succeed while inspection admission, scene ownership, clue provenance, duplicate handling and rendered-stage correlation are broken.

## Required scripts

```txt
scripts/validate-story-manifest.mjs
scripts/validate-hotspot-index.mjs
scripts/validate-inspection-admission.mjs
scripts/validate-clue-provenance.mjs
scripts/validate-scene-completion-proof.mjs
scripts/validate-dual-ingress-idempotency.mjs
scripts/validate-hotspot-stage-epoch.mjs
scripts/validate-inspection-reload.mjs
```

## Required pure fixture rows

```txt
manifest-has-three-scenes-nine-hotspots-nine-owned-clues
all-required-clues-are-granted-by-same-scene-hotspots
unknown-scene-rejected
unknown-hotspot-rejected
cross-scene-hotspot-rejected
caller-grants-ignored
stale-story-revision-rejected
stale-stage-epoch-rejected
same-command-idempotent
side-panel-raycast-same-hotspot-idempotent
final-hotspot-creates-one-completion-proof
interlude-scheduled-once
reconciled-save-drops-orphaned-clues
journal-json-safe-and-bounded
```

## Browser smoke rows

```txt
click each hotspot from side panel
reset and click each hotspot through canvas
rapid-double-click final hotspot
activate side panel and canvas for same hotspot in one frame
hold an old button reference across Continue and invoke it
attempt old-stage pick after stage replacement
reload after every accepted inspection
verify one clue receipt, one checkmark and one notebook result per first inspection
verify current story text, visuals and 450 ms pacing remain unchanged
```

## Workflow order

```txt
npm install
npm run check:syntax
npm run check:story-manifest
npm run check:inspection
npm run check:transition
npm run build
artifact validation
Pages upload
```

## Gate rule

Do not deploy a runtime implementation of inspection authority until stale, forged, duplicate and dual-ingress cases execute deterministically in Node and the browser smoke proves scene/stage correlation.
