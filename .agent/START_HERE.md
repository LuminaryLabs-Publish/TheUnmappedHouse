# START HERE: The Unmapped House

Last updated: `2026-07-11T13-49-30-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, browser persistence, a fixed 16:9 shell, and a descriptor-driven Three.js stage.

The current audit isolates the Continue transition boundary. `nextScene()` mutates live story identity before successor stage preparation and persistence complete. `StageKit.loadScene()` clears the live group and incrementally constructs the replacement without a detached prepare phase, typed result, rollback, stage epoch, or first-frame acknowledgement. Duplicate Continue commands can skip scenes, a failed stage load can leave story and render state split, and a failed save can leave the visible successor unpersisted.

## Plan ledger

**Goal:** make Continue consume one canonical scene-completion proof and commit story, stage, persistence, projection, resource retirement, and the first visible successor frame through one revision-fenced transaction.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only `TheUnmappedHouse` under the oldest eligible fallback rule.
- [x] Trace completion timeout, Continue admission, story mutation, stage replacement, DOM projection, persistence, terminal handling, and frame submission.
- [x] Identify the interaction loop, domains, kits, and services.
- [x] Define the atomic Continue transition DSK boundary and fixture gate.
- [x] Add timestamped architecture, render, gameplay, interaction, transition-authority, deploy, tracker, and turn-ledger records.
- [x] Refresh all required root `.agent` state.
- [x] Change no runtime source.
- [x] Push only to `main` and create no branch or pull request.
- [ ] Implement the prerequisite StoryManifest, StorySnapshot, inspection proof, and transition authority.

## Read this first

```txt
.agent/trackers/2026-07-11T13-49-30-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Current audit set

```txt
.agent/architecture-audit/2026-07-11T13-49-30-04-00-atomic-continue-transition-dsk-map.md
.agent/render-audit/2026-07-11T13-49-30-04-00-successor-stage-first-frame-provenance-gap.md
.agent/gameplay-audit/2026-07-11T13-49-30-04-00-complete-interlude-continue-scene-loop.md
.agent/interaction-audit/2026-07-11T13-49-30-04-00-continue-proof-admission-result-map.md
.agent/scene-transition-audit/2026-07-11T13-49-30-04-00-story-stage-persistence-atomicity-contract.md
.agent/deploy-audit/2026-07-11T13-49-30-04-00-continue-rollback-first-frame-fixture-gate.md
```

## Main finding

```txt
completion
  -> anonymous 450 ms timeout reads mutable currentScene later
  -> interlude opens without proof identity

Continue
  -> no completion-proof admission
  -> currentScene and StorySnapshot mutate first
  -> live stage group is cleared
  -> successor resources are built incrementally
  -> UI is projected
  -> raw localStorage write happens last
  -> no rollback or first-frame receipt
```

The transition lacks a transition id, proof-consumption guard, candidate snapshot, detached successor stage, typed persistence result, atomic commit, rollback, stage epoch, predecessor retirement receipt, and visible-frame acknowledgement.

## Required next parent domain

```txt
the-unmapped-house-atomic-continue-transition-authority-domain
```

Required composition:

```txt
continue-command-envelope-kit
continue-admission-kit
completion-proof-consumption-kit
scene-transition-id-kit
scene-transition-plan-kit
successor-story-candidate-kit
detached-stage-preparation-kit
stage-preparation-result-kit
transition-persistence-kit
atomic-story-stage-commit-kit
transition-rollback-kit
stage-epoch-kit
predecessor-resource-retirement-kit
first-successor-frame-ack-kit
transition-result-kit
transition-journal-kit
continue-transition-fixture-kit
browser-transition-failure-smoke-kit
```

## Dependency order

```txt
1. Versioned StoryManifest and canonical indexes
2. StorySnapshot admission, migration, reconciliation, and typed persistence
3. Inspection Command Authority and scene-completion proof
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
npm run check: not run
browser smoke: not run
Continue transition fixtures: unavailable
rollback fixtures: unavailable
first-successor-frame fixture: unavailable
```