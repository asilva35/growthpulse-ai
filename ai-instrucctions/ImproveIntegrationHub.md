# Task: Fix IntegrationHub Card Centering & Alignment

The tool cards in the IntegrationHub are currently off-center because their top-left corner is being positioned at the (x, y) coordinates instead of their center. 

## 1. Positioning Fix
- Apply a centering transform to the motion.div that holds the "Tool Card".
- Update the `animate` prop or the `style` to include: `translateX(-50%)` and `translateY(-50%)`.
- This ensures the center of the 128px wide card aligns perfectly with the end of the connection line.

## 2. Dynamic Connection Lines (Refactor)
- The current `<svg>` uses hardcoded `radius + 200` values which cause alignment issues on different screen sizes.
- Refactor the SVG to use a single `viewBox="0 0 600 600"` and center the coordinates at `(300, 300)`.
- Ensure the `path` starts at `(300, 300)` and ends at `(300 + x, 300 + y)`.

## 3. UI Refinement
- Adjust the `angle` of the tools so the first one (HubSpot) starts at `-90` degrees (top center) instead of `0` degrees (right side). This creates a more natural "orbital" look.
- Increase the `radius` to `240` to give the cards more breathing room around the central hub.