# The Unmapped House Agent Start

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Last aligned:** `2026-07-08T08:21:49-04:00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheUnmappedHouse`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repo list was compared against `LuminaryLabs-Dev/LuminaryLabs` central ledger state.

No checked non-Cavalry Publish repo was found that was fully new, absent from the central ledger, missing root `.agent/START_HERE.md`, or recently added but undocumented.

`TheUnmappedHouse` was selected as the oldest eligible fallback follow-up with an unresolved source-backed story authority seam. The old central rollup gap is closed and must not be used as the reason for selection anymore. This pass instead narrows the next implementation into a concrete story command/result acceptance ledger.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Current product read

`TheUnmappedHouse` is a fixed-camera anime point-and-click horror prototype.

The player inspects hotspots in locked-camera diorama scenes, collects clue state, completes each room when required clues are found, and moves through interludes as the house becomes mapped.

The current public route remains:

```txt
index.html -> src/game.js -> src/stage-kit.js + src/story-data.js
```

## Current documentation state

The root `.agent/` folder exists and has the required audit surfaces.

This pass refreshed the repo-local operating docs and added a timestamped story command/result acceptance ledger so the next implementation pass has exact command names, reason codes, result records, fixture cases, and file boundaries.

## Publish repos checked

```txt
LuminaryLabs-Publish/AetherVale          ledgered with root .agent
LuminaryLabs-Publish/HorrorCorridor      ledgered with root .agent
LuminaryLabs-Publish/IntoTheMeadow       ledgered with root .agent
LuminaryLabs-Publish/MyCozyIsland        ledgered with root .agent
LuminaryLabs-Publish/PhantomCommand      ledgered with root .agent
LuminaryLabs-Publish/PrehistoricRush     ledgered with root .agent
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        ledgered with root .agent
LuminaryLabs-Publish/TheUnmappedHouse    selected fallback: story command/result acceptance ledger
LuminaryLabs-Publish/ZombieOrchard       ledgered with root .agent
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T08-21-49-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T08-21-49-04-00-stage-render-readback.md
.agent/interaction-audit/2026-07-08T08-21-49-04-00-story-command-result-acceptance-ledger.md
.agent/trackers/2026-07-08T08-21-49-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T08-21-49-04-00.md
.agent/kit-registry.json
```

Earlier breakdown entries:

```txt
.agent/trackers/2026-07-08T01-50-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T01-50-19-04-00.md
.agent/trackers/2026-07-08T02-40-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T02-40-00-04-00.md
.agent/trackers/2026-07-08T03-42-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T03-42-00-04-00.md
.agent/trackers/2026-07-08T04-00-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T04-00-00-04-00.md
.agent/trackers/2026-07-08T05-28-26-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T05-28-26-04-00.md
```

## Source files to inspect next

```txt
README.md
package.json
index.html
src/game.js
src/stage-kit.js
src/story-data.js
src/styles.css
.github/workflows/deploy.yml
```

## Main rule

Do not let UI handlers, DOM code, browser state, renderer code, or localStorage own story authority long term.

Move story progression into pure command/result kits, then let the UI, save adapter, debug projection, renderer, and future `GameHost` diagnostics consume those result records.

## Current next safe ledge

```txt
TheUnmappedHouse Story Command Result Acceptance Ledger
```

Keep `index.html -> src/game.js`, the current story copy, the current `SAVE_KEY`, and StageKit visuals stable while adding source-owned command envelopes, accepted/rejected result records, stable reason codes, route/command journals, save result records, descriptor validation, `GameHost` diagnostics, and DOM-free fixture replay.