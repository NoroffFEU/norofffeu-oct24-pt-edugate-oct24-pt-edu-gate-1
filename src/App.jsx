import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/landing";
import Footer from "../components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
