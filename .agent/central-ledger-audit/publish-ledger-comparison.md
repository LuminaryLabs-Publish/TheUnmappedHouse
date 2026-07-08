# Publish Ledger Comparison

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T05:28:26-04:00`

## Goal

Compare the full accessible `LuminaryLabs-Publish` repo list against central tracked/documented state in `LuminaryLabs-Dev/LuminaryLabs` and document why this repo was selected for the current breakdown pass.

## Full Publish repo list observed

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheCavalryOfRome   excluded by standing rule
TheOpenAbove
TheUnmappedHouse   selected for stale central-rollup-gap cleanup
ZombieOrchard
```

## Central ledger comparison

Observed central state:

```txt
AetherVale        tracked; root .agent state observed
HorrorCorridor    tracked; root .agent state observed
IntoTheMeadow     tracked; root .agent state observed
MyCozyIsland      tracked; root .agent state observed
PhantomCommand    tracked; root .agent state observed
PrehistoricRush   tracked; root .agent state observed
TheCavalryOfRome  excluded by standing rule
TheOpenAbove      tracked; root .agent state observed
TheUnmappedHouse  central repo-ledger exists; status-summary publish-game rollup now includes it
ZombieOrchard     tracked; root .agent state observed
```

## Selection result

No currently observed non-excluded Publish repo appears entirely absent from central tracking.

No currently checked non-excluded Publish repo appears to be missing root `.agent/START_HERE.md` state.

`TheUnmappedHouse` was selected because it was still carrying stale repo-local and central direct-ledger language saying central status reporting had not promoted it into the normal machine-readable publish-game rollup.

## Current repo-local state

```txt
.agent/START_HERE.md exists
.agent/current-audit.md exists
.agent/next-steps.md exists
.agent/known-gaps.md exists
.agent/validation.md exists
.agent/architecture-audit/domain-service-breakdown.md exists
.agent/render-audit/stage-render-audit.md exists
.agent/interaction-audit/hotspot-loop-audit.md exists
.agent/central-ledger-audit/publish-ledger-comparison.md exists
.agent/turn-ledger/ exists
.agent/trackers/ exists
.agent/kit-registry.json exists
```

## Central rollup state

```txt
central repo-ledger: present
central internal change-log: present
central direct readback: present
central status-summary known_repos: present
central status-summary active_products: present
central status-summary publish_game_map_from_direct_ledgers: present
```

Evidence boundary:

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-checks/reports/status-summary.json
schema_version: 1.18.0
updated: 2026-07-08T08:14:46Z
```

`status-summary.json` records `TheUnmappedHouse` in:

```txt
current_state_map.known_repos
current_state_map.active_products
publish_game_map_from_direct_ledgers
```

## Selector guidance

Do not keep selecting `TheUnmappedHouse` solely for the old central status-rollup gap.

Future repo-breakdown selection should use this order:

```txt
new LuminaryLabs-Publish repo
  -> central-ledger absent repo
  -> repo missing root .agent state
  -> repo with stale required .agent outputs
  -> oldest eligible documented repo
```

## Product next safe ledge

Do not expand story content or renderer fidelity first.

Build:

```txt
TheUnmappedHouse Story Command Authority + Fixture Replay Gate
```

Then prove fixture parity before broadening the stage system.
