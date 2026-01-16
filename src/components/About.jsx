import './About.css';

function About() {
  return (
    <section id="nosotros" className="about">
      <div className="container">
        <h2 className="section-title">Sobre Nosotros</h2>

        <div className="about-images">
          <div className="image-item">
            <img src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&h=600&fit=crop" alt="Ganado" />
          </div>
          <div className="image-item">
            <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop" alt="Agricultura" />
          </div>
          <div className="image-item">
            <img src="https://images.unsplash.com/photo-1581888227599-779811939961?w=800&h=600&fit=crop" alt="Veterinaria" />
          </div>
        </div>

        <div className="about-content">
          <div className="about-card">
            <h3>Nuestra Historia</h3>
            <p>
              Agroindustriales Cuatpa S.A. de C.V. inició su actividad empresarial el 13 de mayo del 2024
              en la ciudad de Oaxaca, consolidándose en base a la experiencia de cada uno de sus integrantes.
            </p>
            <p>
              Fundada por Víctor de Jesús López Cortés, quien funge como Administrador Único, nuestra empresa
              nace con el compromiso de brindar soluciones integrales al sector agroindustrial.
            </p>
          </div>

          <div className="about-card">
            <h3>Nuestro Compromiso</h3>
            <p>
              Somos conscientes de la responsabilidad institucional que tenemos frente a nuestros clientes,
              ofreciendo calidad y excelencia en nuestros productos y servicios.
            </p>
            <p>
              Nos especializamos en comercio de medicamentos veterinarios, alimentos para animales, cría y
              engorda de cerdos y pollos, servicios veterinarios, fertilizantes, plaguicidas, y comercio de
              carnes rojas y aves de corral.
            </p>
          </div>
        </div>

        <div className="about-info">
          <div className="info-item">
            <strong>RFC:</strong> ACU240513357
          </div>
          <div className="info-item">
            <strong>Ubicación:</strong> Carretera a Zaachila 1, Santa Cruz Xoxocotlán, Oaxaca
          </div>
          <div className="info-item">
            <strong>Fundación:</strong> 13 de Mayo, 2024
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
