# Story source audit: manifest and graph contract

Timestamp: `2026-07-10T19-00-19-04-00`

## Current authored graph

```txt
library-blank-map
  hotspots: map, window, shelf-gap
  grants: clue:blank-square, clue:house-door, clue:deep-shelf
  completion requires the same three clues

repeating-hallway
  hotspots: wrong-door, class-number, unfinished-photo
  grants: clue:home-address, clue:wallpaper, clue:unfinished-family
  completion requires the same three clues

closet-weather
  hotspots: bucket-storm, wet-shadow, closet-map
  grants: clue:stored-rain, clue:wet-shadow, clue:west-wing
  completion requires the same three clues
```

The route is the array order. No explicit edge or terminal descriptor exists.

## Manifest responsibilities

The source manifest should be the canonical read-only product model for:

```txt
game title
story schema version
manifest id
source fingerprint
ordered scene ids
scene descriptor index
hotspot index by scene
known clue ids
hotspot-to-clue grant map
scene completion requirements
route edges
terminal route identity
render descriptor references
source validation rows
```

## Required graph invariants

```txt
at least one scene exists
scene ids are non-empty and globally unique
hotspot ids are non-empty and unique within a scene
scene order contains every scene exactly once
all hotspot grants are known clue ids
all completion requirements are known clue ids
all required clues are grantable by reachable hotspots
all scene references resolve
all terminal transitions are explicit
all camera/stage/post descriptors pass shape validation
normalized source is JSON-safe
fingerprint is deterministic across equivalent source order
```

## Normalization rules

```txt
preserve authored scene order
sort object keys during canonical serialization
retain array order where gameplay meaning depends on it
apply explicit defaults before hashing
exclude runtime-only objects and functions
normalize numeric values without lossy visual retuning
reject non-finite numbers
freeze normalized manifest structures
```

## Fingerprint scope

Include all authored data that changes story or presentation identity:

```txt
scene order and ids
hotspot ids, labels, text, grants and changesText
completion requirements
opening/interlude/terminal descriptors
camera, fog, stage layers, props and materials
post-processing descriptors
```

A source edit should deliberately create a new fingerprint so save compatibility can be decided rather than assumed.

## Source lookup API

```txt
getScene(sceneId)
getHotspot(sceneId, hotspotId)
getSceneIndex(sceneId)
getNextSceneId(sceneId)
getKnownClueIds()
getGrantedClueIds(sceneId, hotspotId)
getCompletionRequirements(sceneId)
validateSceneHotspot(sceneId, hotspotId)
getManifestSummary()
```

These methods should return immutable normalized data or bounded DTOs, not live renderer objects.

## Validation output

```txt
StorySourceValidationResult {
  status,
  manifestId,
  sourceFingerprint,
  schemaVersion,
  sceneCount,
  hotspotCount,
  clueCount,
  rows
}
```

Rows need stable paths and reason codes so fixtures can compare results deterministically.

## Required fixtures

```txt
current source validates
current fingerprint is stable
scene count is three
hotspot count is nine
required clue count is nine
duplicate scene rejected
duplicate hotspot rejected
unknown grant rejected
ungrantable requirement rejected
invalid route rejected
invalid camera/stage/post descriptor rejected
source edit changes fingerprint
equivalent normalized source keeps fingerprint
```

## Constraint

The manifest work must not rewrite story copy, add content, reorder scenes or retune render descriptors.
