import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Capabilities } from "@/components/sections/capabilities";
import { Skills } from "@/components/sections/skills";
import { Built } from "@/components/sections/built";
import { Experience } from "@/components/sections/experience";
import { Faq } from "@/components/sections/faq";
import { ContactCta } from "@/components/sections/contact-cta";
import { JsonLd } from "@/components/json-ld";
import { siteSettings, resumeSettings } from "@/lib/content/settings";
import { jsonLdGraph, webPageJsonLd, faqJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd
        graph={jsonLdGraph(
          webPageJsonLd({
            path: "/",
            title: siteSettings.title,
            description: siteSettings.description,
            type: "ProfilePage",
          }),
          faqJsonLd(resumeSettings.faq)
        )}
      />
      <Hero />
      <About />
      <Projects />
      <Capabilities />
      <Skills />
      <Built />
      <Experience />
      <Faq />
      <ContactCta />
    </>
  );
}
