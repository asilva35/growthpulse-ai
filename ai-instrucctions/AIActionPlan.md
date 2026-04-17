# Task: Interactive AI-Generated Action Plan Section

Build a section that visualizes the "90-day roadmap" and the "Impact vs. Effort" prioritization logic. This should feel like a premium AI output, not just a list.

## 1. Visual Component: The Impact/Effort Matrix
- **Chart Type:** Create a 2x2 Matrix (Quadrant Chart) using Tailwind or a simple SVG.
- **Axes:** Y-axis is "Impact" (Low to High), X-axis is "Effort" (Low to High).
- **Data Points:** Place 4-5 "Task Bubbles" on the chart:
    - **Quick Wins (High Impact / Low Effort):** e.g., "Fix Checkout Latency", "Optimize Meta Ad Creative".
    - **Big Bets (High Impact / High Effort):** e.g., "Deploy Multi-touch Attribution".
    - **Fill-ins (Low Impact / Low Effort):** e.g., "Update Meta Tags".
- **Animation:** Use Framer Motion to make the bubbles "pop" into the chart one by one, as if the AI is generating them in real-time.

## 2. The 90-Day Roadmap (Stepper/Timeline)
- Below or beside the matrix, create a clean "Vertical Stepper" or "Timeline" showing the roadmap phases:
    - **Days 1-30: Foundation & Quick Wins** (Focus on high impact/low effort).
    - **Days 31-60: Scaling & Optimization.**
    - **Days 61-90: Advanced Growth Loops.**

## 3. Copy & Content
- **Main Headline:** AI-Generated Action Plan.
- **Sub-headline:** Produces a prioritized 90-day roadmap with specific recommendations ranked by expected impact and effort.
- **Feature Highlight:** Add a "Download Executive PDF" button placeholder to hint at the "Executive Summary Report" feature from the brief.

## 4. Visual Style & Vibe
- **Color Coding:** Use a "Heatmap" logic (Green for high impact, Red/Grey for high effort).
- **Typography:** Keep using the Monospace font for the "Impact/Effort" scores (e.g., "Score: 9.4/10").
- **Theme:** Dark mode background with subtle glows behind the "High Impact" quadrant to draw the user's eye.

## 5. Technical Requirements
- Use `framer-motion` for the quadrant animations.
- Ensure the layout is responsive (Matrix on top, Timeline below on mobile).