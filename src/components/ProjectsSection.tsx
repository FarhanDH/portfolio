import { useEffect, useState } from "react";
import { Github, ExternalLink, ChevronDown, ArrowRight } from "lucide-react";
import {
  fetchProjectsData,
  type ProjectDTO,
  toProjectSlug,
} from "../data/projectsData";

const INITIAL_DISPLAY_COUNT = 3;

interface ProjectsSectionProps {
  onOpenProject?: (slug: string) => void;
}

function ProjectSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8 rounded-2xl border border-border bg-card p-5 sm:p-7 animate-pulse">
      <div className="w-full lg:w-[50%] h-64 sm:h-72 rounded-xl bg-secondary border border-border" />
      <div className="flex-1 flex flex-col justify-between gap-4 py-2">
        <div className="space-y-3">
          <div className="h-4 w-20 bg-secondary rounded" />
          <div className="h-8 w-3/4 bg-secondary rounded" />
          <div className="h-4 w-full bg-secondary/80 rounded" />
          <div className="h-4 w-5/6 bg-secondary/80 rounded" />
          <div className="flex gap-2 pt-3">
            <div className="h-6 w-16 bg-secondary rounded" />
            <div className="h-6 w-20 bg-secondary rounded" />
            <div className="h-6 w-24 bg-secondary rounded" />
          </div>
        </div>
        <div className="flex gap-4 pt-4 border-t border-border">
          <div className="h-9 w-32 bg-secondary rounded-xl" />
          <div className="h-9 w-24 bg-secondary rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/**
 * Single showcase horizontal project row/card with project preview image and "See Details" route button
 */
function ProjectShowcaseCard({
  project,
  onOpenProject,
}: {
  project: ProjectDTO;
  onOpenProject?: (slug: string) => void;
}) {
  const [activeImageTab, setActiveImageTab] = useState<"ui" | "arch">("ui");
  const slug = project.slug || toProjectSlug(project.title);
  const uiImg = project.image_url || "/projects/sidingin-preview.svg";
  const archImg =
    project.architecture_image_url || "/projects/sidingin-arch.svg";
  const currentImg = activeImageTab === "ui" ? uiImg : archImg;

  const handleOpenDetail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenProject) {
      onOpenProject(slug);
    } else {
      window.location.href = `/projects/${slug}`;
    }
  };

  return (
    <article className="group flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-xs hover:border-foreground/40 transition-all duration-200">
      {/* Left: Framed Browser Image Preview (1. UI Mockup | 2. Architecture) */}
      <div className="w-full lg:w-[52%] flex-shrink-0 rounded-xl overflow-hidden border border-border bg-secondary flex flex-col shadow-xs">
        {/* Browser Window Titlebar with 2-Image Switcher */}
        <div className="h-9 px-3.5 bg-secondary border-b border-border flex items-center justify-between gap-2 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/85 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/85 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/85 inline-block" />
          </div>

          {/* Toggle Pills: 1. UI Mockup | 2. Architecture */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-card border border-border">
            <button
              type="button"
              onClick={() => setActiveImageTab("ui")}
              className={`px-2.5 py-0.5 rounded-md font-mono text-[10px] font-semibold transition-all cursor-pointer ${
                activeImageTab === "ui"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              1 · UI Mockup
            </button>
            <button
              type="button"
              onClick={() => setActiveImageTab("arch")}
              className={`px-2.5 py-0.5 rounded-md font-mono text-[10px] font-semibold transition-all cursor-pointer ${
                activeImageTab === "arch"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              2 · Architecture
            </button>
          </div>
        </div>

        {/* Project Preview Image (Clickable to Detail Route) */}
        <a
          href={`/projects/${slug}`}
          onClick={handleOpenDetail}
          aria-label={`See details for ${project.title}`}
          className="relative flex-1 w-full min-h-[220px] sm:min-h-[260px] overflow-hidden bg-card flex items-center justify-center cursor-pointer"
        >
          <img
            src={currentImg}
            alt={`${project.title} ${activeImageTab === "ui" ? "UI mockup" : "architecture diagram"}`}
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
          />
        </a>
      </div>

      {/* Right: Project Details & Action Buttons */}
      <div className="flex-1 flex flex-col justify-between gap-5 py-1">
        <div className="flex flex-col gap-3">
          {/* Header Category Subtitle */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              PROJECTS
            </span>
            {project.featured && (
              <span className="font-mono text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-secondary border border-border text-foreground">
                Featured
              </span>
            )}
          </div>

          {/* Big Bold Title */}
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            <a
              href={`/projects/${slug}`}
              onClick={handleOpenDetail}
              className="hover:underline cursor-pointer"
            >
              {project.title}
            </a>
          </h3>

          {/* Summary Description */}
          <p className="text-sm sm:text-base font-medium text-foreground leading-relaxed">
            {project.description}
          </p>

          {/* Detailed Context */}
          {project.long_description &&
            project.long_description !== project.description && (
              <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed line-clamp-3">
                {project.long_description}
              </p>
            )}

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono px-2.5 py-1 rounded-md text-[11px] font-medium bg-secondary border border-border text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Action Links Row */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
          {/* Primary: See Details route button */}
          <a
            href={`/projects/${slug}`}
            onClick={handleOpenDetail}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-2xs"
          >
            <span>See Details</span>
            <ArrowRight size={14} />
          </a>

          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-secondary hover:bg-accent hover:border-foreground/40 hover:scale-[1.02] active:scale-[0.98] text-foreground border border-border transition-all duration-200 cursor-pointer shadow-2xs"
            >
              <span>Live Demo</span>
              <ExternalLink size={13} />
            </a>
          )}

          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-secondary hover:bg-accent hover:border-foreground/40 hover:scale-[1.02] active:scale-[0.98] text-foreground border border-border transition-all duration-200 cursor-pointer shadow-2xs"
            >
              <Github size={14} />
              <span>GitHub</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsSection({
  onOpenProject,
}: ProjectsSectionProps) {
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [status, setStatus] = useState<"loading" | "success">("loading");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetchProjectsData().then((list) => {
      if (isMounted) {
        setProjects(list);
        setStatus("success");
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const displayedProjects = showAll
    ? projects
    : projects.slice(0, INITIAL_DISPLAY_COUNT);

  return (
    <section
      id="projects"
      className="flex flex-col gap-6 transition-colors duration-200"
    >
      {/* Section Header */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Selected Work
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Projects
          </h2>
          <p className="text-sm text-muted-foreground">
            Production APIs, payment integrations, and cloud-backed
            applications.
          </p>
        </div>

        <a
          href="https://github.com/FarhanDH"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-medium text-foreground bg-secondary hover:bg-accent hover:border-foreground/40 hover:scale-[1.03] active:scale-[0.97] border border-border transition-all duration-200 cursor-pointer shadow-2xs self-start sm:self-auto"
        >
          <Github size={14} />
          <span>github.com/FarhanDH</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Loading Skeletons */}
      {status === "loading" && (
        <div className="flex flex-col gap-6">
          {[...Array(2)].map((_, i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Horizontal Projects Showcase List */}
      {status === "success" && (
        <>
          <div className="flex flex-col gap-6">
            {displayedProjects.map((project) => (
              <ProjectShowcaseCard
                key={project.id}
                project={project}
                onOpenProject={onOpenProject}
              />
            ))}
          </div>

          {projects.length > INITIAL_DISPLAY_COUNT && (
            <div className="flex justify-center mt-2">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-foreground bg-card hover:bg-accent hover:border-foreground/40 hover:scale-[1.02] active:scale-[0.98] border border-border transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <span>
                  {showAll
                    ? "Show fewer projects"
                    : `View more projects (+${projects.length - INITIAL_DISPLAY_COUNT})`}
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
