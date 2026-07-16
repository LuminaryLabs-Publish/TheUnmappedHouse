# Validation: The Unmapped House hotspot availability audit

**Timestamp:** `2026-07-16T09-58-49-04-00`  
**Scope:** documentation-only architecture, interaction, gameplay, render, hotspot-availability and deployment audit

## Summary

Source and retained audit state were inspected. The audit establishes that DOM and canvas hotspot surfaces are derived directly from authored membership without one availability, discovery, visibility, occlusion, modal, parity or stale-generation result. No runtime interaction defect was reproduced and no executable proof was run.

## Plan ledger

**Goal:** state exactly what this audit proves and what remains unverified.

- [x] Compare all 11 accessible Publish repositories.
- [x] Exclude TheCavalryOfRome and account for ten eligible repositories.
- [x] Confirm all ten eligible repositories have central ledgers and root `.agent` state.
- [x] Confirm TheUnmappedHouse is the oldest synchronized eligible entry.
- [x] Verify the selected repository documentation head before writing.
- [x] Inspect `index.html`, `src/game.js`, `src/stage-kit.js`, `src/story-data.js`, `src/styles.css`, `package.json` and the kit registry.
- [x] Confirm every authored hotspot is directly listed and installed as a pick volume.
- [x] Confirm picking intersects hotspot volumes without scene-geometry occlusion.
- [x] Confirm no DOM/canvas parity result or hover-retirement result exists.
- [x] Preserve all 24 implemented kit surfaces and services.
- [x] Change documentation only.
- [ ] Run executable interaction and deployment fixtures after implementation.

## Source facts established

```txt
scene count: 3
hotspot count: 9
DOM list source: currentScene.hotspots
canvas volume source: sceneData.hotspots
raycast candidate set: this.hotspots only
discovery state: absent
visibility result: absent
occlusion policy/result: absent
interaction mode: absent
modal suspension result: absent
DOM/canvas parity result: absent
stale availability rejection: absent
scene-transition hover retirement: absent
FirstAvailableHotspotFrameAck: absent
package validation: syntax-only
current runtime defect reproduced: no
```

## Documentation changed

```txt
new timestamped tracker and turn ledger
new architecture audit
new render audit
new gameplay audit
new interaction audit
new hotspot-availability contract audit
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
authored story content: no
hotspot geometry or picking: no
focus behavior: no
persistence behavior: no
package scripts: no
dependencies: no
workflow or deployment: no
branch: main only
pull request: none
```

## Not executed

```txt
npm run check: not run
browser list/pick parity fixture: unavailable
hidden/clue-gated hotspot fixture: unavailable
occlusion fixture: unavailable
modal suspension fixture: unavailable
stale-hover fixture: unavailable
stale availability fixture: unavailable
production-artifact smoke: not run
Pages smoke: not run
```

No hotspot discovery correctness, occlusion correctness, interaction parity, modal safety, stale-generation safety, artifact parity, Pages parity or production readiness is claimed.