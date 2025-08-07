import "./App.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import Contact from "./pages/Contact.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import AdminLogin from "./components/Admin/AdminLogin.jsx";
import AdminPanel from "./components/Admin/AdminPanel.jsx";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CookieBanner from "./components/Cookies/CookieBanner.jsx";
import { v4 as uuidv4 } from "uuid";
import { fetchTrackVisit } from "./Services/visitService.js";
import Cookies from "js-cookie";
import AdminHomePage from "./components/Admin/adminPages/AdminHomePage.jsx";
import WeddingPage from "./Ema/WeddingPage.jsx";

function App() {
  const [cookieConsent, setCookieConsent] = useState(() =>
    Cookies.get("CookieConsent"),
  );

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const consent = Cookies.get("CookieConsent");
      if (consent && consent !== cookieConsent) {
        setCookieConsent(consent);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cookieConsent]);

  useEffect(() => {
    if (cookieConsent) {
      let visitorId = localStorage.getItem("visitor_id");
      if (!visitorId) {
        visitorId = uuidv4();
        localStorage.setItem("visitor_id", visitorId);
      }

      const visitDate = new Date().toISOString().slice(0, 10);

      fetchTrackVisit({ visitor_id: visitorId, visit_date: visitDate }).then(
        (result) => {
          console.log(result);
        },
      );
    }
  }, [cookieConsent]);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CookieBanner />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<BookingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/admin-login-11marian!" element={<AdminLogin />} />
        <Route path="/admin-panel-macarie@23" element={<AdminPanel />}>
          <Route index element={<AdminHomePage />} />
        </Route>
        <Route path="/wedding" element={<WeddingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
