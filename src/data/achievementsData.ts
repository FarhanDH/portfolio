export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  associatedWith: string;
  certificateId?: string;
  badge: string;
  description: string;
  imageUrl: string;
  certificateLabel: string;
}

export const FALLBACK_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "icompex-2025",
    title:
      "Silver Medal — International Innovation and Invention Competition Through Exhibition (iCompEx 2025)",
    issuer: "Politeknik Sultan Abdul Halim Muadzam Shah",
    date: "Aug 2025",
    associatedWith: "Politeknik Negeri Samarinda",
    certificateId: "No. 0660",
    badge: "Silver Medal · International",
    description:
      "Silver Medal (International) at iCompEx 2025, POLIMAS, Kedah, Malaysia. Built VISORA, a real-time AI app helping visually impaired users navigate their surroundings and interact with digital information through a voice-first interface, combining computer vision and conversational AI for environment recognition, voice interaction, and independent communication.",
    imageUrl: "/achievements/icompex-2025.jpg",
    certificateLabel: "iCompEx_2025_Silver_Medal.jpg",
  },
  {
    id: "technofest-2025",
    title: "1st Place — Hackathon TechnoFest IT v2.25",
    issuer: "Teknik Informatika, Universitas Muhammadiyah Kalimantan Timur",
    date: "Jun 2025",
    associatedWith: "Politeknik Negeri Samarinda",
    certificateId: "05.105/PAN-PEL/VI/2025",
    badge: "1st Place · Hackathon",
    description:
      "1st Place at the inter-campus Hackathon TechnoFest IT v2.25 (East Kalimantan). Built an AI chatbot-as-a-service platform for MSMEs (UMKM) that automatically crawls business websites into a chatbot knowledge base, with web crawling, vector embedding, and Gemini-powered response generation. The chatbot embeds directly into MSME websites for automated customer responses, without the business building its own AI infrastructure.",
    imageUrl: "/achievements/technofest-2025.jpg",
    certificateLabel: "TechnoFest_IT_v2.25_Certificate.jpg",
  },
  {
    id: "infinite-devfest-2025",
    title: "3rd Place — Hackathon Infinite DevFest",
    issuer: "Program Studi Informatika, Institut Teknologi Kalimantan",
    date: "May 2025",
    associatedWith: "Politeknik Negeri Samarinda",
    certificateId: "081/SFT/CLARITY/HMIF/V/2025",
    badge: "3rd Place · Hackathon",
    description:
      "3rd Place at Hackathon Infinite DevFest. Built an AI-powered quiz platform supporting active recall learning, generating questions automatically from websites and PDF documents, with real-time multiplayer quizzes and video calls.",
    imageUrl: "/achievements/infinite-devfest-2025.jpg",
    certificateLabel: "Infinite_DevFest_Certificate.jpg",
  },
];
