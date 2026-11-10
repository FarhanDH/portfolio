import { useEffect, useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import Sidebar from "./components/Sidebar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ProjectDetailPage from "./components/ProjectDetailPage";
import ExperienceSection from "./components/ExperienceSection";
import EducationSection from "./components/EducationSection";
import AchievementsSection from "./components/AchievementsSection";
import CertificationsSection from "./components/CertificationsSection";
// import BlogSection from "./components/BlogSection";
// import InfrastructureSection from "./components/InfrastructureSection";
import ContactSection from "./components/ContactSection";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "certifications", label: "Certifications" },
  // { id: "blog", label: "Engineering Notes" },
  // { id: "infrastructure", label: "Architecture" },
  { id: "contact", label: "Contact" },
];

function parseProjectSlugFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/projects\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function App() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const saved = localStorage.getItem("portfolio-theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      // ignore storage errors
    }
    return "dark";
  });

  const getInitialRoute = () => {
    try {
      const slug = parseProjectSlugFromPath(window.location.pathname);
      if (slug) {
        return { section: "projects", projectSlug: slug };
      }
      const hash = window.location.hash.replace("#", "");
      if (SECTIONS.some((s) => s.id === hash)) {
        return { section: hash, projectSlug: null };
      }
    } catch {
      // ignore
    }
    return { section: "about", projectSlug: null };
  };

  const [activeSection, setActiveSection] = useState<string>(
    () => getInitialRoute().section,
  );
  const [projectSlug, setProjectSlug] = useState<string | null>(
    () => getInitialRoute().projectSlug,
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  // Sync with browser back/forward buttons (popstate & hashchange)
  useEffect(() => {
    const syncFromLocation = () => {
      const slug = parseProjectSlugFromPath(window.location.pathname);
      if (slug) {
        setProjectSlug(slug);
        setActiveSection("projects");
        return;
      }

      setProjectSlug(null);
      const hash = window.location.hash.replace("#", "");
      if (SECTIONS.some((s) => s.id === hash)) {
        setActiveSection(hash);
      } else {
        setActiveSection("about");
      }
    };

    window.addEventListener("popstate", syncFromLocation);
    window.addEventListener("hashchange", syncFromLocation);
    return () => {
      window.removeEventListener("popstate", syncFromLocation);
      window.removeEventListener("hashchange", syncFromLocation);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleSelectSection = (id: string) => {
    setProjectSlug(null);
    setActiveSection(id);
    const targetUrl = id === "about" ? "/" : `/#${id}`;
    window.history.pushState({}, "", targetUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenProject = (slug: string) => {
    setProjectSlug(slug);
    setActiveSection("projects");
    window.history.pushState({}, "", `/projects/${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-200">
      {/* 1. Top Horizontal Section Navigation Bar */}
      <Sidebar
        theme={theme}
        onToggleTheme={toggleTheme}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
      />

      {/* 2. Workspace Body: Left Vertical Identity Card + Right Independent Section Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Left: Vertical Sticky Profile Sidebar (On Mobile/iPad: only visible in About section) */}
          <ProfileHeader
            onNavigate={handleSelectSection}
            className={
              activeSection === "about" && !projectSlug
                ? "block"
                : "hidden lg:block"
            }
          />

          {/* Right: Independent Active Section / Project Route Container */}
          <main className="flex-1 min-w-0 w-full flex flex-col gap-4">
            {projectSlug ? (
              <ProjectDetailPage
                slug={projectSlug}
                onBack={() => handleSelectSection("projects")}
                onOpenProject={handleOpenProject}
              />
            ) : (
              <>
                {/* Active Independent Section Container */}
                <div
                  key={activeSection}
                  className="animate-in fade-in-50 duration-200"
                >
                  {activeSection === "about" && (
                    <AboutSection onNavigate={handleSelectSection} />
                  )}
                  {activeSection === "projects" && (
                    <ProjectsSection onOpenProject={handleOpenProject} />
                  )}
                  {activeSection === "experience" && <ExperienceSection />}
                  {activeSection === "education" && <EducationSection />}
                  {activeSection === "achievements" && <AchievementsSection />}
                  {activeSection === "certifications" && (
                    <CertificationsSection />
                  )}
                  {/* {activeSection === "blog" && <BlogSection />} */}
                  {/* {activeSection === "infrastructure" && <InfrastructureSection />} */}
                  {activeSection === "contact" && <ContactSection />}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
