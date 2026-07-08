# The Unmapped House Agent Start

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Last aligned:** `2026-07-08T01:50:19-04:00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheUnmappedHouse`.

Use it before touching implementation code.

## Current product read

`TheUnmappedHouse` is a fixed-camera anime point-and-click horror prototype.

The player inspects hotspots in locked-camera diorama scenes, collects clue state, completes each room when required clues are found, and moves through interludes as the house becomes mapped.

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/render-audit/stage-render-audit.md
.agent/interaction-audit/hotspot-loop-audit.md
.agent/trackers/2026-07-08T01-50-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T01-50-19-04-00.md
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