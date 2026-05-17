import Hero from "@/components/marketing/Hero";
import About from "@/components/marketing/About";
import EventsPreview from "@/components/marketing/Events";
import Contact from "@/components/marketing/Contact";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <EventsPreview />
      <Contact />
    </div>
  );
}
