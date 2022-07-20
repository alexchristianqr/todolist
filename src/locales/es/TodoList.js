export default {
  card: {
    header: {
      title: 'Lista de tareas',
      buttonSettings: 'Configuración',
      buttonCreate: 'Crear tarea',
    },
    body: {
      table: {
        labelPending: 'Pendiente',
        labelCompleted: 'Completado',
        labelNotifyDeleteTask: '¿Está seguro de eliminar el item?',
        fields: {
          title: 'Titulo',
          description: 'Descripción',
          expiredAt: 'Fecha expirado',
          updatedAt: 'Fecha actualizado',
          createdAt: 'Fecha creado',
          status: 'Estado',
          actions: 'Acciones',
        },
        actions: {
          buttonUpdate: 'Editar',
          buttonDelete: 'Eliminar',
        },
      },
    },
  },
  footer: {
    a: 'Hecho con',
    b: 'por',
    c: 'con amor',
  },
}
