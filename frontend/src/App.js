import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "@/App.css";
import StaggeredMenu from "@/components/StaggeredMenu";
import Home from "@/pages/Home";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Certificates from "@/pages/Certificates";
import ScrollToTop from "@/components/ScrollToTop";
import SiteMotionController from "@/components/SiteMotionController";
import { Footer } from "@/components/ui/footer";

const ReviewPage = React.lazy(() => import('@/pages/Review'));

const menuItems = [
  { label: 'Início', ariaLabel: 'Ir para página inicial', link: '/' },
  { label: 'Sobre', ariaLabel: 'Sobre mim', link: '/#sobre' },
  { label: 'Serviços', ariaLabel: 'Como um site ajuda seu negócio', link: '/#servicos' },
  { label: 'Projetos', ariaLabel: 'Ver projetos', link: '/#projetos' },
  { label: 'Contato', ariaLabel: 'Entrar em contato', link: '/#contato' },
];

const socialItems = [
  { label: 'WhatsApp', link: 'https://wa.me/5588996828755' },
  { label: 'Instagram', link: 'https://instagram.com/arturmaciel.py' },
  { label: 'GitHub', link: 'https://github.com/pycacau' },
];

function FooterOutsideHome({ children }) {
  const { pathname } = useLocation();
  return pathname === '/' ? null : children;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <SiteMotionController />
      <div className="App">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#111111"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={['#ebebea', '#c7c7c2']}
          accentColor="#111111"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/avaliar" element={<React.Suspense fallback={<main className="min-h-screen bg-[#ebebea] p-24 text-center">Carregando formulário…</main>}><ReviewPage /></React.Suspense>} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/certificados" element={<Certificates />} />
          <Route path="/artigos/*" element={<Navigate to="/" replace />} />
        </Routes>
        <FooterOutsideHome>
        <Footer />
        </FooterOutsideHome>
      </div>
    </Router>
  );
}

export default App;
