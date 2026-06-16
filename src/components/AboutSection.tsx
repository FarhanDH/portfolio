import AnimatedContent from "./AnimatedContent";
import { Github, Linkedin, MapPin } from "lucide-react";

export default function AboutSection() {
    const skills = {
        Backend: [
            "NestJS",
            "Golang (Learning)",
            "PostgreSQL",
            "Redis",
            "BullMQ",
        ],
        DevOps: [
            "Docker",
            "Jenkins CI/CD",
            "Google Cloud Platform",
            "Amazon Web Service",
        ],
        Frontend: ["ReactJS", "TypeScript", "Tailwind CSS"],
        Tools: ["Git", "Prisma ORM", "TypeORM", "Postman"],
    };

    return (
        <section
            id="about"
            className="relative min-h-screen w-full bg-[#0a0a0a] text-[#e5e7eb] py-24 px-6 md:px-12 lg:px-20 border-t border-zinc-950"
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
                {/* Left Column: Narrative Bio & Socials */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:sticky lg:top-24">
                    <AnimatedContent
                        direction="vertical"
                        distance={30}
                        delay={0.1}
                    >
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-semibold tracking-wider uppercase text-[#7C3AED]">
                                Who I Am
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                About Me
                            </h2>
                        </div>
                    </AnimatedContent>

                    <AnimatedContent
                        direction="vertical"
                        distance={30}
                        delay={0.2}
                    >
                        <div className="flex flex-col gap-4 text-gray-400 leading-relaxed text-sm md:text-base">
                            <p>
                                Hi, I'm Farhan! I'm a passionate{" "}
                                <strong className="text-white font-semibold">
                                    Backend Developer
                                </strong>{" "}
                                dedicated to building high-performance, robust,
                                and scalable server-side architectures. I
                                specialize in designing microservices,
                                structuring database schemas, and building
                                efficient background processing pipelines.
                            </p>
                            <p>
                                Currently, I work primarily with{" "}
                                <span className="text-[#3B82F6] font-medium">
                                    NestJS
                                </span>{" "}
                                and TypeScript. To build even faster systems,
                                I'm actively expanding my toolkit with{" "}
                                <span className="text-[#3B82F6] font-medium">
                                    Golang
                                </span>
                                . I am fascinated by cloud technologies and
                                cloud infrastructure, working my way toward
                                deploying production backend code to the cloud.
                            </p>
                            <p>
                                I value clean code, modular architecture, and
                                solid developer workflows. In my spare time, I
                                explore system scalability, play around with
                                Docker setups, and automate pipelines to ship
                                features faster.
                            </p>
                        </div>
                    </AnimatedContent>

                    {/* Social Links & Location */}
                    <AnimatedContent
                        direction="vertical"
                        distance={30}
                        delay={0.3}
                    >
                        <div className="flex flex-wrap items-center gap-4 py-2 border-t border-zinc-900 mt-2 pt-6">
                            <a
                                href="https://github.com/FarhanDH"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-gray-300 hover:text-white transition-all duration-300 text-xs sm:text-sm"
                            >
                                <Github size={16} />
                                <span>GitHub</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/farhan-dwi-hartanto-8074ba292/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-gray-300 hover:text-white transition-all duration-300 text-xs sm:text-sm"
                            >
                                <Linkedin size={16} />
                                <span>LinkedIn</span>
                            </a>
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs sm:text-sm px-2">
                                <MapPin size={16} />
                                <span>Samarinda, East Kalimantan</span>
                            </div>
                        </div>
                    </AnimatedContent>
                </div>

                {/* Right Column: Tech Stack badges */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6 bg-zinc-900/10 border border-zinc-900 p-6 md:p-8 rounded-2xl">
                    <AnimatedContent
                        direction="vertical"
                        distance={30}
                        delay={0.2}
                    >
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-semibold tracking-wider uppercase text-[#3B82F6]">
                                    Skills & Tools
                                </span>
                                <h3 className="text-xl font-bold text-white">
                                    My Tech Stack
                                </h3>
                            </div>

                            <div className="flex flex-col gap-5">
                                {Object.entries(skills).map(
                                    ([category, items]) => (
                                        <div
                                            key={category}
                                            className="flex flex-col gap-2"
                                        >
                                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                {category}
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {items.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-900/60 hover:bg-[#3B82F6]/5 border border-zinc-850 hover:border-[#3B82F6]/25 text-gray-300 hover:text-white transition-all duration-300 cursor-default"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </AnimatedContent>
                </div>
            </div>
        </section>
    );
}
