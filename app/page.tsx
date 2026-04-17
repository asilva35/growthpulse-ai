"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Mail,
  User,
  DollarSign,
  TrendingUp,
  Share2,
  CheckCircle2,
  Activity,
  ArrowRight,
  LineChart,
  Zap,
  Globe,
  PieChart,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { AuroraBackground } from "@/components/ui/aurora-background";


function LeadFormDialog({ isOpen, onOpenChange, variant }: { isOpen: boolean, onOpenChange: (open: boolean) => void, variant: "A" | "B" }) {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track form submission with variant
    console.log("[Analytics] Form Submitted", { variant });

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      adSpend: formData.get("adSpend"),
      variant: formData.get("variant"), // From hidden field
      utm_source: searchParams.get("utm_source") || "direct",
      utm_medium: searchParams.get("utm_medium") || "none",
      utm_campaign: searchParams.get("utm_campaign") || "none",
    };

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("[Data Persistence] Lead captured (A/B Test):", data);

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) setTimeout(() => setIsSuccess(false), 300);
    }}>
      <DialogContent className="sm:max-w-[425px] bg-neutral-900 border-neutral-800 text-white">
        <DialogHeader>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl font-bold tracking-tight"
          >
            {isSuccess ? "Diagnostic Initiated" : "Get Your Free Diagnostic"}
          </motion.h2>
          <div className="text-neutral-400 text-sm">
            {isSuccess
              ? "Check your email. We&apos;re connecting to your stack now."
              : "Connect your tools and find hidden ROI in minutes."}
          </div>

        </DialogHeader>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="space-y-4 mt-4"
            >
              <input type="hidden" name="variant" value={variant} />
              <div className="space-y-2">
                <Label htmlFor="name" className="text-neutral-300">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                  <Input id="name" name="name" required className="pl-9 bg-neutral-950 border-neutral-800 text-white placeholder:text-neutral-600 focus-visible:ring-emerald-500" placeholder="Jane Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-neutral-300">Work Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                  <Input id="email" name="email" type="email" required className="pl-9 bg-neutral-950 border-neutral-800 text-white placeholder:text-neutral-600 focus-visible:ring-emerald-500" placeholder="jane@company.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="adSpend" className="text-neutral-300">Monthly Ad Spend</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                  <select
                    id="adSpend"
                    name="adSpend"
                    required
                    className="flex h-9 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1 pl-9 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 md:text-sm appearance-none text-neutral-200"
                  >
                    <option value="" disabled selected>Select an option</option>
                    <option value="<10k">Less than $10k</option>
                    <option value="10k-50k">$10k - $50k</option>
                    <option value="50k-250k">$50k - $250k</option>
                    <option value="250k+">$250k+</option>
                  </select>
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white transition-all mt-6">
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <Settings className="w-4 h-4" />
                  </motion.div>
                ) : "Run Diagnostic"}
              </Button>
              <p className="text-xs text-center text-neutral-500 mt-4">100% data privacy. No credit card required.</p>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-medium tracking-tight">Audit in progress</h3>
              <p className="text-sm text-neutral-400 max-w-sm">
                We&apos;re currently connecting to your data sources. You&apos;ll receive your 90-day action plan in your inbox shortly.
              </p>

              <Button variant="outline" className="mt-8 border-neutral-700 hover:bg-neutral-800" onClick={() => onOpenChange(false)}>
                Close Window
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}


function DimensionCard({ title, children, className, delay = 0 }: { title: string, children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`relative group h-full bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-6 hover:border-emerald-500/30 transition-all overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">{title}</h3>
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}

function AcquisitionWidget() {
  return (
    <div className="flex items-end gap-1.5 h-16 mt-2">
      {[40, 60, 45, 80, 55, 90, 75].map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
          className="flex-1 bg-blue-500/40 border-t border-blue-400/50 rounded-t-sm"
        />
      ))}
    </div>
  );
}

function ActivationWidget() {
  return (
    <div className="flex items-center justify-center h-full -mt-4">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="45"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="8"
            className="text-neutral-800"
          />
          <motion.circle
            cx="50" cy="50" r="45"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray="283"
            initial={{ strokeDashoffset: 283 }}
            whileInView={{ strokeDashoffset: 283 - (283 * 0.85) }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
            className="text-emerald-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold font-mono">85%</span>
          <span className="text-[10px] text-neutral-500">READY</span>
        </div>
      </div>
    </div>
  );
}

function RetentionWidget() {
  const opacities = Array.from({ length: 16 }).map((_, i) => ((i * 7) % 10) / 10 * 0.8 + 0.1);
  return (
    <div className="grid grid-cols-4 gap-1 mt-2 opacity-80">
      {opacities.map((opacity, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity }}
          transition={{ delay: i * 0.05 }}
          className="aspect-square rounded-[2px] bg-purple-500"
        />
      ))}
    </div>
  );
}


function SEOHealthWidget() {
  return (
    <div className="space-y-4 mt-2">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-4xl font-bold font-mono text-emerald-400">92<span className="text-lg text-neutral-600">/100</span></span>
        <Badge className="bg-emerald-500/20 text-emerald-500 border-none hover:bg-emerald-500/20">Optimal</Badge>
      </div>
      <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "92%" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-emerald-500 h-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}

function PaidMediaWidget() {
  const [activeTab, setActiveTab] = useState<"spent" | "earned">("spent");
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-neutral-950 p-1 rounded-lg border border-neutral-800">
        <button
          onClick={() => setActiveTab("spent")}
          className={`flex-1 text-[10px] py-1 rounded-md transition-all ${activeTab === "spent" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300"}`}
        >
          Spent
        </button>
        <button
          onClick={() => setActiveTab("earned")}
          className={`flex-1 text-[10px] py-1 rounded-md transition-all ${activeTab === "earned" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300"}`}
        >
          Earned
        </button>
      </div>
      <div className="text-center py-2">
        <motion.p
          key={activeTab}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-3xl font-bold font-mono"
        >
          {activeTab === "spent" ? "$12,450" : "$52,290"}
        </motion.p>
        <p className="text-[10px] text-neutral-500 flex items-center justify-center gap-1 mt-1">
          <TrendingUp className="w-3 h-3 text-emerald-500" />
          4.2X ROAS
        </p>
      </div>
    </div>
  );
}

function MainContent() {
  const [headlineVariant, setHeadlineVariant] = useState<"A" | "B">("A");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolledPos, setScrolledPos] = useState(0);

  // A/B Test Logic with Persistence
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedVariant = localStorage.getItem("gp_hero_variant");

    const assigned = storedVariant === "A" || storedVariant === "B"
      ? (storedVariant as "A" | "B")
      : (Math.random() > 0.5 ? "B" : "A");

    if (!storedVariant) {
      localStorage.setItem("gp_hero_variant", assigned);
    }

    console.log(`[Analytics] Experiment Viewed (${storedVariant ? "Existing" : "New"}):`, {
      experiment: "Hero Headline Test",
      variant: assigned
    });

    // Use setTimeout to avoid synchronous cascading render warning
    const timer = setTimeout(() => setHeadlineVariant(assigned), 0);
    return () => clearTimeout(timer);
  }, []);



  // Scroll tracking mock analytics
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrolledPos(Math.round(scrolled));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrolledPos === 50) console.log("[Analytics] Scroll Depth: 50%");
    if (scrolledPos === 90) console.log("[Analytics] Scroll Depth: 90%");
  }, [scrolledPos]);

  const handleCTA = () => {
    console.log("[Analytics] CTA Clicked:", { variant: headlineVariant });
    setIsModalOpen(true);
  };


  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-emerald-500/30 font-sans overflow-x-hidden">
      {/* Navbar overlay */}
      <nav className="fixed top-0 inset-x-0 h-16 border-b border-white/5 bg-neutral-950/50 backdrop-blur-md z-50 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <Activity className="w-5 h-5 text-emerald-500" />
          <span>GrowthPulse AI</span>
        </div>
        <div className="flex items-center gap-4">
          <Button size="lg" className="bg-transparent border-solid border-2 border-emerald-600 text-emerald-600 hover:text-black hover:bg-white hover:border-white cursor-pointer font-semibold" onClick={handleCTA}>
            Get a Diagnostic
          </Button>
        </div>

      </nav>

      {/* Hero Section */}
      <AuroraBackground>
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 flex flex-col items-center text-center overflow-hidden">
          {/* Abstract Background Viz */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none blur-3xl opacity-50" />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 px-8 py-4 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl flex items-center gap-4 group hover:border-emerald-500/40 transition-colors cursor-default"
          >
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
            </span>
            <span className="text-xl md:text-2xl font-medium tracking-tight text-emerald-400/90 selection:bg-emerald-500/30">
              The honest friend who reads your dashboards
            </span>
          </motion.div>


          <AnimatePresence mode="wait">
            <motion.h1
              key={headlineVariant}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-5xl text-white lg:text-7xl font-bold tracking-tighter max-w-4xl leading-[1.1] mb-6 z-10"
            >
              {headlineVariant === "A"
                ? "Your marketing stack, diagnosed in minutes"
                : "Stop wasting ad spend. Get your Growth Score now."}

            </motion.h1>
          </AnimatePresence>

          <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mb-10 z-10 font-light">
            Connect your marketing tools in one click. Our AI uncovers hidden performance gaps and gives you a step-by-step roadmap to scale efficiently.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 z-10">
            <Button onClick={handleCTA} size="lg" className="h-14 px-8 text-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] transition-all hover:scale-105">
              Get Your Free Diagnostic
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-neutral-500 sm:hidden">No credit card required.</p>
          </div>

          {/* Abstract UI Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 w-full max-w-5xl rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-xl p-4 shadow-2xl z-10"
          >
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-4 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              <div className="ml-4 h-6 w-64 bg-neutral-800 rounded-md"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-32 rounded-lg bg-neutral-800/50 border border-neutral-800 flex items-center justify-center relative overflow-hidden">
                <LineChart className="w-8 h-8 text-emerald-500/20 absolute -bottom-2 -right-2 w-24 h-24" />
                <div className="text-left w-full p-6">
                  <p className="text-neutral-500 text-sm">Growth Score</p>
                  <p className="text-4xl font-semibold text-emerald-400 mt-1">84<span className="text-lg text-neutral-600">/100</span></p>
                </div>
              </div>
              <div className="h-32 rounded-lg bg-neutral-800/50 border border-neutral-800 p-6 flex flex-col justify-between">
                <p className="text-neutral-500 text-sm">Wasted Ad Spend (30d)</p>
                <p className="text-3xl font-semibold text-red-400">-$12,450</p>
              </div>
              <div className="h-32 rounded-lg bg-neutral-800/50 border border-neutral-800 p-6 flex flex-col justify-between">
                <p className="text-neutral-500 text-sm">High-Impact Actions</p>
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full border-2 border-neutral-900 bg-emerald-500/20 flex items-center justify-center"><Zap className="w-4 h-4 text-emerald-500" /></div>
                  <div className="w-10 h-10 rounded-full border-2 border-neutral-900 bg-blue-500/20 flex items-center justify-center"><Activity className="w-4 h-4 text-blue-500" /></div>
                  <div className="w-10 h-10 rounded-full border-2 border-neutral-900 bg-purple-500/20 flex items-center justify-center"><Settings className="w-4 h-4 text-purple-500" /></div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </AuroraBackground>

      {/* Social Proof */}
      <section className="py-12 border-y border-neutral-900/50 bg-neutral-950 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex gap-8 md:gap-16">
            <div>
              <p className="text-4xl font-bold text-white mb-1">500+</p>
              <p className="text-sm text-neutral-500 font-medium">Companies Audited</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-400 mb-1">32%</p>
              <p className="text-sm text-neutral-500 font-medium">Avg ROI Lift</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-1">4.8/5</p>
              <p className="text-sm text-neutral-500 font-medium">User Rating</p>
            </div>
          </div>

          <div className="h-px w-full lg:w-px lg:h-16 bg-neutral-800"></div>

          <div className="flex-1">
            <p className="text-lg text-neutral-300 italic mb-4">&quot;Growth Pulse found $140K in wasted ad spend we didn&apos;t know about. It paid for itself in hours.&quot;</p>
            <p className="text-sm text-neutral-500 font-bold tracking-wide uppercase">VP Marketing, FictionalTech</p>
          </div>

        </div>

        <div className="max-w-4xl mx-auto mt-16 text-center">
          <p className="text-xs text-neutral-600 font-semibold uppercase tracking-widest mb-6">Trusted by scaling teams</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
            {/* Fake Logos using icons/text */}
            <div className="flex items-center gap-2 font-bold text-xl"><Globe className="w-6 h-6" /> VertexData</div>
            <div className="flex items-center gap-2 font-bold text-xl"><PieChart className="w-6 h-6" /> SynapseHQ</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Layers className="w-6 h-6" /> OmniScale</div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">The 7 Dimensions of Growth</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">Stop relying on fragmented dashboards. We analyze the raw pulse of your growth across every key metric.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 auto-rows-[160px]">
          {/* Revenue - Big card */}
          <DimensionCard title="Revenue" className="md:col-span-2 lg:col-span-4 lg:row-span-2" delay={0.1}>
            <div className="h-full flex flex-col justify-center">
              <span className="text-6xl font-bold font-mono tracking-tighter text-white">$2.4M</span>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-emerald-500/20 text-emerald-500 border-none">+24%</Badge>
                <span className="text-xs text-neutral-500">vs last period</span>
              </div>
              <div className="mt-8 space-y-2">
                <div className="flex justify-between text-[10px] text-neutral-400 uppercase tracking-widest">
                  <span>Growth Velocity</span>
                  <span>High</span>
                </div>
                <div className="w-full bg-neutral-950 h-1 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }}
                    transition={{ duration: 1.5 }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </div>
            </div>
          </DimensionCard>

          {/* Acquisition */}
          <DimensionCard title="Acquisition" className="md:col-span-2 lg:col-span-5" delay={0.2}>
            <div className="flex justify-between items-start">
              <AcquisitionWidget />
              <div className="text-right">
                <span className="text-xl font-bold font-mono">1.2K</span>
                <p className="text-[10px] text-neutral-500">NEW USERS</p>
              </div>
            </div>
          </DimensionCard>

          {/* Activation */}
          <DimensionCard title="Activation" className="md:col-span-2 lg:col-span-3 lg:row-span-2" delay={0.3}>
            <ActivationWidget />
          </DimensionCard>

          {/* Retention */}
          <DimensionCard title="Retention" className="md:col-span-2 lg:col-span-4" delay={0.4}>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xl font-bold font-mono">68%</span>
                <p className="text-[10px] text-neutral-500 uppercase">30-day Retention</p>
              </div>
              <div className="w-24">
                <RetentionWidget />
              </div>
            </div>
          </DimensionCard>

          {/* Paid Media */}
          <DimensionCard title="Paid Media Efficiency" className="md:col-span-2 lg:col-span-5" delay={0.5}>
            <PaidMediaWidget />
          </DimensionCard>

          {/* SEO Health */}
          <DimensionCard title="SEO Health" className="md:col-span-2 lg:col-span-8" delay={0.6}>
            <SEOHealthWidget />
          </DimensionCard>

          {/* Referral */}
          <DimensionCard title="Referral" className="md:col-span-2 lg:col-span-4 text-center" delay={0.7}>
            <div className="flex flex-col items-center justify-center h-full -mt-2">
              <div className="relative">
                <Share2 className="w-8 h-8 text-neutral-500 animate-pulse" />
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 border border-emerald-500 rounded-full"
                />
              </div>
              <span className="text-2xl font-bold font-mono mt-4">1.4X</span>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">K-Factor</p>
            </div>
          </DimensionCard>
        </div>
      </section>


      {/* Pricing Section */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto bg-neutral-950 border-t border-neutral-900">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">Transparent, scaling pricing</h2>
          <p className="text-neutral-400 text-lg">No hidden fees. Upgrade when your ROI justifies it.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter */}
          <Card className="bg-neutral-900 border border-neutral-800 max-h-fit text-white">
            <CardHeader>
              <CardTitle className="text-xl font-medium text-neutral-300">Starter</CardTitle>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-4xl font-bold">$499</span>
                <span className="text-neutral-500">/mo</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-neutral-300 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 5 Integrations</li>
                <li className="flex items-center gap-3 text-neutral-300 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Monthly reports</li>
                <li className="flex items-center gap-3 text-neutral-300 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 2 seats</li>
                <li className="flex items-center gap-3 text-neutral-300 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Email support</li>
              </ul>
            </CardContent>
            <CardFooter className="pt-8">
              <Button onClick={handleCTA} variant="outline" className="w-full border-neutral-700 bg-neutral-800 hover:bg-neutral-700 hover:text-white">Start Free Diagnostic</Button>
            </CardFooter>
          </Card>

          {/* Growth */}
          <Card className="bg-neutral-900 border-2 border-emerald-500/50 max-h-fit relative transform md:-translate-y-4 text-white">
            <div className="absolute top-0 inset-x-0 transform -translate-y-1/2 flex justify-center">
              <span className="bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">Most Popular</span>
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-medium text-neutral-300">Growth</CardTitle>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-4xl font-bold">$1,299</span>
                <span className="text-neutral-500">/mo</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-neutral-300 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 15 Integrations</li>
                <li className="flex items-center gap-3 text-neutral-300 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Weekly reports</li>
                <li className="flex items-center gap-3 text-neutral-300 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 5 seats</li>
                <li className="flex items-center gap-3 text-neutral-300 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Priority support</li>
              </ul>
            </CardContent>
            <CardFooter className="pt-8">
              <Button onClick={handleCTA} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white">Start Free Diagnostic</Button>
            </CardFooter>
          </Card>

          {/* Scale */}
          <Card className="bg-neutral-900 border border-neutral-800 max-h-fit text-white">
            <CardHeader>
              <CardTitle className="text-xl font-medium text-neutral-300">Scale</CardTitle>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-4xl font-bold">$2,999</span>
                <span className="text-neutral-500">/mo</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-neutral-300 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Unlimited integrations</li>
                <li className="flex items-center gap-3 text-neutral-300 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Daily reports + alerts</li>
                <li className="flex items-center gap-3 text-neutral-300 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Unlimited seats</li>
                <li className="flex items-center gap-3 text-neutral-300 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Dedicated manager</li>
              </ul>
            </CardContent>
            <CardFooter className="pt-8">
              <Button onClick={handleCTA} variant="outline" className="w-full border-neutral-700 bg-neutral-800 hover:bg-neutral-700 hover:text-white">Contact Sales</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <footer className="py-12 border-t border-neutral-900 bg-neutral-950 text-center flex flex-col items-center">
        <div className="flex items-center gap-2 font-bold mb-6 text-neutral-600">
          <Activity className="w-5 h-5" />
          <span>GrowthPulse AI</span>
        </div>
        <p className="text-sm text-neutral-600">© 2026 GrowthPulse AI. All rights reserved.</p>
      </footer>

      <LeadFormDialog isOpen={isModalOpen} onOpenChange={setIsModalOpen} variant={headlineVariant} />

    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
      </div>
    }>
      <MainContent />
    </Suspense>
  );
}
