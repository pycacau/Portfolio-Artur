import React from "react";
import MascotPortfolioHero from "../components/MascotPortfolioHero";
import About from "../components/About";
import BusinessBenefits from "../components/BusinessBenefits";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import CloudNightScene from "../components/CloudNightScene";
import { Footer } from "../components/ui/footer";

const Home = () => {
  return (
    <>
      <MascotPortfolioHero href="#contato" hair="#241d19" hairStyle="textured" />
      <About />
      <CloudNightScene lightContent={<>
        <Testimonials />
        <Contact />
      </>} footerContent={<Footer className="portfolio-footer--in-scene" />}>
        <BusinessBenefits />
        <Projects />
      </CloudNightScene>
    </>
  );
};

export default Home;
