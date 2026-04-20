"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate, animate } from "framer-motion";
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
    Layers,
    BarChart4,
    AlertCircle,
    Cloud,
    Database,
    Target,
    Pointer,
    MousePointer2,
    FileText,
    Download,
    Check,
    MessageSquare,
    Menu,
    X
} from "lucide-react";

import Head from "next/head";
import Script from "next/script";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Image from "next/image";
import { submitFreeDiagnostic, submitContactForm } from "../actions";

const STATIC_COLOR = "#13FFAA"; // Example static color

function AuroraGradient({ children, className }: { children: React.ReactNode, className?: string }) {
    const backgroundImage = `radial-gradient(125% 125% at 50% 0%, #020617 50%, ${STATIC_COLOR})`;

    return (
        <section
            style={{ backgroundImage }}
            className={className}
        >
            {children}
        </section>
    );
}

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#f9ab00", "#1a1718ff"];

function AuroraGradientAnimated({ children, className }: { children: React.ReactNode, className?: string }) {
    // Initialize motion value with the first color
    const color = useMotionValue(COLORS_TOP[0]);

    useEffect(() => {
        // Animate the color changes in a loop
        animate(color, COLORS_TOP, {
            ease: "easeInOut",  // Easing function for smooth transitions
            duration: 10,       // Duration for the entire color transition cycle
            repeat: Infinity,   // Repeat the animation infinitely
            repeatType: "mirror", // Reverses the animation direction on each cycle
        });
    }, [color]);

    // Use motion template to create a dynamic background gradient
    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

    return (
        <motion.section
            style={{ backgroundImage }}
            className={className}
        >
            {children}
        </motion.section>
    );
}



function LeadFormDialog({ isOpen, onOpenChange, variant }: { isOpen: boolean, onOpenChange: (open: boolean) => void, variant: "A" | "B" }) {
    const searchParams = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const adSpend = formData.get("adSpend") as string;

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !adSpend) {
            setError("All fields are required.");
            setIsSubmitting(false);
            return;
        }

        if (!emailRegex.test(email)) {
            setError("Please enter a valid work email.");
            setIsSubmitting(false);
            return;
        }

        const data = {
            name,
            email,
            adSpend,
            variant: formData.get("variant"),
            utm_source: searchParams.get("utm_source") || "direct",
            utm_medium: searchParams.get("utm_medium") || "none",
            utm_campaign: searchParams.get("utm_campaign") || "none",
        };

        const result = await submitFreeDiagnostic(data);

        if (result.success) {
            setIsSuccess(true);
        } else {
            setError(result.error || "Submission failed. Please try again.");
        }

        setIsSubmitting(false);
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
                            id="free-diagnostic-form"
                            key="form"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            onSubmit={handleSubmit}
                            className="space-y-4 mt-4"
                        >
                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-lg flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </div>
                            )}

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
                                        defaultValue=""
                                        className="flex h-9 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1 pl-9 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 md:text-sm appearance-none text-neutral-200"
                                    >
                                        <option value="" disabled>Select an option</option>

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

function InteractiveMockup() {
    // Mock Dashboard Hover States
    const [isAcquisitionHovered, setIsAcquisitionHovered] = useState(false);
    const [isSEOHovered, setIsSEOHovered] = useState(false);
    const [isPaidMediaHovered, setIsPaidMediaHovered] = useState(false);
    return (
        <>
            {/* Interactive UI Mockup */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-20 w-full max-w-5xl rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-4 shadow-2xl z-10 relative overflow-hidden transform-gpu"
            >
                {/* Live Scanning Effect - Optimized with transform-gpu */}
                <motion.div
                    className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-transparent via-emerald-500 to-transparent opacity-30 z-20 pointer-events-none transform-gpu"
                    animate={{ x: ['0%', '1000px'] }}
                    transition={{ repeat: Infinity, repeatDelay: 2, duration: 2, ease: "easeInOut" }}
                />

                {/* Window Controls & Connection Pulses */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-bold flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> HubSpot</span>
                        <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-bold flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Meta Ads</span>
                        <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-bold flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Google Analytics</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                    {/* Acquisition Widget (2x1 on desktop) */}
                    <div
                        onMouseEnter={() => setIsAcquisitionHovered(true)}
                        onMouseLeave={() => setIsAcquisitionHovered(false)}
                        className="md:col-span-2 rounded-lg bg-white/5 border border-white/5 p-5 relative overflow-hidden flex flex-col justify-between group hover:border-emerald-500/20 transition-all duration-300"
                    >
                        <div className="flex justify-between items-start mb-6 text-emerald-400 font-mono text-sm uppercase">
                            <span>Acquisition</span>
                            <motion.div animate={{ scale: isAcquisitionHovered ? 1.1 : 1 }}>
                                <Badge variant="outline" className={`border-none font-mono transition-colors duration-300 ${isAcquisitionHovered ? "bg-emerald-400 text-black" : "bg-emerald-500/20 text-emerald-400"}`}>
                                    {isAcquisitionHovered ? "+48% ROI" : "+32% ROI"}
                                </Badge>
                            </motion.div>
                        </div>
                        <div className="flex items-end gap-1 h-12 w-full transition-opacity">
                            {[40, 55, 45, 60, 50, 75, 65, 90, 80, 100].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: isAcquisitionHovered ? `${Math.min(h + 15, 100)}%` : `${h}%` }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                        delay: isAcquisitionHovered ? 0 : i * 0.02 + 0.8
                                    }}
                                    className={`flex-1 rounded-t-sm transform-gpu transition-colors duration-300 ${isAcquisitionHovered ? "bg-emerald-400" : "bg-emerald-500"}`}
                                />
                            ))}
                        </div>
                    </div>


                    {/* SEO Health Widget (1x1) */}
                    <div
                        onMouseEnter={() => setIsSEOHovered(true)}
                        onMouseLeave={() => setIsSEOHovered(false)}
                        className="md:col-span-1 rounded-lg bg-white/5 border border-white/5 p-5 relative overflow-hidden flex flex-col justify-between group hover:border-blue-500/20 transition-all duration-300"
                    >
                        <div className="text-blue-400 font-mono text-sm uppercase flex items-center gap-2 mb-2">
                            <Globe className="w-4 h-4" /> SEO Health
                        </div>
                        <div className="flex justify-center flex-1 items-center relative">
                            <svg className="w-20 h-20 -rotate-90 transform-gpu" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                                <motion.circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="10"
                                    strokeDasharray="283"
                                    initial={{ strokeDashoffset: 283 }}
                                    animate={{ strokeDashoffset: 283 - (283 * (isSEOHovered ? 0.98 : 0.92)) }}
                                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                                    className="text-blue-500 transform-gpu"
                                />
                            </svg>

                            <motion.div
                                animate={{ scale: isSEOHovered ? 1.2 : 1 }}
                                className="absolute inset-0 flex items-center justify-center font-mono font-bold text-xl text-white transition-colors duration-300"
                            >
                                {isSEOHovered ? "98" : "92"}
                            </motion.div>
                        </div>
                    </div>


                    {/* Paid Media Efficiency Widget (1x1) */}
                    <div
                        onMouseEnter={() => setIsPaidMediaHovered(true)}
                        onMouseLeave={() => setIsPaidMediaHovered(false)}
                        className="md:col-span-1 rounded-lg bg-white/5 border border-amber-500/10 p-5 relative overflow-hidden flex flex-col justify-between group hover:border-amber-500/30 transition-all duration-300"
                    >
                        <div className="text-amber-400 font-mono text-xs uppercase flex items-center gap-2 mb-2">
                            <DollarSign className="w-4 h-4" /> Paid Media
                        </div>
                        <div>
                            <p className="text-[10px] text-neutral-400 font-mono mb-1">Current ROAS</p>
                            <motion.p
                                animate={{ y: isPaidMediaHovered ? -2 : 0, color: isPaidMediaHovered ? "#fbbf24" : "#ffffff" }}
                                className="text-2xl font-bold font-mono text-white mb-3"
                            >
                                {isPaidMediaHovered ? "5.8x" : "4.2x"}
                            </motion.p>

                            <div className="h-[1px] w-full bg-white/10 my-2"></div>

                            <p className="text-[10px] text-neutral-400 font-mono mb-1">Industry Benchmark</p>
                            <p className="text-sm font-medium font-mono text-neutral-300">2.8x</p>
                        </div>
                    </div>


                    {/* AI Action Plan Widget (Full Width) */}
                    <div className="md:col-span-4 rounded-lg bg-white/5 border border-white/5 p-5">
                        <div className="text-neutral-300 font-mono text-sm uppercase flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                            <Zap className="w-4 h-4 text-emerald-400" /> AI Action Plan
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-md flex justify-between items-center group cursor-pointer hover:bg-emerald-500/20 transition-colors">
                                <div>
                                    <p className="text-sm text-white font-medium">Reallocate PMax Spend</p>
                                    <p className="text-xs text-emerald-400 font-mono mt-1 flex items-center gap-1"><ArrowRight className="w-3 h-3" /> +$12k ROI</p>
                                </div>
                                <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-none text-[10px]">High Impact</Badge>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-3 rounded-md flex justify-between items-center group cursor-pointer hover:bg-white/10 transition-colors">
                                <div>
                                    <p className="text-sm text-white font-medium">Fix Cart Abandonment</p>
                                    <p className="text-xs text-blue-400 font-mono mt-1 flex items-center gap-1"><Settings className="w-3 h-3" /> Dev Task</p>
                                </div>
                                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-none text-[10px]">Med Impact</Badge>
                            </div>
                            <div className="bg-amber-500/5 border border-amber-500/20 p-3 rounded-md flex justify-between items-center group cursor-pointer hover:bg-amber-500/10 transition-colors">
                                <div>
                                    <p className="text-sm text-white font-medium">Update Canonical Tags</p>
                                    <p className="text-xs text-amber-400 font-mono mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Crucial Fix</p>
                                </div>
                                <Badge variant="outline" className="bg-amber-500/20 text-amber-400 border-none text-[10px]">Low Effort</Badge>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </>
    )
}

function IntegrationHub() {
    const [connections, setConnections] = useState<Record<string, 'idle' | 'loading' | 'connected'>>({
        hubspot: 'idle',
        ga4: 'idle',
        meta: 'idle',
        klaviyo: 'idle',
        salesforce: 'idle'
    });

    const tools = [
        { id: 'hubspot', label: 'HubSpot', color: '#ff7a59', icon: Cloud, angle: -90 },
        { id: 'ga4', label: 'Google Analytics', color: '#f9ab00', icon: BarChart4, angle: -18 },
        { id: 'meta', label: 'Meta Ads', color: '#0668E1', icon: Share2, angle: 54 },
        { id: 'klaviyo', label: 'Klaviyo', color: '#ffffff', icon: Mail, angle: 126 },
        { id: 'salesforce', label: 'Salesforce', color: '#00a1e0', icon: Database, angle: 198 },
    ];


    const handleConnect = (id: string) => {
        if (connections[id] !== 'idle') return;
        setConnections(prev => ({ ...prev, [id]: 'loading' }));
        setTimeout(() => {
            setConnections(prev => ({ ...prev, [id]: 'connected' }));
        }, 2000);
    };

    return (
        <div className="IntegrationHub relative w-full max-w-4xl mx-auto h-[600px] flex items-center justify-center">
            {/* Central Hub */}
            <div className="relative z-20 w-32 h-32 rounded-full bg-neutral-900 border-2 border-emerald-500/50 flex items-center justify-center shadow-[0_0_50px_-10px_rgba(16,185,129,0.5)]">
                <div className="absolute inset-0 rounded-full animate-pulse bg-emerald-500/10" />
                <Activity className="w-12 h-12 text-emerald-400" />
            </div>

            {/* Orbital Tools */}
            {tools.map((tool) => {
                const radius = 240;
                const x = Math.cos((tool.angle * Math.PI) / 180) * radius;
                const y = Math.sin((tool.angle * Math.PI) / 180) * radius;
                const status = connections[tool.id];

                return (
                    <div key={tool.id}>
                        {/* Connection Line */}
                        <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full pointer-events-none z-10">
                            <motion.path
                                d={`M 300 300 L ${300 + x} ${300 + y}`}
                                stroke={tool.color}
                                strokeWidth="1"
                                fill="none"
                                opacity="0.2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                style={{
                                    filter: `drop-shadow(0 0 8px ${tool.color})`
                                }}
                            />
                            {status === 'connected' && (
                                <motion.path
                                    d={`M 300 300 L ${300 + x} ${300 + y}`}
                                    stroke={tool.color}
                                    strokeWidth="2"
                                    fill="none"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                    style={{
                                        filter: `drop-shadow(0 0 12px ${tool.color})`
                                    }}
                                />
                            )}
                        </svg>

                        {/* Tool Card */}
                        <motion.div
                            initial={{ scale: 0, x: 0, y: 0 }}
                            animate={{ scale: 1, x: x - 70, y: y - 70 }}
                            style={{ x: "-150px", y: "-50%" }}
                            className="absolute z-30 left-1/2 top-1/2"
                        >
                            <div className="bg-neutral-900 border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-3 w-32 shadow-2xl backdrop-blur-xl group hover:border-white/20 transition-all">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-1" style={{ backgroundColor: `${tool.color}15` }}>
                                    <tool.icon className="w-6 h-6" style={{ color: tool.color }} />
                                </div>
                                <span className="text-[12px] uppercase font-bold tracking-tighter text-neutral-400 text-center">{tool.label}</span>

                                <button
                                    onClick={() => handleConnect(tool.id)}
                                    disabled={status !== 'idle'}
                                    className={`w-full py-1.5 rounded-lg text-[12px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${status === 'idle' ? "bg-white/5 hover:bg-white/10 text-white" :
                                        status === 'loading' ? "bg-white/5 text-neutral-500 cursor-wait" :
                                            "bg-emerald-500/10 text-emerald-400"
                                        }`}
                                >
                                    {status === 'idle' && <> <motion.div initial={{ opacity: 0, x: 0, y: 0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 1 }}><Pointer className={`w-6 h-6 animate-pulse hover:animate-none absolute right-2 ${tool.id === 'hubspot' ? '' : 'hidden'}`} /></motion.div> Connect <ArrowRight className="w-3 h-3" /></>}
                                    {status === 'loading' && <span className="w-3 h-3 border-2 border-neutral-500 border-t-white rounded-full animate-spin" />}
                                    {status === 'connected' && <><Check className="w-3 h-3" /> Linked</>}
                                </button>

                                {status === 'connected' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute -bottom-10 left-0 right-0 py-1 px-2 bg-emerald-500/20 rounded border border-emerald-500/30 text-center"
                                    >
                                        <span className="text-[10px] text-emerald-400 font-mono animate-pulse">READING API...</span>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                );
            })}

        </div>
    );
}

function ExecutiveReportPreview({ handleCTA }: { handleCTA: () => void }) {
    const [isHovered, setIsHovered] = useState(false);

    // Radar chart points (7 dimensions)
    const dims = 7;
    const radius = 40;
    const center = 50;
    const scores = [85, 70, 95, 60, 80, 75, 90];

    const points = scores.map((score, i) => {
        const angle = (i * 2 * Math.PI) / dims - Math.PI / 2;
        const r = (score / 100) * radius;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return `${x},${y}`;
    }).join(" ");

    return (
        <div className="relative w-full max-w-lg mx-auto py-12 px-4 group">
            {/* 3D PDF Mockup */}
            <motion.div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                animate={{
                    rotateX: isHovered ? 0 : 10,
                    rotateY: isHovered ? 0 : 25,
                    scale: isHovered ? 1.05 : 1
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="relative bg-white rounded-sm shadow-2xl p-8 aspect-[1/1.4] overflow-hidden origin-bottom cursor-pointer"
                style={{ perspective: "1000px" }}
            >
                {/* Scanning Beam */}
                <motion.div
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[2px] bg-emerald-500/30 z-20 pointer-events-none blur-sm"
                />

                {/* Content */}
                <div className="space-y-6">
                    <div className="flex justify-between items-start border-b border-neutral-100 pb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center">
                                <Activity className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-neutral-900 text-[10px] tracking-tight">GROWTH PULSE AI</span>
                        </div>
                        <span className="text-[8px] text-neutral-400 font-mono">REPORT #GP-2026-04</span>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-serif text-neutral-900 leading-tight">Quarterly Growth Diagnostic: <span className="text-emerald-700">VertexData Inc.</span></h3>
                        <p className="text-[10px] text-neutral-500">Board-Level Strategic Performance Audit — Q2 2026</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-neutral-900 uppercase tracking-wide">Key Findings</p>
                                <p className="text-[9px] text-neutral-600 leading-relaxed">Optimization of the checkout funnel could yield an estimated 14.2% increase in net revenue with minimal developer effort.</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-neutral-900 uppercase tracking-wide">Strategy</p>
                                <p className="text-[9px] text-neutral-600 leading-relaxed">Consolidate underperforming Meta Ad sets (ROAS {"<"} 2.1) and reallocate capital to high-intent Google Search campaigns.</p>
                            </div>
                        </div>

                        {/* Mini Spider Chart */}
                        <div className="flex flex-col items-center justify-center border border-neutral-100 rounded p-2 bg-neutral-50/30">
                            <svg viewBox="0 0 100 100" className="w-full aspect-square">
                                {/* Grid */}
                                {[20, 40, 60, 80, 100].map((r) => (
                                    <circle key={r} cx="50" cy="50" r={r * radius / 100} fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
                                ))}
                                <motion.polygon
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    points={points}
                                    fill="rgba(16, 185, 129, 0.2)"
                                    stroke="#10b981"
                                    strokeWidth="1"
                                />
                            </svg>
                            <p className="text-[8px] font-mono text-neutral-400 mt-1 uppercase">Dimensional Growth Score</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-50 border-dashed">
                        <p className="text-[9px] font-bold text-neutral-900 mb-2">Strategic Recommendations</p>
                        <div className="space-y-1.5">
                            {[
                                "Deploy Multi-touch Attribution (MTA) by Week 4",
                                "Automate abandoned cart recovery loop via Klaviyo",
                                "Initiate A/B test on pricing tier landing pages"
                            ].map((rec, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                                    <p className="text-[8px] text-neutral-600 italic">{rec}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center border-t border-neutral-100 pt-4">
                    <p className="text-[7px] text-neutral-400 font-mono tracking-widest uppercase">GrowthPulse Confidential Board Review</p>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border border-neutral-200" />
                        <div className="w-4 h-4 rounded-full bg-neutral-100" />
                    </div>
                </div>

                {/* Hover Overlay */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px] z-30 flex items-center justify-center p-6"
                        >
                            <Button onClick={handleCTA} className="bg-emerald-600 cursor-pointer text-white hover:bg-emerald-500 hover:text-gray-900 font-bold shadow-xl flex items-center gap-2">
                                <Download className="w-4 h-4" /> Download Sample PDF
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Generating Progress Bar (Decorative) */}
            <div className="mt-8 bg-neutral-900/40 border border-white/5 backdrop-blur-md rounded-full p-1.5 w-full flex items-center gap-3">
                <div className="flex-1 bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                        className="h-full bg-emerald-500"
                    />
                </div>
                <span className="text-[10px] text-emerald-400 font-mono animate-pulse uppercase tracking-wider pr-2">Board report ready</span>
            </div>
        </div>
    );
}

function AIActionPlan({ handleCTA }: { handleCTA: () => void }) {


    const tasks = [
        { name: "Fix Checkout Latency", impact: 4.4, effort: 2.1, quadrant: "quick-win", color: "#10b981" },
        { name: "Optimize Meta Ad Creative", impact: 6.8, effort: 3.4, quadrant: "quick-win", color: "#10b981" },
        { name: "Multi-touch Attribution", impact: 8.5, effort: 5.5, quadrant: "big-bet", color: "#3b82f6" },
        { name: "Update Meta Tags", impact: 1.5, effort: 1.5, quadrant: "fill-in", color: "#94a3b8" },
    ];

    const phases = [
        {
            days: "1-30",
            title: "Foundation & Quick Wins",
            desc: "Critical performance fixes and high-impact optimizations to generate immediate cash flow.",
            items: ["Latency reduction", "Ad creative refresh", "Broken link audit"]
        },
        {
            days: "31-60",
            title: "Scaling & Optimization",
            desc: "Expanding successful channels and implementing advanced audience segmentation.",
            items: ["Channel diversification", "LTV-based bidding", "A/B testing automation"]
        },
        {
            days: "61-90",
            title: "Advanced Growth Loops",
            desc: "Long-term infrastructure and multi-channel attribution for sustainable scaling.",
            items: ["Attribution model deploy", "Referral loop launch", "Brand lift studies"]
        }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-16">
            {/* 2x2 Matrix */}
            <div className="relative aspect-square w-full max-w-xl mx-auto p-8 rounded-3xl bg-neutral-900/30 border border-white/5 backdrop-blur-xl group overflow-hidden">
                {/* Glows */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
                {/* Background Grids */}
                <div className="absolute inset-12 pointer-events-none overflow-hidden">
                    {/* Horizontal Lines */}
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-white/[0.03]" style={{ top: `${(i + 1) * 20}%` }} />
                    ))}
                    {/* Vertical Lines */}
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={`v-${i}`} className="absolute top-0 bottom-0 w-px bg-white/[0.03]" style={{ left: `${(i + 1) * 20}%` }} />
                    ))}
                </div>

                {/* Axes */}
                <div className="absolute inset-12 border-l border-b border-white/10">
                    {/* Y Axis Label */}
                    <div className="absolute -left-10 top-0 bottom-0 flex items-center">
                        <span className="text-[10px] transform -rotate-90 uppercase tracking-widest text-neutral-500 font-mono">Impact</span>
                    </div>
                    {/* X Axis Label */}
                    <div className="absolute -bottom-10 left-0 right-0 flex justify-center">
                        <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">Effort</span>
                    </div>

                    {/* Quadrant Labels */}
                    <div className="absolute top-0 right-4 text-[10px] text-emerald-500 font-mono font-bold uppercase tracking-tighter">High Impact / Low Effort</div>
                </div>

                {/* Task Bubbles */}
                <div className="absolute inset-12 pointer-events-none">
                    {tasks.map((task, i) => {
                        const x = task.effort * 10;
                        const y = 100 - (task.impact * 10);

                        return (
                            <motion.div
                                key={i}
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 200, damping: 15 }}
                                style={{ left: `${x}%`, top: `${y}%` }}
                                className="absolute pointer-events-auto"
                            >
                                <div className="relative group/bubble translate-x-[-50%] translate-y-[-50%]">
                                    <div
                                        className="w-4 h-4 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-help relative z-10"
                                        style={{ backgroundColor: task.color }}
                                    >
                                        <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: task.color }} />
                                    </div>

                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-40 p-2 bg-neutral-900 border border-white/10 rounded-lg opacity-0 group-hover/bubble:opacity-100 transition-all pointer-events-none z-20 shadow-2xl">
                                        <p className="text-[14px] text-white font-bold leading-tight">{task.name}</p>
                                        <div className="mt-1 flex justify-between text-[12px] font-mono">
                                            <span className="text-emerald-400">IMPACT: {task.impact}</span>
                                            <span className="text-neutral-500">EFFORT: {task.effort}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Roadmap Timeline */}
            <div className="space-y-8">
                {phases.map((phase, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + i * 0.2 }}
                        className="flex gap-6 relative"
                    >
                        {/* Thread */}
                        {i !== phases.length - 1 && (
                            <div className="absolute left-6 top-12 bottom-[-32px] w-px bg-neutral-800" />
                        )}

                        <div className="flex-shrink-0 w-14 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-neutral-400 relative z-10">
                            D{phase.days}
                        </div>

                        <div className="pt-1">
                            <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                                {phase.title}
                                {i === 0 && <Badge className="bg-emerald-500/10 text-emerald-500 text-[10px] border-none py-0">AUTO-PRIORITIZED</Badge>}
                            </h4>
                            <p className="text-md text-neutral-400 leading-relaxed mb-4">{phase.desc}</p>
                            <div className="flex flex-wrap gap-2">
                                {phase.items.map((item, j) => (
                                    <span key={j} className="text-[12px] px-2 py-0.5 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-500 font-mono">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5 }}
                    className="pt-6"
                >
                    <Button onClick={handleCTA} variant="outline" className="h-12 text-lg cursor-pointer border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400 font-bold tracking-tight w-full sm:w-auto">
                        <Activity className="mr-2 w-4 h-4" /> Download Executive PDF Report
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}

function MainContent() {


    const [headlineVariant, setHeadlineVariant] = useState<"A" | "B">("A");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scrolledPos, setScrolledPos] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [contactSubmitting, setContactSubmitting] = useState(false);
    const [contactSuccess, setContactSuccess] = useState(false);
    const [contactError, setContactError] = useState<string | null>(null);

    const searchParams = useSearchParams();

    const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setContactSubmitting(true);
        setContactError(null);

        const formData = new FormData(e.currentTarget);
        const firstName = formData.get("first-name") as string;
        const lastName = formData.get("last-name") as string;
        const email = formData.get("contact-email") as string;
        const message = formData.get("message") as string;
        const variant = headlineVariant;
        const utm_source = searchParams.get("utm_source") || "direct";
        const utm_medium = searchParams.get("utm_medium") || "none";
        const utm_campaign = searchParams.get("utm_campaign") || "none";

        if (!firstName || !lastName || !email || !message) {
            setContactError("All fields are required.");
            setContactSubmitting(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setContactError("Please enter a valid email address.");
            setContactSubmitting(false);
            return;
        }

        const result = await submitContactForm({ firstName, lastName, email, message, variant, utm_source, utm_medium, utm_campaign });

        if (result.success) {
            setContactSuccess(true);
            (e.target as HTMLFormElement).reset();
        } else {
            setContactError(result.error || "Failed to send message. Please try again.");
        }
        setContactSubmitting(false);
    };


    const navLinks = [
        { name: "One-Click", href: "#integrations" },
        { name: "7 Dimension", href: "#dimensions" },
        { name: "AI Plan", href: "#plan" },
        { name: "Report", href: "#report" },
        { name: "Price", href: "#pricing" },
        { name: "Contact", href: "#contact" }
    ];

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
            <nav className="fixed top-0 inset-x-0 h-20 border-b border-white/5 bg-neutral-950/80 backdrop-blur-xl z-50 flex items-center justify-between px-6 lg:px-12 transition-all">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
                        <Activity className="w-6 h-6 text-white" />
                    </div>
                    <span>GrowthPulse<span className="text-emerald-500">AI</span></span>
                </div>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-neutral-400 hover:text-emerald-400 transition-colors uppercase tracking-widest text-[10px]"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-6">
                    <Button id="btn-nav-cta-free-diagnostic" size="lg" className="hidden sm:flex bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all hover:scale-105" onClick={handleCTA}>
                        Get a Diagnostic
                    </Button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2 text-neutral-400 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-full left-0 right-0 bg-neutral-950 border-b border-white/10 p-6 flex flex-col gap-4 lg:hidden backdrop-blur-2xl"
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-bold text-neutral-200 hover:text-emerald-400"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <Button size="lg" className="w-full bg-emerald-600 font-bold mt-4" onClick={() => { setIsMobileMenuOpen(false); handleCTA(); }}>
                                Get a Diagnostic
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

            </nav>


            {/* Hero Section */}

            <AuroraGradientAnimated className="relative min-h-screen pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 flex flex-col items-center text-center overflow-hidden">
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
                    <span className="text-sm md:text-xl lg:text-2xl font-medium tracking-tight text-emerald-400/90 selection:bg-emerald-500/30">
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
                    <Button id="btn-hero-cta-free-diagnostic" onClick={handleCTA} size="lg" className="h-14 px-8 text-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] transition-all hover:scale-105">
                        Get Your Free Diagnostic
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <p className="text-sm text-neutral-500 sm:hidden">No credit card required.</p>
                </div>

                {/*Interactive Mockup Image */}
                <div className="py-12">
                    <Image src="/assets/images/mockup-06.png" alt="GrowthPulse AI Mockup" width={1400} height={636} />
                </div>
                {/* <InteractiveMockup /> */}

            </AuroraGradientAnimated>

            {/* Integration Hub Section */}
            <section id="integrations" className="py-32 px-6 lg:px-12 bg-neutral-950 border-y border-neutral-900 overflow-hidden">

                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >

                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mx-auto mb-6 px-6 py-3 w-fit rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl flex items-center gap-4 group hover:border-emerald-500/40 transition-colors cursor-default"
                        >
                            <span className="text-sm md:text-xl lg:text-xl font-medium tracking-tight text-emerald-400/90 selection:bg-emerald-500/30">
                                Instant Connectivity
                            </span>
                        </motion.div>
                        <h2 className="text-3xl lg:text-6xl font-bold tracking-tight mb-6">One-Click Stack Integration</h2>
                        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                            Connects to HubSpot, Google Analytics, Meta Ads, Klaviyo, Salesforce, and 30+ tools via API in under 5 minutes.
                        </p>
                    </motion.div>

                    <IntegrationHub />

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center mt-12"
                    >
                        <p className="text-sm text-neutral-500 flex items-center justify-center gap-2">
                            <Zap className="w-4 h-4 text-emerald-500" /> Enterprise-grade security. OAuth 2.0 & Read-only access.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Bento Grid Features */}
            <section id="dimensions" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">

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
                    <DimensionCard title="Retention" className="md:col-span-2 lg:col-span-5" delay={0.4}>
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
                    <DimensionCard title="Paid Media Efficiency" className="md:col-span-2 lg:col-span-7" delay={0.5}>
                        <PaidMediaWidget />
                    </DimensionCard>

                    {/* Referral */}
                    <DimensionCard title="Referral" className="md:col-span-2 lg:col-span-5 text-center" delay={0.7}>
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

                    {/* SEO Health */}
                    <DimensionCard title="SEO Health" className="md:col-span-2 lg:col-span-12" delay={0.6}>
                        <SEOHealthWidget />
                    </DimensionCard>


                </div>
            </section>

            {/* AI Action Plan Section */}
            <section id="plan" className="py-32 px-6 lg:px-12 bg-neutral-950/50 border-y border-neutral-900 relative overflow-hidden">

                {/* Background Details */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none mt-[-100px]" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mx-auto mb-6 px-6 py-3 w-fit rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl flex items-center gap-4 group hover:border-emerald-500/40 transition-colors cursor-default"
                        >
                            <span className="text-sm md:text-xl lg:text-xl font-medium tracking-tight text-emerald-400/90 selection:bg-emerald-500/30">
                                Intelligence Engine
                            </span>
                        </motion.div>
                        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">AI-Generated Action Plan</h2>
                        <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            Produces a prioritized 90-day roadmap with specific recommendations ranked by expected impact and effort.
                        </p>
                    </motion.div>

                    <AIActionPlan handleCTA={handleCTA} />
                </div>
            </section>

            {/* Executive Summary Report Section */}
            <section id="report" className="py-32 px-6 lg:px-12 bg-neutral-950 border-b border-neutral-900 overflow-hidden">

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8 order-2 lg:order-1 text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mx-auto lg:mx-0 px-6 py-3 w-fit rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl flex items-center gap-4 group hover:border-emerald-500/40 transition-colors cursor-default"
                        >
                            <span className="text-sm md:text-xl lg:text-xl font-medium tracking-tight text-emerald-400/90 selection:bg-emerald-500/30">
                                Board-Ready Ready Output
                            </span>
                        </motion.div>

                        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">Executive Summary Report</h2>
                        <p className="text-neutral-400 max-w-xl text-lg leading-relaxed">
                            Auto-generates a board-ready PDF with key findings, visualized scores, and strategic recommendations in seconds.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Button onClick={handleCTA} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 px-8 cursor-pointer">
                                View Sample Report
                            </Button>
                            <p className="text-xs text-neutral-500 font-mono">Generated in under 3.2 seconds</p>
                        </div>

                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
                            {[
                                { label: "Dimensions", value: "7+" },
                                { label: "Accuracy", value: "99.9%" },
                                { label: "Export", value: "PDF" }
                            ].map((stat, i) => (
                                <div key={i}>
                                    <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 30 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2"
                    >
                        <ExecutiveReportPreview handleCTA={handleCTA} />
                    </motion.div>
                </div>
            </section>

            {/* Live Dashboard Section */}
            <section className="py-32 px-6 lg:px-12 bg-neutral-900/10 border-b border-neutral-900 overflow-hidden relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[160px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mx-auto mb-6 px-6 py-3 w-fit rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl flex items-center gap-4 group hover:border-emerald-500/40 transition-colors cursor-default"
                        >
                            <span className="text-sm md:text-xl lg:text-xl font-medium tracking-tight text-emerald-400/90 selection:bg-emerald-500/30">
                                Live Monitoring
                            </span>
                        </motion.div>
                        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">Live Dashboard</h2>
                        <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            Real-time monitoring of all 7 dimensions with alerts when performance dips below benchmarks
                        </p>
                    </motion.div>
                    <div className="flex justify-center">
                        <InteractiveMockup />
                    </div>
                </div>
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
                        <p className="text-lg lg:text-2xl text-neutral-300 italic mb-4">&quot;Growth Pulse found $140K in wasted ad spend we didn&apos;t know about. It paid for itself in hours.&quot;</p>
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

            {/* Pricing Section */}
            <section id="pricing" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto bg-neutral-950 border-t border-neutral-900">

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
                                <li className="flex items-center gap-3 text-neutral-300 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Quarterly Action Plans</li>
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
                        <div className="absolute top-4 inset-x-0 transform -translate-y-1/2 flex justify-center">
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
                                <li className="flex items-center gap-3 text-neutral-300 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Monthly Action Plans</li>
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
                                <li className="flex items-center gap-3 text-neutral-300 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Monthly Action Plans + live dashboard</li>
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

            {/* Contact Section */}
            <section id="contact" className="py-32 px-6 lg:px-12 bg-neutral-900/10 border-t border-neutral-900 overflow-hidden relative">

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[160px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                    <div className="space-y-8">
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10">Contact Support</Badge>
                        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white leading-tight">Level up your growth engineering</h2>
                        <p className="text-neutral-400 text-lg leading-relaxed">
                            Whether you need a custom integration or strategic growth advice, our engineers are here to help you scale.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-neutral-300 group cursor-default">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                                    <Mail className="w-5 h-5 text-emerald-400" />
                                </div>
                                <span className="font-mono text-sm">support@growthpulse.ai</span>
                            </div>
                            <div className="flex items-center gap-4 text-neutral-300 group cursor-default">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                                </div>
                                <span className="text-sm">Live chat available 24/7 for Growth/Scale plans</span>
                            </div>
                        </div>
                    </div>

                    <Card className="bg-neutral-950/50 border border-neutral-800 p-8 shadow-2xl backdrop-blur-xl">
                        <form id="contact-form" className="space-y-5" onSubmit={handleContactSubmit}>
                            {contactError && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    {contactError}
                                </div>
                            )}
                            {contactSuccess && (
                                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm rounded-lg flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Message sent successfully! We&apos;ll be in touch.
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name" className="text-neutral-400 text-xs uppercase tracking-widest font-bold">First Name</Label>
                                    <Input id="first-name" name="first-name" placeholder="John" className="bg-neutral-950 border-neutral-800 text-white h-11 focus-visible:ring-emerald-500" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name" className="text-neutral-400 text-xs uppercase tracking-widest font-bold">Last Name</Label>
                                    <Input id="last-name" name="last-name" placeholder="Doe" className="bg-neutral-950 border-neutral-800 text-white h-11 focus-visible:ring-emerald-500" />
                                </div>

                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contact-email" className="text-neutral-400 text-xs uppercase tracking-widest font-bold">Work Email</Label>
                                <Input id="contact-email" name="contact-email" type="email" placeholder="john@company.com" className="bg-neutral-950 border-neutral-800 text-white h-11 focus-visible:ring-emerald-500" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-neutral-400 text-xs uppercase tracking-widest font-bold">How can we help?</Label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="w-full min-h-[120px] rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-white transition-all"
                                    placeholder="Tell us about your growth goals..."
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={contactSubmitting}
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                            >
                                {contactSubmitting ? (
                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                        <Settings className="w-4 h-4" />
                                    </motion.div>
                                ) : "Send message"}
                            </Button>

                        </form>
                    </Card>
                </div>
            </section>


            <footer className="py-24 px-6 lg:px-12 border-t border-neutral-900 bg-neutral-950">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1 space-y-6">
                        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
                            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                                <Activity className="w-5 h-5 text-white" />
                            </div>
                            <span>GrowthPulse<span className="text-emerald-500">AI</span></span>
                        </div>
                        <p className="text-sm text-neutral-500 leading-relaxed">
                            The honest friend who reads your dashboards and tells you exactly how to scale. High-performance growth engineering for modern teams.
                        </p>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:border-emerald-500/50 transition-colors cursor-pointer">
                                <Globe className="w-4 h-4 text-neutral-400" />
                            </div>
                            <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:border-emerald-500/50 transition-colors cursor-pointer">
                                <Share2 className="w-4 h-4 text-neutral-400" />
                            </div>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-[10px]">Product</h4>
                        <ul className="space-y-4">
                            {["Features", "Integrations", "Pricing", "Action Plans", "Report Engine"].map((link) => (
                                <li key={link}><a href="#" className="text-sm text-neutral-500 hover:text-emerald-400 transition-colors">{link}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-[10px]">Company</h4>
                        <ul className="space-y-4">
                            {["About Us", "Careers", "Contact", "Press", "Partners"].map((link) => (
                                <li key={link}><a href="#" className="text-sm text-neutral-500 hover:text-emerald-400 transition-colors">{link}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-[10px]">Legal</h4>
                        <ul className="space-y-4">
                            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Security", "GDPR"].map((link) => (
                                <li key={link}><a href="#" className="text-sm text-neutral-500 hover:text-emerald-400 transition-colors">{link}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-neutral-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-neutral-600 font-mono italic">
                        &quot;Scaling is hard. We make it data-driven.&quot;
                    </p>
                    <p className="text-xs text-neutral-600">
                        © 2026 GrowthPulse AI. Built for the next generation of growth engineers.
                    </p>
                </div>
            </footer>


            <LeadFormDialog isOpen={isModalOpen} onOpenChange={setIsModalOpen} variant={headlineVariant} />

        </div>
    );
}

export default function Page() {
    return (
        <>
            <Head>
                {/* <Partytown debug={true} forward={["dataLayer.push"]} />
        <script
          type="text/partytown"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TR9VGQ5G');`,
          }}
        /> */}
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TR9VGQ5G');
        `}
                </Script>
            </Head>
            <Suspense fallback={
                <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                </div>
            }>
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-TR9VGQ5G"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    />
                </noscript>
                <MainContent />
            </Suspense>
        </>
    );
}
