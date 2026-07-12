# StoryManifest authority DSK map

Timestamp: `2026-07-11T21-48-44-04-00`

## Goal

Define the parent domain that admits authored story content before any save, stage, UI, input or progression consumer can use it.

## Current ownership problem

```txt
src/story-data.js
  -> separate title and mutable scenes exports
  -> implicit initial scene from scenes[0]
  -> implicit successor from scenes[index + 1]
  -> implicit terminal from missing next item

src/game.js
  -> shallow raw save merge
  -> fallback currentScene without state reconciliation
  -> direct descriptor closures and mutation

src/stage-kit.js
  -> direct scene reference
  -> direct hotspot descriptor userData
  -> no manifest or scene-plan fingerprint
```

## Parent domain

```txt
the-unmapped-house-story-manifest-authority-domain
```

## DSK composition

```txt
story-manifest-schema-kit
story-manifest-id-kit
story-manifest-version-kit
story-manifest-canonicalization-kit
story-scene-index-kit
story-hotspot-index-kit
story-clue-index-kit
story-successor-graph-kit
story-terminal-descriptor-kit
story-requirement-ownership-kit
story-render-descriptor-schema-kit
story-manifest-deep-freeze-kit
story-manifest-fingerprint-kit
story-manifest-admission-kit
story-manifest-result-kit
legacy-story-data-adapter-kit
story-manifest-observation-kit
story-manifest-journal-kit
story-manifest-fixture-kit
story-manifest-render-parity-fixture-kit
```

## Service boundaries

| Service | Responsibility |
|---|---|
| Manifest schema | Define root, scene, hotspot, clue, requirement, successor, terminal and render descriptor shapes. |
| Canonicalization | Normalize supported input into deterministic ordering and values. |
| Indexes | Resolve scenes, scene-scoped hotspots and clues without ambient array scans. |
| Successor graph | Own progression edges and terminal declarations independent of array order. |
| Requirement ownership | Prove required clues are known, reachable and intentionally scoped. |
| Render descriptor admission | Reject unsupported or nonfinite camera, geometry, material and post values before StageKit allocation. |
| Freeze | Deep-freeze the complete admitted graph. |
| Fingerprint | Produce deterministic content identity from canonical semantic data. |
| Admission result | Return accepted, rejected or failed with issues and fingerprints. |
| Legacy adapter | Convert the existing exports into a candidate without changing current content. |
| Observation and journal | Publish detached bounded evidence. |
| Fixtures | Prove schema, graph, freeze, fingerprint and render parity. |

## Authority rule

```txt
candidate content
  -> validate
  -> canonicalize
  -> index
  -> graph
  -> ownership
  -> render capability admission
  -> deep freeze
  -> fingerprint
  -> atomic activation
```

No downstream consumer receives source objects. Consumers receive canonical ids, immutable descriptor projections and the admitted manifest identity.

## Dependencies

```txt
StoryManifest Authority
  -> StorySnapshot startup authority
  -> Pointer and pick authority
  -> Inspection and completion proof
  -> Continue transition
  -> lifecycle and frame proof
```
