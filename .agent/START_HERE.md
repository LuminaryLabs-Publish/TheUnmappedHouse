# START HERE: The Unmapped House Notebook Observability Projection Authority

Last updated: `2026-07-12T15-08-07-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, browser persistence, a fixed 16:9 shell and a descriptor-driven Three.js stage.

The current audit isolates the player notebook and developer diagnostics boundary. The visible `Notebook` surface is a raw `JSON.stringify` projection of internal game, scene, clue, route, inspection, completion and log state. It is always mounted in the public page and has no build-channel gate, capability check, field classification, redaction profile, projection revision or visible-frame receipt.

## Plan ledger

**Goal:** preserve useful player notes and developer diagnostics while making each projection explicitly classified, channel-admitted, revisioned, redacted and visibly attributable to the story state that produced it.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheUnmappedHouse`, the oldest eligible synchronized repository.
- [x] Identify the complete interaction, notebook and render loop.
- [x] Identify all active domains.
- [x] Preserve all 24 implemented kits and their offered services.
- [x] Trace the visible notebook DOM, CSS, aggregate fields and projection calls.
- [x] Define notebook channel, classification, redaction, commit, observation and fixture contracts.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh all required root `.agent` files and machine registry.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime notebook/diagnostic separation and executable browser fixtures remain future work.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheUnmappedHouse   2026-07-12T13-08-15-04-00 selected
AetherVale         2026-07-12T13-20-00-04-00
TheOpenAbove       2026-07-12T13-29-56-04-00
IntoTheMeadow      2026-07-12T13-54-00-04-00
PhantomCommand     2026-07-12T13-59-50-04-00
PrehistoricRush    2026-07-12T14-10-22-04-00
HorrorCorridor     2026-07-12T14-30-36-04-00
ZombieOrchard      2026-07-12T14-38-35-04-00
MyCozyIsland       2026-07-12T14-59-01-04-00
TheCavalryOfRome   excluded
```

## Active notebook loop

```txt
boot
  -> load mutable story state
  -> renderUi()
  -> serialize internal aggregate fields
  -> write raw JSON into the visible Notebook surface

inspection
  -> mutate inspected map, clues, log and completion
  -> renderUi()
  -> replace the visible Notebook JSON
  -> save the same mutable aggregate

Continue
  -> mutate scene and route
  -> renderUi()
  -> replace the visible Notebook JSON
  -> publish no notebook projection result or frame acknowledgement
```

## Main finding

The player-facing page always contains:

```html
<section class="notes">
  <h2>Notebook</h2>
  <pre id="state-debug"></pre>
</section>
```

`renderUi()` then publishes:

```txt
game title
internal scene id
acquired clue ids
route ids
current-scene inspection booleans
exact completion boolean
recent log entries
```

The projection is useful for development, but it is neither a curated player notebook nor an admitted diagnostic surface. Internal IDs and aggregate shape are therefore part of the public UI contract by accident.

## Domains and kits

```txt
implemented kits: 24
planned notebook-observability authority kits: 21
```

Current domains cover browser hosting, story descriptors, persistence, progression, timers, modal and terminal projection, pointer and keyboard input, fixed-aspect layout, Three.js/WebGL rendering, diagnostics, syntax checks and Pages deployment.

## Required authority

```txt
the-unmapped-house-notebook-observability-projection-authority-domain
```

It must own player-versus-developer channel policy, build and capability admission, field classification, redaction profiles, player notebook entries, diagnostic projections, projection identity and revision, stale rejection, typed commit results, observations, bounded journals and first-visible-frame proof.

## Read order

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-12T15-08-07-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-12T15-08-07-04-00-notebook-observability-projection-dsk-map.md`
5. `notebook-observability-audit/2026-07-12T15-08-07-04-00-classification-redaction-projection-contract.md`
6. `render-audit/2026-07-12T15-08-07-04-00-raw-debug-json-visible-notebook-gap.md`
7. `interaction-audit/2026-07-12T15-08-07-04-00-state-change-notebook-result-map.md`
8. `gameplay-audit/2026-07-12T15-08-07-04-00-inspect-state-public-projection-loop.md`
9. `next-steps.md`
10. `validation.md`

## Next safe ledge

Create a pure notebook projection function that receives an immutable story snapshot, channel policy and redaction profile, returns either a player-safe narrative model or an admitted diagnostic model, commits one projection revision and proves the first frame that displays it.