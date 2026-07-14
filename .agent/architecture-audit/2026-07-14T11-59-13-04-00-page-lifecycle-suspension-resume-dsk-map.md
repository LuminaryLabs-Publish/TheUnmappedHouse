# Architecture audit: page lifecycle suspension and resume DSK map

**Timestamp:** `2026-07-14T11-59-13-04-00`

## Summary

The runtime composes story, DOM, persistence and WebGL participants directly at module boot. Browser lifecycle changes are currently ambient platform behavior rather than admitted domain events.

## Plan ledger

**Goal:** introduce one parent authority that coordinates suspension and restoration without restructuring the existing story or rendering domains.

- [x] Map current participants and ownership.
- [x] Identify missing lifecycle identities, commands and receipts.
- [x] Preserve all current kit boundaries.
- [x] Define the minimal coordinating DSK family.
- [ ] Implement and prove the family.

## Current domain graph

```txt
browser document
  -> browser-story-runtime-kit
     -> story-data-kit
     -> scene-route-kit
     -> clue and inspection ledgers
     -> notebook-log-kit
     -> interlude-timer-kit
     -> localstorage-save-kit
  -> StageKit
     -> aspect-frame-kit
     -> stage-render-kit
     -> scene-descriptor-consumer-kit
     -> anime-material-kit
     -> render-target-composition-kit
     -> hotspot-volume-kit
     -> hotspot-picking-kit
     -> camera-parallax-kit
  -> recursive RAF
```

## Missing parent authority

```txt
the-unmapped-house-page-lifecycle-suspension-resume-authority-domain
```

## Proposed coordinating surfaces

| Surface | Responsibility |
|---|---|
| `page-lifecycle-event-kit` | Normalize visibility, pagehide/pageshow, freeze and resume signals. |
| `document-generation-kit` | Identify one active document generation. |
| `lifecycle-attempt-identity-kit` | Deduplicate and supersede lifecycle work. |
| `render-submission-lease-kit` | Own, retire and resume one RAF generation. |
| `stage-clock-policy-kit` | Pause, carry or rebase visual elapsed time. |
| `interlude-timer-checkpoint-kit` | Capture pending completion timing and remaining delay. |
| `story-checkpoint-kit` | Persist accepted story truth without new gameplay effects. |
| `interaction-suspension-kit` | Suspend stage-dependent input while unavailable. |
| `page-restore-admission-kit` | Validate a restored document before reuse. |
| `webgl-resource-revalidation-kit` | Probe renderer, context, target and scene participants. |
| `viewport-revalidation-kit` | Recompute and identify the accepted aspect frame. |
| `listener-ownership-kit` | Prevent duplicate resize, pointer, click and lifecycle listeners. |
| `stage-resume-candidate-kit` | Prepare replacement participants when reuse is unsafe. |
| `stage-resume-adoption-kit` | Adopt one complete restored participant set. |
| `stage-resume-rollback-kit` | Preserve the prior suspended state if preparation fails. |
| `page-lifecycle-result-kit` | Publish typed suspend and resume outcomes. |
| `first-resumed-stage-frame-ack-kit` | Prove the first matching resumed frame. |
| `lifecycle-diagnostics-kit` | Expose current lifecycle, lease, timer and frame revisions. |
| `lifecycle-fixture-matrix-kit` | Exercise hidden, freeze, BFCache and restore cases. |
| `lifecycle-source-pages-parity-kit` | Compare source and deployed lifecycle behavior. |
| `lifecycle-failure-projection-kit` | Present recoverable DOM fallback when stage resume fails. |
| `lifecycle-cancellation-kit` | Cancel stale or superseded restore attempts. |

```txt
planned coordinating surfaces: 22
```

## Required invariants

```txt
one active DocumentGeneration
one accepted render-submission lease
no duplicate RAF generation after restore
no gameplay mutation caused only by lifecycle transition
pending interlude has one timer identity and policy
restored resources are validated before interaction resumes
clock behavior is explicit and revisioned
first resumed frame cites story, scene, viewport and stage revisions
```

## Composition boundary

This domain coordinates existing kits. It does not replace story progression, save admission, scene transition, viewport, WebGL recovery or terminal outcome authorities.