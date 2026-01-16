import './Mission.css';

function Mission() {
  const valores = [
    'Calidad',
    'Integridad',
    'Trabajo en equipo',
    'Proactividad',
    'Excelencia en el servicio',
    'Protección al medio ambiental y social',
    'Responsabilidad'
  ];

  return (
    <section id="valores" className="mission">
      <div className="container">
        <div className="mission-grid">
          <div className="mission-card vision-card">
            <h2>Visión</h2>
            <p>
              Ser una empresa administrativa de referencia a nivel nacional, líder y reconocida en la
              prestación de soluciones orientadas al bienestar de los ciudadanos, por la calidad de sus
              productos y servicios ofertados al sector de la industria ganadera y agropecuaria.
            </p>
            <p>
              Creando un modelo de sostenibilidad ambiental y social, una empresa diversificada e integrada,
              comprometida con sus empleados y clientes, admirada por su capacidad de crear valor y de
              innovar para nuevas necesidades sociales.
            </p>
          </div>

          <div className="mission-card mision-card">
            <h2>Misión</h2>
            <p>
              La creación de valor para la sociedad proporcionando la gestión y servicios necesarios para
              el comercio de artículos sustentables que contribuyan de un modo eficiente.
            </p>
            <p>
              Brindando un servicio de calidad, asesoría y consultoría especializada en la industria
              ganadera y agropecuaria sostenible y seguro al bienestar de las personas y medio ambiente.
            </p>
          </div>
        </div>

        <div className="valores-section">
          <h2 className="section-title">Nuestros Valores</h2>
          <div className="valores-grid">
            {valores.map((valor, index) => (
              <div key={index} className="valor-item">
                <span className="valor-bullet">✓</span>
                <span>{valor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Mission;
