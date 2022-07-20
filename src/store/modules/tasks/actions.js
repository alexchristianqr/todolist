const actions = {
  async 'Task.createTask'(context, { self }) {
    return context.commit('addTask', self.modalParams)
  },
  async 'Task.updateTask'(context, { self }) {
    return context.commit('updateTask', self.modalParams)
  },
  async 'Task.removeTask'(context, { self }) {
    // console.log('jajaj',self.modalParams)
    return context.commit('removeTask', self.modalParams)
  },
}

export default actions
