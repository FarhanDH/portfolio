import { useState } from "react";
import { ChevronDown, GraduationCap, MapPin, Calendar } from "lucide-react";
import { FALLBACK_EDUCATIONS } from "../data/educationData";

const educations = FALLBACK_EDUCATIONS;

export default function EducationSection() {
    const [openId, setOpenId] = useState<number | null>(1);

    return (
        <section
            id="education"
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs transition-colors duration-200"
        >
            {/* Section Header */}
            <div className="flex flex-col gap-1 mb-6 pb-4 border-b border-border">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Academic Background
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Education
                </h2>
                <p className="text-sm text-muted-foreground">
                    Formal degree and specialized cloud engineering cohorts.
                </p>
            </div>

            {/* ── Pipeline Rail Timeline ── */}
            <div className="relative pl-7 sm:pl-9">
                <div className="absolute left-[11px] sm:left-[13px] top-3 bottom-3 w-0.5 bg-border" />

                <div className="flex flex-col gap-5">
                    {educations.map((edu, idx) => {
                        const isLatest = idx === 0;
                        const isOpen = openId === edu.id;

                        return (
                            <div key={edu.id} className="relative">
                                {/* Timeline Node Dot */}
                                <div className="absolute -left-7 sm:-left-9 top-5 flex items-center justify-center w-6 sm:w-7">
                                    <span
                                        className={`relative flex items-center justify-center w-3.5 h-3.5 rounded-full border-2 transition-colors ${
                                            isLatest || isOpen
                                                ? "border-foreground bg-foreground/20"
                                                : "border-muted-foreground bg-card"
                                        }`}
                                    >
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full ${
                                                isLatest || isOpen
                                                    ? "bg-foreground"
                                                    : "bg-muted-foreground"
                                            }`}
                                        />
                                    </span>
                                </div>

                                {/* Timeline Card */}
                                <div className="flex flex-col">
                                    <button
                                        onClick={() =>
                                            setOpenId(isOpen ? null : edu.id)
                                        }
                                        className="w-full text-left cursor-pointer group"
                                        aria-expanded={isOpen}
                                    >
                                        <div
                                            className={`flex items-start justify-between gap-4 p-4 sm:p-5 rounded-xl border transition-all duration-200 ${
                                                isOpen
                                                    ? "border-border bg-secondary rounded-b-none shadow-xs"
                                                    : "border-border bg-secondary/50 hover:bg-secondary hover:border-foreground/40 hover:scale-[1.008] active:scale-[0.995]"
                                            }`}
                                        >
                                            <div className="flex flex-col gap-1.5">
                                                {/* Date & Location row */}
                                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-muted-foreground">
                                                    <span className="inline-flex items-center gap-1.5 text-foreground font-semibold">
                                                        <Calendar size={12} />
                                                        {edu.startDate} —{" "}
                                                        {edu.endDate ??
                                                            "Present"}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1">
                                                        <MapPin size={12} />
                                                        {edu.location}
                                                    </span>
                                                </div>

                                                {/* Degree Title */}
                                                <h3 className="text-base sm:text-lg font-bold text-foreground">
                                                    {edu.degree}
                                                </h3>

                                                {/* Institution & Badge */}
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground">
                                                        <GraduationCap
                                                            size={14}
                                                        />
                                                        {edu.institution}
                                                    </span>
                                                    <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-card border border-border text-foreground">
                                                        {edu.type}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground mt-1">
                                                <span className="hidden sm:inline text-[11px]">
                                                    {isOpen ? "Hide" : "Details"}
                                                </span>
                                                <ChevronDown
                                                    size={16}
                                                    className={`flex-shrink-0 transition-transform duration-200 ${
                                                        isOpen
                                                            ? "rotate-180 text-foreground"
                                                            : ""
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                    </button>

                                    {/* Expandable Details */}
                                    <div
                                        className={`overflow-hidden transition-all duration-250 ease-in-out ${
                                            isOpen
                                                ? "max-h-[800px] opacity-100"
                                                : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        <div className="border border-t-0 border-border bg-secondary/40 rounded-b-xl p-4 sm:p-5 flex flex-col gap-4">
                                            <ul className="flex flex-col gap-2">
                                                {edu.highlights.map((h, i) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed"
                                                    >
                                                        <span className="font-mono text-foreground font-bold mt-0.5 flex-shrink-0 select-none">
                                                            ›
                                                        </span>
                                                        <span>{h}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
                                                {edu.coursework.map((item) => (
                                                    <span
                                                        key={item}
                                                        className="font-mono px-2.5 py-1 rounded-md text-[11px] font-medium bg-card border border-border text-foreground"
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
