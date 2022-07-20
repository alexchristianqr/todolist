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
}

export default mutations
