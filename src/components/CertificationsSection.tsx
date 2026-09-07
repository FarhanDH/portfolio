import { useEffect, useState } from "react";
import AnimatedContent from "./AnimatedContent";
import { ExternalLink, ShieldCheck, ChevronDown } from "lucide-react";

// ── API response shape (snake_case from Go API) ───────────────────────────────
interface CertificationDTO {
    id: string;
    name: string;
    issuer: string;
    issuer_logo: string | null;
    issued_date: string; // e.g. "2023-11"
    expiry_date: string | null;
    credential_id: string | null;
    credential_url: string | null;
    skills: string[];
}

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;
const INITIAL_DISPLAY_COUNT = 4;

// Format "2023-11" → "Nov 2023"
function formatDate(raw: string | null): string | null {
    if (!raw) return null;
    const [year, month] = raw.split("-");
    if (!year || !month) return raw;
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
}

// ── Loading skeleton card ─────────────────────────────────────────────────────
function SkeletonCard() {
    return (
        <div className="flex flex-col gap-4 p-5 rounded-xl border border-zinc-800/70 bg-zinc-950 animate-pulse">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-zinc-900 border border-zinc-800" />
                <div className="flex flex-col gap-2 flex-1">
                    <div className="h-3.5 bg-zinc-800 rounded w-3/4" />
                    <div className="h-3 bg-zinc-900 rounded w-1/2" />
                </div>
            </div>
            <div className="flex gap-3">
                <div className="h-3 bg-zinc-900 rounded w-24" />
                <div className="h-3 bg-zinc-900 rounded w-20" />
            </div>
            <div className="flex flex-wrap gap-1.5">
                {[60, 80, 50, 70].map((w) => (
                    <div
                        key={w}
                        className="h-5 bg-zinc-900 rounded"
                        style={{ width: w }}
                    />
                ))}
            </div>
        </div>
    );
}

// ── Issuer logo: real image if URL, abbrev text fallback ──────────────────────
function IssuerLogo({ url, name }: { url: string | null; name: string }) {
    const [imgFailed, setImgFailed] = useState(false);
    const abbrev = name.slice(0, 3).toUpperCase();

    if (url && !imgFailed) {
        return (
            <img
                src={url}
                alt={name}
                className="w-20 object-contain"
                onError={() => setImgFailed(true)}
            />
        );
    }

    return (
        <span className="font-mono text-[10px] font-bold text-zinc-500 group-hover:text-zinc-400 transition-colors tracking-tight">
            {abbrev}
        </span>
    );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function CertificationsSection() {
    const [certs, setCerts] = useState<CertificationDTO[]>([]);
    const [status, setStatus] = useState<"loading" | "success" | "error">(
        "loading",
    );
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        let isMounted = true;

        fetch(`${API_BASE}/api/v1/certifications`, {
            headers: { Accept: "application/json" },
        })
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json() as Promise<CertificationDTO[]>;
            })
            .then((data) => {
                if (isMounted) {
                    setCerts(data);
                    setStatus("success");
                }
            })
            .catch((err) => {
                if (isMounted) {
                    console.error("[CertificationsSection]", err);
                    setStatus("error");
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const displayedCerts = showAll
        ? certs
        : certs.slice(0, INITIAL_DISPLAY_COUNT);

    return (
        <section
            id="certifications"
            className="relative w-full bg-[#0a0a0a] text-[#e5e7eb] py-24 px-6 md:px-12 lg:px-20 border-t border-zinc-800/40"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <AnimatedContent direction="vertical" distance={24} delay={0}>
                    <div className="flex flex-col gap-2 mb-12">
                        <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[#22c55e] flex items-center gap-1.5">
                            <span className="text-zinc-600">~/</span>
                            certifications
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            Certifications
                        </h2>
                        <p className="text-sm text-zinc-500 mt-0.5">
                            Credentials and courses I've completed.
                        </p>
                    </div>
                </AnimatedContent>

                {/* ── Loading state ── */}
                {status === "loading" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}

                {/* ── Error state ── */}
                {status === "error" && (
                    <div className="flex flex-col items-center gap-3 py-16 text-center">
                        <span className="font-mono text-sm text-zinc-600">
                            <span className="text-red-500/70">✗</span> failed to
                            fetch certifications
                        </span>
                        <button
                            onClick={() => {
                                setStatus("loading");
                                setCerts([]);
                                window.location.reload();
                            }}
                            className="font-mono text-xs text-zinc-600 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-700 px-4 py-2 rounded-lg transition-all duration-200 mt-1 cursor-pointer"
                        >
                            retry
                        </button>
                    </div>
                )}

                {/* ── Empty state ── */}
                {status === "success" && certs.length === 0 && (
                    <p className="font-mono text-sm text-zinc-600 py-12 text-center">
                        No certifications found.
                    </p>
                )}

                {/* ── Cert grid ── */}
                {status === "success" && certs.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {displayedCerts.map((cert, idx) => {
                                const issued = formatDate(cert.issued_date);
                                const expires = formatDate(cert.expiry_date);

                                return (
                                    <AnimatedContent
                                        key={cert.id}
                                        direction="vertical"
                                        distance={24}
                                        delay={0.07 * idx}
                                    >
                                        <div className="group flex flex-col gap-4 p-5 rounded-xl border border-zinc-800/70 bg-zinc-950 hover:border-zinc-700/70 transition-colors duration-300 h-full">
                                            {/* Header: logo + name + issuer + shield */}
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-11 h-11 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center group-hover:border-zinc-700 transition-colors duration-200 overflow-hidden bg-white">
                                                    <IssuerLogo
                                                        url={cert.issuer_logo}
                                                        name={cert.issuer}
                                                    />
                                                </div>

                                                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                                    <h3 className="text-sm font-semibold text-zinc-100 leading-snug">
                                                        {cert.name}
                                                    </h3>
                                                    <span className="text-xs text-zinc-500">
                                                        {cert.issuer}
                                                    </span>
                                                </div>

                                                <ShieldCheck
                                                    size={15}
                                                    className="flex-shrink-0 text-zinc-700 group-hover:text-[#22c55e]/50 transition-colors duration-300 mt-0.5"
                                                />
                                            </div>

                                            {/* Dates + credential ID */}
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                                {issued && (
                                                    <span className="font-mono text-[11px] text-zinc-500">
                                                        Issued {issued}
                                                    </span>
                                                )}
                                                {expires ? (
                                                    <span className="font-mono text-[11px] text-zinc-500">
                                                        Expires {expires}
                                                    </span>
                                                ) : (
                                                    <span className="font-mono text-[11px] text-zinc-500">
                                                        Expires -
                                                    </span>
                                                )}
                                                {cert.credential_id && (
                                                    <span className="font-mono text-[11px] text-zinc-600 truncate">
                                                        ID: {cert.credential_id}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Skills */}
                                            <div className="flex flex-wrap gap-1.5 flex-1 content-start">
                                                {cert.skills.map((s) => (
                                                    <span
                                                        key={s}
                                                        className="font-mono px-2 py-0.5 rounded text-[11px] bg-zinc-900 border border-zinc-800 text-zinc-500 group-hover:border-zinc-700 group-hover:text-zinc-300 transition-colors duration-200"
                                                    >
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Credential link */}
                                            <div className="border-t border-zinc-800/50"></div>
                                            {cert.credential_url && (
                                                <a
                                                    href={cert.credential_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex justify-end text-end self-end items-center gap-1.5 font-mono text-[11px] text-zinc-300 hover:bg-[#22c55e]/60 transition-colors duration-200 border p-2 w-fit rounded-sm cursor-pointer"
                                                >
                                                    <ExternalLink size={11} />
                                                    View credential
                                                </a>
                                            )}
                                        </div>
                                    </AnimatedContent>
                                );
                            })}
                        </div>

                        {/* ── View more / View less button ── */}
                        {certs.length > INITIAL_DISPLAY_COUNT && (
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => setShowAll((prev) => !prev)}
                                    className="group flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                                >
                                    {/* <span className="text-[#22c55e]">$</span> */}
                                    <span>
                                        {showAll
                                            ? "show less"
                                            : `view more (+${certs.length - INITIAL_DISPLAY_COUNT})`}
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
