# Publish Ledger Comparison

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T04-00-00-04-00`

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
TheUnmappedHouse   selected for central status rollup normalization follow-up
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
TheUnmappedHouse  central repo-ledger exists; status-summary publish-game rollup still omits it
ZombieOrchard     tracked; root .agent state observed
```

## Selection result

No currently observed non-excluded Publish repo appears entirely absent from central tracking.

No currently checked non-excluded Publish repo appears to be missing root `.agent/START_HERE.md` state.

`TheUnmappedHouse` was selected because it is still the least-normalized central tracking case: it has root `.agent` state and a central repo-ledger file, but central status reporting has not yet promoted it into the normal machine-readable publish-game rollup.

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
```

## Current central gap

```txt
central repo-ledger: present
central internal change-log: present
central direct readback: present
central status-summary known_repos: pending
central status-summary active_products: pending
central status-summary publish_game_map_from_direct_ledgers: pending
```

## Next central cleanup

Update the central status summary / publish-game rollup so `TheUnmappedHouse` is not only represented through direct readback and repo-ledger state.

That work belongs in `LuminaryLabs-Dev/LuminaryLabs`, not in product runtime code.

## Product next safe ledge

Do not expand story content or renderer fidelity first.

Build:

```txt
TheUnmappedHouse Story Command Authority + Fixture Replay Gate
```

Then prove fixture parity before broadening the stage system.
