# Validation: The Unmapped House scene-entry narrative audit

**Timestamp:** `2026-07-16T16-58-39-04-00`  
**Scope:** documentation-only architecture, interaction, gameplay, render, narrative-projection and deployment audit

## Summary

Source and retained audit state were inspected. The audit establishes that ordinary scene advancement can leave predecessor hotspot copy in the story paragraph while successor scene identity, stage, title, hotspot list and save are accepted. No runtime source was changed and no executable browser proof was run.

## Plan ledger

**Goal:** state exactly what this audit proves and what remains unverified.

- [x] Compare all 11 accessible Publish repositories.
- [x] Exclude TheCavalryOfRome and account for ten eligible repositories.
- [x] Confirm all ten eligible repositories have central ledgers and root `.agent` state.
- [x] Confirm TheUnmappedHouse is the oldest synchronized eligible entry.
- [x] Verify the selected repository documentation head before writing.
- [x] Inspect `index.html`, `src/game.js`, `src/stage-kit.js`, `src/story-data.js`, `src/aspect-frame.js`, `package.json` and the kit registry.
- [x] Confirm inspection writes non-empty hotspot copy into `scene-text`.
- [x] Confirm `nextScene()` adopts the successor before UI projection.
- [x] Confirm `renderUi()` applies opening copy only to empty or `Loading` text.
- [x] Preserve all 24 implemented kit surfaces and services.
- [x] Change documentation only.
- [ ] Run executable interaction and deployment fixtures after implementation.

## Source facts established

```txt
scene count: 3
hotspot count: 9
inspection copy assignment: direct hotspot.text
scene transition: currentScene and stage adopted before renderUi
opening copy condition: scene-text empty or exactly Loading
ordinary predecessor copy state: non-empty
successor openingText projection: skipped in uninterrupted progression
successor title projection: performed
successor hotspot-list projection: performed
successor stage projection: performed
successor save state: performed
SceneEntryNarrativeResult: absent
FirstSceneEntryFrameAck: absent
package validation: syntax-only
browser reproduction executed: no
```

## Documentation changed

```txt
new timestamped tracker and turn ledger
new architecture audit
new render audit
new gameplay audit
new interaction audit
new narrative-projection contract audit
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
stage rendering: no
hotspot behavior: no
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
scene 1 -> scene 2 browser fixture: unavailable
scene 2 -> scene 3 browser fixture: unavailable
same-scene refresh fixture: unavailable
reload/resume policy fixture: unavailable
stale narrative fixture: unavailable
production-artifact smoke: not run
Pages smoke: not run
```

No runtime fix, narrative convergence, reload/resume correctness, frame acknowledgement, artifact parity, Pages parity or production readiness is claimed.