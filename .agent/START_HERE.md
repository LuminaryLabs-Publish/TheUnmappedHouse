# The Unmapped House Agent Start

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Last aligned:** `2026-07-08T03:42:00-04:00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheUnmappedHouse`.

Use it before touching implementation code.

## Current product read

`TheUnmappedHouse` is a fixed-camera anime point-and-click horror prototype.

The player inspects hotspots in locked-camera diorama scenes, collects clue state, completes each room when required clues are found, and moves through interludes as the house becomes mapped.

## Current documentation state

The root `.agent/` folder exists and has the required audit surfaces.

The latest follow-up pass confirms that all checked non-excluded `LuminaryLabs-Publish` repos now have root `.agent/START_HERE.md` state. `TheUnmappedHouse` was selected again only because it remains the central status-summary rollup normalization gap: it has repo-local `.agent` state and central repo-ledger state, but central reports still treat it as direct readback context rather than normal `status-summary.json` publish-game rollup membership.

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
.agent/trackers/2026-07-08T03-42-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T03-42-00-04-00.md
```

Earlier breakdown passes:

```txt
.agent/trackers/2026-07-08T01-50-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T01-50-19-04-00.md
.agent/trackers/2026-07-08T02-40-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T02-40-00-04-00.md
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

Build a story command authority and fixture replay gate without changing the visual route.

Keep the existing `index.html -> src/game.js -> src/stage-kit.js -> src/story-data.js` path working while extracting pure story logic.

## Central cleanup note

The central `LuminaryLabs-Dev/LuminaryLabs` status-summary rollup should eventually include `TheUnmappedHouse` with the other non-excluded Publish game repos so future scheduled repo selection does not keep returning here only because summary rollup state lags direct ledger state.
