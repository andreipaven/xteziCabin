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

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<BookingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<ServicesPage />} />

        <Route path="/admin-login-11marian!" element={<AdminLogin />} />
        <Route path="/admin-panel-macarie@23" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
