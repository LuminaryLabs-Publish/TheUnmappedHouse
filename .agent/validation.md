# Validation: The Unmapped House render-surface viewport audit

**Timestamp:** `2026-07-13T14-58-07-04-00`  
**Scope:** documentation-only viewport audit

## Summary

Source and existing audit state were inspected. A new tracker and viewport audit family were added, root `.agent` routing was refreshed and the machine registry was updated. Runtime behavior and deployment were not changed or executed.

## Plan ledger

**Goal:** state exactly what this audit proves and what remains unverified.

- [x] Verify CSS and JavaScript both write the fixed-aspect frame.
- [x] Verify JavaScript measures global window dimensions rather than the actual host.
- [x] Verify zero dimensions clamp to one.
- [x] Verify DPR is capped but total pixel and GPU dimension policies are absent.
- [x] Verify DOM, renderer, render target and camera mutate sequentially.
- [x] Verify no viewport identity, participant receipts, rollback result or first-frame acknowledgement exists.
- [x] Preserve all 24 implemented kit surfaces and services.
- [x] Generate valid machine audit state.
- [x] Change documentation only.
- [ ] Run executable viewport fixtures after implementation.

## Source checks performed

```txt
full LuminaryLabs-Publish repository inventory compared
all nine eligible central ledger entries reviewed
root .agent state confirmed for the selected repository
index.html inspected
src/styles.css inspected
src/aspect-frame.js inspected
src/game.js inspected
src/stage-kit.js inspected
src/story-data.js inspected
package.json inspected
Pages workflow inspected
existing root .agent files inspected
```

## Source facts established

```txt
CSS owns a vw/vh fixed-aspect policy
JavaScript overwrites frame left top width and height
resize samples innerWidth innerHeight and devicePixelRatio
computeAspectFrame clamps each dimension to at least one
renderer size and target size update sequentially
camera projection updates without a viewport revision
no total-pixel budget or GPU dimension admission exists
no detached participant preparation or atomic adoption exists
no rollback result exists
pointer picks carry no committed viewport revision
no first viewport frame acknowledgement exists
```

## Documentation changed

```txt
new tracker and turn-ledger entry
new architecture audit
new render audit
new gameplay audit
new interaction audit
new viewport contract audit
new deploy fixture gate
new central-sync audit
START_HERE.md refreshed
current-audit.md refreshed
next-steps.md refreshed
known-gaps.md refreshed
validation.md refreshed
kit-registry.json refreshed
```

## Not changed

```txt
runtime JavaScript: no
HTML or CSS: no
story descriptors: no
Three.js provider: no
WebGL rendering: no
browser persistence behavior: no
package scripts: no
dependencies: no
Pages workflow: no
```

## Not executed

```txt
npm run check: not run
browser viewport smoke: not run
zero-size fixture: unavailable
DPR and pixel-budget fixtures: unavailable
allocation failure fixture: unavailable
rollback fixture: unavailable
pointer-correlation fixture: unavailable
built-output smoke: not run
Pages viewport smoke: not run
```

## Required future proof

```txt
actual host box is the measurement authority
zero-size surfaces defer without allocation
DPR and GPU allocation stay within explicit budgets
all participants prepare before live mutation
failed preparation preserves the complete predecessor set
accepted transition commits every participant together
adoption failure rolls back every participant
stale and superseded commands mutate nothing
pointer picks cite the committed viewport revision
first visible frame cites accepted viewport provenance
browser build and Pages matrices pass
```

No claim is made that bounded allocation, atomic viewport adoption, rollback, pointer correlation or visible-frame proof is implemented.
