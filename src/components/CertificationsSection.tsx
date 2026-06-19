import AnimatedContent from "./AnimatedContent";
import { ExternalLink, ShieldCheck } from "lucide-react";

interface Certification {
    name: string;
    issuer: string;
    issuerLogo?: string; // text abbreviation fallback
    issuedDate: string;
    expiryDate?: string | null; // null = no expiry
    credentialId?: string;
    credentialUrl?: string;
    skills: string[];
}

const certifications: Certification[] = [
    {
        name: "Associate Cloud Engineer",
        issuer: "Google Cloud",
        issuerLogo: "GCP",
        issuedDate: "Mar 2024",
        expiryDate: "Mar 2026",
        credentialId: "xxxxxxxx-xxxx-xxxx",
        credentialUrl: undefined,
        skills: ["GCP", "Kubernetes", "IAM", "Cloud Storage", "BigQuery"],
    },
    {
        name: "AWS Certified Developer – Associate",
        issuer: "Amazon Web Services",
        issuerLogo: "AWS",
        issuedDate: "Nov 2023",
        expiryDate: "Nov 2026",
        credentialId: "AWS-DEV-xxxxxx",
        credentialUrl: undefined,
        skills: ["EC2", "Lambda", "S3", "RDS", "CloudFormation"],
    },
    {
        name: "Docker Certified Associate",
        issuer: "Docker, Inc.",
        issuerLogo: "DCA",
        issuedDate: "Jul 2023",
        expiryDate: null,
        credentialId: "DCA-xxxxxx",
        credentialUrl: undefined,
        skills: ["Docker", "Compose", "Swarm", "Networking", "Security"],
    },
    {
        name: "NestJS Zero to Hero",
        issuer: "Udemy",
        issuerLogo: "UDY",
        issuedDate: "Apr 2023",
        expiryDate: null,
        credentialId: undefined,
        credentialUrl: undefined,
        skills: ["NestJS", "TypeORM", "Guards", "Interceptors", "Testing"],
    },
];

export default function CertificationsSection() {
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
                            <span className="text-zinc-600">~/</span>certifications
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            Certifications
                        </h2>
                        <p className="text-sm text-zinc-500 mt-0.5">
                            Credentials and courses I've completed.
                            <span className="ml-2 font-mono text-[11px] text-zinc-700">
                                // placeholders — update with real ones
                            </span>
                        </p>
                    </div>
                </AnimatedContent>

                {/* Cert grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    {certifications.map((cert, idx) => (
                        <AnimatedContent
                            key={idx}
                            direction="vertical"
                            distance={24}
                            delay={0.07 * idx}
                        >
                            <div className="group flex flex-col gap-4 p-5 rounded-xl border border-zinc-800/70 bg-zinc-950 hover:border-zinc-700/70 transition-colors duration-300 h-full">

                                {/* Header: logo abbrev + name + issuer */}
                                <div className="flex items-start gap-4">
                                    {/* Issuer abbreviation badge */}
                                    <div className="flex-shrink-0 w-11 h-11 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center group-hover:border-zinc-700 transition-colors duration-200">
                                        <span className="font-mono text-[10px] font-bold text-zinc-500 group-hover:text-zinc-400 transition-colors tracking-tight">
                                            {cert.issuerLogo ?? cert.issuer.slice(0, 3).toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-zinc-100 leading-snug">
                                            {cert.name}
                                        </h3>
                                        <span className="text-xs text-zinc-500">
                                            {cert.issuer}
                                        </span>
                                    </div>

                                    {/* Verified icon */}
                                    <ShieldCheck
                                        size={15}
                                        className="flex-shrink-0 text-zinc-700 group-hover:text-[#22c55e]/50 transition-colors duration-300 mt-0.5"
                                    />
                                </div>

                                {/* Dates + credential ID */}
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                    <span className="font-mono text-[11px] text-zinc-600">
                                        Issued {cert.issuedDate}
                                    </span>
                                    {cert.expiryDate ? (
                                        <span className="font-mono text-[11px] text-zinc-700">
                                            Expires {cert.expiryDate}
                                        </span>
                                    ) : (
                                        <span className="font-mono text-[11px] text-zinc-700">
                                            No expiry
                                        </span>
                                    )}
                                    {cert.credentialId && (
                                        <span className="font-mono text-[11px] text-zinc-800 truncate">
                                            ID: {cert.credentialId}
                                        </span>
                                    )}
                                </div>

                                {/* Skills covered */}
                                <div className="flex flex-wrap gap-1.5 flex-1 content-start">
                                    {cert.skills.map((s) => (
                                        <span
                                            key={s}
                                            className="font-mono px-2 py-0.5 rounded text-[11px] bg-zinc-900 border border-zinc-800 text-zinc-600 group-hover:border-zinc-700 group-hover:text-zinc-500 transition-colors duration-200"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>

                                {/* Credential link */}
                                {cert.credentialUrl && (
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-600 hover:text-[#22c55e]/80 transition-colors duration-200 pt-2 border-t border-zinc-800/50"
                                    >
                                        <ExternalLink size={11} />
                                        View credential
                                    </a>
                                )}
                            </div>
                        </AnimatedContent>
                    ))}
                </div>
            </div>
        </section>
    );
}
