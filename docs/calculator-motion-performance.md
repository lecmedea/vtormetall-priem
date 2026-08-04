# Calculator motion and performance

## Motion tokens

| Token | Value | Easing | Used for |
| --- | --- | --- | --- |
| `--motion-fast` | 200ms | ease-out | banner hover and focus feedback |
| `--motion-base` | 360ms | ease-out | reserved for future screen state transitions |
| `--motion-slow` | 720ms | custom deceleration | one-shot scrap drop after a filter changes |

## Interaction inventory

| Interaction | Trigger | Motion | Purpose |
| --- | --- | --- | --- |
| Calculator banner | hover or keyboard focus | 4px lift plus brighter border | confirms that the banner opens the calculator |
| Scrap sample | category, quality, weight or contamination change | one drop and short settle using transform/opacity | connects changed filters to recalculated weight |
| Weight and amount | any calculator change | immediate text and color update | keeps feedback available without motion |

Reduced-motion mode removes the drop and hover travel. No continuous decorative animation is used in the calculator.

## Performance audit

| Finding | Fix | Status |
| --- | --- | --- |
| Large calculator imagery could cause layout shift | intrinsic dimensions and fixed aspect ratio | implemented |
| Banner is below the initial viewport | native lazy loading and async decoding | implemented |
| Live source could delay calculation | bundled price fallback renders immediately; remote data replaces it in the background | implemented |
| Source outage could break the UI | server route returns the last bundled dataset and CDN allows stale data during revalidation | implemented |
| Motion could cause main-thread jank | animation uses only transform and opacity | implemented |

LCP, INP and CLS were not measured locally because the remote hosting build was still pending. Verify the deployed `/ceny` route with Lighthouse after publication.
