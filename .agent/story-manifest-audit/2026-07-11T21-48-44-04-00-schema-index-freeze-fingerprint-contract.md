# StoryManifest schema, index, freeze and fingerprint contract

Timestamp: `2026-07-11T21-48-44-04-00`

## Goal

Turn the current authored content into one deterministic definition graph with explicit identity, progression and consumer contracts.

## Candidate manifest

```txt
StoryManifest
  manifestId: the-unmapped-house
  schemaVersion: 1
  contentVersion: current authored revision
  title: The Unmapped House
  initialSceneId: library-blank-map
  terminalPolicy:
    explicitTerminalSceneIds:
      - closet-weather
  scenes:
    - library-blank-map
    - repeating-hallway
    - closet-weather
  successorGraph:
    library-blank-map: repeating-hallway
    repeating-hallway: closet-weather
    closet-weather: null
  indexes
  fingerprint
```

## Semantic admission

The manifest is accepted only when:

1. Root identity and supported schema are present.
2. Scene ids are unique.
3. Hotspot ids are unique within each scene.
4. Every grant and requirement resolves through a canonical clue index.
5. Required clues are reachable and have declared ownership.
6. Every nonterminal scene has one valid successor.
7. Every terminal scene is explicit.
8. Camera, stage, geometry, material, post and hotspot descriptors are supported and finite.
9. Canonicalization produces stable ordering.
10. Deep freeze succeeds.
11. Fingerprint recomputation matches the activated result.

## Fingerprint input

Include semantic fields only:

```txt
manifest identity and versions
title
initial scene
terminal declarations
scene and hotspot ids
copy and progression fields
clue grants and requirements
camera, stage, geometry, material and post descriptors
successor graph
```

Exclude runtime objects, DOM nodes, Three.js objects, timestamps and object insertion order.

## Compatibility

The initial implementation should use a legacy adapter to preserve the exact current three scenes and nine hotspots. Runtime consumers then move from source references to canonical ids and immutable projections.

## Rejection policy

Invalid candidates must not:

```txt
allocate StageKit
install input listeners
hydrate mutable StorySnapshot
overwrite browser storage
render a fallback scene
publish partial indexes
```
