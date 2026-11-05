import { Server, Database, Cloud, GitBranch, ArrowRight } from "lucide-react";
import {
  ABOUT_CAPABILITIES,
  ABOUT_SKILL_GROUPS,
  type CapabilityItem,
} from "../data/aboutData";

interface AboutSectionProps {
  onNavigate?: (sectionId: string) => void;
}

export default function AboutSection({ onNavigate }: AboutSectionProps) {
  const renderIcon = (key: CapabilityItem["iconKey"]) => {
    switch (key) {
      case "server":
        return <Server size={18} />;
      case "database":
        return <Database size={18} />;
      case "cloud":
        return <Cloud size={18} />;
      case "git":
        return <GitBranch size={18} />;
    }
  };

  return (
    <section id="about" className="flex flex-col gap-6">
      {/* ── Card 1: Executive Summary & Service Pipeline ── */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs transition-colors duration-200">
        <div className="flex flex-col gap-1 mb-5 pb-4 border-b border-border">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            01 / Overview
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Engineering Profile
          </h2>
        </div>

        <div className="flex flex-col gap-4 text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
          <p className="text-base sm:text-lg font-semibold text-foreground leading-snug">
            I build backend services and cloud-ready infrastructure that stay
            fast, observable, and easy for teams to ship.
          </p>
          <p>
            I am a{" "}
            <strong className="text-foreground font-semibold">
              Backend Developer
            </strong>{" "}
            focused on designing production APIs, distributed background job
            queues, and cloud deployments. During my internship at{" "}
            <strong className="text-foreground font-semibold">
              PT. Media Kreasi Abadi
            </strong>
            , I architected RESTful services with{" "}
            <strong className="text-foreground font-semibold">
              NestJS and PostgreSQL
            </strong>
            , implemented{" "}
            <strong className="text-foreground font-semibold">
              BullMQ and Redis
            </strong>{" "}
            job queues that reduced task latency and automated deployments using{" "}
            <strong className="text-foreground font-semibold">
              Docker and Jenkins
            </strong>
            .
          </p>
          <p>
            Previously, as a{" "}
            <strong className="text-foreground font-semibold">
              Bangkit Academy Cloud Computing cohort &amp; Capstone Backend
              Developer
            </strong>{" "}
            at Nusantara Beta Studio, I built RBAC authentication, integrated
            Midtrans digital payments, and provisioned infrastructure on{" "}
            <strong className="text-foreground font-semibold">
              Google Cloud Platform (GCP)
            </strong>
            . I am also actively building with{" "}
            <strong className="text-foreground font-semibold">Golang</strong>{" "}
            for high-throughput microservices.
          </p>

          {onNavigate && (
            <div className="flex flex-wrap items-center gap-2.5 pt-4 mt-2 border-t border-border">
              <button
                onClick={() => onNavigate("projects")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <span>Explore Featured Projects</span>
                <ArrowRight size={13} />
              </button>
              <button
                onClick={() => onNavigate("experience")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-secondary text-foreground hover:bg-accent hover:border-foreground/40 hover:scale-[1.02] active:scale-[0.98] border border-border transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <span>View Work Experience</span>
                <ArrowRight size={13} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Card 2: What I Do & Technical Stack ── */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs transition-colors duration-200">
        <div className="flex flex-col gap-1 mb-6 pb-4 border-b border-border">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            02 / Capabilities &amp; Stack
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            What I Do &amp; Technical Stack
          </h3>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {ABOUT_CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="flex flex-col justify-between gap-3 p-5 rounded-xl bg-secondary border border-border"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-card text-foreground border border-border flex-shrink-0">
                  {renderIcon(cap.iconKey)}
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm sm:text-base font-bold text-foreground">
                    {cap.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
              <div className="pt-2.5 border-t border-border text-[11px] font-mono text-muted-foreground">
                Evidence: {cap.proof}
              </div>
            </div>
          ))}
        </div>

        {/* Categorized Tech Stack (Monochrome) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-border">
          {ABOUT_SKILL_GROUPS.map((group) => (
            <div key={group.category} className="flex flex-col gap-2.5">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                {group.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary text-foreground border border-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
