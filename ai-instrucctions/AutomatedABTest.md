# Task: Automated A/B Testing Logic for Hero Section

Refactor the current Hero component to implement a real A/B test instead of a manual toggle button. Follow these requirements:

1. **A/B Logic:**
   - Use `Math.random()` to assign the user to either 'Variant A' or 'Variant B' upon their first visit.
   - **Variant A (Control):** Headline: "Your marketing stack, diagnosed in minutes."
   - **Variant B (Test):** Headline: "Stop wasting ad spend. Get your Growth Score now."

2. **Persistence:**
   - Use `localStorage` to save the assigned variant. 
   - Ensure that if a user refreshes the page, they continue to see the same variant.
   - Use a `useEffect` hook to handle the random assignment and hydration to avoid Next.js flickering/hydration errors.

3. **Tracking Integration:**
   - Log the assigned variant to the console (simulating an analytics event like `track('Experiment Viewed', { variant: 'B' })`).
   - Ensure the variant ID is available to be sent along with the Lead Capture form submission as a hidden field.

4. **UI Cleanup:**
   - Remove the manual toggle button from the navigation bar. The test must be invisible to the user but functional for the architect.