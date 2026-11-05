import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import {
  CONTACT_CHANNELS,
  CONTACT_LOCATION,
  type ContactChannelItem,
} from "../data/contactData";

type FormStatus = "idle" | "loading" | "success" | "error";

const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT ||
  "https://formspree.io/f/YOUR_FORM_ID";

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const renderChannelIcon = (key: ContactChannelItem["iconKey"]) => {
    switch (key) {
      case "mail":
        return <Mail size={20} />;
      case "linkedin":
        return <Linkedin size={20} />;
      case "github":
        return <Github size={20} />;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs transition-colors duration-200"
    >
      <div className="flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex flex-col gap-1 pb-4 border-b border-border">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Get in Touch
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Contact
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Looking for a Backend or Cloud/DevOps Engineer? Send me an email
            directly or use the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left: Clickable Icons Only */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-foreground">
                  Direct Channels
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Click any icon below to reach out directly or explore my
                  profiles.
                </p>
              </div>

              {/* Clickable Icons */}
              <div className="flex flex-wrap items-center gap-3">
                {CONTACT_CHANNELS.map((link) => {
                  if (link.href) {
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={
                          link.href.startsWith("mailto") ? undefined : "_blank"
                        }
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground hover:scale-110 active:scale-95 border border-border text-foreground transition-all duration-200 cursor-pointer shadow-2xs"
                        title={`${link.label}: ${link.value}`}
                        aria-label={link.label}
                      >
                        {renderChannelIcon(link.iconKey)}
                      </a>
                    );
                  }
                  return (
                    <div
                      key={link.label}
                      className="w-12 h-12 flex items-center justify-center rounded-xl bg-secondary border border-border text-foreground"
                      title={`${link.label}: ${link.value}`}
                      aria-label={link.label}
                    >
                      {renderChannelIcon(link.iconKey)}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Location Note */}
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-secondary border border-border text-xs text-muted-foreground">
              <MapPin size={15} className="text-foreground flex-shrink-0" />
              <span>{CONTACT_LOCATION}</span>
            </div>
          </div>

          {/* Right: Contact Form (Formspree) */}
          <div className="lg:col-span-8">
            <div className="bg-secondary border border-border rounded-xl p-5 sm:p-6 h-full">
              <h3 className="text-base font-bold text-foreground mb-4">
                Send a Direct Message
              </h3>

              {formStatus === "success" ? (
                <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-card border border-border">
                    <Send size={20} className="text-foreground" />
                  </div>
                  <div>
                    <p className="text-foreground font-bold">Message sent!</p>
                    <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                      Thanks for reaching out. I will reply to your email soon.
                    </p>
                  </div>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="text-xs font-semibold text-foreground underline hover:opacity-80 active:scale-95 cursor-pointer mt-2 transition-all duration-150"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-name"
                        className="text-xs font-semibold text-foreground"
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Budi Santoso"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-email"
                        className="text-xs font-semibold text-foreground"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="budi@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-semibold text-foreground"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Hi Farhan, we have an opening for a Backend Engineer role..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                    />
                  </div>

                  {formStatus === "error" && (
                    <p className="text-xs text-foreground bg-card border border-border px-3.5 py-2 rounded-lg">
                      Failed to send message. Please email me directly at
                      farhandwihartanto@gmail.com.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === "loading"}
                    id="contact-submit-btn"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto sm:self-end px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 cursor-pointer shadow-2xs"
                  >
                    <Send size={14} />
                    <span>
                      {formStatus === "loading" ? "Sending..." : "Send Message"}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
