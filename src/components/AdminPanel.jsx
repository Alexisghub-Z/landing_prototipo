import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminPanel.css';

function AdminPanel() {
  const [mensajes, setMensajes] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    cargarMensajes();
  }, []);

  const cargarMensajes = () => {
    const mensajesGuardados = JSON.parse(localStorage.getItem('mensajes') || '[]');
    setMensajes(mensajesGuardados.reverse()); // Más recientes primero
  };

  const eliminarMensaje = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este mensaje?')) {
      const nuevosMensajes = mensajes.filter(m => m.id !== id);
      localStorage.setItem('mensajes', JSON.stringify(nuevosMensajes.reverse()));
      setMensajes(nuevosMensajes);
    }
  };

  const cambiarEstado = (id, nuevoEstado) => {
    const mensajesActualizados = mensajes.map(m =>
      m.id === id ? { ...m, estado: nuevoEstado } : m
    );
    localStorage.setItem('mensajes', JSON.stringify(mensajesActualizados.reverse()));
    setMensajes(mensajesActualizados);
  };

  const cambiarDepartamento = (id, nuevoDepartamento) => {
    const mensajesActualizados = mensajes.map(m =>
      m.id === id ? { ...m, departamento: nuevoDepartamento } : m
    );
    localStorage.setItem('mensajes', JSON.stringify(mensajesActualizados.reverse()));
    setMensajes(mensajesActualizados);
  };

  const mensajesFiltrados = mensajes.filter(mensaje => {
    const cumpleFiltro = filtro === 'todos' || mensaje.departamento === filtro;
    const cumpleBusqueda = mensaje.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      mensaje.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      mensaje.mensaje.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleFiltro && cumpleBusqueda;
  });

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleString('es-MX');
  };

  const contarPorDepartamento = (depto) => {
    return mensajes.filter(m => m.departamento === depto).length;
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
    // Crear un enlace temporal para descargar el archivo
    const link = document.createElement('a');
    link.href = archivo.data;
    link.download = archivo.nombre;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Panel de Administración</h1>
          <Link to="/" className="btn-volver">← Volver al sitio</Link>
        </div>
      </div>

      <div className="admin-container">
        <div className="admin-stats">
          <div className="stat-card total">
            <h3>Total Mensajes</h3>
            <p className="stat-number">{mensajes.length}</p>
          </div>
          <div className="stat-card ventas">
            <h3>Ventas</h3>
            <p className="stat-number">{contarPorDepartamento('Ventas')}</p>
          </div>
          <div className="stat-card facturacion">
            <h3>Facturación</h3>
            <p className="stat-number">{contarPorDepartamento('Facturación')}</p>
          </div>
          <div className="stat-card finanzas">
            <h3>Finanzas</h3>
            <p className="stat-number">{contarPorDepartamento('Finanzas')}</p>
          </div>
          <div className="stat-card general">
            <h3>General</h3>
            <p className="stat-number">{contarPorDepartamento('General')}</p>
          </div>
        </div>

        <div className="admin-filters">
          <input
            type="text"
            placeholder="Buscar por nombre, email o mensaje..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-input"
          />

          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="filter-select"
          >
            <option value="todos">Todos los departamentos</option>
            <option value="Ventas">Ventas</option>
            <option value="Facturación">Facturación</option>
            <option value="Finanzas">Finanzas</option>
            <option value="General">General</option>
          </select>

          <button onClick={cargarMensajes} className="btn-refresh">
            🔄 Actualizar
          </button>
        </div>

        <div className="mensajes-lista">
          {mensajesFiltrados.length === 0 ? (
            <div className="no-mensajes">
              <p>No hay mensajes para mostrar</p>
            </div>
          ) : (
            mensajesFiltrados.map(mensaje => (
              <div key={mensaje.id} className={`mensaje-card ${mensaje.estado}`}>
                <div className="mensaje-header">
                  <div className="mensaje-info">
                    <div className="mensaje-titulo">
                      <h3>{mensaje.nombre}</h3>
                      {mensaje.numeroCliente && (
                        <span className="numero-cliente">Cliente: {mensaje.numeroCliente}</span>
                      )}
                    </div>
                    <span className="mensaje-tipo">{getTipoSolicitudLabel(mensaje.tipoSolicitud)}</span>
                    <span className={`badge-departamento ${mensaje.departamento.toLowerCase()}`}>
                      {mensaje.departamento}
                    </span>
                  </div>
                  <div className="mensaje-acciones">
                    <select
                      value={mensaje.estado}
                      onChange={(e) => cambiarEstado(mensaje.id, e.target.value)}
                      className="select-estado"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en-proceso">En Proceso</option>
                      <option value="completado">Completado</option>
                    </select>
                    <button
                      onClick={() => eliminarMensaje(mensaje.id)}
                      className="btn-eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="mensaje-detalles">
                  <p><strong>Email:</strong> {mensaje.email}</p>
                  <p><strong>Teléfono:</strong> {mensaje.telefono || 'No proporcionado'}</p>
                  <p><strong>Fecha:</strong> {formatearFecha(mensaje.fecha)}</p>
                </div>

                <div className="mensaje-contenido">
                  <p><strong>Mensaje:</strong></p>
                  <p>{mensaje.mensaje}</p>
                </div>

                {mensaje.archivos && mensaje.archivos.length > 0 && (
                  <div className="mensaje-archivos">
                    <p><strong>Archivos adjuntos:</strong></p>
                    <ul>
                      {mensaje.archivos.map((archivo, idx) => (
                        <li key={idx} className="archivo-item">
                          <span className="archivo-info">
                            📎 {archivo.nombre} ({(archivo.tamaño / 1024).toFixed(2)} KB)
                          </span>
                          <button
                            onClick={() => descargarArchivo(archivo)}
                            className="btn-descargar"
                            title="Descargar archivo"
                          >
                            ⬇ Descargar
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mensaje-footer">
                  <label>Reasignar a:</label>
                  <select
                    value={mensaje.departamento}
                    onChange={(e) => cambiarDepartamento(mensaje.id, e.target.value)}
                    className="select-departamento"
                  >
                    <option value="Ventas">Ventas</option>
                    <option value="Facturación">Facturación</option>
                    <option value="Finanzas">Finanzas</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
