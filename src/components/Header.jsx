import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>AGROINDUSTRIALES CUATPA</h1>
          <p className="logo-subtitle">S.A. de C.V.</p>
        </div>
        <nav className="nav">
          <a href="#inicio">Inicio</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#servicios">Servicios</a>
          <a href="#valores">Valores</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
