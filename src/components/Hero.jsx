import './Hero.css';

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-content">
        <h2 className="hero-title">Líderes en Agroindustria</h2>
        <p className="hero-subtitle">
          Soluciones integrales para la industria ganadera y agropecuaria
        </p>
        <p className="hero-description">
          Desde 2024, brindando calidad y excelencia en productos y servicios veterinarios,
          alimentos para animales, y comercio de carne en Oaxaca, México.
        </p>
        <div className="hero-buttons">
          <a href="#servicios" className="btn btn-primary">Nuestros Servicios</a>
          <a href="#contacto" className="btn btn-secondary">Contáctanos</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
