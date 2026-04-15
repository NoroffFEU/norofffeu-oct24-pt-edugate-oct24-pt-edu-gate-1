import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from '../pages/landing.jsx';
import About from '../pages/about.jsx';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';

const headerLinks = [
  {path: "/dashboard", name: "Dashboard"},
  {path: "/about", name: "About"},
  {path: "/contact", name: "Contact"}
]

export default function App() {
  return (
    <BrowserRouter>
    <Header listOFLinks={headerLinks}/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}