# Deploy audit: Narrative transition fixture gate

Timestamp: `2026-07-12T00-01-25-04-00`

## Current deployment proof

The repository can be syntax-checked and served as static files. No existing fixture executes the story loop or verifies title, body, stage and hotspot-list coherence across Continue.

## Required local commands

```txt
node scripts/validate-narrative-projection.mjs
node scripts/validate-narrative-transition-parity.mjs
npm run check
```

Recommended aggregate:

```txt
npm run validate:narrative
```

## Required headless fixture rows

```txt
boot-initial-scene-opening-copy
inspect-hotspot-copy
reinspect-hotspot-copy
completion-interlude-copy
continue-successor-opening-copy
predecessor-copy-retired
successor-title-body-stage-parity
successor-hotspot-list-parity
terminal-copy-durable
reload-policy-deterministic
stale-projection-rejected
duplicate-projection-idempotent
observation-detached
journal-bounded
```

## Browser smoke

```txt
clear storage
open the deployed route
capture scene A title and opening body
inspect all scene A hotspots
wait for the completion interlude
press Continue
capture the first scene B frame
verify scene B title, opening body, stage and hotspot list agree
repeat for scene C and terminal projection
reload each saved scene and verify the declared narrative persistence policy
```

## Required evidence

```txt
commit SHA
Pages URL
browser and viewport
manifest fingerprint
snapshot revision
story revision
scene id
narrative projection id and revision
narrative source kind and source id
stage revision
hotspot-set revision
visible frame id
fixture result artifact
```

## Gate

Do not claim narrative transition correctness until the first successor frame proves that predecessor hotspot copy has been retired and successor opening copy is visible with the successor stage.
