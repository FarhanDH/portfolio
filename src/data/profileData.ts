export interface ProfileFact {
    label: string;
    value: string;
}

export interface ProfileSocialLink {
    id: "github" | "linkedin" | "email";
    label: string;
    href: string;
    title: string;
}

export const PROFILE_DATA = {
    name: "Farhan Dwi Hartanto",
    role: "Backend Developer · Cloud & DevOps",
    availability: "Open to Work",
    summary:
        "Building reliable REST APIs, distributed background queues, and automated cloud deployments.",
    location: "Samarinda, Indonesia (Remote Ready)",
    education: "D4 Informatics Eng. — Polnes",
    resumeDownloadName: "Farhan_Dwi_Hartanto_CV.pdf",
    facts: [
        { label: "Focus", value: "Backend, Cloud & DevOps" },
        { label: "Core Stack", value: "NestJS · Golang · PostgreSQL" },
        { label: "Infra", value: "Docker · Jenkins · GCP · AWS" },
    ] as ProfileFact[],
    socials: [
        {
            id: "github",
            label: "GitHub",
            href: "https://github.com/FarhanDH",
            title: "GitHub: github.com/FarhanDH",
        },
        {
            id: "linkedin",
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/farhan-dwi-hartanto-8074ba292/",
            title: "LinkedIn Profile",
        },
        {
            id: "email",
            label: "Email",
            href: "mailto:farhandwihartanto@gmail.com",
            title: "Email: farhandwihartanto@gmail.com",
        },
    ] as ProfileSocialLink[],
};
