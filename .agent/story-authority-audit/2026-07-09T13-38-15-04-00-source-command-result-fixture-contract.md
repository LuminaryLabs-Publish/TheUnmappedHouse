# Source Command Result Fixture Contract

**Repository:** `LuminaryLabs-Publish/TheUnmappedHouse`

**Timestamp:** `2026-07-09T13-38-15-04-00`

## Contract target

Move story authority into pure records before browser wiring.

The browser route should consume command results and adapter plans; it should not remain the only source of truth for mutation, save intent, interlude intent, stage projection, and debug output.

## Required source records

```txt
StorySourceManifest
StoryCommandEnvelope
StorySourceSnapshot
StoryStateSnapshot
StageSceneSnapshot
StoryPreflight
StoryCommandResult
StoryEventRecord
StoryProjection
SaveProjection
InterludeProjection
StageProjection
StoryBrowserAdapterPlan
BrowserAdapterReadback
GameHostStoryDiagnostics
RepoLocalLedgerReadback
CentralLedgerReadback
```

## Result shape expectations

```txt
id
commandId
accepted
mutated
reason
before
preflight
events
after
projection
adapterPlan
fixtureAssertions
compatibilityText
```

## Must preserve compatibility

```txt
current SAVE_KEY
current route path
current story copy
current scene ids
current hotspot ids
current completion clue requirements
current interlude behavior
current StageKit public callback behavior
current KeyR reset behavior until reset intent is wired safely
current debug panel content shape until GameHost diagnostics is additive
```

## Initial fixture rows

```txt
inspect first hotspot -> accepted + mutated + clue grant + save intent
repeat hotspot -> accepted + no_mutation + compatibility log/text
complete scene -> accepted + interlude intent
continue to next scene -> accepted + stage projection + route mutation
terminal continue -> accepted + terminal_complete + no next scene mutation
bad hotspot -> rejected + no mutation
corrupted save -> fallback + no throw
ledger readback -> repo-local and central pointers consistent
```

## Completion rule

This gate is complete only when the fixture proves command/result behavior without DOM, Three.js, localStorage, timers, or browser state.
