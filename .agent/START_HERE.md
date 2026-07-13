# START HERE: The Unmapped House renderer-provider admission authority

**Last updated:** `2026-07-13T04-29-43-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `render-provider-admission-authority-audited`  
**Retained statuses:** `hotspot-input-picking-authority-central-reconciled`, `browser-save-commit-reset-convergence-authority-audited`, `interlude-progression-admission-authority-audited`, `stage-resource-lifecycle-authority-audited`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, browser persistence, a fixed 16:9 shell, a visible Notebook and a descriptor-driven Three.js stage.

The current audit isolates renderer-provider boot admission. `src/stage-kit.js` imports Three.js `0.160.0` directly from unpkg, and `src/game.js` statically imports StageKit. A provider fetch, policy, integrity or contract failure therefore rejects the module graph before story boot can replace the static `Loading` state or publish a typed failure. The repository has no provider manifest, repository-owned artifact, content fingerprint, fallback policy, timeout result, API contract probe, provider-independent failure UI or first provider-backed visible-frame receipt.

## Plan ledger

**Goal:** make renderer-provider resolution an explicit, verified and observable boot transaction before StageKit construction or story interaction begins.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked and root-documented.
- [x] Confirm no repo-local audit is newer than central tracking.
- [x] Select only `TheUnmappedHouse`, the oldest eligible synchronized repository.
- [x] Trace HTML boot, static module evaluation, remote Three.js resolution, stage construction, syntax validation and Pages deployment.
- [x] Preserve the complete 24-kit and service inventory.
- [x] Define provider policy, identity, integrity, contract, fallback, result and visible-frame boundaries.
- [x] Add the timestamped tracker and architecture/system audit family.
- [x] Refresh all required root `.agent` files and machine state.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement provider admission and source/build/Pages fixtures.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local-newer-than-central repositories: 0

TheUnmappedHouse   2026-07-13T01-49-49-04-00 selected
AetherVale         2026-07-13T02-15-51-04-00
TheOpenAbove       2026-07-13T02-18-03-04-00
IntoTheMeadow      2026-07-13T02-39-44-04-00
PhantomCommand     2026-07-13T02-49-07-04-00
PrehistoricRush    2026-07-13T03-20-58-04-00
HorrorCorridor     2026-07-13T03-38-31-04-00
ZombieOrchard      2026-07-13T03-59-28-04-00
MyCozyIsland       2026-07-13T04-21-10-04-00
TheCavalryOfRome   excluded
```

## Active boot and interaction loop

```txt
index.html paints shell and Loading
  -> browser requests src/game.js
  -> game.js imports StageKit
  -> StageKit imports Three.js from unpkg
  -> accepted module graph constructs stage and starts story
  -> pointer/side-panel inspection advances clues and interludes

provider rejection
  -> game.js never evaluates
  -> no stage, story, Notebook or typed recovery state
  -> static Loading shell can remain
```

## Main finding

```txt
repository-owned provider artifact: absent
provider manifest and policy revision: absent
provider identity and generation: absent
content fingerprint/integrity admission: absent
required Three.js contract probe: absent
timeout/cancellation result: absent
approved fallback: absent
renderer boot phase/result: absent
provider-independent failure UI: absent
first provider-backed frame acknowledgement: absent
source/build/Pages provider fixtures: absent
```

This is a source-derived control and proof gap. No current outage or compromised provider artifact was observed.

## Required authority

```txt
the-unmapped-house-render-provider-admission-authority-domain
```

It must own approved provider sources, immutable manifests, version and content fingerprints, integrity and API-contract admission, bounded acquisition, fallback selection, typed boot results, stage-construction gating, provider-independent recovery projection, bounded evidence and first provider-backed visible-frame acknowledgement.

## Read this run first

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-13T04-29-43-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-13T04-29-43-04-00-render-provider-admission-dsk-map.md`
5. `render-provider-audit/2026-07-13T04-29-43-04-00-source-integrity-fallback-contract.md`
6. `interaction-audit/2026-07-13T04-29-43-04-00-provider-boot-result-admission-map.md`
7. `gameplay-audit/2026-07-13T04-29-43-04-00-provider-failure-before-story-loop.md`
8. `render-audit/2026-07-13T04-29-43-04-00-external-provider-blank-boot-visible-gap.md`
9. `deploy-audit/2026-07-13T04-29-43-04-00-render-provider-pages-fixture-gate.md`
10. `next-steps.md`
11. `validation.md`

## Next safe ledge

Prefer a repository-owned or build-vendored Three.js artifact with a deterministic fingerprint. Add a provider-independent bootstrap surface and typed `RenderProviderResult` before changing stage or story behavior.