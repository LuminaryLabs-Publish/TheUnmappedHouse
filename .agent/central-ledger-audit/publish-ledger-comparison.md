# Publish Ledger Comparison

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-08T02:40:00-04:00`

## Goal

Compare the full current `LuminaryLabs-Publish` repo list against central tracked/documented state in `LuminaryLabs-Dev/LuminaryLabs` and document why this repo was selected for the current breakdown pass.

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
TheUnmappedHouse   selected for follow-up central-ledger readback
ZombieOrchard
```

## Central ledger comparison

Observed central state:

```txt
AetherVale        tracked in central latest summary / direct ledger readback
HorrorCorridor    tracked in central latest summary / direct ledger readback
IntoTheMeadow     tracked in central latest summary / direct ledger readback
MyCozyIsland      tracked in central latest summary / direct ledger readback
PhantomCommand    tracked in central latest summary / direct ledger readback
PrehistoricRush   tracked in central latest summary / direct ledger readback
TheCavalryOfRome  excluded by standing rule
TheOpenAbove      tracked in central latest summary / direct ledger readback
TheUnmappedHouse  central repo-ledger exists; latest summary records it only as additional observed direct readback context
ZombieOrchard     tracked in central latest summary / direct ledger readback
```

## Selection result

No currently observed non-excluded Publish repo appears entirely absent from central tracking.

`TheUnmappedHouse` was selected because it is still the least-normalized central tracking case: it has root `.agent` state and a central repo-ledger file, but central latest summary explicitly keeps it outside the status-summary `1.17.0` publish-game rollup.

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
.agent/turn-ledger/ exists
.agent/trackers/ exists
```

## Current central gap

```txt
central repo-ledger: present
central internal change-log: present
central latest summary direct readback: present
central status-summary publish-game rollup: pending
```

## Next central cleanup

Update the central status summary / publish-game rollup so `TheUnmappedHouse` is not only represented as an additional direct-readback note.

That work belongs in `LuminaryLabs-Dev/LuminaryLabs`, not in product runtime code.

## Product next safe ledge

Do not expand story content or renderer fidelity first.

Build:

```txt
TheUnmappedHouse Story Command Authority + Fixture Replay Gate
```

Then prove fixture parity before broadening the stage system.