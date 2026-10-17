import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import LightningSimulator from "./pages/LightningSimulator";
import { useLang } from "./i18n/LanguageContext";
import "./index.css";

function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <p>{t("site.footer")}</p>
    </footer>
  );
}

function AppContent() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lightning" element={<LightningSimulator />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
