# The Unmapped House Agent Start

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Last aligned:** `2026-07-08T05:28:26-04:00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheUnmappedHouse`.

Use it before touching implementation code.

## Current product read

`TheUnmappedHouse` is a fixed-camera anime point-and-click horror prototype.

The player inspects hotspots in locked-camera diorama scenes, collects clue state, completes each room when required clues are found, and moves through interludes as the house becomes mapped.

The current public route is still:

```txt
index.html -> src/game.js -> src/stage-kit.js + src/story-data.js
```

## Current documentation state

The root `.agent/` folder exists and has the required audit surfaces.

The current repo-selection pass found no checked non-excluded `LuminaryLabs-Publish` repo that was completely missing central tracking or root `.agent/START_HERE.md` state.

`TheUnmappedHouse` was selected for this follow-up because prior local docs still described an open central status-summary rollup gap. That gap is now closed in `LuminaryLabs-Dev/LuminaryLabs:repo-checks/reports/status-summary.json` schema `1.18.0`, which includes `TheUnmappedHouse` in `known_repos`, `active_products`, and `publish_game_map_from_direct_ledgers`.

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/render-audit/stage-render-audit.md
.agent/interaction-audit/hotspot-loop-audit.md
.agent/central-ledger-audit/publish-ledger-comparison.md
.agent/trackers/2026-07-08T05-28-26-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T05-28-26-04-00.md
.agent/kit-registry.json
```

Earlier breakdown passes:

```txt
.agent/trackers/2026-07-08T01-50-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T01-50-19-04-00.md
.agent/trackers/2026-07-08T02-40-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T02-40-00-04-00.md
.agent/trackers/2026-07-08T03-42-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T03-42-00-04-00.md
.agent/trackers/2026-07-08T04-00-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T04-00-00-04-00.md
```

## Source files to inspect next

```txt
README.md
index.html
src/game.js
src/stage-kit.js
src/story-data.js
src/styles.css
.github/workflows/deploy.yml
```

## Main rule

Do not let UI handlers, DOM code, browser state, renderer code, or localStorage own story authority long term.

Move story progression into pure command/result kits, then let the UI consume those results.

## Current next safe ledge

```txt
TheUnmappedHouse Story Command Authority + Fixture Replay Gate
```

Keep the existing route working while extracting pure story logic.

Build command envelopes, result records, rejection reasons, route journals, GameHost diagnostics, and DOM-free fixture replay before changing visible story or renderer behavior.

## Central cleanup note

The central rollup gap should no longer be used as a reason to repeatedly select this repo. Future selection should return to new/untracked/missing-`.agent` repos first, then the oldest eligible documented repo by current ledger state.
