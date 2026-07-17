# Gameplay audit: frame fault and story-mutation divergence

**Timestamp:** `2026-07-16T23-40-57-04-00`  
**Status:** `audited`

## Interaction loop at risk

```txt
player inspects or continues
  -> story state mutates
  -> UI and save update
  -> StageKit should present the matching scene

render phase throws
  -> story mutation may already be accepted
  -> last successful stage frame can remain visible
  -> successor callbacks continue without settlement
  -> no gameplay suspension or recovery receipt exists
```

## Missing gameplay authority

```txt
accepted story generation
accepted renderer generation
faulted frame generation
interaction suspension result
last-safe-visible generation
recovery eligibility
first recovered frame acknowledgement
```

## Required policy

- Reject new inspections and Continue while the stage is terminally faulted.
- Preserve the accepted story state without silently replaying commands.
- Make restart policy explicit: resume the same scene, reload accepted save, or reset.
- Do not claim scene readiness until the matching recovered frame is acknowledged.
- Keep frame recovery independent from retained narrative, interlude, save and hotspot authorities.

## Proof rows

```txt
inspection accepted before render failure
Continue accepted before render failure
fault while interlude is open
restart with accepted save
restart without duplicate clue or route mutation
first recovered scene-frame parity
```

No gameplay mutation or recovery behavior was changed.