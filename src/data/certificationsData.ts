export interface CertificationDTO {
  id: string;
  name: string;
  issuer: string;
  issuer_logo: string | null;
  issued_date: string;
  expiry_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
  skills: string[];
}

export const FALLBACK_CERTIFICATIONS: CertificationDTO[] = [
  {
    id: "6200b704-0d5a-490b-9b8f-570ee66d14cb",
    name: "Back End Development and APIs",
    issuer: "freeCodeCamp",
    issuer_logo:
      "https://design-style-guide.freecodecamp.org/downloads/fcc_primary_small.jpg",
    issued_date: "2023-11",
    expiry_date: null,
    credential_id: "FCC-BACKEND-APIS",
    credential_url:
      "https://www.freecodecamp.org/certification/Farhandwi/back-end-development-and-apis",
    skills: ["Node.js", "Back-End Web Development", "REST APIs", "Express.js"],
  },
  {
    id: "bangkit-cloud-2024",
    name: "Cloud Computing Learning Path Graduate",
    issuer: "Bangkit Academy (Google, GoTo, Traveloka)",
    issuer_logo:
      "https://yt3.googleusercontent.com/0b3Ljhqw5VJpXwOaffzj5lwAfHHYa7fTfT32hjnZ3MMHyWu84IUfy4CTliMmY15f0k8i-wt7oA=s900-c-k-c0x00ffffff-no-rj",
    issued_date: "2024-12",
    expiry_date: null,
    credential_id: "BANGKIT-CC-2024",
    credential_url: null,
    skills: [
      "Google Cloud Platform (GCP)",
      "Cloud Architecture",
      "Compute Engine & Cloud Run",
      "Backend Deployment",
    ],
  },
  {
    id: "dicoding-backend-gcp",
    name: "Menjadi Google Cloud Engineer",
    issuer: "Dicoding Indonesia",
    issuer_logo: null,
    issued_date: "2024-10",
    expiry_date: "2027-10",
    credential_id: null,
    credential_url: null,
    skills: [
      "Google Cloud Platform",
      "IAM & Security",
      "Cloud Storage",
      "Networking",
    ],
  },
  {
    id: "dicoding-js-backend",
    name: "Belajar Membuat Aplikasi Back-End untuk Pemula dengan Google Cloud",
    issuer: "Dicoding Indonesia",
    issuer_logo: null,
    issued_date: "2024-09",
    expiry_date: "2027-09",
    credential_id: null,
    credential_url: null,
    skills: ["Node.js", "RESTful API", "Google Cloud", "HTTP Server"],
  },
];
