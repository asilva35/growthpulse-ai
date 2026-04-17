"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  BarChart3, 
  Zap, 
  FileText, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  Layers,
  ChevronRight,
  Globe,
  PieChart,
  LineChart,
  Settings,
  Mail,
  User,
  DollarSign
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
          <DialogTitle className="text-2xl font-bold tracking-tight">
            {isSuccess ? "Diagnostic Initiated" : "Get Your Free Diagnostic"}
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            {isSuccess 
              ? "Check your email. We're connecting to your stack now."
              : "Connect your tools and find hidden ROI in minutes."}
          </DialogDescription>
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
                We're currently connecting to your data sources. You'll receive your 90-day action plan in your inbox shortly.
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


function MainContent() {
  const [headlineVariant, setHeadlineVariant] = useState<"A" | "B">("A");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolledPos, setScrolledPos] = useState(0);

  // A/B Test Logic with Persistence
  useEffect(() => {
    const storedVariant = localStorage.getItem("gp_hero_variant");
    if (storedVariant === "A" || storedVariant === "B") {
      setHeadlineVariant(storedVariant);
      console.log("[Analytics] Experiment Viewed (Existing):", { experiment: "Hero Headline Test", variant: storedVariant });
    } else {
      const newVariant = Math.random() > 0.5 ? "B" : "A";
      localStorage.setItem("gp_hero_variant", newVariant);
      setHeadlineVariant(newVariant);
      console.log("[Analytics] Experiment Viewed (New Assignment):", { experiment: "Hero Headline Test", variant: newVariant });
    }
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
          <Button size="sm" className="bg-white text-black hover:bg-neutral-200" onClick={handleCTA}>
            Diagnostic
          </Button>
        </div>

      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 flex flex-col items-center text-center overflow-hidden">
        {/* Abstract Background Viz */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none blur-3xl opacity-50" />
        
        <Badge variant="outline" className="mb-8 border-emerald-500/30 text-emerald-400 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
          The honest friend who reads your dashboards
        </Badge>
        
        <AnimatePresence mode="wait">
          <motion.h1 
            key={headlineVariant}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-5xl lg:text-7xl font-bold tracking-tighter max-w-4xl leading-[1.1] mb-6 z-10"
          >
            {headlineVariant === "A" 
              ? "Your marketing stack, diagnosed in minutes" 
              : "Stop wasting ad spend. Get your Growth Score now."}

          </motion.h1>
        </AnimatePresence>
        
        <p className="text-lg lg:text-xl text-neutral-400 max-w-2xl mb-10 z-10 font-light">
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
            <p className="text-lg text-neutral-300 italic mb-4">"Growth Pulse found $140K in wasted ad spend we didn't know about. It paid for itself in hours."</p>
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

      {/* Features bento box */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">The only system that actually reads your data</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">Stop relying on dashboard summaries. We analyze the raw pulse of your growth engine to deliver precision insights.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
          {/* Feature 1 */}
          <div className="col-span-1 md:col-span-6 lg:col-span-8 bg-neutral-900 border border-neutral-800 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Layers className="w-32 h-32" />
            </div>
            <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center mb-6 border border-neutral-700">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">One-Click Stack Integration</h3>
            <p className="text-neutral-400 max-w-md">Connect HubSpot, Google Analytics, Meta Ads, and your billing platform in under 5 minutes. No dev resources required.</p>
          </div>

          {/* Feature 2 */}
          <div className="col-span-1 md:col-span-6 lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-3xl p-8 relative overflow-hidden">
            <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center mb-6 border border-neutral-700">
              <BarChart3 className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">7-Dimension Score</h3>
            <p className="text-neutral-400">Our proprietary 0-100 score benchmarks your performance against your industry peers instantly.</p>
          </div>

          {/* Feature 3 */}
          <div className="col-span-1 md:col-span-4 lg:col-span-4 bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-8">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/20">
              <Bot className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Action Plan</h3>
            <p className="text-neutral-400 text-sm text-balance">Get a prioritized 90-day roadmap instantly based strictly on effort vs. impact.</p>
          </div>

          {/* Feature 4 */}
          <div className="col-span-1 md:col-span-4 lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
            <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center mb-6 border border-neutral-700">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Exec Summary Report</h3>
            <p className="text-neutral-400 text-sm text-balance">Auto-generate board-ready PDFs that justify your spend and strategy effortlessly.</p>
          </div>

          {/* Feature 5 */}
          <div className="col-span-1 md:col-span-4 lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-3xl p-8 relative overflow-hidden">
             <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
            <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center mb-6 border border-neutral-700">
              <Activity className="w-6 h-6 text-rose-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Live Dashboard</h3>
            <p className="text-neutral-400 text-sm text-balance">Real-time anomaly monitoring sends you an alert before a simple mistake drains your budget.</p>
          </div>
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
