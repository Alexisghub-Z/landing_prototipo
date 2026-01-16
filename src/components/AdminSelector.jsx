import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './AdminSelector.css';

function AdminSelector() {
  const navigate = useNavigate();

  const departamentos = [
    {
      id: 'ventas',
      nombre: 'Ventas',
      descripcion: 'Gestiona cotizaciones y solicitudes de venta',
      icono: '💼',
      color: '#27ae60',
      ruta: '/admin/ventas'
    },
    {
      id: 'facturacion',
      nombre: 'Facturación',
      descripcion: 'Administra solicitudes de facturación',
      icono: '📄',
      color: '#e67e22',
      ruta: '/admin/facturacion'
    },
    {
      id: 'finanzas',
      nombre: 'Finanzas',
      descripcion: 'Gestiona información bancaria y pagos',
      icono: '💰',
      color: '#9b59b6',
      ruta: '/admin/finanzas'
    },
    {
      id: 'general',
      nombre: 'Administrador General',
      descripcion: 'Acceso completo a todos los departamentos',
      icono: '⚙️',
      color: '#3498db',
      ruta: '/admin/general'
    }
  ];

  return (
    <div className="admin-selector">
      <div className="selector-container">
        <div className="selector-header">
          <h1>🏢 Panel de Administración</h1>
          <p className="selector-subtitle">Selecciona tu departamento para acceder</p>
        </div>

        <div className="departamentos-grid">
          {departamentos.map(dept => (
            <div
              key={dept.id}
              className="departamento-card"
              onClick={() => navigate(dept.ruta)}
              style={{ borderColor: dept.color }}
            >
              <div className="dept-icon" style={{ backgroundColor: dept.color }}>
                {dept.icono}
              </div>
              <h2>{dept.nombre}</h2>
              <p>{dept.descripcion}</p>
              <button
                className="btn-acceder"
                style={{ backgroundColor: dept.color }}
              >
                Acceder →
              </button>
            </div>
          ))}
        </div>

        <div className="selector-footer">
          <Link to="/" className="btn-volver-landing">
            ← Volver al sitio web
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminSelector;
