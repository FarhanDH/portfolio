import { useRef, useState } from "react";
import { Github, ExternalLink, Terminal } from "lucide-react";
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
    featured?: boolean;
}

const projects: Project[] = [
    {
        id: 1,
        number: "01",
        title: "ChronoTask API",
        description: "Distributed task scheduling microservice",
        longDescription:
            "A backend microservice for managing distributed task queues with real-time status tracking, retry policies, and webhook delivery. Handles thousands of concurrent jobs reliably.",
        tech: ["NestJS", "BullMQ", "Redis", "PostgreSQL", "Docker"],
        github: "https://github.com/FarhanDH",
        featured: true,
    },
    {
        id: 2,
        number: "02",
        title: "CloudVault Storage",
        description: "Object storage abstraction layer on GCP",
        longDescription:
            "An abstraction over Google Cloud Storage with signed URL generation, multipart upload support, and lifecycle policies. Exposes a clean REST API with rate limiting and usage analytics.",
        tech: ["NestJS", "GCP", "TypeScript", "Prisma", "Swagger"],
        github: "https://github.com/FarhanDH",
    },
    {
        id: 3,
        number: "03",
        title: "DevStream CI/CD",
        description: "Pipeline automation toolkit with Jenkins",
        longDescription:
            "Jenkins shared libraries and Groovy scripts for standardizing CI/CD workflows. Includes Docker image builds, automated testing gates, and Slack deployment notifications.",
        tech: ["Jenkins", "Groovy", "Docker", "Shell", "Git"],
        github: "https://github.com/FarhanDH",
    },
    {
        id: 4,
        number: "04",
        title: "AuthForge",
        description: "Plug-and-play authentication service",
        longDescription:
            "A standalone auth microservice supporting JWT, refresh tokens, OAuth 2.0 providers, and 2FA via TOTP. Designed as a drop-in module for NestJS monorepos.",
        tech: ["NestJS", "PostgreSQL", "Redis", "TypeORM", "Passport"],
        github: "https://github.com/FarhanDH",
    },
    {
        id: 5,
        number: "05",
        title: "MetricsPulse",
        description: "Real-time system observability dashboard",
        longDescription:
            "A monitoring dashboard that ingests Prometheus metrics and visualizes CPU, memory, and request latency in real time. Includes alerting rules and a REST API for custom data sources.",
        tech: ["Golang", "Prometheus", "WebSocket", "Docker", "PostgreSQL"],
        github: "https://github.com/FarhanDH",
    },
    {
        id: 6,
        number: "06",
        title: "NestKit Boilerplate",
        description: "Production-ready NestJS starter template",
        longDescription:
            "An opinionated NestJS starter with modular architecture, Prisma ORM, JWT auth, Docker Compose, and ESLint + Prettier. My personal base for every new project.",
        tech: ["NestJS", "Prisma", "PostgreSQL", "Docker", "TypeScript"],
        github: "https://github.com/FarhanDH",
    },
];

// ─── Subtle tilt on hover ─────────────────────────────────────────────────────
function useTilt() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const pctX = (e.clientX - rect.left) / rect.width;
        const pctY = (e.clientY - rect.top) / rect.height;
        setTilt({ x: (pctY - 0.5) * -6, y: (pctX - 0.5) * 6 });
    };

    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

    return { cardRef, tilt, handleMouseMove, handleMouseLeave };
}

// ─── Single Project Card ──────────────────────────────────────────────────────
function ProjectCard({ project, delay }: { project: Project; delay: number }) {
    const { cardRef, tilt, handleMouseMove, handleMouseLeave } = useTilt();

    return (
        <AnimatedContent direction="vertical" distance={30} delay={delay}>
            <SpotlightCard
                className="h-full rounded-xl"
                spotlightColor="rgba(34,197,94,0.06)"
            >
                <div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="group relative h-full flex flex-col rounded-xl border border-zinc-800/70 bg-zinc-950 overflow-hidden transition-colors duration-300 hover:border-zinc-700/70"
                    style={{
                        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                        transition: "transform 0.12s ease-out, border-color 0.3s ease",
                    }}
                >
                    {/* Single thin top accent — green only for featured, zinc for others */}
                    <div
                        className={`absolute top-0 left-0 right-0 h-px transition-opacity duration-300 ${
                            project.featured
                                ? "bg-[#22c55e]/50 group-hover:bg-[#22c55e]/80"
                                : "bg-zinc-700/40 group-hover:bg-zinc-600/60"
                        }`}
                    />

                    {/* Card body */}
                    <div className="relative flex flex-col gap-4 p-5 h-full">

                        {/* Number + featured badge */}
                        <div className="flex items-start justify-between">
                            <span className="font-mono text-3xl font-black text-zinc-800 leading-none select-none group-hover:text-zinc-700 transition-colors duration-300">
                                {project.number}
                            </span>
                            {project.featured && (
                                <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-widest uppercase px-2 py-1 rounded-md border border-[#22c55e]/20 text-[#22c55e]/70 bg-[#22c55e]/5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                                    pinned
                                </span>
                            )}
                        </div>

                        {/* Title + one-liner */}
                        <div className="flex flex-col gap-1">
                            <h3 className="text-base font-semibold text-zinc-100 tracking-tight leading-snug">
                                {project.title}
                            </h3>
                            <p className="font-mono text-[11px] text-zinc-600 uppercase tracking-wider">
                                {project.description}
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-zinc-500 leading-relaxed flex-1">
                            {project.longDescription}
                        </p>

                        {/* Tech pills — uniform, no color variation */}
                        <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((t) => (
                                <span
                                    key={t}
                                    className="font-mono px-2 py-1 rounded text-[11px] bg-zinc-900 border border-zinc-800 text-zinc-500 group-hover:text-zinc-400 group-hover:border-zinc-700 transition-colors duration-200"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-3 border-t border-zinc-800/50">
                            {project.github && (
                                <Magnet magnetStrength={0.25} padding={25} className="flex-shrink-0">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${project.title} source code`}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs text-zinc-500 hover:text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all duration-200"
                                    >
                                        <Github size={12} />
                                        source
                                    </a>
                                </Magnet>
                            )}
                            {project.live && (
                                <Magnet magnetStrength={0.25} padding={25} className="flex-shrink-0">
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${project.title} live demo`}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs text-zinc-500 hover:text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all duration-200"
                                    >
                                        <ExternalLink size={12} />
                                        live
                                    </a>
                                </Magnet>
                            )}
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
            className="relative w-full bg-[#0a0a0a] text-[#e5e7eb] py-24 px-6 md:px-12 lg:px-20 border-t border-zinc-800/40 overflow-hidden"
        >
            {/* Very faint dot-grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.018]"
                style={{
                    backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* Section header */}
                <AnimatedContent direction="vertical" distance={24} delay={0}>
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-12">
                        <div className="flex flex-col gap-2">
                            <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[#22c55e] flex items-center gap-1.5">
                                <span className="text-zinc-600">~/</span>projects
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                What I've Built
                            </h2>
                            <p className="text-sm text-zinc-500 max-w-sm mt-0.5">
                                Backend systems, APIs, and infrastructure tools.
                                Placeholder names — real repos coming soon.
                            </p>
                        </div>

                        <Magnet magnetStrength={0.2} padding={35}>
                            <a
                                href="https://github.com/FarhanDH"
                                target="_blank"
                                rel="noopener noreferrer"
                                id="view-all-github"
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 whitespace-nowrap"
                            >
                                <Github size={13} />
                                github.com/FarhanDH
                                <ExternalLink size={10} className="opacity-40" />
                            </a>
                        </Magnet>
                    </div>
                </AnimatedContent>

                {/* Terminal chrome header — echoes Hero window */}
                <AnimatedContent direction="vertical" distance={16} delay={0.05}>
                    <div className="flex items-center gap-2 mb-4 px-1">
                        <Terminal size={12} className="text-zinc-700" />
                        <span className="font-mono text-[11px] text-zinc-700 select-none">
                            ls -la ~/projects
                        </span>
                        <div className="flex-1 h-px bg-zinc-900" />
                        <span className="font-mono text-[11px] text-zinc-700 select-none">
                            {projects.length} entries
                        </span>
                    </div>
                </AnimatedContent>

                {/* 3-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project, idx) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            delay={0.04 * idx}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
