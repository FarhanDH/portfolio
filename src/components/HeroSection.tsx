import Beams from "./Beams";
import SplitText from "./SplitText";
import Lanyard from "./Lanyard";
import { Button } from "./ui/button";
import farhanImg from "../assets/farhan.jpg";
import meletImg from "../assets/melet gendeng.jpg";

export default function HeroSection() {
    const handleScrollToWork = () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative min-h-screen w-full flex flex-col justify-center bg-[#0a0a0a] px-6 py-20 lg:py-0 md:px-12 lg:px-20 overflow-hidden">
            {/* Animated Beams Background */}
            <div className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
                <Beams
                    beamNumber={6}
                    beamWidth={2}
                    beamHeight={25}
                    lightColor="#091b91"
                    speed={1.2}
                    noiseIntensity={1}
                    scale={0.12}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                {/* Left Column: Text & CTA */}
                <div className="lg:col-span-7 flex flex-col items-start text-left gap-6 order-1">
                    {/* Title/Tag */}
                    <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 uppercase">
                        Backend Developer · Cloud Enthusiast
                    </span>

                    {/* Animated Main Heading */}
                    <div className="w-full">
                        <SplitText
                            text="Hi, I'm Farhan"
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-none"
                            delay={85}
                            duration={1.2}
                            ease="power4.out"
                            tag="h1"
                            textAlign="left"
                        />
                    </div>

                    {/* Tagline */}
                    <p className="max-w-xl text-base sm:text-lg text-gray-400 font-medium leading-relaxed">
                        I build scalable backend systems, design robust APIs,
                        and ship them to the cloud. Focused on performance,
                        reliability, and clean architecture.
                    </p>

                    {/* CTA Buttons - Premium, minimalist, not overly colorful */}
                    <div className="flex flex-wrap gap-4 mt-2 w-full sm:w-auto">
                        <Button
                            onClick={handleScrollToWork}
                            className="w-full sm:w-auto px-8 py-6 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                        >
                            View My Work
                        </Button>
                        <button
                            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                            className="w-full sm:w-auto px-8 py-6 text-sm font-medium text-gray-400 hover:text-white bg-transparent border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                        >
                            Contact Me
                        </button>
                    </div>
                </div>

                {/* Right Column: Lanyard 3D Card */}
                <div className="min-h-[90vh] -top-10 lg:col-span-5 w-full h-100 sm:h-120 lg:h-150 flex justify-center items-center relative order-2">
                    {/* Subtle background grid pattern behind lanyard */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-15 pointer-events-none"></div>

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
                        <p className="text-[10px] sm:text-xs text-gray-500 bg-black/60 px-3 py-1 rounded-full border border-zinc-900/80 backdrop-blur-sm select-none">
                            👋 Drag to swing the ID badge
                        </p>
                    </div>
                </div>
            </div>

            {/* Animated Scroll Indicator - Only visible on desktop */}
            <button
                className="hidden lg:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center gap-2 text-gray-600 hover:text-[#3B82F6] transition-colors duration-300 cursor-pointer bg-transparent border-none outline-none"
                onClick={handleScrollToWork}
            >
                <span className="text-[10px] uppercase tracking-widest font-semibold">
                    Scroll Down
                </span>
                <div className="w-5 h-8 border border-zinc-800 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-[#3B82F6] rounded-full animate-bounce"></div>
                </div>
            </button>
        </section>
    );
}
