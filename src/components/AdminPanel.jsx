import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminPanel.css';
import { seedDemoData, clearDemoData } from '../utils/seedData';

function AdminPanel() {
  const [mensajes, setMensajes] = useState([]);
  const [filtroEmpresa, setFiltroEmpresa] = useState('todas');
  const [filtroDepartamento, setFiltroDepartamento] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);
  const [textoRespuesta, setTextoRespuesta] = useState('');

  useEffect(() => {
    cargarMensajes();
  }, []);

  const cargarMensajes = () => {
    const mensajesGuardados = JSON.parse(localStorage.getItem('mensajes') || '[]');
    setMensajes(mensajesGuardados.reverse());
  };

  const eliminarMensaje = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este mensaje?')) {
      const nuevosMensajes = mensajes.filter(m => m.id !== id);
      localStorage.setItem('mensajes', JSON.stringify(nuevosMensajes.reverse()));
      setMensajes(nuevosMensajes);
      setMensajeSeleccionado(null);
    }
  };

  const cambiarEstado = (id, nuevoEstado) => {
    const mensajesActualizados = mensajes.map(m =>
      m.id === id ? { ...m, estado: nuevoEstado } : m
    );
    localStorage.setItem('mensajes', JSON.stringify(mensajesActualizados.reverse()));
    setMensajes(mensajesActualizados);
    if (mensajeSeleccionado?.id === id) {
      setMensajeSeleccionado({ ...mensajeSeleccionado, estado: nuevoEstado });
    }
  };

  const cambiarDepartamento = (id, nuevoDepartamento) => {
    const mensajesActualizados = mensajes.map(m =>
      m.id === id ? { ...m, departamento: nuevoDepartamento } : m
    );
    localStorage.setItem('mensajes', JSON.stringify(mensajesActualizados.reverse()));
    setMensajes(mensajesActualizados);
    if (mensajeSeleccionado?.id === id) {
      setMensajeSeleccionado({ ...mensajeSeleccionado, departamento: nuevoDepartamento });
    }
  };

  const enviarRespuesta = (id) => {
    if (!textoRespuesta.trim()) {
      alert('Por favor escribe una respuesta');
      return;
    }

    const nuevaRespuesta = {
      texto: textoRespuesta,
      fecha: new Date().toISOString(),
      autor: 'Admin'
    };

    const mensajesActualizados = mensajes.map(m => {
      if (m.id === id) {
        const respuestas = m.respuestas || [];
        return { ...m, respuestas: [...respuestas, nuevaRespuesta] };
      }
      return m;
    });

    localStorage.setItem('mensajes', JSON.stringify(mensajesActualizados.reverse()));
    setMensajes(mensajesActualizados);

    if (mensajeSeleccionado?.id === id) {
      const respuestas = mensajeSeleccionado.respuestas || [];
      setMensajeSeleccionado({
        ...mensajeSeleccionado,
        respuestas: [...respuestas, nuevaRespuesta]
      });
    }

    setTextoRespuesta('');
  };

  const mensajesFiltrados = mensajes.filter(mensaje => {
    const cumpleEmpresa = filtroEmpresa === 'todas' || mensaje.empresa === filtroEmpresa;
    const cumpleDepartamento = filtroDepartamento === 'todos' || mensaje.departamento === filtroDepartamento;
    const cumpleEstado = filtroEstado === 'todos' || mensaje.estado === filtroEstado;
    const cumpleBusqueda =
      mensaje.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      mensaje.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      mensaje.mensaje.toLowerCase().includes(busqueda.toLowerCase()) ||
      (mensaje.numeroCliente && mensaje.numeroCliente.toLowerCase().includes(busqueda.toLowerCase()));
    return cumpleEmpresa && cumpleDepartamento && cumpleEstado && cumpleBusqueda;
  });

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleString('es-MX', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const obtenerEmpresas = () => {
    const empresas = [...new Set(mensajes.map(m => m.empresa))];
    return empresas;
  };

  const contarPorEstado = (estado) => {
    return mensajes.filter(m => m.estado === estado).length;
  };

  const getTipoSolicitudLabel = (tipo) => {
    const labels = {
      'general': 'Consulta General',
      'cotizacion': 'Cotización',
      'factura': 'Facturación',
      'bancos': 'Bancos'
    };
    return labels[tipo] || tipo;
  };

  const descargarArchivo = (archivo) => {
    const link = document.createElement('a');
    link.href = archivo.data;
    link.download = archivo.nombre;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      'pendiente': 'badge-pendiente',
      'en-proceso': 'badge-proceso',
      'completado': 'badge-completado'
    };
    return badges[estado] || 'badge-pendiente';
  };

  const cargarDatosDemo = () => {
    if (window.confirm('¿Cargar datos de ejemplo de múltiples empresas? (Esto reemplazará los datos actuales)')) {
      seedDemoData();
      cargarMensajes();
    }
  };

  const limpiarDatos = () => {
    if (window.confirm('¿Estás seguro de eliminar todos los mensajes?')) {
      clearDemoData();
      setMensajes([]);
      setMensajeSeleccionado(null);
    }
  };

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Sistema de Gestión</h2>
          <p className="sidebar-subtitle">Panel Administrativo</p>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3>Menú</h3>
            <a href="#" className="nav-item active">
              <span className="nav-icon">📊</span>
              <span>Solicitudes</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">📈</span>
              <span>Reportes</span>
            </a>
            <a href="#" className="nav-item">
              <span className="nav-icon">⚙️</span>
              <span>Configuración</span>
            </a>
          </div>

          <div className="nav-section">
            <h3>Estadísticas</h3>
            <div className="stat-item">
              <span className="stat-label">Pendientes</span>
              <span className="stat-value pendiente">{contarPorEstado('pendiente')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">En Proceso</span>
              <span className="stat-value proceso">{contarPorEstado('en-proceso')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Completados</span>
              <span className="stat-value completado">{contarPorEstado('completado')}</span>
            </div>
          </div>
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="btn-volver-sidebar">
            ← Volver al sitio
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          <div>
            <h1>Gestión de Solicitudes</h1>
            <p className="header-subtitle">Administra y organiza todas las solicitudes del sistema</p>
          </div>
          <div className="header-actions">
            <button onClick={cargarDatosDemo} className="btn-demo" title="Cargar datos demo">
              📊 Demo
            </button>
            <button onClick={limpiarDatos} className="btn-clear" title="Limpiar todo">
              🗑️ Limpiar
            </button>
            <button onClick={cargarMensajes} className="btn-icon" title="Actualizar">
              🔄
            </button>
          </div>
        </header>

        {/* Filters Bar */}
        <div className="filters-bar">
          <div className="filters-group">
            <select
              value={filtroEmpresa}
              onChange={(e) => setFiltroEmpresa(e.target.value)}
              className="filter-select"
            >
              <option value="todas">Todas las empresas</option>
              {obtenerEmpresas().map(empresa => (
                <option key={empresa} value={empresa}>{empresa}</option>
              ))}
            </select>

            <select
              value={filtroDepartamento}
              onChange={(e) => setFiltroDepartamento(e.target.value)}
              className="filter-select"
            >
              <option value="todos">Todos los departamentos</option>
              <option value="Ventas">Ventas</option>
              <option value="Facturación">Facturación</option>
              <option value="Finanzas">Finanzas</option>
              <option value="General">General</option>
            </select>

            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="filter-select"
            >
              <option value="todos">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="en-proceso">En Proceso</option>
              <option value="completado">Completado</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Buscar por nombre, email, cliente..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-input-main"
          />
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Empresa</th>
                <th>Cliente</th>
                <th>N° Cliente</th>
                <th>Tipo</th>
                <th>Departamento</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mensajesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="9" className="empty-state">
                    No hay solicitudes para mostrar
                  </td>
                </tr>
              ) : (
                mensajesFiltrados.map((mensaje) => (
                  <tr
                    key={mensaje.id}
                    onClick={() => setMensajeSeleccionado(mensaje)}
                    className={mensajeSeleccionado?.id === mensaje.id ? 'selected' : ''}
                  >
                    <td className="id-cell">#{mensaje.id.toString().slice(-6)}</td>
                    <td>{mensaje.empresa}</td>
                    <td className="nombre-cell">{mensaje.nombre}</td>
                    <td>{mensaje.numeroCliente || '-'}</td>
                    <td>
                      <span className="tipo-badge">
                        {getTipoSolicitudLabel(mensaje.tipoSolicitud)}
                      </span>
                    </td>
                    <td>
                      <span className={`dept-badge dept-${mensaje.departamento.toLowerCase()}`}>
                        {mensaje.departamento}
                      </span>
                    </td>
                    <td>
                      <span className={`estado-badge ${getEstadoBadge(mensaje.estado)}`}>
                        {mensaje.estado === 'pendiente' ? 'Pendiente' :
                         mensaje.estado === 'en-proceso' ? 'En Proceso' : 'Completado'}
                      </span>
                    </td>
                    <td className="fecha-cell">{formatearFecha(mensaje.fecha)}</td>
                    <td className="actions-cell">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMensajeSeleccionado(mensaje);
                        }}
                        className="btn-action"
                        title="Ver detalles"
                      >
                        👁️
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          eliminarMensaje(mensaje.id);
                        }}
                        className="btn-action delete"
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Details Panel */}
        {mensajeSeleccionado && (
          <div className="details-panel">
            <div className="details-header">
              <h3>Detalles de la Solicitud</h3>
              <button
                onClick={() => setMensajeSeleccionado(null)}
                className="btn-close"
              >
                ✕
              </button>
            </div>

            <div className="details-content">
              <div className="detail-section">
                <h4>Información del Cliente</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Nombre:</label>
                    <span>{mensajeSeleccionado.nombre}</span>
                  </div>
                  <div className="detail-item">
                    <label>Email:</label>
                    <span>{mensajeSeleccionado.email}</span>
                  </div>
                  <div className="detail-item">
                    <label>Teléfono:</label>
                    <span>{mensajeSeleccionado.telefono || 'No proporcionado'}</span>
                  </div>
                  <div className="detail-item">
                    <label>N° Cliente:</label>
                    <span>{mensajeSeleccionado.numeroCliente || 'No proporcionado'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Empresa:</label>
                    <span>{mensajeSeleccionado.empresa}</span>
                  </div>
                  <div className="detail-item">
                    <label>Fecha:</label>
                    <span>{formatearFecha(mensajeSeleccionado.fecha)}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Mensaje</h4>
                <p className="mensaje-texto">{mensajeSeleccionado.mensaje}</p>
              </div>

              {mensajeSeleccionado.archivos && mensajeSeleccionado.archivos.length > 0 && (
                <div className="detail-section">
                  <h4>Archivos Adjuntos ({mensajeSeleccionado.archivos.length})</h4>
                  <div className="archivos-list">
                    {mensajeSeleccionado.archivos.map((archivo, idx) => (
                      <div key={idx} className="archivo-card">
                        <div className="archivo-info-detail">
                          <span className="archivo-icon">📎</span>
                          <div>
                            <div className="archivo-nombre">{archivo.nombre}</div>
                            <div className="archivo-size">{(archivo.tamaño / 1024).toFixed(2)} KB</div>
                          </div>
                        </div>
                        <button
                          onClick={() => descargarArchivo(archivo)}
                          className="btn-download"
                        >
                          ⬇ Descargar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="detail-section">
                <h4>Gestión</h4>
                <div className="gestion-grid">
                  <div className="gestion-item">
                    <label>Estado:</label>
                    <select
                      value={mensajeSeleccionado.estado}
                      onChange={(e) => cambiarEstado(mensajeSeleccionado.id, e.target.value)}
                      className="select-gestion"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en-proceso">En Proceso</option>
                      <option value="completado">Completado</option>
                    </select>
                  </div>
                  <div className="gestion-item">
                    <label>Departamento:</label>
                    <select
                      value={mensajeSeleccionado.departamento}
                      onChange={(e) => cambiarDepartamento(mensajeSeleccionado.id, e.target.value)}
                      className="select-gestion"
                    >
                      <option value="Ventas">Ventas</option>
                      <option value="Facturación">Facturación</option>
                      <option value="Finanzas">Finanzas</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Historial de Respuestas */}
              {mensajeSeleccionado.respuestas && mensajeSeleccionado.respuestas.length > 0 && (
                <div className="detail-section">
                  <h4>Historial de Respuestas ({mensajeSeleccionado.respuestas.length})</h4>
                  <div className="respuestas-list">
                    {mensajeSeleccionado.respuestas.map((respuesta, idx) => (
                      <div key={idx} className="respuesta-item">
                        <div className="respuesta-header">
                          <span className="respuesta-autor">👤 {respuesta.autor}</span>
                          <span className="respuesta-fecha">{formatearFecha(respuesta.fecha)}</span>
                        </div>
                        <p className="respuesta-texto">{respuesta.texto}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Nueva Respuesta */}
              <div className="detail-section">
                <h4>Responder al Cliente</h4>
                <div className="respuesta-form">
                  <textarea
                    value={textoRespuesta}
                    onChange={(e) => setTextoRespuesta(e.target.value)}
                    placeholder="Escribe tu respuesta aquí..."
                    rows="4"
                    className="respuesta-textarea"
                  />
                  <button
                    onClick={() => enviarRespuesta(mensajeSeleccionado.id)}
                    className="btn-enviar-respuesta"
                  >
                    📤 Enviar Respuesta
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminPanel;
