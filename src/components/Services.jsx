import './Services.css';

function Services() {
  const services = [
    {
      title: 'Medicamentos Veterinarios',
      description: 'Comercio al por mayor de medicamentos veterinarios y alimentos para animales de alta calidad.',
      icon: '💊',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop'
    },
    {
      title: 'Cría de Cerdos',
      description: 'Cría y engorda de cerdos en patios y lugares distintos a granjas con estándares de calidad.',
      icon: '🐷',
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop'
    },
    {
      title: 'Cría de Pollos',
      description: 'Cría y engorda de pollos para venta de su carne, garantizando productos frescos y de calidad.',
      icon: '🐔',
      image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop'
    },
    {
      title: 'Servicios Veterinarios',
      description: 'Servicios veterinarios profesionales para la ganadería prestados por el sector privado.',
      icon: '🩺',
      image: 'https://images.unsplash.com/photo-1581888227599-779811939961?w=400&h=300&fit=crop'
    },
    {
      title: 'Fertilizantes y Plaguicidas',
      description: 'Comercio al por mayor de fertilizantes, plaguicidas y semillas para siembra.',
      icon: '🌱',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop'
    },
    {
      title: 'Comercio de Carnes',
      description: 'Comercio al por mayor de carnes rojas, vísceras de pollo y otras aves de corral.',
      icon: '🥩',
      image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop'
    }
  ];

  return (
    <section id="servicios" className="services">
      <div className="container">
        <h2 className="section-title">Nuestros Servicios</h2>
        <p className="services-intro">
          Ofrecemos soluciones integrales para la industria ganadera y agropecuaria
        </p>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-image">
                <img src={service.image} alt={service.title} />
                <div className="service-icon-overlay">
                  <span className="service-emoji">{service.icon}</span>
                </div>
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
