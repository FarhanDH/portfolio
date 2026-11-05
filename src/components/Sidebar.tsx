import {
  User,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Sun,
  Moon,
} from "lucide-react";

interface SidebarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

const navLinks = [
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "certifications", label: "Certifications", icon: Award },
  // { id: "blog", label: "Notes", icon: BookOpen },
  // { id: "infrastructure", label: "Architecture", icon: Cpu },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Sidebar({
  theme,
  onToggleTheme,
  activeSection,
  onSelectSection,
}: SidebarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-card/75 dark:bg-card/70 backdrop-blur-xl border-b border-border/80 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Brand / Name */}
          <button
            onClick={() => onSelectSection("about")}
            className="flex items-center gap-2.5 text-left group flex-shrink-0 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
            aria-label="Go to About section"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-foreground shadow-xs group-hover:scale-125 transition-transform duration-200" />
            <span className="font-mono text-sm font-bold tracking-tight text-foreground">
              farhan.dev
            </span>
          </button>

          {/* Desktop Horizontal Section Tabs */}
          <nav
            className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-secondary/80 border border-border"
            aria-label="Section navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => onSelectSection(link.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs scale-[1.02]"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent hover:scale-[1.03] active:scale-[0.97]"
                  }`}
                >
                  <Icon size={14} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Theme Toggle */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onToggleTheme}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-secondary text-xs font-medium text-foreground hover:bg-accent hover:border-foreground/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-2xs"
              aria-label="Toggle color theme"
              title="Switch between Dark and Light mode"
            >
              {theme === "dark" ? (
                <>
                  <Sun size={14} />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon size={14} />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Scrollable Section Tabs */}
        <nav
          className="md:hidden flex items-center gap-1.5 overflow-x-auto pb-3 pt-1 no-scrollbar"
          aria-label="Mobile section navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => onSelectSection(link.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all duration-200 flex-shrink-0 border ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary font-semibold shadow-xs"
                    : "bg-secondary text-muted-foreground border-border hover:bg-accent hover:text-foreground hover:border-foreground/30 active:scale-95"
                }`}
              >
                <Icon size={13} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
