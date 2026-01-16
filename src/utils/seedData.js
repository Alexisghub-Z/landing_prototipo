// Datos de ejemplo para demostración multi-empresa
export const seedDemoData = () => {
  const mensajesEjemplo = [
    // Agroindustriales Cuatpa
    {
      id: Date.now() - 1000000,
      empresa: 'Agroindustriales Cuatpa',
      numeroCliente: 'AC-001',
      nombre: 'Juan Pérez García',
      email: 'juan.perez@gmail.com',
      telefono: '951 123 4567',
      tipoSolicitud: 'cotizacion',
      mensaje: 'Solicito cotización para 500 kg de alimento para cerdos y 200 kg de suplemento vitamínico. Necesito entrega en Oaxaca centro.',
      departamento: 'Ventas',
      estado: 'pendiente',
      fecha: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      archivos: []
    },
    {
      id: Date.now() - 900000,
      empresa: 'Agroindustriales Cuatpa',
      numeroCliente: 'AC-045',
      nombre: 'María López Hernández',
      email: 'maria.lopez@rancho.com',
      telefono: '951 234 5678',
      tipoSolicitud: 'factura',
      mensaje: 'Necesito que me envíen la factura del pedido de la semana pasada. Orden #1234.',
      departamento: 'Facturación',
      estado: 'completado',
      fecha: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      archivos: []
    },

    // Constructora del Sur
    {
      id: Date.now() - 800000,
      empresa: 'Constructora del Sur',
      numeroCliente: 'CS-078',
      nombre: 'Roberto Sánchez Díaz',
      email: 'rsanchez@constructora.com',
      telefono: '951 345 6789',
      tipoSolicitud: 'cotizacion',
      mensaje: 'Requiero cotización para materiales de construcción: 100 bultos de cemento, 50 varillas de acero 3/8 y 20 metros cúbicos de arena.',
      departamento: 'Ventas',
      estado: 'en-proceso',
      fecha: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      archivos: []
    },
    {
      id: Date.now() - 700000,
      empresa: 'Constructora del Sur',
      numeroCliente: '',
      nombre: 'Ana María Torres',
      email: 'atorres@obra.mx',
      telefono: '951 456 7890',
      tipoSolicitud: 'bancos',
      mensaje: 'Necesito información sobre las cuentas bancarias para realizar transferencia del anticipo del proyecto Residencial Las Palmas.',
      departamento: 'Finanzas',
      estado: 'pendiente',
      fecha: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      archivos: []
    },

    // TechSolutions México
    {
      id: Date.now() - 600000,
      empresa: 'TechSolutions México',
      numeroCliente: 'TS-2024-156',
      nombre: 'Carlos Ramírez Vega',
      email: 'cramireaz@techsol.mx',
      telefono: '55 1234 5678',
      tipoSolicitud: 'cotizacion',
      mensaje: 'Solicito cotización para desarrollo de sistema web personalizado. Incluye módulos de inventario, ventas y reportes. Plazo de entrega 3 meses.',
      departamento: 'Ventas',
      estado: 'en-proceso',
      fecha: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      archivos: []
    },
    {
      id: Date.now() - 500000,
      empresa: 'TechSolutions México',
      numeroCliente: 'TS-2024-089',
      nombre: 'Laura Martínez Cruz',
      email: 'lmartinez@empresa.com',
      telefono: '55 2345 6789',
      tipoSolicitud: 'general',
      mensaje: 'Tengo problemas con el sistema CRM que instalaron. No puedo acceder al módulo de reportes. ¿Pueden revisar?',
      departamento: 'General',
      estado: 'completado',
      fecha: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      archivos: []
    },

    // Distribuidora La Esperanza
    {
      id: Date.now() - 400000,
      empresa: 'Distribuidora La Esperanza',
      numeroCliente: 'DLE-334',
      nombre: 'Francisco Gómez Ruiz',
      email: 'fgomez@esperanza.com',
      telefono: '951 567 8901',
      tipoSolicitud: 'factura',
      mensaje: 'Solicito factura electrónica del pedido #5678. RFC: DLE850312ABC. Razón social: Distribuidora La Esperanza S.A. de C.V.',
      departamento: 'Facturación',
      estado: 'en-proceso',
      fecha: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      archivos: []
    },
    {
      id: Date.now() - 300000,
      empresa: 'Distribuidora La Esperanza',
      numeroCliente: 'DLE-445',
      nombre: 'Patricia Morales Soto',
      email: 'pmorales@distribuidora.mx',
      telefono: '951 678 9012',
      tipoSolicitud: 'cotizacion',
      mensaje: 'Requiero cotización para abarrotes: 100 cajas de aceite comestible, 50 cajas de arroz de 10kg, 30 cajas de frijol.',
      departamento: 'Ventas',
      estado: 'pendiente',
      fecha: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      archivos: []
    },

    // Servicios Médicos Integral
    {
      id: Date.now() - 200000,
      empresa: 'Servicios Médicos Integral',
      numeroCliente: 'SMI-567',
      nombre: 'Dr. Miguel Ángel Flores',
      email: 'mflores@medico.com',
      telefono: '951 789 0123',
      tipoSolicitud: 'cotizacion',
      mensaje: 'Necesito cotización para equipo médico: 2 camillas hospitalarias, 1 monitor de signos vitales, instrumental quirúrgico básico.',
      departamento: 'Ventas',
      estado: 'pendiente',
      fecha: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      archivos: []
    },
    {
      id: Date.now() - 100000,
      empresa: 'Servicios Médicos Integral',
      numeroCliente: '',
      nombre: 'Dra. Carmen Rodríguez',
      email: 'crodriguez@clinica.mx',
      telefono: '951 890 1234',
      tipoSolicitud: 'bancos',
      mensaje: 'Solicito información de cuentas bancarias para pago de equipo médico pedido el mes pasado.',
      departamento: 'Finanzas',
      estado: 'completado',
      fecha: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
      archivos: []
    }
  ];

  // Guardar en localStorage
  localStorage.setItem('mensajes', JSON.stringify(mensajesEjemplo.reverse()));
  return mensajesEjemplo;
};

// Función para limpiar datos
export const clearDemoData = () => {
  localStorage.removeItem('mensajes');
};
