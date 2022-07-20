const actions = {
  async 'Task.createTask'(context, { self }) {
    context.commit('addTask', self.modalParams)
    self.$toast.open(`Task created`)
  },
  async 'Task.updateTask'(context, { self }) {
    context.commit('updateTask', self.modalParams)
    self.$toast.open(`Task updated`)
  },
  async 'Task.removeTask'(context, { self }) {
    context.commit('removeTask', self.modalParams)
    self.$toast.default(`Task deleted`, {})
  },
}

export default actions
