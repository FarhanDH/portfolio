export interface ContactChannelItem {
    iconKey: "mail" | "linkedin" | "github";
    label: string;
    value: string;
    href: string | null;
}

export const CONTACT_CHANNELS: ContactChannelItem[] = [
    {
        iconKey: "mail",
        label: "Email",
        value: "farhandwihartanto@gmail.com",
        href: "mailto:farhandwihartanto@gmail.com",
    },
    {
        iconKey: "linkedin",
        label: "LinkedIn",
        value: "linkedin.com/in/farhan-dwi-hartanto",
        href: "https://www.linkedin.com/in/farhan-dwi-hartanto-8074ba292/",
    },
    {
        iconKey: "github",
        label: "GitHub",
        value: "github.com/FarhanDH",
        href: "https://github.com/FarhanDH",
    },
];

export const CONTACT_LOCATION = "Samarinda, East Kalimantan, Indonesia";
