# Gameplay audit — Story route adapter readback loop

## Current gameplay loop

```txt
initial scene resolves
  -> player inspects hotspot
  -> first inspection marks hotspot seen
  -> clues are granted
  -> log is updated
  -> completion is checked
  -> completed scene schedules interlude
  -> continue advances to next scene
  -> final continue writes terminal copy
```

## Current gameplay services

- source scene descriptors
- hotspot clue grants
- inspected hotspot ledger
- clue ledger
- recent notebook log
- completion requirement check
- interlude opening
- route progression
- terminal prototype-complete route
- save/load via localStorage

## Missing gameplay proof rows

```txt
initial_state_resolved
hotspot_command_enveloped
hotspot_command_preflighted
inspect_accepted_result
inspect_repeat_no_mutation_result
inspect_unknown_rejected_result
scene_complete_result
interlude_intent
continue_next_scene_result
continue_terminal_result
save_intent
projection_record
adapter_ledger_row
```

## Finding

The story route works, but gameplay outcomes are implicit browser mutations. The next pass should keep the exact visible route while making each outcome replayable and fixture-readable.
