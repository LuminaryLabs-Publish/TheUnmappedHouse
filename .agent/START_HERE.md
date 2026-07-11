# START HERE: The Unmapped House

Last updated: `2026-07-11T12-08-47-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, nine required clues, browser persistence, and a descriptor-driven Three.js stage.

The current audit isolates the inspection and completion boundary. Both the side-panel and raycast paths pass full hotspot descriptor objects into `inspectHotspot()`. The runtime trusts caller-supplied ids, clue grants, labels, and copy; applies them under whichever scene is current when the callback executes; derives completion from global clue strings; and returns no typed receipt. A stale scene-one descriptor can therefore be recorded under scene two, and forged or migrated clue strings can satisfy completion without canonical inspection proof.

## Plan ledger

**Goal:** make every inspection a scene-scoped, revision-fenced command resolved from a canonical hotspot index, with exactly-once clue grants, explicit completion proof, typed results, and shared behavior across side-panel, raycast, replay, and future automation ingress.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only `TheUnmappedHouse` under the oldest current repo-local audit rule.
- [x] Trace side-panel and raycast ingress through story mutation, completion, timeout, DOM projection, and persistence.
- [x] Identify the interaction loop, current domains, missing authority domains, kits, and services.
- [x] Define the inspection-command and completion-proof DSK boundary.
- [x] Add timestamped architecture, render, gameplay, interaction, inspection-authority, deploy, tracker, and turn-ledger records.
- [x] Refresh all required root `.agent` state.
- [x] Change no runtime source.
- [x] Push only to `main` and create no branch or pull request.
- [ ] Implement StoryManifest admission, inspection authority, and executable fixtures.

## Read this first

```txt
.agent/trackers/2026-07-11T12-08-47-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Current audit set

```txt
.agent/architecture-audit/2026-07-11T12-08-47-04-00-inspection-completion-authority-dsk-map.md
.agent/render-audit/2026-07-11T12-08-47-04-00-hotspot-hit-story-revision-provenance-gap.md
.agent/gameplay-audit/2026-07-11T12-08-47-04-00-inspect-grant-complete-interlude-loop.md
.agent/interaction-audit/2026-07-11T12-08-47-04-00-side-panel-raycast-command-admission-map.md
.agent/inspection-authority-audit/2026-07-11T12-08-47-04-00-canonical-hotspot-completion-proof-contract.md
.agent/deploy-audit/2026-07-11T12-08-47-04-00-inspection-completion-fixture-gate.md
```

## Main finding

```txt
side-panel button or raycast hit
  -> full mutable hotspot descriptor
  -> inspectHotspot(hotspot)
  -> use currentScene at callback time
  -> trust hotspot.id, grants, label, text, and changesText
  -> mutate scene-keyed inspection and global clues
  -> derive completion from global clue strings
  -> schedule an uncorrelated 450 ms interlude callback
  -> mutate DOM and save raw state
  -> return no command or result receipt
```

The authority gap is not that the two visible inputs differ today. The gap is that neither input produces a canonical command, neither is admitted against scene/story/stage identity, and both can mutate through a descriptor that is stale, forged, or no longer owned by the current stage.

## Required next parent domain

```txt
the-unmapped-house-inspection-completion-authority-domain
```

Required composition:

```txt
hotspot-manifest-index-kit
inspection-command-envelope-kit
inspection-command-admission-kit
hotspot-pick-observation-kit
canonical-hotspot-resolution-kit
inspection-result-kit
scene-scoped-inspection-ledger-kit
scene-scoped-clue-grant-kit
scene-completion-proof-kit
inspection-transaction-kit
inspection-journal-kit
inspection-authority-fixture-kit
browser-dual-ingress-parity-smoke-kit
```

## Dependency order

```txt
1. Versioned StoryManifest and canonical hotspot/clue indexes
2. StorySnapshot and save admission/migration/reconciliation
3. Inspection Command Authority and scene completion proof
4. Atomic Continue transition and first-frame acknowledgement
5. Runtime session lifecycle and resource retirement
6. Committed-frame diagnostics
```

## Validation status

```txt
runtime source changed: no
rendering changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run; GitHub was unavailable from the local execution container
browser smoke: not run
inspection fixture: unavailable
completion-proof fixture: unavailable
dual-ingress parity smoke: unavailable
```
