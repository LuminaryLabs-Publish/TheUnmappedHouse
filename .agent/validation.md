# Validation: The Unmapped House inspection control focus audit

**Timestamp:** `2026-07-15T08-28-25-04-00`  
**Scope:** documentation-only interaction, accessibility and UI-projection audit

## Summary

Source and retained audit state were inspected. The audit proves that every first-time or repeated DOM hotspot inspection calls `renderUi()`, which removes the focused control by clearing the complete hotspot list and creates replacement buttons without stable identity or focus settlement. Runtime behavior and deployment were not changed or executed.

## Plan ledger

**Goal:** state exactly what this audit proves and what remains unverified.

- [x] Compare all 11 accessible Publish repositories.
- [x] Review ten eligible central ledger timestamps.
- [x] Confirm TheUnmappedHouse is the oldest synchronized eligible entry.
- [x] Verify the root `.agent` state exists and matches the documented head.
- [x] Verify DOM and canvas inspection converge on `inspectHotspot()`.
- [x] Verify first-time and repeated paths call `renderUi()`.
- [x] Verify `renderUi()` clears and recreates all hotspot buttons.
- [x] Verify no stable control-list or focus result exists.
- [x] Preserve all 24 implemented kit surfaces and services.
- [x] Change documentation only.
- [ ] Run executable keyboard, artifact and Pages fixtures after implementation.

## Source checks performed

```txt
full 11-repository LuminaryLabs-Publish inventory compared
ten eligible central ledger records reviewed
chosen repository head compared with documented head
root .agent state inspected
index.html inspected
src/game.js inspected
src/stage-kit.js inspected
package.json inspected
retained kit registry inspected
```

## Source facts established

```txt
semantic hotspot button list exists: yes
DOM button activation dispatches inspectHotspot: yes
canvas raycast dispatches inspectHotspot: yes
first inspection calls renderUi: yes
repeated inspection calls renderUi: yes
renderUi clears hotspotList.textContent: yes
renderUi creates new button elements: yes
stable DOM HotspotControlId: absent
control-list revision: absent
active-control capture: absent
focus retention or fallback: absent
FirstFocusStableInspectionFrameAck: absent
validation command: syntax-only
```

## Documentation changed

```txt
new timestamped tracker and turn ledger
new architecture audit
new render audit
new gameplay audit
new interaction audit
new inspection-control contract audit
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
keyboard-only browser fixture: unavailable
repeat-inspection focus fixture: unavailable
scene-transition focus fixture: unavailable
first focus-stable frame fixture: unavailable
production-artifact smoke: not run
Pages keyboard-focus smoke: not run
```

No stable control projection, focus continuity, scene-transfer correctness, browser-frame acknowledgement, artifact parity or production readiness is claimed.