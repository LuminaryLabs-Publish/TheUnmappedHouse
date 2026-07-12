# Array-order scene progression loop

Timestamp: `2026-07-11T21-48-44-04-00`

## Goal

Replace implicit array-position progression with an admitted scene graph and explicit terminal semantics.

## Current loop

```txt
currentScene
  -> scenes.findIndex(currentScene.id)
  -> scenes[index + 1]
  -> successor or prototype-complete copy
```

## Findings

- Array order is the progression graph.
- `scenes[0]` is the initial scene policy.
- Missing `scenes[index + 1]` is the terminal policy.
- Reordering or inserting content changes progression without a version transition.
- An unknown saved scene can render the first scene while retaining an invalid persisted id.
- Route history is not validated against the current story graph.
- Completion requirements are global clue strings rather than graph-owned objective definitions.

## Required gameplay contract

```txt
manifest.initialSceneId
manifest.successorGraph[currentSceneId]
manifest.terminalScenes
```

`Continue` must resolve one canonical successor edge and return:

```txt
resolved
terminal
rejected-stale
rejected-incomplete
rejected-invalid-scene
failed
```

## Required fixtures

```txt
current-three-scene-path-preserved
array-reorder-does-not-change-explicit-graph
unknown-successor-rejected
missing-successor-rejected-for-nonterminal
explicit-terminal-accepted
unknown-saved-scene-reconciled
route-history-validates-against-graph
```
