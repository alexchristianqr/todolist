const actions = {
  async 'Task.createTask'(context, { self }) {
    // console.log('jajaj',self.modalParams)
    return context.commit('addTask', self.modalParams)
  },
}

export default actions
