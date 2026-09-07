import { useEffect, useRef, useState } from "react";
import { Github, ExternalLink, Terminal, ChevronDown } from "lucide-react";
import AnimatedContent from "./AnimatedContent";
import SpotlightCard from "./SpotlightCard";
import Magnet from "./Magnet";

// ── API response shape (snake_case from Go API) ───────────────────────────────
interface ProjectDTO {
    id: string;
    display_order?: number;
    title: string;
    description: string;
    long_description: string;
    tech: string[];
    github_url?: string | null;
    live_url?: string | null;
    featured?: boolean;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;
const INITIAL_DISPLAY_COUNT = 3;

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

// ─── Skeleton Card for loading state ──────────────────────────────────────────
function ProjectSkeleton() {
    return (
        <div className="h-full rounded-xl border border-zinc-800/70 bg-zinc-950 p-5 flex flex-col gap-4 animate-pulse">
            <div className="flex items-start justify-between">
                <div className="h-8 w-10 bg-zinc-850 rounded" />
                <div className="h-4 w-16 bg-zinc-900 rounded" />
            </div>
            <div className="flex flex-col gap-2">
                <div className="h-5 bg-zinc-800 rounded w-2/3" />
                <div className="h-3 bg-zinc-900 rounded w-1/2" />
            </div>
            <div className="space-y-2 flex-1">
                <div className="h-3 bg-zinc-900 rounded w-full" />
                <div className="h-3 bg-zinc-900 rounded w-5/6" />
                <div className="h-3 bg-zinc-900 rounded w-4/6" />
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
                {[60, 50, 70, 55].map((w, i) => (
                    <div
                        key={i}
                        className="h-5 bg-zinc-900 rounded"
                        style={{ width: w }}
                    />
                ))}
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-zinc-800/50">
                <div className="h-7 w-20 bg-zinc-900 rounded" />
            </div>
        </div>
    );
}

// ─── Single Project Card ──────────────────────────────────────────────────────
function ProjectCard({
    project,
    index,
    delay,
}: {
    project: ProjectDTO;
    index: number;
    delay: number;
}) {
    const { cardRef, tilt, handleMouseMove, handleMouseLeave } = useTilt();
    const formattedNumber = String(index + 1).padStart(2, "0");

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
                        transition:
                            "transform 0.12s ease-out, border-color 0.3s ease",
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
                                {formattedNumber}
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
                            {project.long_description}
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
                        <div className="flex justify-end items-center gap-2 pt-3 border-t border-zinc-800/50">
                            {project.github_url && (
                                <Magnet
                                    magnetStrength={0.25}
                                    padding={25}
                                    className="flex-shrink-0"
                                >
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${project.title} source code`}
                                        className="flex justify-end text-end items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs text-zinc-500 hover:text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 cursor-pointer"
                                    >
                                        <Github size={12} />
                                        source
                                    </a>
                                </Magnet>
                            )}
                            {project.live_url && (
                                <Magnet
                                    magnetStrength={0.25}
                                    padding={25}
                                    className="flex-shrink-0"
                                >
                                    <a
                                        href={project.live_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${project.title} live demo`}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs text-zinc-500 hover:text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 cursor-pointer"
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
    const [projects, setProjects] = useState<ProjectDTO[]>([]);
    const [status, setStatus] = useState<"loading" | "success" | "error">(
        "loading",
    );
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        let isMounted = true;

        fetch(`${API_BASE}/api/v1/projects`, {
            headers: { Accept: "application/json" },
        })
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json() as Promise<ProjectDTO[]>;
            })
            .then((data) => {
                if (isMounted) {
                    const sorted = [...data].sort(
                        (a, b) =>
                            (a.display_order ?? 0) - (b.display_order ?? 0),
                    );
                    setProjects(sorted);
                    setStatus("success");
                }
            })
            .catch((err) => {
                if (isMounted) {
                    console.error("[ProjectsSection]", err);
                    setStatus("error");
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section
            id="projects"
            className="relative w-full bg-[#0a0a0a] text-[#e5e7eb] py-24 px-6 md:px-12 lg:px-20 border-t border-zinc-800/40 overflow-hidden"
        >
            {/* Very faint dot-grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.018]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section header */}
                <AnimatedContent direction="vertical" distance={24} delay={0}>
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-12">
                        <div className="flex flex-col gap-2">
                            <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[#22c55e] flex items-center gap-1.5">
                                <span className="text-zinc-600">~/</span>
                                projects
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                What I've Built
                            </h2>
                            <p className="text-sm text-zinc-500 max-w-sm mt-0.5">
                                Backend systems, APIs, and infrastructure tools
                                I've shipped.
                            </p>
                        </div>

                        <Magnet magnetStrength={0.2} padding={35}>
                            <a
                                href="https://github.com/FarhanDH"
                                target="_blank"
                                rel="noopener noreferrer"
                                id="view-all-github"
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 whitespace-nowrap cursor-pointer"
                            >
                                <Github size={13} />
                                github.com/FarhanDH
                                <ExternalLink
                                    size={10}
                                    className="opacity-40"
                                />
                            </a>
                        </Magnet>
                    </div>
                </AnimatedContent>

                {/* Terminal chrome header — echoes Hero window */}
                <AnimatedContent
                    direction="vertical"
                    distance={16}
                    delay={0.05}
                >
                    <div className="flex items-center gap-2 mb-4 px-1">
                        <Terminal size={12} className="text-zinc-700" />
                        <span className="font-mono text-[11px] text-zinc-700 select-none">
                            ls -la ~/projects
                        </span>
                        <div className="flex-1 h-px bg-zinc-900" />
                        <span className="font-mono text-[11px] text-zinc-700 select-none">
                            {status === "loading"
                                ? "fetching..."
                                : `${projects.length} entries`}
                        </span>
                    </div>
                </AnimatedContent>

                {/* ── Loading state ── */}
                {status === "loading" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, i) => (
                            <ProjectSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* ── Error state ── */}
                {status === "error" && (
                    <div className="flex flex-col items-center gap-3 py-16 text-center">
                        <span className="font-mono text-sm text-zinc-600">
                            <span className="text-red-500/70">✗</span> failed to
                            fetch projects
                        </span>
                        <button
                            onClick={() => {
                                setStatus("loading");
                                setProjects([]);
                                window.location.reload();
                            }}
                            className="font-mono text-xs text-zinc-600 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-700 px-4 py-2 rounded-lg transition-all duration-200 mt-1 cursor-pointer"
                        >
                            retry
                        </button>
                    </div>
                )}

                {/* ── Empty state ── */}
                {status === "success" && projects.length === 0 && (
                    <p className="font-mono text-sm text-zinc-600 py-12 text-center">
                        No projects found.
                    </p>
                )}

                {/* ── Projects grid ── */}
                {status === "success" && projects.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {(showAll
                                ? projects
                                : projects.slice(0, INITIAL_DISPLAY_COUNT)
                            ).map((project, idx) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={idx}
                                    delay={0.04 * idx}
                                />
                            ))}
                        </div>

                        {/* ── View more / View less button ── */}
                        {projects.length > INITIAL_DISPLAY_COUNT && (
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => setShowAll((prev) => !prev)}
                                    className="group flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                                >
                                    {/* <span className="text-[#22c55e]">$</span> */}
                                    <span>
                                        {showAll
                                            ? "show less"
                                            : `view more (+${projects.length - INITIAL_DISPLAY_COUNT})`}
                                    </span>
                                    <ChevronDown
                                        size={14}
                                        className={`text-zinc-500 group-hover:text-zinc-300 transition-transform duration-300 ${
                                            showAll ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
