# Gameplay audit: clue and completion authority loop

Timestamp: `2026-07-10T19-00-19-04-00`

## Current loop

```txt
inspect hotspot descriptor
  -> mark state.inspected[currentScene.id][hotspot.id]
  -> append hotspot.grants into state.clues
  -> write story log
  -> evaluate currentScene.requiresToComplete against state.clues
  -> schedule interlude after 450 ms when complete
  -> save mutable state
```

## Current invariants that are assumed but not enforced

```txt
state.clues is an array
state.inspected is an object of scene/hotspot booleans
all saved clue ids exist in the current source
all saved hotspot ids exist in the current source
all clues were produced by valid inspections
all inspections belong to the active scene
requirements reference known clue ids
one scene completion produces one interlude effect
```

## Gameplay authority gap

The clue array and inspection map are persisted independently. Completion trusts the clue array directly, so they can diverge:

```txt
clue present, inspection absent
inspection present, clue absent
unknown clue retained
removed hotspot retained
future-source clue injected
scene requirements satisfied before canonical interaction
```

The current authored content happens to be simple, but the authority contract will fail as soon as content is edited, saves survive source changes, or branching is introduced.

## Canonical model

Persist canonical inspection facts and derive clue state from the current source manifest:

```txt
inspection proof
  -> manifest resolves scene/hotspot
  -> source grants are collected
  -> deduplicated clue set is derived
  -> requirements are evaluated
  -> completion proof is emitted
  -> one correlated interlude effect is scheduled
```

Recommended proof shapes:

```txt
InspectionProof {
  sourceFingerprint,
  sceneId,
  hotspotId,
  commandId,
  acceptedAtSequence
}

CompletionProof {
  sourceFingerprint,
  sceneId,
  requiredClueIds,
  derivedClueIds,
  missingClueIds,
  contributingHotspotIds,
  status,
  proofId
}
```

## Result statuses

```txt
inspection accepted
inspection repeated
inspection rejected_unknown_scene
inspection rejected_wrong_scene
inspection rejected_unknown_hotspot
inspection rejected_stale_source
completion incomplete
completion newly_complete
completion already_complete
completion invalid_source
```

## Timer/effect boundary

The delayed interlude must be an effect intent correlated to the completion proof:

```txt
completion proof id
scene id
source fingerprint
scheduled delay
scheduled sequence
applied/skipped/cancelled result
```

A source change, scene advance, reset or newer completion lifecycle should invalidate stale effects.

## Required fixtures

```txt
all three scenes incomplete at canonical initial state
first two inspections do not complete a three-clue scene
third required inspection produces one completion proof
repeated inspection does not duplicate clue or completion proof
injected clue without inspection does not complete
unknown inspection does not grant a clue
save reconciliation restores derived clues
one interlude effect is issued per proof
stale timer is rejected after reset or scene change
terminal lifecycle round-trips
```

## Constraint

Preserve the current clue text, scene order, three-hotspot requirement, 450 ms pacing and visible interlude copy.
