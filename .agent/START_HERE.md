# START HERE: The Unmapped House

Last updated: `2026-07-12T00-01-25-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, browser persistence, a fixed 16:9 shell and a descriptor-driven Three.js stage.

The current audit isolates Narrative Projection Authority. The runtime stores story-panel copy in DOM elements instead of authoritative state. After the player inspects the final hotspot and presses Continue, the successor title, stage, hotspot buttons, route and save can update while the predecessor hotspot text remains visible.

## Plan ledger

**Goal:** make scene opening, hotspot, completion and terminal copy one typed, revisioned projection that cannot disagree with the current story or visible stage.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Select only `TheUnmappedHouse` as the oldest eligible repository.
- [x] Trace boot, inspection, completion, Continue, terminal and reload narrative behavior.
- [x] Identify all active domains, all 24 implemented kits and their services.
- [x] Define Narrative Projection Authority, persistence policy, DOM adapter and frame acknowledgement boundaries.
- [x] Add timestamped architecture, render, gameplay, interaction, narrative and deploy audits.
- [x] Push only to `main`; create no branch or pull request.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement the authority and execute the documented fixtures.

## Read this first

```txt
.agent/trackers/2026-07-12T00-01-25-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Current audit set

```txt
.agent/architecture-audit/2026-07-12T00-01-25-04-00-narrative-projection-authority-dsk-map.md
.agent/render-audit/2026-07-12T00-01-25-04-00-scene-copy-visible-stage-correlation-gap.md
.agent/gameplay-audit/2026-07-12T00-01-25-04-00-inspect-interlude-continue-copy-loop.md
.agent/interaction-audit/2026-07-12T00-01-25-04-00-narrative-source-command-result-map.md
.agent/narrative-projection-audit/2026-07-12T00-01-25-04-00-scene-copy-revision-persistence-contract.md
.agent/deploy-audit/2026-07-12T00-01-25-04-00-narrative-transition-fixture-gate.md
```

## Main finding

```txt
inspect final hotspot in scene A
  -> #scene-text = scene A hotspot text
  -> completion interlude opens

Continue
  -> currentScene = scene B
  -> title = scene B
  -> Three.js stage = scene B
  -> hotspot buttons = scene B
  -> route and save = scene B
  -> #scene-text remains scene A hotspot text
```

`renderUi()` only writes the current opening text when the DOM body is empty or equals `Loading`. The DOM is therefore both output and hidden control state.

## Required parent domain

```txt
the-unmapped-house-narrative-projection-authority-domain
```

Required composition:

```txt
narrative-source-kind-kit
narrative-source-id-kit
narrative-projection-state-kit
narrative-projection-revision-kit
scene-opening-projection-kit
hotspot-copy-projection-kit
completion-copy-projection-kit
terminal-copy-projection-kit
narrative-projection-admission-kit
narrative-projection-commit-kit
narrative-projection-result-kit
narrative-persistence-policy-kit
scene-transition-narrative-reset-kit
narrative-dom-adapter-kit
narrative-aria-live-adapter-kit
narrative-frame-acknowledgement-kit
narrative-observation-kit
narrative-journal-kit
narrative-projection-fixture-kit
transition-copy-parity-fixture-kit
```

## Required invariant

```txt
DOM text is output only.
Every committed narrative projection cites one scene, source, story revision and projection revision.
Continue replaces predecessor copy with successor opening copy before the successor becomes ready.
The first visible successor frame acknowledges matching story, narrative, stage and hotspot-set revisions.
Reload behavior follows one explicit persistence policy.
```

## Dependency order

```txt
1. StoryManifest Authority
2. StorySnapshot startup admission and typed persistence
3. Pointer Observation and Hotspot Pick Authority
4. Inspection and scene-completion proof
5. Atomic Continue transition
6. Narrative Projection Authority
7. Runtime session lifecycle and scene-resource retirement
8. Render Surface Resolution Authority
9. WebGL Context Recovery Authority
10. Committed-frame diagnostics
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
narrative projection fixtures: unavailable
transition copy parity fixture: unavailable
```

Do not claim narrative transition correctness until a fixture proves that predecessor copy is retired and successor opening copy appears in the first correlated successor frame.
