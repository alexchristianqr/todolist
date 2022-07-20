const actions = {
  async 'Task.getTasks'(context, { self }) {
    let data = null

    // Actualizar DB
    if (self.existsStorage('dataTasks')) {
      data = self.getStorage('dataTasks')
      if (!data) return
      context.commit('setTaskData', data)
    } else {
      data = context.getters.tasks
      if (!data) return
      self.setStorage('dataTasks', data)
    }
  },
  async 'Task.createTask'(context, { self }) {
    context.commit('addTask', self.modalParams)

    // Actualizar DB
    const data = context.getters.tasks
    self.setStorage('dataTasks', data)

    // Toast
    self.$toast.open(`Task created`)
  },
  async 'Task.updateTask'(context, { self, noToast }) {
    context.commit('updateTask', self.modalParams)

    // Actualizar DB
    const data = context.getters.tasks
    if (!data) return
    self.setStorage('dataTasks', data)

    // Toast
    if (!noToast) self.$toast.open(`Task updated`)
  },
  async 'Task.removeTask'(context, { self }) {
    context.commit('removeTask', self.modalParams)
    self.$toast.open(`Task deleted`)
  },
}

export default actions
