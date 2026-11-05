import { useState } from "react";
import {
  BookOpen,
  Clock,
  ChevronRight,
  Cpu,
  Server,
  Database,
  Globe,
  Shield,
  X,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  tags: string[];
  caseStudy: {
    problem: string;
    decision: string;
    implementation: string;
    outcome: string;
  };
}

const blogPosts: BlogPost[] = [
  {
    id: "bullmq-redis-latency",
    title:
      "Reducing API Latency by 40% with Distributed Background Queues (BullMQ & Redis)",
    date: "May 2026",
    readTime: "4 min read",
    summary:
      "How offloading heavy synchronous tasks to Redis-backed worker queues kept our NestJS REST endpoints fast and reliable under load.",
    tags: ["NestJS", "BullMQ", "Redis"],
    caseStudy: {
      problem:
        "Synchronous API requests that triggered notifications, third-party calls, or heavy data processing caused slow response times and occasional timeouts during peak traffic.",
      decision:
        "Chose BullMQ on top of Redis over in-memory queues so jobs persist across container restarts, support automatic exponential backoff retries, and scale horizontally across workers.",
      implementation:
        "Decoupled the HTTP controller from heavy processing: the NestJS endpoint validates the payload, enqueues a typed job to Redis, and immediately returns a 202/200 status while dedicated worker consumers process the queue.",
      outcome:
        "Reduced average task endpoint latency and eliminated dropped tasks during service deployments.",
    },
  },
  {
    id: "sidingin-midtrans-architecture",
    title: "Designing Reliable Payment & Real-Time Order Workflows in SiDingin",
    date: "Dec 2024",
    readTime: "5 min read",
    summary:
      "Structuring role-based order state machines, Midtrans webhook verification, and location matching for an on-demand AC service platform.",
    tags: ["System Design", "Midtrans", "PostgreSQL"],
    caseStudy: {
      problem:
        "On-demand service bookings require strict state transitions between Customers and Technicians, plus idempotent payment handling when webhooks arrive more than once.",
      decision:
        "Used PostgreSQL transactions with TypeORM and strict webhook signature verification from Midtrans before mutating order states.",
      implementation:
        "Built a state-driven order module in NestJS paired with OpenStreetMap geospatial matching and Google Cloud Platform deployment during the Bangkit Capstone project.",
      outcome:
        "Delivered a reliable end-to-end booking and payment flow supporting multiple payment methods without duplicate order mutations.",
    },
  },
  {
    id: "golang-portfolio-api",
    title: "Why I Built a Golang REST API to Power My Portfolio Data",
    date: "Sep 2026",
    readTime: "3 min read",
    summary:
      "Moving projects, certifications, and inbox data out of hardcoded frontend arrays into a fast, structured Go backend service.",
    tags: ["Golang", "REST API", "Architecture"],
    caseStudy: {
      problem:
        "Updating portfolio projects or certifications in a static frontend required code edits and full frontend rebuilds every time.",
      decision:
        "Built a lightweight Golang HTTP API (/api/v1/projects, /api/v1/certifications) with clean layered architecture (handler -> service -> repository) and paired it with client-side snapshot fallbacks.",
      implementation:
        "Implemented context-aware SQL queries in Go and connected the React TypeScript frontend via environment-configured endpoints.",
      outcome:
        "Sub-millisecond API responses, zero-downtime content updates, and resilient frontend rendering even if the backend is offline.",
    },
  },
];

export default function BlogAndInfraSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const infraNodes = [
    {
      icon: Globe,
      layer: "Frontend Layer",
      tech: "React 19 · TypeScript · Tailwind v4",
      detail:
        "Responsive dashboard UI with dark/light slate theme & snapshot fallback.",
    },
    {
      icon: Server,
      layer: "Backend API",
      tech: "Golang REST API (/api/v1/*)",
      detail:
        "Layered handler/service/repository architecture serving JSON DTOs.",
    },
    {
      icon: Database,
      layer: "Persistence",
      tech: "PostgreSQL Database",
      detail:
        "Stores projects, verified certifications, work history, and inbox messages.",
    },
    {
      icon: Shield,
      layer: "Deployment & Ops",
      tech: "Docker · CI/CD · Cloud Hosting",
      detail:
        "Containerized builds, automated type-checking, and zero-downtime delivery.",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* ══════════════════════════════════════════════════════════════
                SECTION 1: ENGINEERING NOTES / BLOG (#blog)
            ══════════════════════════════════════════════════════════════ */}
      <section
        id="blog"
        className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-6 transition-colors duration-200"
      >
        <div className="flex flex-col gap-1.5 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-1 rounded-full bg-primary" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
              Technical Writing
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Engineering Notes &amp; Case Studies
          </h2>
          <p className="text-sm text-muted-foreground">
            Architectural decisions, trade-offs, and lessons learned from
            building backend systems.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-border bg-secondary/40 hover:bg-secondary/80 hover:border-primary/50 transition-all duration-200 cursor-pointer"
            >
              <div className="flex flex-col gap-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-card border border-border text-[11px] text-primary font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPost(post);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-card group-hover:bg-primary group-hover:text-primary-foreground text-foreground border border-border transition-colors self-start sm:self-center flex-shrink-0"
              >
                <BookOpen size={13} />
                <span>Read Case Study</span>
                <ChevronRight size={13} />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
                SECTION 2: SYSTEM ARCHITECTURE (#infrastructure)
            ══════════════════════════════════════════════════════════════ */}
      <section
        id="infrastructure"
        className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-6 transition-colors duration-200"
      >
        <div className="flex flex-col gap-1.5 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-1 rounded-full bg-primary" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
              Under the Hood
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            How This Portfolio Runs
          </h2>
          <p className="text-sm text-muted-foreground">
            Rather than a static template, this portfolio is backed by a custom
            Golang REST API and resilient client architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {infraNodes.map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.layer}
                className="flex flex-col gap-2.5 p-4 sm:p-5 rounded-xl bg-secondary/50 border border-border"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                    <Icon size={16} />
                  </div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {node.layer}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-foreground">
                  {node.tech}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {node.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* API Endpoints Strip */}
        <div className="mt-5 p-4 rounded-xl bg-secondary/40 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs font-mono text-foreground">
            <Cpu size={15} className="text-emerald-500" />
            <span className="font-semibold">Active Go API Endpoints:</span>
          </div>
          <div className="flex flex-wrap gap-2 font-mono text-[11px]">
            <span className="px-2.5 py-1 rounded-md bg-card border border-border text-emerald-600 dark:text-emerald-400">
              GET /api/v1/projects
            </span>
            <span className="px-2.5 py-1 rounded-md bg-card border border-border text-emerald-600 dark:text-emerald-400">
              GET /api/v1/certifications
            </span>
            <span className="px-2.5 py-1 rounded-md bg-card border border-border text-primary">
              GET /api/v1/experiences (WIP)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-card border border-border text-primary">
              POST /api/v1/inbox (WIP)
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
                CASE STUDY READER MODAL (Pipeline Rail: Problem -> Decision -> Implementation -> Outcome)
            ══════════════════════════════════════════════════════════════ */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            onClick={() => setSelectedPost(null)}
          />
          <div className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-primary">
                  <span>{selectedPost.date}</span>
                  <span>·</span>
                  <span>{selectedPost.readTime}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
                  {selectedPost.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground"
                aria-label="Close case study"
              >
                <X size={16} />
              </button>
            </div>

            {/* Pipeline Rail: Problem -> Decision -> Implementation -> Outcome */}
            <div className="relative pl-7 mt-6 space-y-6">
              <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-primary/40" />

              {[
                {
                  stage: "01. Problem",
                  content: selectedPost.caseStudy.problem,
                  highlight: false,
                },
                {
                  stage: "02. Architectural Decision",
                  content: selectedPost.caseStudy.decision,
                  highlight: false,
                },
                {
                  stage: "03. Implementation",
                  content: selectedPost.caseStudy.implementation,
                  highlight: false,
                },
                {
                  stage: "04. Outcome & Impact",
                  content: selectedPost.caseStudy.outcome,
                  highlight: true,
                },
              ].map((step) => (
                <div key={step.stage} className="relative">
                  <span
                    className={`absolute -left-7 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      step.highlight
                        ? "border-emerald-500 bg-emerald-500/20"
                        : "border-primary bg-card"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        step.highlight ? "bg-emerald-500" : "bg-primary"
                      }`}
                    />
                  </span>
                  <div className="flex flex-col gap-1">
                    <span
                      className={`font-mono text-xs font-bold uppercase tracking-wider ${
                        step.highlight ? "text-emerald-500" : "text-primary"
                      }`}
                    >
                      {step.stage}
                    </span>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {step.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
