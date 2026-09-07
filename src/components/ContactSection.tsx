import AnimatedContent from "./AnimatedContent";
import {
    Github,
    Linkedin,
    Mail,
    MapPin,
    Send,
    ArrowUpRight,
} from "lucide-react";
import { useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

const FORMSPREE_ENDPOINT =
    import.meta.env.VITE_FORMSPREE_ENDPOINT ||
    "https://formspree.io/f/YOUR_FORM_ID";

export default function ContactSection() {
    const [formStatus, setFormStatus] = useState<FormStatus>("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const contactLinks = [
        {
            icon: <Mail size={20} />,
            label: "Email",
            value: "farhandwihartanto@gmail.com",
            href: "mailto:farhandwihartanto@gmail.com",
            description: "Drop me a direct message",
        },
        {
            icon: <Github size={20} />,
            label: "GitHub",
            value: "github.com/farhandh",
            href: "https://github.com/farhandh",
            description: "Check out my open source work",
        },
        {
            icon: <Linkedin size={20} />,
            label: "LinkedIn",
            value: "linkedin.com/in/farhan-dwi-hartanto-8074ba292",
            href: "https://www.linkedin.com/in/farhan-dwi-hartanto-8074ba292/",
            description: "Let's connect professionally",
        },
        {
            icon: <MapPin size={20} />,
            label: "Location",
            value: "Samarinda, East Kalimantan, Indonesia",
            href: null,
            description: "Open to remote opportunities",
        },
    ];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("loading");

        try {
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormStatus("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setFormStatus("error");
            }
        } catch {
            setFormStatus("error");
        }
    };

    return (
        <section
            id="contact"
            className="relative w-full bg-[#0a0a0a] text-[#e5e7eb] py-24 px-6 md:px-12 lg:px-20 border-t border-zinc-800/40"
        >
            <div className="max-w-7xl mx-auto flex flex-col gap-16">
                {/* Section Header */}
                <AnimatedContent direction="vertical" distance={30} delay={0.1}>
                    <div className="flex flex-col gap-2 max-w-xl">
                        <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[#22c55e] flex items-center gap-1.5">
                            <span className="text-zinc-600">~/</span>contact
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            Let's Work Together
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-1">
                            I'm actively looking for backend development
                            opportunities. Whether you have a project, a
                            question, or just want to say hi — my inbox is
                            always open.
                        </p>
                    </div>
                </AnimatedContent>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Left: Contact Info Cards */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {contactLinks.map((link, i) => {
                            const inner = (
                                <div
                                    key={link.label}
                                    className={`group flex items-start gap-4 p-5 rounded-xl border transition-all duration-300 ${
                                        link.href
                                            ? "bg-zinc-900/30 border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/60 cursor-pointer"
                                            : "bg-zinc-900/20 border-zinc-900/60 cursor-default"
                                    }`}
                                >
                                    <div className="mt-0.5 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-gray-400 group-hover:text-white group-hover:border-zinc-700 transition-colors duration-300">
                                        {link.icon}
                                    </div>
                                    <div className="flex flex-col gap-0.5 min-w-0">
                                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            {link.label}
                                        </span>
                                        <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-300 truncate">
                                            {link.value}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {link.description}
                                        </span>
                                    </div>
                                    {link.href && (
                                        <ArrowUpRight
                                            size={16}
                                            className="ml-auto mt-1 flex-shrink-0 text-gray-700 group-hover:text-gray-400 transition-colors duration-300"
                                        />
                                    )}
                                </div>
                            );

                            return link.href ? (
                                <AnimatedContent
                                    key={link.label}
                                    direction="vertical"
                                    distance={25}
                                    delay={0.1 * (i + 1)}
                                >
                                    <a
                                        href={link.href}
                                        target={
                                            link.href.startsWith("mailto")
                                                ? undefined
                                                : "_blank"
                                        }
                                        rel="noopener noreferrer"
                                    >
                                        {inner}
                                    </a>
                                </AnimatedContent>
                            ) : (
                                <AnimatedContent
                                    key={link.label}
                                    direction="vertical"
                                    distance={25}
                                    delay={0.1 * (i + 1)}
                                >
                                    {inner}
                                </AnimatedContent>
                            );
                        })}
                    </div>

                    {/* Right: Contact Form (Formspree) */}
                    <div className="lg:col-span-3">
                        <AnimatedContent
                            direction="vertical"
                            distance={30}
                            delay={0.2}
                        >
                            <div className="bg-zinc-900/20 border border-zinc-900 rounded-2xl p-6 md:p-8">
                                <h3 className="text-base font-semibold text-white mb-6">
                                    Send a Message
                                </h3>

                                {formStatus === "success" ? (
                                    <div className="flex flex-col items-center gap-4 py-12 text-center">
                                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
                                            <Send
                                                size={24}
                                                className="text-green-400"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">
                                                Message sent!
                                            </p>
                                            <p className="text-gray-400 text-sm mt-1">
                                                Thanks for reaching out. I'll
                                                get back to you soon.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() =>
                                                setFormStatus("idle")
                                            }
                                            className="text-xs text-gray-500 hover:text-gray-300 underline underline-offset-4 transition-colors mt-2"
                                        >
                                            Send another message
                                        </button>
                                    </div>
                                ) : (
                                    <form
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-5"
                                    >
                                        {/* Name + Email row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1.5">
                                                <label
                                                    htmlFor="contact-name"
                                                    className="text-xs font-medium text-gray-400 uppercase tracking-wider"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    id="contact-name"
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Your name"
                                                    className="w-full px-4 py-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-zinc-600 focus:bg-zinc-900 transition-all duration-200"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label
                                                    htmlFor="contact-email"
                                                    className="text-xs font-medium text-gray-400 uppercase tracking-wider"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    id="contact-email"
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="your@email.com"
                                                    className="w-full px-4 py-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-zinc-600 focus:bg-zinc-900 transition-all duration-200"
                                                />
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div className="flex flex-col gap-1.5">
                                            <label
                                                htmlFor="contact-message"
                                                className="text-xs font-medium text-gray-400 uppercase tracking-wider"
                                            >
                                                Message
                                            </label>
                                            <textarea
                                                id="contact-message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={5}
                                                placeholder="Tell me about your project or just say hello..."
                                                className="w-full px-4 py-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-zinc-600 focus:bg-zinc-900 transition-all duration-200 resize-none"
                                            />
                                        </div>

                                        {/* Error state */}
                                        {formStatus === "error" && (
                                            <p className="text-xs text-red-400 bg-red-500/5 border border-red-500/15 px-4 py-2.5 rounded-lg">
                                                Something went wrong. Please try
                                                again or email me directly.
                                            </p>
                                        )}

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={formStatus === "loading"}
                                            id="contact-submit-btn"
                                            className="flex items-center justify-center gap-2.5 w-full sm:w-auto sm:self-end px-8 py-3.5 rounded-lg text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.02] active:scale-[0.99]"
                                        >
                                            {formStatus === "loading" ? (
                                                <>
                                                    <svg
                                                        className="animate-spin w-4 h-4 text-gray-400"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        />
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                        />
                                                    </svg>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={15} />
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </AnimatedContent>
                    </div>
                </div>

                {/* Footer strip */}
                <AnimatedContent direction="vertical" distance={20} delay={0.2}>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-900/60">
                        <p className="text-xs text-gray-600">
                            © {new Date().getFullYear()} Farhan Dwi Hartanto.
                        </p>
                        <div className="flex items-center gap-5">
                            <a
                                href="https://github.com/farhandh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-gray-300 transition-colors duration-300"
                                aria-label="GitHub"
                            >
                                <Github size={18} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/farhan-dwi-hartanto-8074ba292/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-gray-300 transition-colors duration-300"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={18} />
                            </a>
                            <a
                                href="mailto:farhandwihartanto@gmail.com"
                                className="text-gray-600 hover:text-gray-300 transition-colors duration-300"
                                aria-label="Email"
                            >
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}
