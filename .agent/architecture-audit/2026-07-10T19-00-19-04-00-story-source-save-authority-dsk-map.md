# Architecture audit: story source and save authority DSK map

Timestamp: `2026-07-10T19-00-19-04-00`

## Current composition

```txt
story-data-kit
  -> raw scene array
  -> raw hotspot descriptors
  -> raw clue grant/requirement strings

localstorage-save-kit
  -> JSON.parse
  -> shallow merge into initial state
  -> direct JSON.stringify write

browser-story-runtime-kit
  -> resolves current scene
  -> accepts live hotspot descriptor
  -> mutates inspection/clue/log/route state
  -> evaluates completion
  -> schedules interlude and advances scene

stage-render-kit
  -> consumes scene descriptor
  -> stores hotspot descriptor on meshes
  -> forwards live descriptor through callback
```

## Authority defect

There is no canonical object that answers all of these questions:

```txt
Which story source revision is running?
Which scene ids are valid?
Which hotspot ids belong to each scene?
Which clue ids can be granted?
Which clue requirements are valid?
Which save schema belongs to this source?
Which persisted ids are retained, repaired or rejected?
Which command targeted which source revision?
Which completion decision was derived from which inspections?
Which rendered scene corresponds to the persisted scene?
```

The current source, save, command and renderer boundaries therefore share mutable descriptor objects and unvalidated strings rather than stable domain contracts.

## Current domains

| Domain | Current authority | Gap |
|---|---|---|
| Story source | `scenes` array | No schema, manifest or fingerprint. |
| Scene identity | `scene.id` string | No canonical index or duplicate rejection. |
| Hotspot identity | Scene-local `hotspot.id` string | No resolver or active-scene membership check. |
| Clue identity | Free-form grant/requirement strings | No known-clue index or derivation proof. |
| Save state | Parsed object shallow-merged into defaults | No envelope, validation, compatibility or repair result. |
| Story command | Live hotspot descriptor object | No request id, input origin, source id or typed result. |
| Completion | `requiresToComplete.every(state.clues.includes)` | Trusts independent persisted clue strings. |
| Rendering | Raw scene/hotspot descriptors | No source/save/render correlation. |

## Proposed domain boundaries

```txt
story-source-schema
  owns descriptor shape and schema version

story-manifest
  owns normalized source snapshot, canonical indexes and route graph

story-source-fingerprint
  owns deterministic source revision identity

story-graph-validation
  owns uniqueness, reference and route invariants

save-envelope
  owns persisted schema version, source fingerprint and payload metadata

save-reconciliation
  owns validation, migration, repair, rejection and canonical state output

canonical-hotspot-command
  owns scene id, hotspot id, input origin, command id and source fingerprint

story-command-result
  owns accepted/repeated/rejected/repaired/no-op status and reason

inspection-proof
  owns the canonical fact that one hotspot was inspected under one source revision

clue-derivation
  derives clue ids from canonical inspection facts and source grants

completion-proof
  owns scene completion evidence and source correlation

story-source-diagnostics
  projects bounded JSON-safe manifest, save, command and completion rows
```

## Proposed kit map

### `story-source-schema-kit`

Services:

```txt
schema version
normalized descriptor shape
default application
stable validation reason codes
```

### `story-manifest-kit`

Services:

```txt
scene index
hotspot index by scene
known clue index
route order graph
normalized immutable source snapshot
```

### `story-source-fingerprint-kit`

Services:

```txt
canonical serialization
stable source hash
source revision comparison
```

### `story-graph-validator-kit`

Services:

```txt
duplicate scene rejection
duplicate scene-local hotspot rejection
unknown clue grant rejection
unknown completion requirement rejection
invalid route rejection
validation row export
```

### `versioned-save-envelope-kit`

Services:

```txt
save schema version
source fingerprint retention
created/updated metadata
payload boundary
migration history
```

### `save-shape-validator-kit`

Services:

```txt
field type validation
bounded collection validation
future-version rejection
JSON-safe error rows
```

### `save-reconciliation-kit`

Services:

```txt
canonical scene repair
unknown id removal
route prefix rebuilding
inspection normalization
clue derivation
repair result journal
```

### `content-drift-migration-kit`

Services:

```txt
source fingerprint comparison
compatible source migration
removed/renamed id mapping
reset policy for unrecoverable drift
```

### `canonical-hotspot-resolver-kit`

Services:

```txt
scene/hotspot lookup
active-scene membership validation
source revision validation
canonical descriptor resolution
```

### `story-command-kit`

Services:

```txt
input request normalization
input origin retention
command identity
pure inspection transition
```

### `story-command-result-kit`

Services:

```txt
accepted/repeated/rejected/repaired/no-op status
stable reason codes
before/after fingerprints
effect intents
```

### `inspection-proof-kit`

Services:

```txt
canonical inspected fact
scene/hotspot/source correlation
idempotent proof identity
```

### `clue-derivation-kit`

Services:

```txt
inspection-to-grant resolution
deduplicated derived clue set
explanation rows
```

### `completion-proof-kit`

Services:

```txt
requirement evaluation
missing/satisfied rows
one proof per scene/source revision
interlude eligibility
```

### `story-source-diagnostics-kit`

Services:

```txt
manifest summary
save load/repair summary
latest command result
latest completion proof
source/save/render identity row
```

### `dom-free-story-fixture-kit`

Services:

```txt
manifest fixtures
save corruption/drift fixtures
command fixtures
completion fixtures
stable JSON snapshots
```

## Dependency order

```txt
story source schema
  -> normalized manifest
  -> graph validation
  -> source fingerprint
  -> versioned save envelope
  -> save validation and reconciliation
  -> canonical story state
  -> canonical hotspot resolver
  -> typed story command result
  -> inspection and clue derivation proofs
  -> completion proof
  -> source/save/render diagnostics
  -> DOM-free fixture gate
```

## Compatibility boundary

Keep these current public behaviors unchanged:

```txt
three scenes in current order
three hotspots per scene
current copy and clue grants
450 ms interlude delay
side-panel and raycast inputs
fixed camera and aspect frame
current visuals and post-processing
KeyR reset behavior
current save key through adapter or explicit migration
```

## Next safe ledge

```txt
TheUnmappedHouse Story Source Manifest + Save Reconciliation Fixture Gate
```
