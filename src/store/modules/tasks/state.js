const state = {
  paginate: {
    data: [
      {
        id: 1,
        title: 'Tarea #1',
        description: 'Ejemplo descriptivo de mi tarea #1',
        createdAt: '2022-01-01 18:00:00',
        expiredAt: '2099-01-01 23:59:00',
        status: false,
      },
    ],
    from: null,
    perPage: null,
    to: null,
    total: null,
  },
}

export default state
