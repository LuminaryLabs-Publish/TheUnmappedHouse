# Deploy audit: hotspot parity browser fixture gate

**Timestamp:** `2026-07-16T09-58-49-04-00`  
**Status:** `audited`

## Summary

The current package command checks JavaScript syntax. It does not prove hotspot availability, DOM/canvas parity, occlusion policy, stale-hover retirement or deployed-origin behavior.

## Plan ledger

**Goal:** define the minimum evidence required before claiming hotspot availability correctness in source, artifact or Pages delivery.

- [x] Identify source-only proof limitations.
- [x] Define browser and deployment fixture rows.
- [ ] Implement the authority before enabling the gate.

## Required fixture matrix

| Row | Source | Built artifact | Pages |
|---|---:|---:|---:|
| all current hotspots have matching DOM/canvas entries | required | required | required |
| hidden hotspot is not disclosed or pickable | required | required | required |
| clue-gated hotspot becomes available exactly once | required | required | required |
| occluded hotspot follows declared policy | required | required | required |
| interlude suspends underlying interactions | required | required | required |
| scene transition clears stale hover label | required | required | required |
| stale availability revision is rejected | required | required | required |
| first available hotspot frame is acknowledged | required | required | required |

## Release boundary

Do not claim interaction parity or discovery correctness until the same content revision, availability policy revision and browser fixture result are confirmed at all three origins. No build, browser or Pages smoke was run in this audit.