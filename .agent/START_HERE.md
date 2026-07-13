# START HERE: The Unmapped House renderer-provider central reconciliation

**Last updated:** `2026-07-13T04-47-00-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`  
**Branch:** `main`  
**Status:** `render-provider-admission-authority-central-reconciled`  
**Retained statuses:** `render-provider-admission-authority-audited`, `hotspot-input-picking-authority-central-reconciled`, `browser-save-commit-reset-convergence-authority-audited`, `interlude-progression-admission-authority-audited`, `stage-resource-lifecycle-authority-audited`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, browser persistence, a fixed 16:9 shell, a visible Notebook and a descriptor-driven Three.js stage.

The current audit isolates renderer-provider boot admission. `src/stage-kit.js` imports Three.js `0.160.0` directly from unpkg, and `src/game.js` statically imports StageKit. A provider fetch, policy, integrity, MIME or API-contract failure can therefore reject the module graph before story boot can replace the static `Loading` state or publish a typed failure. The repository has no provider manifest, repository-owned artifact, content fingerprint, fallback policy, timeout result, API-contract probe, provider-independent failure UI or first provider-backed visible-frame receipt.

## Plan ledger

**Goal:** keep repo-local and central documentation synchronized while defining one explicit provider-admission boundary before StageKit construction or story interaction.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked and root-documented.
- [x] Detect `TheUnmappedHouse` repo-local documentation newer than central tracking.
- [x] Select and modify only `TheUnmappedHouse`.
- [x] Trace HTML boot, static imports, remote Three.js resolution, stage construction, story interaction, validation and Pages deployment.
- [x] Preserve the complete 24-kit and service inventory.
- [x] Preserve the 25-kit renderer-provider authority proposal.
- [x] Add the `2026-07-13T04-47-00-04-00` reconciliation family.
- [x] Refresh required root `.agent` files and machine state.
- [x] Synchronize `LuminaryLabs-Dev/LuminaryLabs` on `main`.
- [x] Create no branch or pull request.
- [ ] Implement provider admission and source, build, browser and Pages fixtures.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local-newer-than-central repositories: 1

TheUnmappedHouse   central 2026-07-13T01-49-49-04-00
                   local   2026-07-13T04-29-43-04-00 selected
AetherVale         central 2026-07-13T02-15-51-04-00
TheOpenAbove       central 2026-07-13T02-18-03-04-00
IntoTheMeadow      central 2026-07-13T02-39-44-04-00
PhantomCommand     central 2026-07-13T02-49-07-04-00
PrehistoricRush    central 2026-07-13T03-20-58-04-00
HorrorCorridor     central 2026-07-13T03-38-31-04-00
ZombieOrchard      central 2026-07-13T03-59-28-04-00
MyCozyIsland       central 2026-07-13T04-21-10-04-00
TheCavalryOfRome   excluded
```

## Active boot and interaction loop

```txt
index.html paints shell and Loading
  -> browser requests src/game.js
  -> game.js statically imports StageKit
  -> StageKit statically imports Three.js from unpkg
  -> accepted module graph constructs stage and starts story
  -> pointer or side-panel inspection advances clues and interludes

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
content fingerprint and integrity admission: absent
required Three.js contract probe: absent
timeout and cancellation result: absent
approved fallback: absent
renderer boot phase and terminal result: absent
provider-independent failure UI: absent
first provider-backed frame acknowledgement: absent
source, build and Pages provider fixtures: absent
```

This is a source-derived control and proof gap. No current outage or compromised provider artifact was observed.

## Required authority

```txt
the-unmapped-house-render-provider-admission-authority-domain
```

It must own approved provider sources, immutable manifests, version and content fingerprints, integrity and API-contract admission, bounded acquisition, fallback selection, typed boot results, StageKit construction gating, provider-independent recovery projection, bounded evidence and first provider-backed visible-frame acknowledgement.

## Read this run first

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-13T04-47-00-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-13T04-47-00-04-00-render-provider-central-reconciliation-dsk-map.md`
5. `render-provider-audit/2026-07-13T04-47-00-04-00-provider-manifest-integrity-central-reconciliation-contract.md`
6. `interaction-audit/2026-07-13T04-47-00-04-00-provider-command-result-central-reconciliation-map.md`
7. `gameplay-audit/2026-07-13T04-47-00-04-00-provider-failure-story-central-reconciliation.md`
8. `render-audit/2026-07-13T04-47-00-04-00-provider-visible-boot-central-reconciliation-gap.md`
9. `deploy-audit/2026-07-13T04-47-00-04-00-provider-fixture-central-reconciliation-gate.md`
10. `central-sync-audit/2026-07-13T04-47-00-04-00-repo-ledger-render-provider-reconciliation.md`
11. `next-steps.md`
12. `validation.md`

## Next safe ledge

Prefer a repository-owned or deterministic build-vendored Three.js artifact with a machine-checkable fingerprint. Add a provider-independent bootstrap surface and typed `RenderProviderResult` before changing stage or story behavior.