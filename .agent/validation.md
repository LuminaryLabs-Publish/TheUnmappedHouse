# Validation: The Unmapped House interlude focus and route audit

**Timestamp:** `2026-07-14T17-00-55-04-00`  
**Scope:** documentation-only interaction, accessibility and route-admission audit

## Summary

Source and retained audit state were inspected. The audit proves that the hidden Continue control remains keyboard-focusable, route advancement lacks a completion guard, and open interludes do not own modal focus or background inertness. Runtime behavior and deployment were not changed or executed.

## Plan ledger

**Goal:** state exactly what this audit proves and what remains unverified.

- [x] Compare all 11 accessible Publish repositories.
- [x] Review ten eligible central ledger timestamps and documentation heads.
- [x] Confirm all eligible current heads match their recorded documentation heads.
- [x] Select only TheUnmappedHouse by the oldest synchronized timestamp.
- [x] Verify the closed interlude uses opacity and pointer-events rather than hidden/inert state.
- [x] Verify Continue remains an enabled button inside the visually hidden interlude.
- [x] Verify `nextScene()` does not assert scene completion or active interlude state.
- [x] Verify the open interlude does not move focus or inert background controls.
- [x] Verify no dialog role, `aria-modal`, focus restoration or focus-stable frame acknowledgement exists.
- [x] Preserve all 24 implemented kit surfaces and services.
- [x] Change documentation only.
- [ ] Run executable browser and accessibility fixtures after implementation.

## Source checks performed

```txt
full 11-repository LuminaryLabs-Publish inventory compared
ten eligible central ledger records reviewed
ten eligible repository heads compared with documentation heads
.agent/START_HERE.md inspected
.agent/kit-registry.json inspected
index.html inspected
src/styles.css inspected
src/game.js inspected
src/story-data.js inspected
src/stage-kit.js inspected
```

## Source facts established

```txt
interlude closed state uses opacity: 0 and pointer-events: none
aria-hidden alone does not remove Continue from tab order
Continue is not disabled or assigned tabindex=-1 while hidden
Continue click always calls nextScene
nextScene does not call sceneComplete
all three authored scenes require three clues
open interlude has no role=dialog or aria-modal
background hotspot controls are not inert
focus is not transferred on open or restored on close
canvas/background command rejection results are absent
validation is syntax-only
```

## Documentation changed

```txt
new timestamped tracker and turn ledger
new architecture audit
new render audit
new gameplay audit
new interaction audit
new accessibility contract audit
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
persistence behavior: no
render behavior: no
package scripts: no
dependencies: no
workflow or deployment: no
branch: main only
pull request: none
```

## Not executed

```txt
npm run check: not run
keyboard-only fixture: unavailable
screen-reader fixture: unavailable
premature Continue fixture: unavailable
modal focus-containment fixture: unavailable
background-command rejection fixture: unavailable
focus-restoration fixture: unavailable
production-artifact smoke: not run
Pages focus/route smoke: not run
```

## Required future proof

```txt
hidden Continue is absent from focus and command admission
premature and stale Continue commands produce typed rejection results
open interlude has semantic modal state and inert background controls
focus moves to Continue and remains contained
canvas and hotspot commands are rejected while modal state is active
route advancement requires matching completion evidence
successor scene, stage and focus settle atomically
first focus-stable successor frame is acknowledged
source, production artifact and Pages matrices pass
```

No claim is made that route bypass prevention, modal accessibility, background inertness, focus restoration, visible-frame convergence or production readiness is implemented.