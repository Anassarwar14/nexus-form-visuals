import { createFileRoute } from "@tanstack/react-router";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Preloader } from "@/components/site/Preloader";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { BuildThings } from "@/components/site/BuildThings";
import { Marquee } from "@/components/site/Marquee";
import { About } from "@/components/site/About";
import { Experience } from "@/components/site/Experience";
import { Projects } from "@/components/site/Projects";
import { Contact } from "@/components/site/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohammad Anas — Full Stack AI Engineer" },
      {
        name: "description",
        content:
          "Mohammad Anas builds agentic AI products, LLM tool-calling pipelines and fast, crafted interfaces. Selected work, projects and toolkit.",
      },
      { property: "og:title", content: "Mohammad Anas — Full Stack AI Engineer" },
      {
        property: "og:description",
        content:
          "Agentic workflows, RAG pipelines and design-engineered interfaces. Portfolio of Mohammad Anas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useSmoothScroll();

  return (
    <>
      <Preloader />
      <main className="grain relative">
        <Nav />
        <Hero />
        <BuildThings />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
