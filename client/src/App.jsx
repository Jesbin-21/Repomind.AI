import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import "./App.css";

import Header from "./components/header/Header";
import Signup from "./pages/Signup/SignupPage";
import Features from "./pages/features/Features";
import Home from "./pages/Home/Home";
import Explainer from "./pages/Explainer/Explainer";
import Explore from "./pages/Explore/Explore";

function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <BrowserRouter>
        <ScrollToTop />

      <Header />

      <div className="app-container">

        <div className="bg-grid-overlay"></div>

        <main className="main-content">
          <Routes>

            <Route path="/" element={<Home />} />

            <Route
              path="/signup"
              element={<Signup />}
            />

            <Route
              path="/features"
              element={<Features />}
            />

            <Route
              path="/explainer"
              element={<Explainer />}
            />

            <Route
              path="/explore"
              element={<Explore />}
            />

          </Routes>
        </main>

      </div>

      </BrowserRouter>
    </ReactLenis>
  );
}

export default App;