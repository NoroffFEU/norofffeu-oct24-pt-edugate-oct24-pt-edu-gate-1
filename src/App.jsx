import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getUser } from "./Auth";
import Landing from "../pages/Landing";
import About from "../pages/about";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Login from "../pages/Login";
import TeacherDashboard from "../pages/TeacherDashboard";
import Contact from "../pages/Contact";

const headerLinks = [
  { path: "/dashboard", name: "Dashboard" },
  { path: "/about", name: "About" },
  { path: "/contact", name: "Contact" },
];

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setUser(savedUser);
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
        <Route
          path="/login"
          element={<Login setUserData={setUser} />} 
        />
          <Route
          path="/dashboard"
          element={<TeacherDashboard userData={user} setUserData={setUser} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
