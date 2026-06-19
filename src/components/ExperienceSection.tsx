import { useState } from "react";
import AnimatedContent from "./AnimatedContent";
import { ChevronDown } from "lucide-react";

interface ExperienceItem {
    id: number;
    role: string;
    company: string;
    type: string;
    startDate: string;
    endDate: string | null;
    location: string;
    highlights: string[];
    tech: string[];
}

const experiences: ExperienceItem[] = [
    {
        id: 1,
        role: "Backend Developer Intern",
        company: "PT.  Media Kreasi Abadi",
        type: "Internship",
        startDate: "Jan 2026",
        endDate: "May 2026",
        location: "Balikpapan, Indonesia · Remote",
        highlights: [
            "Designed and maintained RESTful APIs serving 10k+ daily requests using NestJS and PostgreSQL.",
            "Implemented a distributed background job system with BullMQ and Redis, reducing task latency by 40%.",
            "Containerized services with Docker and set up CI/CD pipelines on Jenkins for automated deployment.",
            "Collaborated with the frontend team to define API contracts and Swagger documentation standards.",
        ],
        tech: [
            "NestJS",
            "PostgreSQL",
            "Prisma",
            "Redis",
            "BullMQ",
            "Docker",
            "Jenkins",
        ],
    },
    {
        id: 2,
        role: "Backend Developer (Bangkit Capstone)",
        company: "Nusantara Beta Studio",
        type: "Apprenticeship",
        startDate: "Oct 2024",
        endDate: "Dec 2024",
        location: "South Jakarta, Indonesia",
        highlights: [
            "Built user authentication and role-based access control modules using NestJS and TypeORM.",
            "Integrated Midtrans Payment Gateway to process digital transactions reliably.",
            "Provisioned and deployed the backend infrastructure utilizing Google Cloud Platform (GCP) services to ensure high availability.",
        ],
        tech: ["NestJS", "TypeORM", "PostgreSQL", "Google Cloud Platform"],
    },
    {
        id: 3,
        role: "Junior Network Engineer",
        company: "PT. Lintasmaya Multi Media",
        type: "Internship",
        startDate: "Oct 2021",
        endDate: "Dec 2021",
        location: "Samarinda, Indonesia",
        highlights: [
            "Assembled Ubiquiti Rocket Dish 30 and 40 for network connectivity.",
            "Conducted intensive connection testing to ensure network reliability.",
            "Performed fiber optic splicing for seamless data transmission.",
            "Configured WLAN, Login Pages, and PPPoE Server & Client on MikroTik routers.",
        ],
        tech: ["Mikrotik", "Network Engineering"],
    },
];

export default function ExperienceSection() {
    const [openId, setOpenId] = useState<number | null>(null);

    return (
        <section
            id="experience"
            className="relative w-full bg-[#0a0a0a] text-[#e5e7eb] py-24 px-6 md:px-12 lg:px-20 border-t border-zinc-800/40"
        >
            <div className="max-w-4xl mx-auto">
                {/* Section header */}
                <AnimatedContent direction="vertical" distance={24} delay={0}>
                    <div className="flex flex-col gap-2 mb-14">
                        <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[#22c55e] flex items-center gap-1.5">
                            <span className="text-zinc-600">~/</span>experience
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            Work Experience
                        </h2>
                    </div>
                </AnimatedContent>

                {/* ── Timeline ── */}
                <div className="relative pl-8 md:pl-12">
                    {/* Spine line */}
                    <div className="absolute left-[11px] md:left-[15px] top-0 bottom-0 w-px bg-zinc-800" />

                    {experiences.map((exp, idx) => {
                        const isCurrent = exp.endDate === null;
                        const isOpen = openId === exp.id;

                        return (
                            <AnimatedContent
                                key={exp.id}
                                direction="vertical"
                                distance={20}
                                delay={0.1 * idx}
                            >
                                <div
                                    className={`relative ${idx < experiences.length - 1 ? "mb-10" : ""}`}
                                >
                                    {/* ── Dot on spine ── */}
                                    <div className="absolute -left-8 md:-left-12 top-[18px] flex items-center justify-center w-[23px] md:w-[31px]">
                                        <span
                                            className={`relative flex items-center justify-center w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                                                isCurrent
                                                    ? "border-[#22c55e] bg-[#22c55e]/15"
                                                    : "border-zinc-600 bg-zinc-900"
                                            }`}
                                        >
                                            {isCurrent && (
                                                <span className="absolute inset-0 rounded-full bg-[#22c55e]/20 animate-ping" />
                                            )}
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${
                                                    isCurrent
                                                        ? "bg-[#22c55e]"
                                                        : "bg-zinc-600"
                                                }`}
                                            />
                                        </span>
                                    </div>

                                    {/* ── Entry ── */}
                                    <div className="flex flex-col gap-0">
                                        {/* Clickable header */}
                                        <button
                                            onClick={() =>
                                                setOpenId(
                                                    isOpen ? null : exp.id,
                                                )
                                            }
                                            className="w-full text-left"
                                        >
                                            <div
                                                className={`flex items-start justify-between gap-4 px-5 py-4 rounded-xl border transition-colors duration-200 ${
                                                    isOpen
                                                        ? "border-zinc-700/60 bg-zinc-900/50 rounded-b-none"
                                                        : "border-zinc-800/60 bg-zinc-950 hover:border-zinc-700/50"
                                                }`}
                                            >
                                                <div className="flex flex-col gap-1.5">
                                                    {/* Date range — top, small, monospaced */}
                                                    <span className="font-mono text-[11px] text-zinc-400">
                                                        {exp.startDate} —{" "}
                                                        {exp.endDate ??
                                                            "Present"}
                                                    </span>

                                                    {/* Role */}
                                                    <span className="text-sm font-semibold text-zinc-100">
                                                        {exp.role}
                                                    </span>

                                                    {/* Company + tags */}
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="text-xs text-zinc-500">
                                                            {exp.company}
                                                        </span>
                                                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                                                            {exp.type}
                                                        </span>
                                                        {isCurrent && (
                                                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-[#22c55e]/20 text-[#22c55e]/70 bg-[#22c55e]/5 flex items-center gap-1">
                                                                <span className="w-1 h-1 rounded-full bg-[#22c55e] animate-pulse" />
                                                                current
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <ChevronDown
                                                    size={14}
                                                    className={`flex-shrink-0 mt-1 text-zinc-600 transition-transform duration-300 ${
                                                        isOpen
                                                            ? "rotate-180 text-zinc-400"
                                                            : ""
                                                    }`}
                                                />
                                            </div>
                                        </button>

                                        {/* Expandable details — click only */}
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                                isOpen
                                                    ? "max-h-[480px] opacity-100"
                                                    : "max-h-0 opacity-0"
                                            }`}
                                        >
                                            <div className="border border-t-0 border-zinc-700/60 bg-zinc-900/30 rounded-b-xl px-5 py-4 flex flex-col gap-4">
                                                {/* Location */}
                                                <span className="font-mono text-[11px] text-zinc-400">
                                                    {exp.location}
                                                </span>

                                                {/* Highlights */}
                                                <ul className="flex flex-col gap-2">
                                                    {exp.highlights.map(
                                                        (h, i) => (
                                                            <li
                                                                key={i}
                                                                className="flex items-start gap-2.5 text-sm text-zinc-500 leading-relaxed"
                                                            >
                                                                <span className="font-mono text-zinc-600 mt-px flex-shrink-0 select-none">
                                                                    ›
                                                                </span>
                                                                {h}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>

                                                {/* Tech */}
                                                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/50">
                                                    {exp.tech.map((t) => (
                                                        <span
                                                            key={t}
                                                            className="font-mono px-2 py-1 rounded text-[11px] bg-zinc-900 border border-zinc-800 text-zinc-500"
                                                        >
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedContent>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
