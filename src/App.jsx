import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/landing";
import About from "../pages/about";
import Footer from "../components/Footer";
import Header from "../components/Header";

const headerLinks = [
  { path: "/dashboard", name: "Dashboard" },
  { path: "/about", name: "About" },
  { path: "/contact", name: "Contact" },
];

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  return (
    <BrowserRouter>
      <Header listOfLinks={headerLinks} />
      <Routes>
        <Route
          path="/"
          element={<Landing userData={user} setUserData={setUser} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
