import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FolderGit2,
  Github,
} from "lucide-react";
import {
  fetchProjectsData,
  type ProjectDTO,
  toProjectSlug,
} from "../data/projectsData";

interface ProjectDetailPageProps {
  slug: string;
  onBack: () => void;
  onOpenProject?: (slug: string) => void;
}

export default function ProjectDetailPage({
  slug,
  onBack,
}: ProjectDetailPageProps) {
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchProjectsData().then((list) => {
      if (isMounted) {
        setProjects(list);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const project =
    projects.find((p) => (p.slug || toProjectSlug(p.title)) === slug) || null;

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-xs flex flex-col gap-6 animate-pulse">
        <div className="h-8 w-36 rounded-full bg-secondary" />
        <div className="h-8 w-1/2 rounded bg-secondary" />
        <div className="h-20 w-full rounded bg-secondary" />
        <div className="h-72 sm:h-96 rounded-2xl bg-secondary border border-border" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center gap-4">
        <FolderGit2 size={36} className="text-muted-foreground" />
        <h2 className="text-2xl font-bold text-foreground">
          Project Not Found
        </h2>
        <p className="text-sm text-muted-foreground max-w-md">
          We couldn&apos;t find a project matching{" "}
          <code className="font-mono text-foreground">/projects/{slug}</code>.
        </p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Projects</span>
        </button>
      </div>
    );
  }

  return (
    <article className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-xs flex flex-col gap-8 animate-in fade-in-50 duration-200">
      {/* Back Button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-secondary hover:bg-accent hover:border-foreground/40 hover:scale-[1.02] active:scale-[0.98] text-foreground border border-border transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Projects</span>
        </button>
      </div>

      {/* ── 01 · Project Introduction ── */}
      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            01 · Project Introduction
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg font-medium text-foreground leading-snug pt-1">
            {project.description}
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">
            {project.long_description}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono px-3.5 py-1.5 rounded-full text-xs font-semibold bg-secondary border border-border text-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Repository & Live Demo Links */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <Github size={15} />
              <span>GitHub Repository</span>
              <ExternalLink size={13} />
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold border border-border bg-secondary hover:bg-accent hover:border-foreground/40 hover:scale-[1.02] active:scale-[0.98] text-foreground transition-all duration-200 cursor-pointer"
            >
              <span>Live Demo</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>

        {/* Project Preview Image */}
        {project.image_url && (
          <div className="rounded-2xl p-3 sm:p-5 bg-secondary border border-border mt-2">
            <div className="rounded-xl overflow-hidden border border-border bg-card shadow-xs">
              <div className="h-8 px-4 bg-secondary border-b border-border flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/85 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/85 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/85 inline-block" />
                </div>
                <div className="px-3 py-0.5 rounded-md bg-card border border-border text-[11px] font-mono text-muted-foreground truncate max-w-xs sm:max-w-md">
                  {project.live_url
                    ? project.live_url.replace(/^https?:\/\//, "")
                    : `${project.slug || toProjectSlug(project.title)}`}
                </div>
                <div className="w-8" />
              </div>
              <img
                src={project.image_url}
                alt={`${project.title} preview`}
                className="w-full h-auto object-cover block"
              />
            </div>
          </div>
        )}
      </section>

      {/* ── 02 · Project Overview ── */}
      <section className="flex flex-col gap-3 pt-7 border-t border-border">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          02 · Project Overview
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          Problem
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {project.problem}
        </p>
      </section>

      {/* ── 03 · My Role & Responsibilities ── */}
      <section className="flex flex-col gap-3.5 pt-7 border-t border-border">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          03 · My Role &amp; Responsibilities
        </span>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            What I Built
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
              {project.role || "Backend Developer"}
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-medium bg-secondary border border-border text-muted-foreground">
              {project.timeline || "2024"}
            </span>
          </div>
        </div>
        {project.responsibilities && (
          <ul className="flex flex-col gap-2.5 pt-1">
            {project.responsibilities.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed"
              >
                <span className="font-mono text-foreground font-bold select-none mt-0.5">
                  ›
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ── 04 · System Architecture ── */}
      <section className="flex flex-col gap-4 pt-7 border-t border-border">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          04 · System Architecture
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          Components, Communication &amp; Data Flow
        </h2>

        {/* Second Image: System Architecture Diagram */}
        {project.architecture_image_url && (
          <div className="rounded-2xl p-3 sm:p-5 bg-secondary border border-border">
            <div className="rounded-xl overflow-hidden border border-border bg-card shadow-xs">
              <div className="h-8 px-4 bg-secondary border-b border-border flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-semibold text-muted-foreground">
                  High-Level Architecture Diagram
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {project.title}
                </span>
              </div>
              <img
                src={project.architecture_image_url}
                alt={`${project.title} system architecture`}
                className="w-full h-auto object-contain block"
              />
            </div>
          </div>
        )}

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {project.architecture}
        </p>

        {/* Simple Request / Data Flow Strip */}
        {project.architecture_flow && project.architecture_flow.length > 0 && (
          <div className="p-4 sm:p-5 rounded-xl bg-secondary border border-border flex flex-wrap items-center gap-2.5">
            {project.architecture_flow.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <span className="px-3 py-1.5 rounded-lg bg-card border border-border font-mono text-xs font-semibold text-foreground">
                  {step}
                </span>
                {idx < (project.architecture_flow?.length ?? 0) - 1 && (
                  <ArrowRight
                    size={14}
                    className="text-muted-foreground flex-shrink-0"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── 05 · Technical Implementation ── */}
      <section className="flex flex-col gap-4 pt-7 border-t border-border">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          05 · Technical Implementation
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          Engineering Deep Dives
        </h2>
        {project.deep_dives && (
          <div className="flex flex-col gap-3.5">
            {project.deep_dives.map((dive, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border bg-secondary/40 p-5 flex items-start gap-4"
              >
                <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-bold text-foreground">
                    {dive.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {dive.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── 06 · Infrastructure & Operations ── */}
      <section className="flex flex-col gap-3.5 pt-7 border-t border-border">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          06 · Infrastructure &amp; Operations
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          Deployment, Reliability, Security &amp; Monitoring
        </h2>
        {project.operations && (
          <ul className="flex flex-col gap-2.5">
            {project.operations.map((op, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed"
              >
                <span className="font-mono text-foreground font-bold select-none mt-0.5">
                  ›
                </span>
                <span>{op}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ── 07 · Results & Evidence ── */}
      <section className="flex flex-col gap-3.5 pt-7 border-t border-border">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          07 · Results &amp; Evidence
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          What Did I Achieve?
        </h2>
        {project.results && (
          <ul className="flex flex-col gap-2.5">
            {project.results.map((res, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed"
              >
                <span className="font-mono text-foreground font-bold select-none mt-0.5">
                  ›
                </span>
                <span>{res}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ── 08 · Lessons Learned ── */}
      <section className="flex flex-col gap-3.5 pt-7 border-t border-border">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          08 · Lessons Learned
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          What Would I Improve?
        </h2>
        {project.lessons_learned && (
          <ul className="flex flex-col gap-2.5">
            {project.lessons_learned.map((lesson, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed"
              >
                <span className="font-mono text-foreground font-bold select-none mt-0.5">
                  ›
                </span>
                <span>{lesson}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
