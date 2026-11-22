import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { ScrollToTop } from "./ScrollToTop";
import { CookieBanner } from "./CookieBanner";

export const Layout = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <Navbar />
    <main className="flex-1"><Outlet /></main>
    <Footer />
    <WhatsAppFloat />
    <ScrollToTop />
    <CookieBanner />
  </div>
);
