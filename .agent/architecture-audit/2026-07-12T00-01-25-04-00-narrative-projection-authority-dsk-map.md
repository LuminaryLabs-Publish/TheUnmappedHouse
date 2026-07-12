# Architecture audit: Narrative Projection Authority DSK map

Timestamp: `2026-07-12T00-01-25-04-00`

## Summary

The story panel currently mixes narrative state with DOM state. This audit defines one composed domain that owns narrative source selection, revisioning, persistence policy, projection commits, observation and visible-frame proof.

## Current ownership split

```txt
src/story-data.js
  -> authored opening, hotspot, interlude and terminal-adjacent copy

src/game.js state
  -> scene id, clues, flags, inspected, route and log
  -> no active narrative projection

#scene-text DOM element
  -> stores whichever copy was written most recently
  -> also acts as renderUi() input through textContent checks

#interlude DOM elements
  -> store completion or terminal copy
  -> no durable phase or projection identity
```

## Required parent domain

```txt
the-unmapped-house-narrative-projection-authority-domain
```

## Proposed DSK composition

```txt
narrative-source-kind-kit
narrative-source-id-kit
narrative-projection-state-kit
narrative-projection-revision-kit
scene-opening-projection-kit
hotspot-copy-projection-kit
completion-copy-projection-kit
terminal-copy-projection-kit
narrative-projection-admission-kit
narrative-projection-commit-kit
narrative-projection-result-kit
narrative-persistence-policy-kit
scene-transition-narrative-reset-kit
narrative-dom-adapter-kit
narrative-aria-live-adapter-kit
narrative-frame-acknowledgement-kit
narrative-observation-kit
narrative-journal-kit
narrative-projection-fixture-kit
transition-copy-parity-fixture-kit
```

## Service map

| Kit | Services |
|---|---|
| `narrative-source-kind-kit` | Enumerate `scene-opening`, `hotspot`, `completion`, `terminal`, and supported future source kinds. |
| `narrative-source-id-kit` | Bind copy to canonical scene, hotspot, completion proof or terminal descriptor ids. |
| `narrative-projection-state-kit` | Store the currently committed title, body, source, scene and phase. |
| `narrative-projection-revision-kit` | Allocate monotonic projection revisions. |
| `scene-opening-projection-kit` | Derive opening copy for an admitted scene. |
| `hotspot-copy-projection-kit` | Derive copy from an accepted inspection result. |
| `completion-copy-projection-kit` | Derive interlude copy from a completion proof. |
| `terminal-copy-projection-kit` | Derive durable terminal copy and button policy. |
| `narrative-projection-admission-kit` | Reject stale scene, source or phase projections before mutation. |
| `narrative-projection-commit-kit` | Atomically commit narrative state with the owning story transition. |
| `narrative-projection-result-kit` | Return accepted, rejected, stale, duplicate and failed results. |
| `narrative-persistence-policy-kit` | Declare whether exact projection or canonical scene opening is restored on boot. |
| `scene-transition-narrative-reset-kit` | Replace predecessor copy with successor opening copy in the transition candidate. |
| `narrative-dom-adapter-kit` | Project committed narrative state into title, body and interlude elements. |
| `narrative-aria-live-adapter-kit` | Announce only committed narrative revisions. |
| `narrative-frame-acknowledgement-kit` | Correlate story, stage and narrative revisions with the first visible frame. |
| `narrative-observation-kit` | Expose detached clone-safe narrative readback. |
| `narrative-journal-kit` | Retain bounded projection and rejection receipts. |
| `narrative-projection-fixture-kit` | Prove source, revision, persistence and stale-result behavior. |
| `transition-copy-parity-fixture-kit` | Prove title, body, stage and scene identity change together. |

## Required state

```txt
NarrativeProjection
  projectionId
  revision
  sceneId
  phase
  sourceKind
  sourceId
  title
  body
  persistencePolicy
  committedByCommandId
  committedAtStoryRevision
  acknowledgedFrameId
```

## Required flow

```txt
accepted story event
  -> resolve canonical narrative source
  -> prepare NarrativeProjection candidate
  -> validate scene, phase and source identity
  -> commit with story/stage transition
  -> project to DOM and aria-live surface
  -> render first correlated frame
  -> publish acknowledgement and observation
```

## Invariants

```txt
DOM text is never read to decide story behavior
one committed scene has exactly one committed narrative projection
hotspot copy belongs to the scene in which inspection was accepted
scene transition replaces predecessor copy before successor becomes ready
terminal projection is explicit and durable
visible title, body, hotspot set and stage cite one story revision
```

## Dependency position

```txt
StoryManifest Authority
  -> StorySnapshot startup admission
  -> Inspection and completion results
  -> Atomic Continue transition
  -> Narrative Projection Authority
  -> Committed-frame diagnostics
```

The narrative domain consumes canonical ids and typed results from upstream authorities. It does not replace them.
