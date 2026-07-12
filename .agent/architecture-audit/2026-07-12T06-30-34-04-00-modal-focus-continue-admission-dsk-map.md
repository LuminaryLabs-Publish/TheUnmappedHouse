# Architecture audit: modal focus and Continue admission DSK map

**Timestamp:** `2026-07-12T06-30-34-04-00`  
**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

## Summary

The current implementation splits modal appearance, focus behavior and story transition across static markup, CSS and direct event handlers without a shared authority. This audit defines the missing parent domain and candidate kits.

## Plan ledger

**Goal:** establish one DSK boundary from scene-completion proof through modal generation, focus lease, Continue admission and transition handoff.

- [x] Map current markup, CSS, story and interaction ownership.
- [x] Separate visual state from keyboard and semantic state.
- [x] Identify command, result, generation and proof requirements.
- [x] Define pure-domain and browser-adapter kit boundaries.
- [ ] Implement the DSK.

## Current ownership split

```txt
index.html
  -> always-mounted interlude and Continue button

styles.css
  -> opacity and pointer-events state

game.js
  -> completion timing
  -> aria-hidden mutation
  -> Continue listener
  -> direct nextScene transition

browser native behavior
  -> sequential focus
  -> Enter/Space click synthesis
```

No owner observes and commits these as one modal state.

## Parent domain

```txt
the-unmapped-house-modal-focus-continue-admission-authority-domain
```

## Atomic state kits

```txt
modal-state-kit
modal-generation-kit
focus-origin-capture-kit
continue-capability-kit
scene-completion-proof-consumption-kit
```

## Command and result kits

```txt
modal-open-command-kit
modal-close-command-kit
continue-command-kit
continue-command-admission-kit
modal-command-result-kit
```

## Browser adapter kits

```txt
modal-visibility-adapter-kit
hidden-control-inertness-kit
modal-focus-entry-kit
modal-focus-trap-kit
modal-focus-return-kit
background-interaction-suspension-kit
```

## Observation and proof kits

```txt
modal-focus-observation-kit
modal-focus-journal-kit
hidden-continue-fixture-kit
open-modal-background-activation-fixture-kit
keyboard-modal-browser-smoke-kit
screen-reader-modal-contract-fixture-kit
```

## Command contract

```txt
ContinueCommand
  commandId
  runtimeSessionId
  sceneId
  completionProofId
  modalGeneration
  focusLeaseId
  requestedAtMs
```

## Result contract

```txt
ModalContinueResult
  commandId
  status
  sceneId
  modalGeneration
  completionProofId
  proofConsumed
  transitionCommandId
  reason
  resolvedAtMs
```

## Admission sequence

```txt
completion proof
  -> OpenInterludeCommand
  -> validate current runtime and scene
  -> capture focus origin
  -> create modal generation
  -> commit DOM visibility and semantics
  -> inert background
  -> focus Continue
  -> publish open result

Continue activation
  -> normalize to ContinueCommand
  -> validate modal generation and focus lease
  -> validate current unconsumed completion proof
  -> reject hidden/stale/duplicate requests
  -> consume proof
  -> hand off to atomic transition authority
  -> retire modal and focus lease
  -> publish terminal result
```

## Dependency order

```txt
StoryManifest
  -> StorySnapshot
  -> Inspection receipts
  -> SceneCompletionProof
  -> Modal Focus and Continue Admission
  -> Atomic Continue Transition
  -> Narrative and committed-frame correlation
```

## Completion boundary

The authority is not complete until pure fixtures and browser keyboard tests prove that closed Continue is unreachable, open modal focus is isolated and one completion proof authorizes at most one transition.
