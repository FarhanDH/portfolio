import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import CertificationsSection from "./components/CertificationsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";

function App() {
    return (
        <div className="relative w-full bg-[#0a0a0a] min-h-screen overflow-x-hidden">
            <Navbar />
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <CertificationsSection />
            <ProjectsSection />
            <ContactSection />
        </div>
    );
}

export default App;
