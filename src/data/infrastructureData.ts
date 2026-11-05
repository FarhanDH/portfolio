export interface InfraNodeItem {
    iconKey: "globe" | "server" | "database" | "shield";
    layer: string;
    tech: string;
    detail: string;
}

export interface GoApiEndpoint {
    label: string;
    active: boolean;
}

export const INFRA_NODES: InfraNodeItem[] = [
    {
        iconKey: "globe",
        layer: "Frontend Layer",
        tech: "React 19 · TypeScript · Tailwind v4",
        detail: "Modular container interface with Dark/Light theme and resilient client-side snapshot fallbacks.",
    },
    {
        iconKey: "server",
        layer: "Backend API",
        tech: "Golang REST API (/api/v1/*)",
        detail: "Layered handler/service/repository architecture serving structured JSON DTOs for projects and certifications.",
    },
    {
        iconKey: "database",
        layer: "Persistence",
        tech: "PostgreSQL Database",
        detail: "Stores projects, verified certifications, work history, and inbound contact submissions.",
    },
    {
        iconKey: "shield",
        layer: "Deployment & Ops",
        tech: "Docker · CI/CD · Cloud Hosting",
        detail: "Containerized builds, strict type-safety, and automated pipelines for zero-downtime delivery.",
    },
];

export const GO_API_ENDPOINTS: GoApiEndpoint[] = [
    { label: "GET /api/v1/projects", active: true },
    { label: "GET /api/v1/certifications", active: true },
    { label: "GET /api/v1/experiences (WIP)", active: false },
    { label: "POST /api/v1/inbox (WIP)", active: false },
];
