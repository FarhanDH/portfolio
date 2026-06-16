import { useRef, useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import AnimatedContent from "./AnimatedContent";
import SpotlightCard from "./SpotlightCard";
import Magnet from "./Magnet";

interface Project {
    id: number;
    number: string;
    title: string;
    description: string;
    longDescription: string;
    tech: string[];
    github?: string;
    live?: string;
    accentFrom: string;
    accentTo: string;
    spotlightColor: string;
    featured?: boolean;
}

const projects: Project[] = [
    {
        id: 1,
        number: "01",
        title: "ChronoTask API",
        description: "High-performance task scheduling microservice",
        longDescription:
            "A robust backend microservice for managing distributed task queues with real-time status tracking, retry policies, and webhook delivery. Built to handle thousands of concurrent jobs without breaking a sweat.",
        tech: ["NestJS", "BullMQ", "Redis", "PostgreSQL", "Docker"],
        github: "https://github.com/FarhanDH",
        accentFrom: "#3B82F6",
        accentTo: "#6366F1",
        spotlightColor: "rgba(59,130,246,0.12)",
        featured: true,
    },
    {
        id: 2,
        number: "02",
        title: "CloudVault Storage",
        description: "Scalable object storage service on GCP",
        longDescription:
            "An abstraction layer over Google Cloud Storage with signed URL generation, multipart upload support, and lifecycle policies. Exposes a clean REST API with rate limiting and usage analytics.",
        tech: ["NestJS", "GCP", "TypeScript", "Prisma", "Swagger"],
        github: "https://github.com/FarhanDH",
        accentFrom: "#7C3AED",
        accentTo: "#EC4899",
        spotlightColor: "rgba(124,58,237,0.12)",
    },
    {
        id: 3,
        number: "03",
        title: "DevStream CI/CD",
        description: "Pipeline automation toolkit with Jenkins",
        longDescription:
            "A set of Jenkins shared libraries and Groovy scripts for standardizing CI/CD workflows. Includes Docker image builds, automated testing gates, and Slack deployment notifications.",
        tech: ["Jenkins", "Groovy", "Docker", "Shell", "Git"],
        github: "https://github.com/FarhanDH",
        accentFrom: "#10B981",
        accentTo: "#3B82F6",
        spotlightColor: "rgba(16,185,129,0.12)",
    },
    {
        id: 4,
        number: "04",
        title: "AuthForge",
        description: "Plug-and-play authentication service",
        longDescription:
            "A standalone authentication microservice supporting JWT, refresh tokens, OAuth 2.0 providers, and 2FA via TOTP. Designed as a drop-in module for NestJS monorepos.",
        tech: ["NestJS", "PostgreSQL", "Redis", "TypeORM", "Passport"],
        github: "https://github.com/FarhanDH",
        accentFrom: "#F59E0B",
        accentTo: "#EF4444",
        spotlightColor: "rgba(245,158,11,0.12)",
    },
    {
        id: 5,
        number: "05",
        title: "MetricsPulse",
        description: "Real-time system observability dashboard",
        longDescription:
            "A lightweight monitoring dashboard that ingests Prometheus metrics and visualizes CPU, memory, and request latency in real time. Includes alerting rules and a REST API for custom data sources.",
        tech: ["Golang", "Prometheus", "WebSocket", "Docker", "PostgreSQL"],
        github: "https://github.com/FarhanDH",
        accentFrom: "#06B6D4",
        accentTo: "#3B82F6",
        spotlightColor: "rgba(6,182,212,0.12)",
    },
    {
        id: 6,
        number: "06",
        title: "NestKit Boilerplate",
        description: "Production-ready NestJS starter template",
        longDescription:
            "An opinionated NestJS starter featuring modular architecture, Prisma ORM, JWT auth, Docker Compose setup, and comprehensive ESLint + Prettier configuration. Used as a personal base for every new project.",
        tech: ["NestJS", "Prisma", "PostgreSQL", "Docker", "TypeScript"],
        github: "https://github.com/FarhanDH",
        accentFrom: "#8B5CF6",
        accentTo: "#EC4899",
        spotlightColor: "rgba(139,92,246,0.12)",
    },
];

// ─── Glare effect hook ───────────────────────────────────────────────────────
function useGlare() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const pctX = mouseX / rect.width;
        const pctY = mouseY / rect.height;

        setTilt({
            x: (pctY - 0.5) * -10,
            y: (pctX - 0.5) * 10,
        });
        setGlare({
            x: pctX * 100,
            y: pctY * 100,
            opacity: 0.6,
        });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setGlare((prev) => ({ ...prev, opacity: 0 }));
    };

    return { cardRef, glare, tilt, handleMouseMove, handleMouseLeave };
}

// ─── Single Project Card ─────────────────────────────────────────────────────
function ProjectCard({ project, delay }: { project: Project; delay: number }) {
    const { cardRef, glare, tilt, handleMouseMove, handleMouseLeave } =
        useGlare();

    return (
        <AnimatedContent direction="vertical" distance={40} delay={delay}>
            <SpotlightCard
                className="h-full rounded-2xl"
                spotlightColor={project.spotlightColor}
            >
                <div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="group relative h-full flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-950/80 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-zinc-700/80 hover:shadow-2xl"
                    style={{
                        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                        transition:
                            "transform 0.15s ease-out, box-shadow 0.3s ease",
                    }}
                >
                    {/* Gradient top accent bar */}
                    <div
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            background: `linear-gradient(90deg, ${project.accentFrom}, ${project.accentTo})`,
                        }}
                    />

                    {/* Glare overlay */}
                    <div
                        className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
                        style={{
                            opacity: glare.opacity,
                            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.06), transparent 60%)`,
                        }}
                    />

                    {/* Card Body */}
                    <div className="relative z-20 flex flex-col gap-4 p-6 h-full">
                        {/* Header Row: Number + Featured badge */}
                        <div className="flex items-start justify-between">
                            <span
                                className="font-mono text-4xl font-black leading-none select-none"
                                style={{
                                    background: `linear-gradient(135deg, ${project.accentFrom}40, ${project.accentTo}20)`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                {project.number}
                            </span>

                            {project.featured && (
                                <span className="relative flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border border-yellow-500/30 text-yellow-400/90 bg-yellow-500/5">
                                    <span className="absolute -left-px top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-yellow-400 animate-ping" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                                    Featured
                                </span>
                            )}
                        </div>

                        {/* Title & Short Description */}
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-bold text-white tracking-tight leading-snug group-hover:text-white transition-colors duration-200">
                                {project.title}
                            </h3>
                            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                {project.description}
                            </p>
                        </div>

                        {/* Long Description */}
                        <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                            {project.longDescription}
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                            {project.tech.map((t) => (
                                <span
                                    key={t}
                                    className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:border-zinc-700 transition-colors duration-300"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 pt-2 border-t border-zinc-800/60">
                            {project.github && (
                                <Magnet
                                    magnetStrength={0.3}
                                    padding={30}
                                    className="flex-shrink-0"
                                >
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${project.title} GitHub repository`}
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all duration-200"
                                    >
                                        <Github size={13} />
                                        <span>Source</span>
                                    </a>
                                </Magnet>
                            )}
                            {project.live && (
                                <Magnet
                                    magnetStrength={0.3}
                                    padding={30}
                                    className="flex-shrink-0"
                                >
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${project.title} live demo`}
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all duration-200"
                                    >
                                        <ExternalLink size={13} />
                                        <span>Live</span>
                                    </a>
                                </Magnet>
                            )}

                            {/* Accent dot separator */}
                            <div className="ml-auto flex items-center gap-1.5">
                                <span
                                    className="w-1.5 h-1.5 rounded-full opacity-60"
                                    style={{
                                        background: project.accentFrom,
                                    }}
                                />
                                <span
                                    className="w-1 h-1 rounded-full opacity-30"
                                    style={{
                                        background: project.accentTo,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </SpotlightCard>
        </AnimatedContent>
    );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
export default function ProjectsSection() {
    return (
        <section
            id="projects"
            className="relative min-h-screen w-full bg-[#0a0a0a] text-[#e5e7eb] py-24 px-6 md:px-12 lg:px-20 border-t border-zinc-900/60 overflow-hidden"
        >
            {/* Faint dot-grid background */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Ambient glow blobs */}
            <div className="pointer-events-none absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-[#3B82F6]/5 blur-[100px]" />
            <div className="pointer-events-none absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#7C3AED]/5 blur-[100px]" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <AnimatedContent direction="vertical" distance={30} delay={0}>
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-semibold tracking-wider uppercase text-[#3B82F6]">
                                What I've Built
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                Projects
                            </h2>
                            <p className="text-sm text-zinc-500 max-w-sm mt-1">
                                A selection of backend systems, APIs, and
                                infrastructure tools I've shipped.
                            </p>
                        </div>

                        <Magnet magnetStrength={0.25} padding={40}>
                            <a
                                href="https://github.com/FarhanDH"
                                target="_blank"
                                rel="noopener noreferrer"
                                id="view-all-github"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 whitespace-nowrap"
                            >
                                <Github size={15} />
                                View All on GitHub
                                <ExternalLink size={11} className="opacity-50" />
                            </a>
                        </Magnet>
                    </div>
                </AnimatedContent>

                {/* 3-column project grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
                    {projects.map((project, idx) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            delay={0.05 * idx}
                        />
                    ))}
                </div>

                {/* Bottom CTA strip */}
                <AnimatedContent direction="vertical" distance={20} delay={0.4}>
                    <div className="mt-16 flex flex-col items-center gap-4 text-center">
                        <p className="text-sm text-zinc-600">
                            All projects are placeholder names — real links coming soon.
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="h-px w-12 bg-zinc-800" />
                            <span className="text-xs text-zinc-700 uppercase tracking-widest font-semibold">
                                More on GitHub
                            </span>
                            <div className="h-px w-12 bg-zinc-800" />
                        </div>
                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}
