export interface CapabilityItem {
    iconKey: "server" | "database" | "cloud" | "git";
    title: string;
    description: string;
    proof: string;
}

export interface SkillGroup {
    category: string;
    items: string[];
}

export const ABOUT_CAPABILITIES: CapabilityItem[] = [
    {
        iconKey: "server",
        title: "API & Backend Architecture",
        description:
            "Designing modular, well-documented RESTful APIs with role-based access control, request validation, and payment gateway integrations.",
        proof: "Applied in SiDingin & Silani API",
    },
    {
        iconKey: "database",
        title: "Distributed Queues & Data",
        description:
            "Offloading heavy tasks to background workers with BullMQ and Redis while structuring relational schemas in PostgreSQL.",
        proof: "Cut task latency during internship",
    },
    {
        iconKey: "cloud",
        title: "Cloud & Containerization",
        description:
            "Packaging services with Docker and deploying workloads and object storage across Google Cloud Platform and AWS.",
        proof: "Bangkit Capstone & deployments",
    },
    {
        iconKey: "git",
        title: "CI/CD & Workflow Automation",
        description:
            "Building automated build, test, and deployment pipelines with Jenkins and GitHub Actions for predictable releases.",
        proof: "Automated container delivery pipelines",
    },
];

export const ABOUT_SKILL_GROUPS: SkillGroup[] = [
    {
        category: "Backend & Languages",
        items: [
            "TypeScript",
            "Golang",
            "Node.js",
            "NestJS",
            "Express.js",
            "RESTful APIs",
        ],
    },
    {
        category: "Databases & Messaging",
        items: [
            "PostgreSQL",
            "MySQL",
            "Redis",
            "BullMQ",
            "Prisma ORM",
            "TypeORM",
        ],
    },
    {
        category: "Cloud, DevOps & Network",
        items: [
            "Docker",
            "Jenkins CI/CD",
            "Google Cloud Platform (GCP)",
            "Amazon Web Services (AWS)",
            "Linux Administration",
            "MikroTik Networking",
        ],
    },
    {
        category: "Tools & Practices",
        items: [
            "Git & GitHub",
            "Swagger / OpenAPI",
            "Postman",
            "Midtrans Payment API",
            "System Design",
        ],
    },
];
