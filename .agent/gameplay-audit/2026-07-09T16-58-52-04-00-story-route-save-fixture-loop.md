# Gameplay Audit - Story Route Save Fixture Loop

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T16-58-52-04-00`

## Gameplay loop

```txt
read opening text
  -> inspect visible hotspots
  -> collect clues
  -> complete scene when all required clues are present
  -> interlude opens
  -> continue advances to next scene
  -> route is appended
  -> StageKit loads next scene descriptor
  -> repeat until terminal prototype-complete state
```

## Story content currently active

```txt
library-blank-map
repeating-hallway
closet-weather
```

## Gameplay domains

```txt
story-scene-domain
hotspot-observation-domain
clue-grant-domain
completion-requirement-domain
scene-route-domain
interlude-domain
notebook-log-domain
save-state-domain
terminal-prototype-domain
reset-domain
```

## Save behavior today

```txt
SAVE_KEY = the-unmapped-house.stage-prototype.v1
loadState() shallow-merges localStorage JSON into createInitialState()
saveState() writes full mutable state after render-relevant actions
KeyR removes the save key and reloads the page
```

## Gameplay risks

```txt
Malformed save data can survive shallow merge.
Scene id fallback is implicit and not fixture-described.
Scene completion has no reason-code row.
Route advancement assumes array order.
Terminal route does not emit a saved terminal result.
Interlude scheduling is timer side effect instead of projection.
Repeat inspection has no no-mutation contract.
```

## Fixture loop needed

```txt
load_empty_storage
load_malformed_storage
inspect_all_library_hotspots
complete_library
continue_to_repeating_hallway
inspect_repeat_after_save
continue_through_closet_weather
continue_terminal
reset_route
repo_local_ledger_readback
central_ledger_readback
```

## Success condition

The gameplay loop is ready for expansion only when the fixture can prove state before/after, command result reason, route intent, save intent, interlude intent, stage projection, browser adapter plan, and readback expectation for each row.
