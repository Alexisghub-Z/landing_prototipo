import { useState } from 'react';
import './Contact.css';

function Contact() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState({
    numeroCliente: '',
    nombre: '',
    email: '',
    telefono: '',
    tipoSolicitud: 'general',
    mensaje: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertir archivos a base64
    const archivosBase64 = await Promise.all(
      selectedFiles.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              nombre: file.name,
              tamaño: file.size,
              tipo: file.type,
              data: reader.result
            });
          };
          reader.readAsDataURL(file);
        });
      })
    );

    // Crear objeto de mensaje con toda la información
    const mensaje = {
      id: Date.now(),
      ...formData,
      empresa: 'Agroindustriales Cuatpa', // Identificador de la empresa
      archivos: archivosBase64,
      fecha: new Date().toISOString(),
      departamento: getDepartamento(formData.tipoSolicitud),
      estado: 'pendiente'
    };

    // Guardar en localStorage
    const mensajesGuardados = JSON.parse(localStorage.getItem('mensajes') || '[]');
    mensajesGuardados.push(mensaje);
    localStorage.setItem('mensajes', JSON.stringify(mensajesGuardados));

    // Mostrar mensaje de éxito
    setShowSuccess(true);

    // Resetear formulario
    setFormData({
      numeroCliente: '',
      nombre: '',
      email: '',
      telefono: '',
      tipoSolicitud: 'general',
      mensaje: ''
    });
    setSelectedFiles([]);

    // Ocultar mensaje de éxito después de 3 segundos
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getDepartamento = (tipo) => {
    const departamentos = {
      'cotizacion': 'Ventas',
      'factura': 'Facturación',
      'bancos': 'Finanzas',
      'general': 'General'
    };
    return departamentos[tipo] || 'General';
  };

  return (
    <>
      <section id="contacto" className="contact">
        <div className="container">
          <h2 className="section-title">Contáctanos</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-item">
                <h3>Dirección</h3>
                <p>Carretera a Zaachila 1</p>
                <p>Santa Cruz Xoxocotlán, Oaxaca</p>
              </div>

              <div className="contact-item">
                <h3>Teléfono</h3>
                <p>(951) 951 2048 878</p>
              </div>

              <div className="contact-item">
                <h3>Correo Electrónico</h3>
                <p>agroindustrialescuatpa@gmail.com</p>
              </div>

              <div className="contact-item">
                <h3>Datos Bancarios</h3>
                <p><strong>BBVA:</strong></p>
                <p>Cuenta: 0446 1025 6011 2738 19</p>
                <p>CLABE: 0126 1070 1944 1968 48</p>
                <p className="mt-small"><strong>Santander:</strong></p>
                <p>Cuenta: 25601127381</p>
                <p>Sucursal: 7019</p>
                <p>Cuenta: 4419684</p>
              </div>
            </div>

            <div className="contact-form-wrapper">
              {showSuccess && (
                <div className="success-message">
                  ¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.
                </div>
              )}
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>Envíanos un mensaje</h3>

                <select
                  name="tipoSolicitud"
                  value={formData.tipoSolicitud}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="general">Consulta General</option>
                  <option value="cotizacion">Solicitud de Cotización</option>
                  <option value="factura">Facturación</option>
                  <option value="bancos">Información Bancaria</option>
                </select>

                <input
                  type="text"
                  name="numeroCliente"
                  placeholder="Número de cliente (opcional)"
                  value={formData.numeroCliente}
                  onChange={handleInputChange}
                />

                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre completo"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                />
                <textarea
                  name="mensaje"
                  placeholder="Mensaje"
                  rows="5"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  required
                ></textarea>
                <div className="file-upload">
                  <label htmlFor="file-input" className="file-label">
                    <span className="file-icon">📎</span>
                    <span className="file-text">
                      {selectedFiles.length > 0
                        ? `${selectedFiles.length} archivo(s) seleccionado(s)`
                        : 'Adjuntar archivos (opcional)'}
                    </span>
                  </label>
                  <input
                    type="file"
                    id="file-input"
                    multiple
                    onChange={handleFileChange}
                  />
                  {selectedFiles.length > 0 && (
                    <div className="selected-files">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="file-item">
                          <span className="file-name">{file.name}</span>
                          <span className="file-size">
                            ({(file.size / 1024).toFixed(2)} KB)
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>AGROINDUSTRIALES CUATPA</h3>
              <p>S.A. de C.V.</p>
              <p>RFC: ACU240513357</p>
            </div>

            <div className="footer-section">
              <h4>Enlaces Rápidos</h4>
              <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#nosotros">Nosotros</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#valores">Valores</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Contacto</h4>
              <p>agroindustrialescuatpa@gmail.com</p>
              <p>(951) 951 2048 878</p>
              <p>Santa Cruz Xoxocotlán, Oaxaca</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Agroindustriales Cuatpa S.A. de C.V. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Contact;
