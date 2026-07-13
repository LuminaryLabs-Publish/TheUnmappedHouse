# START HERE: The Unmapped House Scene Progression and Interlude Authority

Last updated: `2026-07-12T20-51-16-04-00`

## Summary

`TheUnmappedHouse` is a fixed-camera anime-horror point-and-click prototype with three authored scenes, nine hotspots, local browser persistence, a fixed 16:9 shell and a descriptor-driven Three.js stage.

The current audit isolates scene-completion and interlude admission. The Continue button remains focusable while its overlay is visually hidden, `nextScene()` does not require completion or an open interlude, the 450 ms completion callback reads mutable `currentScene`, and progression phase is not persisted. A keyboard activation can skip incomplete scenes, a stale timer can open the wrong interlude, and a reload after completion can leave the normal pointer path unable to continue.

## Plan ledger

**Goal:** make completion, interlude opening, Continue, scene advancement, focus transfer, reload recovery and terminal projection one revisioned, exactly-once progression transaction.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheUnmappedHouse`, the oldest eligible central entry.
- [x] Trace boot, inspection, completion timer, hidden Continue, focus, reload, scene transition and terminal behavior.
- [x] Identify the complete interaction loop, all active domains, all 24 implemented kits and every offered service.
- [x] Define scene-phase, timer-lease, Continue-admission, modal-focus, persistence-reconciliation and visible-frame contracts.
- [x] Add a timestamped tracker and architecture/system audit family.
- [x] Refresh all required root `.agent` files and the machine registry.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable progression fixtures remain future work.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
unsynchronized eligible repositories: 0

TheUnmappedHouse   2026-07-12T19-11-01-04-00 selected
AetherVale         2026-07-12T19-21-29-04-00
TheOpenAbove       2026-07-12T19-31-06-04-00
IntoTheMeadow      2026-07-12T19-49-41-04-00
PhantomCommand     2026-07-12T19-58-07-04-00
PrehistoricRush    2026-07-12T20-10-25-04-00
HorrorCorridor     2026-07-12T20-20-02-04-00
ZombieOrchard      2026-07-12T20-31-27-04-00
MyCozyIsland       2026-07-12T20-40-56-04-00
TheCavalryOfRome   excluded
```

## Active progression loop

```txt
boot
  -> parse and shallow-merge saved state
  -> resolve currentScene
  -> construct StageKit and load the current scene
  -> render controls and Notebook
  -> save state
  -> no persisted progression phase is reconciled

first inspection of a hotspot
  -> mark inspected
  -> grant clues
  -> update narrative and Notebook
  -> when complete, schedule a 450 ms callback
  -> render and save before the callback executes

completion callback
  -> read the mutable currentScene variable
  -> open an interlude without command identity, generation or focus transfer

Continue
  -> activate a button that always remains in the DOM
  -> nextScene performs no completion, phase or interlude-open check
  -> mutate sceneId and route
  -> load the successor and save

reload after completion
  -> restore complete clue and inspection state
  -> restore no COMPLETION_PENDING or INTERLUDE_OPEN phase
  -> schedule no replacement timer
  -> leave the visible interlude closed
```

## Main findings

1. `.interlude` uses opacity and `pointer-events`, but the nested Continue button is never disabled, hidden or made inert. `aria-hidden` does not itself remove a descendant from keyboard focus.
2. `nextScene()` does not verify `sceneComplete(currentScene)` or that the interlude is open. Hidden keyboard activation can advance through incomplete scenes.
3. `setTimeout(() => showInterlude(currentScene), 450)` reads the current variable at callback time. If a bypass advances first, the predecessor completion callback can open the successor interlude.
4. The save contains clues, inspected state and route but no progression phase, pending timer identity, open-interlude state or terminal outcome.
5. Reloading after the final required clue but before Continue restores a complete scene with a closed overlay and no new timer. The ordinary pointer path has no visible Continue control.
6. Opening the interlude does not move focus, trap focus or make the story panel inert. Keyboard interaction can continue behind the visible overlay.
7. Final completion is only DOM copy. No persisted terminal phase prevents replay or proves the terminal frame.

## Required authority

```txt
the-unmapped-house-scene-progression-interlude-authority-domain
```

It must own story-run identity, scene and route revisions, an explicit scene phase, completion candidates, cancellable timer leases, stale-callback rejection, exact Continue admission, modal focus and inertness, persisted phase reconciliation, exact-once scene advancement, terminal outcome, typed results, bounded observations and first-visible-frame acknowledgements.

## Read order

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-12T20-51-16-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-12T20-51-16-04-00-scene-progression-interlude-dsk-map.md`
5. `progression-audit/2026-07-12T20-51-16-04-00-completion-timer-phase-persistence-contract.md`
6. `interaction-audit/2026-07-12T20-51-16-04-00-hidden-continue-focus-admission-map.md`
7. `gameplay-audit/2026-07-12T20-51-16-04-00-completion-continue-reload-loop.md`
8. `render-audit/2026-07-12T20-51-16-04-00-interlude-phase-visible-frame-gap.md`
9. `next-steps.md`
10. `validation.md`

## Next safe ledge

Introduce a pure `deriveProgressionPhase(snapshot, manifest)` function and make Continue accept a typed command carrying the expected scene ID, scene revision and phase. Before changing story content, add a browser fixture proving that a hidden Continue cannot be focused or activated and that reload after completion deterministically restores the interlude.
