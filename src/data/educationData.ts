export interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  type: string;
  startDate: string;
  endDate: string | null;
  location: string;
  highlights: string[];
  coursework: string[];
}

export const FALLBACK_EDUCATIONS: EducationItem[] = [
  {
    id: 1,
    institution: "Politeknik Negeri Samarinda (Polnes)",
    degree: "D4 (Applied Bachelor) in Informatics Engineering",
    type: "Higher Education",
    startDate: "2022",
    endDate: "2026",
    location: "Samarinda, Indonesia",
    highlights: [
      // "Focused on backend software engineering, relational database systems, computer networking, and distributed web services.",
      // "Built Silani API (AI-assisted smart farming backend) for the national Hackathon KMIPN VI competition.",
      // "Developed Say-Kost App (boarding house reservation & management system) as the final project for Interactive Multimedia Programming.",
    ],
    coursework: [
      "Backend Engineering",
      "Relational Databases",
      "Computer Networks",
      "Software Architecture",
      "Cloud Computing",
    ],
  },
  {
    id: 2,
    institution: "Amazon Web Services Training and Certification",
    degree: "AWS re/Start Cohort",
    type: "Cloud Training Cohort",
    startDate: "Aug 2026",
    endDate: "Sep 2026",
    location: "Indonesia · Remote",
    highlights: [
      "Completed intensive hands-on Amazon Web Services (AWS) training covering compute, networking, storage, databases, security, monitoring, and cloud operations.",
      "Practiced deploying and managing core AWS services including Amazon EC2, VPC, IAM, S3, RDS, Lambda, Auto Scaling, CloudWatch, CloudTrail, and CloudFormation.",
      "Studied cloud architecture, troubleshooting, cost optimization, cloud governance, Infrastructure as Code (IaC), and best practices based on the AWS Well-Architected Framework.",
      "Explored the fundamentals of Artificial Intelligence (AI), Machine Learning (ML), and Generative AI using Amazon Bedrock, Amazon SageMaker, and Amazon Q.",
    ],
    coursework: [
      "Amazon EC2 & VPC",
      "IAM & Cloud Security",
      "S3 & RDS",
      "AWS Lambda & Auto Scaling",
      "CloudFormation (IaC)",
      "CloudWatch & CloudTrail",
      "AWS Well-Architected",
      "Amazon Bedrock & SageMaker",
    ],
  },
  {
    id: 3,
    institution: "Bangkit Academy by Google, GoTo, Tokopedia, & Traveloka",
    degree: "Bangkit Academy Cohort Specializing in Cloud Computing",
    type: "Kampus Merdeka (906 Hours · 20 SKS)",
    startDate: "Sep 2024",
    endDate: "Dec 2024",
    location: "Indonesia · Remote",
    highlights: [
      "Completed 906 hours of intensive training in the Bangkit Academy 2024 H2 Cloud Computing Learning Path, led by Google with support from GoTo, Tokopedia, Traveloka, and Dicoding Indonesia.",
      "Mastered Google Cloud Platform (GCP) infrastructure and Cloud Engineering (Compute Engine, GKE Kubernetes, Cloud Storage, Cloud SQL, Cloud Pub/Sub, IAM least-privilege security, and cost estimation) alongside Associate Cloud Engineer (ACE) exam preparation.",
      "Practiced DevOps and Site Reliability Engineering (SRE) on Google Cloud, designing secure CI/CD pipelines (Cloud Build, Cloud Deploy, Artifact Registry, Binary Authorization) and real-time observability (Cloud Monitoring, Cloud Logging, Cloud Trace, Cloud Profiler, Error Reporting).",
      "Built and deployed cloud-native back-end applications and RESTful APIs using JavaScript, Node.js (Hapi framework), Jest/Postman automated testing, Compute Engine, and serverless containers on Google Cloud Run with Global Load Balancing.",
      "Applied AI and Machine Learning on Google Cloud using TensorFlow and Vertex AI, and collaborated in a 212-hour cross-disciplinary Capstone Project alongside 230 hours of professional English (Business Presentation) and industry soft-skills training.",
    ],
    coursework: [
      "Google Cloud Platform (GCP)",
      "Compute Engine & GKE",
      "DevOps & SRE (CI/CD)",
      "Cloud Run & Serverless",
      "Back-End API (Node.js & Hapi)",
      "Cloud Monitoring & Logging",
      "Vertex AI & TensorFlow",
      "Associate Cloud Engineer Prep",
    ],
  },
];
