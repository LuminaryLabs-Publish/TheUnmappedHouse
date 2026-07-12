# Project breakdown: The Unmapped House

Timestamp: `2026-07-12T00-01-25-04-00`

## Summary

Selected `LuminaryLabs-Publish/TheUnmappedHouse` as the oldest eligible Publish repository after comparing all ten accessible repositories with the central ledger. This pass isolates a narrative projection defect: changing scenes updates the title, stage, hotspots, route and save, but can leave the previous scene's hotspot text visible under the new scene title.

## Plan ledger

**Goal:** make scene opening text, hotspot copy, completion copy and terminal copy one authoritative projection that cannot outlive its scene or disagree with the visible stage.

- [x] Compare the full `LuminaryLabs-Publish` repository list with `LuminaryLabs-Dev/LuminaryLabs` tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Select only `TheUnmappedHouse` under the oldest documented-selection rule.
- [x] Trace boot, inspection, completion, Continue, terminal and reload narrative-copy behavior.
- [x] Identify the interaction loop, active domains, all 24 implemented kits and all services.
- [x] Define a Narrative Projection Authority and executable fixture gate.
- [x] Add timestamped architecture, render, gameplay, interaction, narrative and deploy audits.
- [x] Refresh required root `.agent` files.
- [x] Push only to `main` with no branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement the runtime authority and execute the fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0

TheUnmappedHouse   2026-07-11T21-48-44-04-00 selected
AetherVale         2026-07-11T22-02-01-04-00
MyCozyIsland       2026-07-11T22-20-00-04-00
PrehistoricRush    2026-07-11T22-38-54-04-00
TheOpenAbove       2026-07-11T22-58-50-04-00
IntoTheMeadow      2026-07-11T23-10-51-04-00
HorrorCorridor     2026-07-11T23-18-16-04-00
PhantomCommand     2026-07-11T23-28-29-04-00
ZombieOrchard      2026-07-11T23-48-14-04-00
TheCavalryOfRome   excluded
```

## Main finding

`#scene-text` is both a visual output and an implicit state flag. `renderUi()` writes the current scene opening only when the element is empty or equals `Loading`. Inspection writes hotspot copy directly into the element. `nextScene()` then changes `currentScene`, loads the new stage and calls `renderUi()`, but the old hotspot copy is neither cleared nor replaced.

Concrete sequence:

```txt
inspect final hotspot in scene A
  -> #scene-text = scene A hotspot text
  -> completion interlude opens

Continue
  -> currentScene = scene B
  -> title = scene B title
  -> stage = scene B stage
  -> hotspot buttons = scene B hotspots
  -> route and save = scene B
  -> #scene-text remains scene A hotspot text
```

The DOM therefore becomes ambient narrative authority and can contradict the current story, stage and save.

## Required parent domain

```txt
the-unmapped-house-narrative-projection-authority-domain
```

## Required proof

```txt
scene transition always commits the successor opening copy
prior-scene hotspot copy never survives a scene change
DOM text is a pure projection, never an authority input
projection cites scene id, source kind, source id and revision
reload behavior follows an explicit persistence policy
terminal copy has a durable terminal projection
story panel and visible stage acknowledge one scene revision
aria-live output announces only committed projections
```

## Output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/turn-ledger/2026-07-12T00-01-25-04-00.md
.agent/architecture-audit/2026-07-12T00-01-25-04-00-narrative-projection-authority-dsk-map.md
.agent/render-audit/2026-07-12T00-01-25-04-00-scene-copy-visible-stage-correlation-gap.md
.agent/gameplay-audit/2026-07-12T00-01-25-04-00-inspect-interlude-continue-copy-loop.md
.agent/interaction-audit/2026-07-12T00-01-25-04-00-narrative-source-command-result-map.md
.agent/narrative-projection-audit/2026-07-12T00-01-25-04-00-scene-copy-revision-persistence-contract.md
.agent/deploy-audit/2026-07-12T00-01-25-04-00-narrative-transition-fixture-gate.md
```

## Central records

```txt
repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md
internal-change-log/2026-07-12T00-01-25-04-00-the-unmapped-house-narrative-projection-authority.md
```

## Validation

Documentation only. Runtime source, rendering, dependencies, package scripts and deployment configuration were not changed. The current package check is syntax-only, and no narrative transition fixture or browser smoke was executed in this pass.
