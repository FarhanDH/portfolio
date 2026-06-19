import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Certs", href: "#certifications" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);

    // Frosted glass on scroll
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Active section via IntersectionObserver
    useEffect(() => {
        const sections = document.querySelectorAll("section[id]");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const scrollTo = (href: string) => {
        setMobileOpen(false);
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {/* ── Fixed bar ── */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60 shadow-lg shadow-black/20"
                        : "bg-transparent border-b border-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 h-14 flex items-center justify-between gap-8">

                    {/* Brand */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="flex items-center gap-1 font-mono text-sm text-zinc-300 hover:text-white transition-colors duration-200 flex-shrink-0"
                        aria-label="Scroll to top"
                    >
                        <span className="text-zinc-600">~/</span>
                        <span>farhan</span>
                        <span className="w-1.5 h-3.5 bg-[#22c55e] ml-0.5 animate-pulse inline-block" />
                    </button>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const sectionId = link.href.replace("#", "");
                            const isActive = activeSection === sectionId;

                            return (
                                <button
                                    key={link.href}
                                    onClick={() => scrollTo(link.href)}
                                    className={`relative px-3.5 py-1.5 text-sm rounded-lg transition-colors duration-200 font-mono ${
                                        isActive
                                            ? "text-white"
                                            : "text-zinc-500 hover:text-zinc-200"
                                    }`}
                                >
                                    {link.label}
                                    {/* Active underline */}
                                    <span
                                        className={`absolute bottom-0.5 left-3.5 right-3.5 h-px rounded-full bg-[#22c55e] transition-all duration-300 ${
                                            isActive ? "opacity-100" : "opacity-0"
                                        }`}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs px-3.5 py-1.5 rounded-lg border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700 bg-zinc-900/50 transition-all duration-200"
                        >
                            Resume ↗
                        </a>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all duration-200"
                        aria-label="Open menu"
                    >
                        <Menu size={16} />
                    </button>
                </div>
            </nav>

            {/* ── Mobile full-screen overlay ── */}
            <div
                className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${
                    mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                    onClick={() => setMobileOpen(false)}
                />

                {/* Slide-in panel */}
                <div
                    className={`absolute top-0 right-0 bottom-0 w-72 bg-zinc-950 border-l border-zinc-800/70 flex flex-col transition-transform duration-300 ${
                        mobileOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    {/* Panel header */}
                    <div className="flex items-center justify-between px-6 h-14 border-b border-zinc-800/60">
                        <span className="font-mono text-sm text-zinc-400">
                            <span className="text-zinc-700">~/</span>navigate
                        </span>
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-center w-8 h-8 rounded-lg border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700 transition-all duration-200"
                            aria-label="Close menu"
                        >
                            <X size={15} />
                        </button>
                    </div>

                    {/* Panel nav links */}
                    <nav className="flex flex-col gap-1 p-4 flex-1">
                        {navLinks.map((link) => {
                            const sectionId = link.href.replace("#", "");
                            const isActive = activeSection === sectionId;

                            return (
                                <button
                                    key={link.href}
                                    onClick={() => scrollTo(link.href)}
                                    className={`flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-xl transition-colors duration-200 ${
                                        isActive
                                            ? "bg-zinc-900 text-white border border-zinc-700/60"
                                            : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50 border border-transparent"
                                    }`}
                                >
                                    {/* Active indicator dot */}
                                    <span
                                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-200 ${
                                            isActive ? "bg-[#22c55e]" : "bg-zinc-800"
                                        }`}
                                    />
                                    <span className="font-mono text-sm">{link.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    {/* Panel footer */}
                    <div className="px-4 pb-6 border-t border-zinc-800/60 pt-4">
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full font-mono text-xs px-4 py-3 rounded-xl border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700 bg-zinc-900/50 transition-all duration-200"
                        >
                            Resume ↗
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
