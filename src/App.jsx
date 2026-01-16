import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Mission from './components/Mission';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';

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
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
