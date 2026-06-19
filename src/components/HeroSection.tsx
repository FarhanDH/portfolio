import TextType from "./TextType";
import Beams from "./Beams";
import Lanyard from "./Lanyard";
import { Button } from "./ui/button";
import farhanImg from "../assets/farhan.jpg";
import meletImg from "../assets/melet gendeng.jpg";

export default function HeroSection() {
    const handleScrollToWork = () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative min-h-screen w-full flex flex-col justify-center bg-[#0a0a0a] px-6 py-20 lg:py-0 md:px-12 lg:px-20 overflow-hidden">
            {/* Animated Beams Background */}
            <div className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
                <Beams
                    beamNumber={6}
                    beamWidth={2}
                    beamHeight={25}
                    lightColor="#00ff88"
                    speed={1.2}
                    noiseIntensity={1}
                    scale={0.12}
                />
            </div>

            {/* Subtle scanline overlay for terminal feel */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px)",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                {/* Left Column: Terminal UI */}
                <div className="lg:col-span-7 flex flex-col items-start text-left gap-5 order-1">

                    {/* Terminal window chrome */}
                    <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/60">
                        {/* Title bar */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/60">
                            <span className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                            <span className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
                            <span className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
                            <span className="ml-3 text-[11px] text-zinc-500 font-mono select-none">
                                farhan@cloud-dev: ~
                            </span>
                        </div>

                        {/* Terminal body */}
                        <div className="p-5 sm:p-6 flex flex-col gap-3 font-mono text-sm">
                            {/* Line 1: whoami */}
                            <div className="flex items-center gap-2">
                                <span className="text-[#22c55e] text-xs select-none">farhan@cloud-dev</span>
                                <span className="text-zinc-600 text-xs select-none">:</span>
                                <span className="text-[#3B82F6] text-xs select-none">~</span>
                                <span className="text-zinc-500 text-xs select-none">$</span>
                                <span className="text-zinc-300 text-xs">whoami</span>
                            </div>

                            {/* Output: big name with typing */}
                            <div className="pl-2 border-l-2 border-[#22c55e]/30">
                                <h1 className="flex items-baseline gap-0 flex-wrap">
                                    <TextType
                                        as="span"
                                        text={["Hi, I'm Farhan", "Backend Developer", "Cloud Enthusiast", "API Architect"]}
                                        typingSpeed={65}
                                        deletingSpeed={35}
                                        pauseDuration={2200}
                                        loop={true}
                                        showCursor={true}
                                        cursorCharacter="█"
                                        cursorClassName="text-[#22c55e] animate-pulse"
                                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
                                        textColors={["#ffffff", "#22c55e", "#3B82F6", "#a78bfa"]}
                                    />
                                </h1>
                            </div>

                            {/* Line 2: cat role.txt */}
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[#22c55e] text-xs select-none">farhan@cloud-dev</span>
                                <span className="text-zinc-600 text-xs select-none">:</span>
                                <span className="text-[#3B82F6] text-xs select-none">~</span>
                                <span className="text-zinc-500 text-xs select-none">$</span>
                                <span className="text-zinc-300 text-xs">cat role.txt</span>
                            </div>

                            {/* Output: tagline */}
                            <p className="pl-2 border-l-2 border-zinc-800 text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-lg">
                                <span className="text-[#22c55e]"># </span>
                                Building scalable backend systems, designing robust
                                APIs, and shipping them to the cloud.
                                <br />
                                <span className="text-[#22c55e]"># </span>
                                Focused on performance, reliability, and clean
                                architecture.
                            </p>

                            {/* Line 3: blinking prompt */}
                            <div className="flex items-center gap-2">
                                <span className="text-[#22c55e] text-xs select-none">farhan@cloud-dev</span>
                                <span className="text-zinc-600 text-xs select-none">:</span>
                                <span className="text-[#3B82F6] text-xs select-none">~</span>
                                <span className="text-zinc-500 text-xs select-none">$</span>
                                <span className="w-2 h-4 bg-[#22c55e] animate-pulse inline-block align-middle opacity-80" />
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons — same minimalist style */}
                    <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                        <Button
                            onClick={handleScrollToWork}
                            className="w-full sm:w-auto px-7 py-6 text-sm font-mono font-medium text-[#22c55e] bg-zinc-950 hover:bg-zinc-900 border border-[#22c55e]/30 hover:border-[#22c55e]/60 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] cursor-pointer"
                        >
                            <span className="text-zinc-500 mr-1">./</span>view-projects.sh
                        </Button>
                        <button
                            onClick={() =>
                                document
                                    .getElementById("contact")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="w-full sm:w-auto px-7 py-6 text-sm font-mono font-medium text-zinc-400 hover:text-white bg-transparent border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                        >
                            <span className="text-zinc-600 mr-1">$</span>contact --me
                        </button>
                    </div>

                    {/* Status badges */}
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 border border-zinc-800 px-3 py-1.5 rounded-md bg-zinc-950/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                            Available for work
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 border border-zinc-800 px-3 py-1.5 rounded-md bg-zinc-950/50">
                            <span className="text-[#3B82F6]">📍</span>
                            Samarinda, ID
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 border border-zinc-800 px-3 py-1.5 rounded-md bg-zinc-950/50">
                            <span className="text-[#a78bfa]">🐧</span>
                            Linux &amp; Cloud
                        </span>
                    </div>
                </div>

                {/* Right Column: Lanyard 3D Card */}
                <div className="min-h-[90vh] -top-10 lg:col-span-5 w-full h-100 sm:h-120 lg:h-150 flex justify-center items-center relative order-2">
                    {/* Subtle background grid pattern behind lanyard */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-15 pointer-events-none" />

                    <div className="w-full h-full relative z-100">
                        <Lanyard
                            frontImage={farhanImg}
                            backImage={meletImg}
                            gravity={[0, -40, 0]}
                            transparent={true}
                            fov={10}
                        />
                    </div>

                    {/* Tiny drag indicator */}
                    <div className="absolute bottom-2 text-center z-20 pointer-events-none">
                        <p className="text-[10px] sm:text-xs text-gray-500 font-mono bg-black/60 px-3 py-1 rounded-full border border-zinc-900/80 backdrop-blur-sm select-none">
                            👋 Drag to swing the ID badge
                        </p>
                    </div>
                </div>
            </div>

            {/* Animated Scroll Indicator */}
            <button
                className="hidden lg:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center gap-2 text-zinc-600 hover:text-[#22c55e] transition-colors duration-300 cursor-pointer bg-transparent border-none outline-none font-mono"
                onClick={handleScrollToWork}
            >
                <span className="text-[10px] uppercase tracking-widest font-semibold">
                    scroll down
                </span>
                <div className="w-5 h-8 border border-zinc-800 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-[#22c55e] rounded-full animate-bounce" />
                </div>
            </button>
        </section>
    );
}
