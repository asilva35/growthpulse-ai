# Role: Marketing Systems Architect & Vibe Coder
Act as an expert frontend developer and marketing engineer. Your goal is to build a high-converting landing page for "GrowthPulse AI" based on the following technical and strategic requirements.

## 1. Product Identity & Design Language
- [cite_start]**Product Name:** GrowthPulse AI[cite: 13].
- [cite_start]**Tagline:** Your marketing stack, diagnosed in minutes[cite: 14].
- **Tone:** Confident, data-driven, slightly provocative. [cite_start]"The honest friend who reads your dashboards"[cite: 43].
- **Visuals:** Abstract visuals, data visualizations, or illustrations only. [cite_start]**NO stock photography of people**[cite: 44].
- [cite_start]**Tech Stack:** Next.js, Tailwind CSS, Shadcn/UI[cite: 76].

## 2. Page Structure (Required Sections)
Build the following sections using the exact data provided:

### A. Hero Section
- [cite_start]**Content:** Value proposition and primary CTA (e.g., "Get Your Free Diagnostic")[cite: 48].
- [cite_start]**A/B Test:** Implement a simple logic to toggle between two headline variants to demonstrate A/B testing capability[cite: 58].

### [cite_start]B. Features Section (Use all five) [cite: 26]
1. [cite_start]**One-Click Stack Integration:** Connects to HubSpot, Google Analytics, Meta Ads, etc., in under 5 minutes[cite: 28].
2. [cite_start]**7-Dimension Growth Score:** Proprietary scoring (0-100) with industry benchmarks[cite: 29].
3. [cite_start]**AI-Generated Action Plan:** Prioritized 90-day roadmap based on impact/effort[cite: 30].
4. [cite_start]**Executive Summary Report:** Auto-generated board-ready PDFs[cite: 31].
5. [cite_start]**Live Dashboard:** Real-time monitoring and performance alerts[cite: 32].

### C. Social Proof
- [cite_start]**Stats:** 500+ companies audited, 32% avg ROI improvement, 4.8/5 rating[cite: 38].
- **Testimonial:** "Growth Pulse found $140K in wasted ad spend we didn't know about." - [cite_start]VP Marketing (Fictional)[cite: 36].
- [cite_start]**Logos:** Place 3 fictional customer logos[cite: 37].

### [cite_start]D. Pricing Section (3 Tiers) [cite: 34]
- **Starter ($499/mo):** 5 Integrations, Monthly reports, 2 seats, Email support.
- **Growth ($1,299/mo):** 15 Integrations, Weekly reports, 5 seats, Priority support.
- **Scale ($2,999/mo):** Unlimited integrations, Daily reports + alerts, Unlimited seats, Dedicated manager.

### E. Lead Capture Form
- [cite_start]Collect: Name, Email, and a qualifying field (e.g., "Company ARR" or "Current Ad Spend")[cite: 51].
- [cite_start]Logic: Implement client-side validation and a "Thank You" modal/page[cite: 51, 52].

## 3. Technical & Marketing Requirements
- [cite_start]**UTM Handling:** Capture UTM parameters from the URL (source, medium, campaign) and ensure they are included in the form submission data[cite: 56].
- [cite_start]**Data Persistence:** Mock a serverless function to store lead data (simulate a database or Airtable submission)[cite: 53, 77].
- **Analytics:** Integrate a tracking script (mock GA4 or PostHog). [cite_start]Track: CTA clicks, Form starts, and Scroll depth[cite: 55].
- [cite_start]**SEO:** Implement proper Meta tags and Open Graph tags for social sharing[cite: 64].
- [cite_start]**Performance:** Ensure mobile responsiveness and semantic HTML structure[cite: 62, 65].