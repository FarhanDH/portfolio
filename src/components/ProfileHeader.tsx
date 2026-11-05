import {
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  GraduationCap,
} from "lucide-react";
import farhanPict from "../assets/Farhan_Pict.png";
import { PROFILE_DATA } from "../data/profileData";

const RESUME_URL = (import.meta.env.VITE_RESUME_URL as string) || "/resume.pdf";

interface ProfileHeaderProps {
  onNavigate?: (sectionId: string) => void;
  className?: string;
}

export default function ProfileHeader({
  onNavigate,
  className = "",
}: ProfileHeaderProps) {
  const handleContactClick = () => {
    if (onNavigate) {
      onNavigate("contact");
    }
  };

  const renderSocialIcon = (id: "github" | "linkedin" | "email") => {
    switch (id) {
      case "github":
        return <Github size={16} />;
      case "linkedin":
        return <Linkedin size={16} />;
      case "email":
        return <Mail size={16} />;
    }
  };

  return (
    <aside
      className={`w-full lg:w-76 xl:w-80 flex-shrink-0 bg-card border border-border rounded-2xl p-6 shadow-xs lg:sticky lg:top-22 transition-colors duration-200 ${className}`}
    >
      <div className="flex flex-col gap-5">
        {/* Avatar + Name + Role */}
        <div className="flex sm:flex-row lg:flex-col items-start gap-4">
          <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden border border-border bg-secondary flex-shrink-0">
            <img
              src={farhanPict}
              alt={PROFILE_DATA.name}
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-secondary border border-border w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-mono text-[11px] font-medium text-foreground">
                {PROFILE_DATA.availability}
              </span>
            </div>

            <h1 className="text-xl font-bold text-foreground tracking-tight mt-0.5">
              {PROFILE_DATA.name}
            </h1>

            <p className="text-sm font-medium text-muted-foreground">
              {PROFILE_DATA.role}
            </p>
          </div>
        </div>

        {/* Short Summary */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
          {PROFILE_DATA.summary}
        </p>

        {/* Location & Education */}
        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-foreground flex-shrink-0" />
            <span>{PROFILE_DATA.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap
              size={14}
              className="text-foreground flex-shrink-0"
            />
            <span>{PROFILE_DATA.education}</span>
          </div>
        </div>

        {/* Structured Quick Facts */}
        <dl className="flex flex-col gap-2.5 p-3.5 rounded-xl bg-secondary border border-border">
          {PROFILE_DATA.facts.map((fact) => (
            <div
              key={fact.label}
              className="flex flex-col gap-0.5 pb-2 last:pb-0 border-b last:border-b-0 border-border"
            >
              <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {fact.label}
              </dt>
              <dd className="text-xs font-semibold text-foreground">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            type="application/pdf"
            download={PROFILE_DATA.resumeDownloadName}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-2xs"
          >
            <Download size={13} />
            <span>Download CV</span>
          </a>
          <button
            onClick={handleContactClick}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-secondary text-foreground hover:bg-accent hover:border-foreground/40 hover:scale-[1.02] active:scale-[0.98] border border-border transition-all duration-200 cursor-pointer shadow-2xs"
          >
            <Mail size={13} />
            <span>Get in Touch</span>
          </button>
        </div>

        {/* Social / Contact Icons */}
        <div className="flex items-center justify-center gap-3 pt-3 border-t border-border">
          {PROFILE_DATA.socials.map((soc) => (
            <a
              key={soc.id}
              href={soc.href}
              target={soc.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary hover:bg-accent hover:border-foreground/40 hover:scale-110 active:scale-95 border border-border text-foreground transition-all duration-200 cursor-pointer shadow-2xs"
              title={soc.title}
              aria-label={soc.label}
            >
              {renderSocialIcon(soc.id)}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
