import { useState } from 'react';
import './Contact.css';

function Contact() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
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
              <form className="contact-form">
                <h3>Envíanos un mensaje</h3>
                <input type="text" placeholder="Nombre completo" required />
                <input type="email" placeholder="Correo electrónico" required />
                <input type="tel" placeholder="Teléfono" />
                <textarea placeholder="Mensaje" rows="5" required></textarea>
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
