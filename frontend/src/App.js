import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@/App.css";
import Header from "@/components/Header";
import Home from "@/pages/Home";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import ScrollToTop from "@/components/ScrollToTop";
import { Footer } from "@/components/ui/footer";
import { Github, Instagram, Phone, Hexagon } from "lucide-react";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer
          logo={<Hexagon className="h-8 w-8 text-white" />}
          brandName="Artur Maciel"
          socialLinks={[
            {
              icon: <Phone className="h-5 w-5" />,
              href: "https://wa.me/5588996828755",
              label: "WhatsApp",
            },
            {
              icon: <Instagram className="h-5 w-5" />,
              href: "https://instagram.com/arturmaciell_",
              label: "Instagram",
            },
            {
              icon: <Github className="h-5 w-5" />,
              href: "https://github.com/pycacau",
              label: "GitHub",
            },
          ]}
          mainLinks={[
            { href: "/#sobre", label: "Sobre" },
            { href: "/#skills", label: "Skills" },
            { href: "/#projetos", label: "Projetos" },
            { href: "/#contato", label: "Contato" },
          ]}
          legalLinks={[
            { href: "/privacy", label: "Privacidade" },
            { href: "/terms", label: "Termos" },
          ]}
          copyright={{
            text: `© ${new Date().getFullYear()} Artur Maciel`,
            license: "Todos os direitos reservados",
          }}
        />
      </div>
    </Router>
  );
}

export default App;

