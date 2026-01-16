import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Mission from './components/Mission';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import AdminSelector from './components/AdminSelector';

function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Mission />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminSelector />} />
        <Route path="/admin/ventas" element={<AdminPanel departamento="Ventas" nombreDepartamento="Departamento de Ventas" />} />
        <Route path="/admin/facturacion" element={<AdminPanel departamento="Facturación" nombreDepartamento="Departamento de Facturación" />} />
        <Route path="/admin/finanzas" element={<AdminPanel departamento="Finanzas" nombreDepartamento="Departamento de Finanzas" />} />
        <Route path="/admin/general" element={<AdminPanel departamento="todos" nombreDepartamento="Administración General" />} />
      </Routes>
    </Router>
  );
}

export default App;
