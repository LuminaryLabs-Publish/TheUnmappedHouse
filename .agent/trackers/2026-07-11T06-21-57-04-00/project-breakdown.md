# Project breakdown: The Unmapped House

Timestamp: `2026-07-11T06-21-57-04-00`

## Goal

Define one scene-scoped inspection authority so side-panel buttons and Three.js raycasts cannot mutate clues, completion, notebook state or persistence from stale, forged or duplicate hotspot payloads.

## Plan ledger

- [x] Enumerate the ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare the nine eligible repositories with `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Confirm all eligible repositories are centrally tracked and have root `.agent` state.
- [x] Select only `TheUnmappedHouse` using the oldest documented-selection rule.
- [x] Read the active story, browser interaction, StageKit, render and validation paths.
- [x] Identify the interaction loop.
- [x] Identify active and missing domains.
- [x] Catalog all current kits and services.
- [x] Trace side-panel and raycast inspection ingress through clue, completion, UI and save effects.
- [x] Document stale-scene, forged-payload, duplicate-command and render-correlation gaps.
- [x] Define the scene/hotspot authority DSK boundary and fixture rows.
- [x] Add architecture, render, gameplay, interaction, hotspot-authority and deploy audits.
- [x] Refresh the required root `.agent` documents.
- [x] Push only to `main` and create no branch or pull request.
- [x] Update the central repository ledger and internal change log.

## Selection result

```txt
TheUnmappedHouse selected
reason: oldest eligible central ledger timestamp
prior central timestamp: 2026-07-11T04-00-07-04-00
new, missing-ledger, missing-.agent candidates: none
TheCavalryOfRome: excluded
```

## Main finding

`inspectHotspot(hotspot)` accepts a descriptor object from either a DOM closure or a mesh `userData` field. It does not verify scene identity, hotspot membership, story phase, story revision, stage epoch, input source, command sequence or duplicate request identity before mutating the current scene's inspection map and the global clue list.

The mutation chain is direct:

```txt
DOM button closure or raycast mesh descriptor
  -> inspectHotspot(descriptor)
  -> currentScene-keyed inspected mutation
  -> global clue grants
  -> scene completion evaluation
  -> delayed interlude scheduling
  -> DOM projection
  -> localStorage write
```

A stale descriptor can therefore be applied under a newer `currentScene`, while duplicate admissions can create repeated log/save effects with no typed result or causal receipt.

## Next safe ledge

```txt
TheUnmappedHouse Inspection Command Authority
+ Scene/Hotspot/Clue and Dual-Ingress Fixture Gate
```
