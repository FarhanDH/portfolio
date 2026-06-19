import AnimatedContent from "./AnimatedContent";
import { Github, Linkedin, MapPin, Terminal } from "lucide-react";

export default function AboutSection() {
    const skills: Record<string, { name: string; color: string }[]> = {
        Backend: [
            { name: "NestJS", color: "green" },
            { name: "Golang", color: "green" },
            { name: "PostgreSQL", color: "green" },
            { name: "Redis", color: "green" },
            { name: "BullMQ", color: "green" },
        ],
        "Cloud & DevOps": [
            { name: "Docker", color: "blue" },
            { name: "Jenkins CI/CD", color: "blue" },
            { name: "Google Cloud Platform", color: "blue" },
            { name: "Amazon Web Services", color: "blue" },
        ],
        Frontend: [
            { name: "ReactJS", color: "purple" },
            { name: "TypeScript", color: "purple" },
            { name: "Tailwind CSS", color: "purple" },
        ],
        Tools: [
            { name: "Git", color: "gray" },
            { name: "Prisma ORM", color: "gray" },
            { name: "TypeORM", color: "gray" },
            { name: "Postman", color: "gray" },
        ],
    };

    const pillColors: Record<string, string> = {
        green: "hover:bg-[#22c55e]/8 hover:border-[#22c55e]/30 hover:text-[#22c55e]",
        blue: "hover:bg-[#3B82F6]/8 hover:border-[#3B82F6]/30 hover:text-[#3B82F6]",
        purple: "hover:bg-[#a78bfa]/8 hover:border-[#a78bfa]/30 hover:text-[#a78bfa]",
        gray: "hover:bg-zinc-800 hover:border-zinc-600 hover:text-white",
    };

    return (
        <section
            id="about"
            className="relative w-full bg-[#0a0a0a] text-[#e5e7eb] py-24 px-6 md:px-12 lg:px-20 border-t border-zinc-800/40"
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                {/* ── Left Column: Bio & Socials ── */}
                <div className="w-full lg:w-1/2 flex flex-col gap-7 lg:sticky lg:top-24">

                    {/* Section label */}
                    <AnimatedContent direction="vertical" distance={30} delay={0.1}>
                        <div className="flex flex-col gap-2">
                            <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[#22c55e] flex items-center gap-1.5">
                                <span className="text-zinc-600">~/</span>about
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                About Me
                            </h2>
                        </div>
                    </AnimatedContent>

                    {/* Bio paragraphs — clean prose, HR-friendly */}
                    <AnimatedContent direction="vertical" distance={30} delay={0.2}>
                        <div className="flex flex-col gap-4 text-gray-400 leading-relaxed text-sm md:text-base">
                            <p>
                                Hi, I'm <strong className="text-white font-semibold">Farhan</strong> — a
                                Backend Developer based in Samarinda, Indonesia. I specialize in
                                building high-performance server-side systems: designing APIs,
                                structuring databases, and orchestrating background jobs that scale.
                            </p>
                            <p>
                                My primary stack is{" "}
                                <span className="text-[#22c55e] font-medium">NestJS</span> and{" "}
                                <span className="text-[#22c55e] font-medium">TypeScript</span>,
                                paired with cloud infrastructure on{" "}
                                <span className="text-[#3B82F6] font-medium">GCP</span> and{" "}
                                <span className="text-[#3B82F6] font-medium">AWS</span>. I'm
                                actively growing into{" "}
                                <span className="text-[#22c55e] font-medium">Golang</span> for
                                systems that demand even higher throughput.
                            </p>
                            <p>
                                I care deeply about clean architecture, meaningful documentation,
                                and shipping reliable software. Outside of work, I explore system
                                design, automate my development workflows, and tinker with
                                container orchestration setups.
                            </p>
                        </div>
                    </AnimatedContent>

                    {/* Quick-info strip — scannable for HR */}
                    <AnimatedContent direction="vertical" distance={30} delay={0.25}>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: "Role", value: "Backend Developer" },
                                { label: "Experience", value: "1+ Year" },
                                { label: "Location", value: "Samarinda, ID" },
                                { label: "Status", value: "Open to Work", highlight: true },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="flex flex-col gap-0.5 p-3 rounded-lg border border-zinc-800/70 bg-zinc-900/20"
                                >
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                                        {item.label}
                                    </span>
                                    <span
                                        className={`text-sm font-medium ${
                                            item.highlight
                                                ? "text-[#22c55e] flex items-center gap-1.5"
                                                : "text-zinc-200"
                                        }`}
                                    >
                                        {item.highlight && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse inline-block" />
                                        )}
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </AnimatedContent>

                    {/* Social Links */}
                    <AnimatedContent direction="vertical" distance={30} delay={0.3}>
                        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-zinc-800/60">
                            <a
                                href="https://github.com/FarhanDH"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-gray-300 hover:text-white transition-all duration-300 text-xs font-mono"
                            >
                                <Github size={14} />
                                <span>github.com/FarhanDH</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/farhan-dwi-hartanto-8074ba292/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-gray-300 hover:text-white transition-all duration-300 text-xs font-mono"
                            >
                                <Linkedin size={14} />
                                <span>LinkedIn</span>
                            </a>
                            <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-mono px-2">
                                <MapPin size={13} />
                                <span>Samarinda, East Kalimantan</span>
                            </div>
                        </div>
                    </AnimatedContent>
                </div>

                {/* ── Right Column: Tech Stack in terminal window ── */}
                <div className="w-full lg:w-1/2">
                    <AnimatedContent direction="vertical" distance={30} delay={0.2}>
                        {/* Terminal window chrome */}
                        <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/40">

                            {/* Title bar */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/60">
                                <span className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors" />
                                <span className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors" />
                                <span className="w-3 h-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors" />
                                <span className="ml-3 font-mono text-[11px] text-zinc-500 select-none flex items-center gap-1.5">
                                    <Terminal size={10} />
                                    farhan@cloud-dev: cat tech-stack.json
                                </span>
                            </div>

                            {/* Stack content */}
                            <div className="p-5 md:p-6 flex flex-col gap-5">
                                {/* Header inside terminal */}
                                <div className="flex flex-col gap-0.5">
                                    <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[#3B82F6]">
                                        Skills &amp; Tools
                                    </span>
                                    <h3 className="text-lg font-bold text-white">
                                        My Tech Stack
                                    </h3>
                                    <p className="text-xs text-zinc-600 font-mono mt-0.5">
                                        // hover over any skill to highlight it
                                    </p>
                                </div>

                                {/* Category groups */}
                                <div className="flex flex-col gap-5">
                                    {Object.entries(skills).map(([category, items], i) => (
                                        <div key={category} className="flex flex-col gap-2">
                                            {/* Category header with left-border accent */}
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`font-mono text-[10px] font-bold uppercase tracking-widest ${
                                                        i === 0
                                                            ? "text-[#22c55e]"
                                                            : i === 1
                                                            ? "text-[#3B82F6]"
                                                            : i === 2
                                                            ? "text-[#a78bfa]"
                                                            : "text-zinc-500"
                                                    }`}
                                                >
                                                    {category}
                                                </span>
                                                <div className="flex-1 h-px bg-zinc-800/60" />
                                            </div>

                                            {/* Skill pills */}
                                            <div className="flex flex-wrap gap-2">
                                                {items.map((skill) => (
                                                    <span
                                                        key={skill.name}
                                                        className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium bg-zinc-900/60 border border-zinc-800 text-zinc-400 transition-all duration-200 cursor-default ${
                                                            pillColors[skill.color]
                                                        }`}
                                                    >
                                                        {skill.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Bottom note — HR-friendly context */}
                                <div className="pt-3 border-t border-zinc-800/60 flex items-start gap-2.5 text-zinc-600 text-xs leading-relaxed">
                                    <span className="font-mono text-[#22c55e] select-none mt-px">
                                        #
                                    </span>
                                    <p>
                                        Actively learning and expanding — I pick up new
                                        technologies quickly and enjoy working across the full
                                        backend &amp; infrastructure stack.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </AnimatedContent>
                </div>

            </div>
        </section>
    );
}
