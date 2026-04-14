import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/landing";
import About from "../pages/about";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
