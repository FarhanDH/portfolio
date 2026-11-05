import { useEffect, useState } from "react";
import { ExternalLink, ShieldCheck, ChevronDown, Calendar } from "lucide-react";
import {
    type CertificationDTO,
    FALLBACK_CERTIFICATIONS,
} from "../data/certificationsData";

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;
const INITIAL_DISPLAY_COUNT = 4;

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

function SkeletonCard() {
    return (
        <div className="flex flex-col gap-4 p-5 rounded-xl border border-border bg-secondary animate-pulse">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-border" />
                <div className="flex flex-col gap-2 flex-1">
                    <div className="h-4 bg-border rounded w-3/4" />
                    <div className="h-3 bg-border/70 rounded w-1/2" />
                </div>
            </div>
        </div>
    );
}

function IssuerLogo({ url, name }: { url: string | null; name: string }) {
    const [imgFailed, setImgFailed] = useState(false);
    const abbrev = name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 3)
        .toUpperCase();

    if (url && !imgFailed) {
        return (
            <img
                src={url}
                alt={name}
                className="w-full h-full object-contain p-1"
                onError={() => setImgFailed(true)}
            />
        );
    }

    return (
        <span className="font-mono text-xs font-bold text-foreground tracking-tight">
            {abbrev}
        </span>
    );
}

export default function CertificationsSection() {
    const [certs, setCerts] = useState<CertificationDTO[]>([]);
    const [status, setStatus] = useState<"loading" | "success">("loading");
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
                    setCerts(
                        data.length > 0 ? data : FALLBACK_CERTIFICATIONS,
                    );
                    setStatus("success");
                }
            })
            .catch(() => {
                if (isMounted) {
                    setCerts(FALLBACK_CERTIFICATIONS);
                    setStatus("success");
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
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs transition-colors duration-200"
        >
            {/* Header */}
            <div className="flex flex-col gap-1 mb-6 pb-4 border-b border-border">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Verified Credentials
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Certifications
                </h2>
                <p className="text-sm text-muted-foreground">
                    Technical certifications and cloud training programs I have
                    completed.
                </p>
            </div>

            {status === "loading" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            )}

            {status === "success" && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {displayedCerts.map((cert) => {
                            const issued = formatDate(cert.issued_date);
                            const expires = formatDate(cert.expiry_date);

                            return (
                                <div
                                    key={cert.id}
                                    className="flex flex-col justify-between gap-4 p-5 rounded-xl border border-border bg-secondary h-full"
                                >
                                    <div className="flex flex-col gap-3.5">
                                        {/* Header: Logo + Name + Issuer */}
                                        <div className="flex items-start gap-3.5">
                                            <div className="flex-shrink-0 w-11 h-11 rounded-xl border border-border bg-card flex items-center justify-center overflow-hidden">
                                                <IssuerLogo
                                                    url={cert.issuer_logo}
                                                    name={cert.issuer}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                                <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug">
                                                    {cert.name}
                                                </h3>
                                                <span className="text-xs font-medium text-muted-foreground">
                                                    {cert.issuer}
                                                </span>
                                            </div>

                                            <ShieldCheck
                                                size={18}
                                                className="flex-shrink-0 text-muted-foreground mt-0.5"
                                            />
                                        </div>

                                        {/* Dates + Credential ID */}
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-muted-foreground">
                                            {issued && (
                                                <span className="inline-flex items-center gap-1 text-foreground">
                                                    <Calendar size={11} />
                                                    Issued {issued}
                                                </span>
                                            )}
                                            <span>
                                                {expires
                                                    ? `Expires ${expires}`
                                                    : "No Expiry"}
                                            </span>
                                            {cert.credential_id && (
                                                <span className="truncate">
                                                    ID: {cert.credential_id}
                                                </span>
                                            )}
                                        </div>

                                        {/* Skills */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {cert.skills.map((s) => (
                                                <span
                                                    key={s}
                                                    className="font-mono px-2.5 py-0.5 rounded-md text-[11px] bg-card border border-border text-foreground"
                                                >
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {cert.credential_url && (
                                        <div className="pt-3 border-t border-border flex justify-end">
                                            <a
                                                href={cert.credential_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-card hover:bg-accent hover:border-foreground/40 hover:scale-[1.02] active:scale-[0.98] text-foreground border border-border transition-all duration-200 cursor-pointer shadow-2xs"
                                            >
                                                <ExternalLink size={12} />
                                                <span>Verify Credential</span>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {certs.length > INITIAL_DISPLAY_COUNT && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => setShowAll((prev) => !prev)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-foreground bg-secondary hover:bg-accent hover:border-foreground/40 hover:scale-[1.02] active:scale-[0.98] border border-border transition-all duration-200 cursor-pointer shadow-2xs"
                            >
                                <span>
                                    {showAll
                                        ? "Show fewer certifications"
                                        : `View more certifications (+${certs.length - INITIAL_DISPLAY_COUNT})`}
                                </span>
                                <ChevronDown
                                    size={15}
                                    className={`transition-transform duration-200 ${
                                        showAll ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}
