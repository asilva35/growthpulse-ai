# GrowthPulse AI 🧬

[![Vercel Deployment](https://img.shields.io/badge/Live-Demo-brightgreen)](https://growthpulse-ai-one.vercel.app/)
[![Stack: Next.js 15](https://img.shields.io/badge/Stack-Next.js%2015-black)](https://nextjs.org/)
[![UI: Tailwind/Framer](https://img.shields.io/badge/UI-Tailwind%20%2F%20Framer-blue)](https://tailwindcss.com/)

> **Your marketing stack, diagnosed in minutes.**

GrowthPulse AI is a high-performance diagnostic platform designed for modern growth teams. It automates the analysis of marketing ecosystems across **7 key growth dimensions**, uncovering hidden inefficiencies and generating prioritized 90-day action plans via seamless API integrations.

---

## 1. Product Brief & Core Value
GrowthPulse AI acts as "the honest friend who reads your dashboards." Instead of fragmented data, it provides a unified **Growth Score** and a board-ready executive summary. 

**Core Value Proposition:**
- **Automated Diagnostics:** Real-time analysis of Revenue, Acquisition, Activation, Retention, Paid Media Efficiency, Referral, and SEO Health.
- **Priority-Driven:** An AI engine that ranks tasks by **Impact vs. Effort**.
- **Instant Connectivity:** OAuth-driven integrations with HubSpot, GA4, Meta Ads, Klaviyo, and more.

---

## 2. Architecture Overview
GrowthPulse AI is built on a "Lean Enterprise" stack, prioritizing speed, scalability, and marketing agility.

### **The Full-Stack Ecosystem**
- **Frontend:** **Next.js (App Router)** for optimized performance and SEO.
- **Styling & Motion:** **Tailwind CSS** for design system consistency and **Framer Motion** for premium, high-fidelity micro-interactions (e.g., the Aurora Background and Integration Hub).
- **Icons:** **Lucide Icons** for a crisp, professional UI.
- **Marketing Ops Engine:** **n8n** handles the server-side validation and workflow orchestration, acting as the bridge between the frontend and data layers.
- **Lead Management (Persistence):** **Airtable** serves as the agile Lead Management System (LMS), allowing for rapid iteration without the overhead of a full SQL database.
- **Measurement Layer:** **Google Tag Manager (GTM)** for event orchestration and **Google Analytics 4 (GA4)** for deep-dive behavioral data visualization.

---

## 3. AI Tools & "Vibe Coding" Workflow
This project was developed using a **"Vibe Coding"** methodology—leveraging state-of-the-art AI to move from raw concepts to production-grade components in record time.

- **AI Suite:** Claude 3.5 Sonnet, Gemini 1.5 Pro, and **Antigravity** (Agentic IDE).
- **Execution:** AI enabled the rapid prototyping of complex data visualizations like the **Integration Hub** and the **Impact/Effort Matrix**. By focusing on "vibe" and architectural intent, we maintained high code quality while iterating hundreds of times faster than traditional development cycles.

---

## 4. Setup & Deployment

### **Prerequisites**
- Node.js 18.x or later
- npm / pnpm / yarn

### **Local Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/growthpulse-ai.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env` file in the root directory:
   ```env
   NEXT_FREE_DIAGNOSTIC_URL=your_n8n_webhook_url_here
   NEXT_CONTACT_URL=your_n8n_webhook_url_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### **Deployment**
The site is optimized for **Vercel** and is currently live at:  
[https://growthpulse-ai-one.vercel.app/](https://growthpulse-ai-one.vercel.app/)

Optimize version for production:
[https://growthpulse-ai-one.vercel.app/optimize](https://growthpulse-ai-one.vercel.app/optimize)

---

## 5. Strategic Decisions & Trade-offs
A "Systems Architect" approach was taken to balance agility with enterprise requirements.

| Decision | Rationale |
| :--- | :--- |
| **GTM vs. Hardcoded Scripts** | GTM was chosen to decouple tracking logic from the codebase, allowing marketing teams to manage events without developer intervention, ensuring long-term scalability. |
| **localStorage A/B Persistence** | Using `localStorage` for variant persistence ensures a consistent user experience (UX) with zero latency. While edge-side testing (Middleware) is an alternative, the client-side approach minimized initial implementation time for the MVP. |
| **Airtable vs. Full CRM** | Airtable was selected for its extreme agility. It allows for instant schema changes and seamless integration with n8n, providing 80% of a CRM's value at 20% of the complexity. |

---

## 6. Analytics Implementation
We monitor the growth funnel using custom event tracking orchestrated through the GTM Data Layer.

### **Custom Events**
- **`cta_click`**: Triggered whenever a user interacts with a primary CTA (Hero, Pricing, or Nav).
  - *Context:* Includes `variant` (A or B) and `button_location`.
- **`lead_submission_success`**: Triggered upon successful POST to the n8n webhook.
  - *Context:* Categorized by form type (`diagnostic` vs `contact`).

---

*Built with precision and high-performance growth in mind.*
