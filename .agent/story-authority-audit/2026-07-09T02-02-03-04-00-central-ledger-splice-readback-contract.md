# Central Ledger Splice Readback Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T02-02-03-04-00`

## Why this audit exists

The repo-local `.agent` folder can advance faster than the central `LuminaryLabs-Dev/LuminaryLabs` ledger. This run selected `TheUnmappedHouse` because repo-local readback had advanced while the central ledger still pointed at an older tracker.

The next implementation should make that freshness proof explicit through source-owned readback rows instead of relying on manual memory.

## Required central readback shape

```txt
CentralLedgerReadback:
  repo: LuminaryLabs-Publish/TheUnmappedHouse
  selectedRepo: LuminaryLabs-Publish/TheUnmappedHouse
  publicRoute: index.html
  defaultBranch: main
  excludedRepos: [LuminaryLabs-Publish/TheCavalryOfRome]
  latestTracker: .agent/trackers/<timestamp>/project-breakdown.md
  latestTurnLedger: .agent/turn-ledger/<timestamp>.md
  latestArchitectureAudit: .agent/architecture-audit/<timestamp>-*.md
  latestRenderAudit: .agent/render-audit/<timestamp>-*.md
  latestInteractionAudit: .agent/interaction-audit/<timestamp>-*.md
  latestGameplayAudit: .agent/gameplay-audit/<timestamp>-*.md
  latestStoryAuthorityAudit: .agent/story-authority-audit/<timestamp>-*.md
  latestDeployAudit: .agent/deploy-audit/<timestamp>-*.md
  latestKitRegistry: .agent/kit-registry.json
  centralLedgerPath: repo-ledger/LuminaryLabs-Publish/TheUnmappedHouse.md
  centralChangeLogPath: internal-change-log/<timestamp>-the-unmapped-house-*.md
  status: central_ledger_caught_up
```

## Source-owned fixture row

```txt
row: central_ledger_snapshot
status: ledger_readback
reason: central_ledger_readback_created
expected:
  all repo-local latest paths exist
  central ledger target path is stable
  central change-log target path is stable
  excluded repo list includes TheCavalryOfRome
  selected repo equals TheUnmappedHouse
  runtime source changed flag is explicit
  branchCreated false
  pullRequestCreated false
  pushedToMain true
```

## Browser adapter splice

`src/game.js` should not manually invent central facts. It should consume `projectGameHostStoryDiagnostics()` and include the central readback row inside additive host diagnostics.

Target surface:

```txt
window.GameHost.getState().story.centralLedger
```

Expected fields:

```txt
repo
latestTracker
latestTurnLedger
latestAudits
latestKitRegistry
centralLedgerPath
centralChangeLogPath
freshnessStatus
fixtureStatus
```

## Do not do next

```txt
Do not add central-ledger facts only to markdown.
Do not put central freshness logic inside renderUi.
Do not make central readback depend on DOM, localStorage, setTimeout, or StageKit.
Do not update central tracking without a matching repo-local path set.
```
