import StarField from "./components/StarField";
import ScrollProgress from "./components/ScrollProgress";
import MouseGlow from "./components/MouseGlow";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SectionDivider from "./components/SectionDivider";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import GrainOverlay from "./components/GrainOverlay";

export default function App() {
  return (
    <>
      <StarField />
      <ScrollProgress />
      <MouseGlow />
      <Navbar />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider flip />
      <Skills />
      <SectionDivider />
      <Projects />
      <SectionDivider flip />
      <Contact />
      <GrainOverlay />
    </>
  );
}
