const mutations = {
  // Set data tareas
  setTaskData(state, payload) {
    console.log('[Mutations.setTaskData]', payload)
    state.paginate.data = payload
  },
  // Agregar tarea
  addTask(state, payload) {
    console.log('[Mutations.addTask]', payload)
    state.paginate.data.unshift(payload)
  },
  // Actualizar tarea
  updateTask(state, payload) {
    console.log('[Mutations.updateTask]', payload)
    const task = state.paginate.data.find((item) => item.id == payload.id)
    if (!task) return
    for (let field in task) {
      task[field] = payload[field]
    }
  },
  // Eliminar tarea
  removeTask(state, payload) {
    console.log('[Mutations.removeTask]', payload)
    state.paginate.data = state.paginate.data.filter((item) => item.id != payload.id)
  },
  // Actualizar lista de tareas
  refreshList(state, payload) {
    console.log('[Mutations.refreshList]', payload)
    // Ordenar DESC
    return state.paginate.data.sort((x, y) => {
      if (parseInt(x.status) < parseInt(y.status)) {
        return 1
      }
      return -1
    })
    // state.paginate.data = state.paginate.data.sort((item) => item.id != payload.id)
  },
}

export default mutations
