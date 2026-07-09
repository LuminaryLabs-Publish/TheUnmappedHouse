# Story Authority Audit: Source-Owned Fixture Readback Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T10-50-00-04-00`

## Current authority problem

`src/game.js` owns too many boundaries at once:

```txt
command dispatch
story mutation
route mutation
clue mutation
log mutation
completion checks
interlude scheduling
save writes
StageKit scene load calls
DOM projection
debug JSON
reset behavior
```

## Required source-owned contract

```txt
StorySourceManifest
  product id, source version, public route, save key, scene ids, command ids, central ledger reference

StorySourceSnapshot
  scene descriptors, hotspot descriptors, grants, completion requirements, interlude facts

StoryStateSnapshot
  selected scene id, route, clues, inspected ids, log count/latest entries, completion facts

StoryPreflight
  validates command shape, source descriptors, current scene, target hotspot, route target, save shape

StoryCommandResult
  status, reason, before/after snapshots, mutation flags, compatibility text, and event records

StoryCommandLedger
  ordered results for fixture and GameHost diagnostics

StoryProjection
  DOM text/notebook/hotspot/debug facts without touching DOM

SaveProjection
  localStorage write/clear intent without writing localStorage

InterludeProjection
  interlude open/close/title/text/timing intent without touching DOM

StageProjection
  scene load intent without calling StageKit

BrowserAdapterPlan
  full adapter action list for DOM, StageKit, and localStorage consumers

BrowserAdapterReadback
  proof of what the browser host consumed

CentralLedgerReadback
  proof of repo-local audit timestamp/path facts for central ledger sync
```

## First implementation stop line

Stop as soon as the DOM-free fixture proves accepted, rejected, no-mutation, terminal, readback, and central-sync rows.

Only then adapt `src/game.js` to consume the plan and emit browser readback.
