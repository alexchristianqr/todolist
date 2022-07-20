import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules,
  state: {
    sidebarShow: 'responsive',
    sidebarMinimize: false,
    avatar: null,
    alerts: [
      { label: 'error', content: null },
      { label: 'success', content: null },
      { label: 'warning', content: null },
      { label: 'info', content: null },
    ],
    loading: {
      table: false,
      button: false,
      input: false,
      skeleton: true,
      skeletonHeader: true,
    },
    socket: {
      status: true,
    },
    aside: {
      id: null,
      open: false,
    },
    theme: {
      mode: 'dark', // light
    },
  },
  mutations: {
    toggleSidebarDesktop(state) {
      const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile(state) {
      const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set(state, [variable, value]) {
      state[variable] = value
    },
    clearAlertNotification(state) {
      state.alerts[0].content = null
      state.alerts[1].content = null
      state.alerts[2].content = null
      state.alerts[3].content = null
    },
    setLoadingButton(state, payload) {
      state.loading.button = payload
    },
    setLoadingTable(state, payload) {
      state.loading.table = payload
    },
    setLoadingInput(state, payload) {
      state.loading.input = payload
    },
    setLoadingSkeleton(state, payload) {
      state.loading.skeleton = payload
    },
    setLoadingSkeletonHeader(state) {
      state.loading.skeletonHeader = true
      const tout = setTimeout(() => {
        state.loading.skeletonHeader = false
        clearTimeout(tout)
      }, 100)
    },
    setTheme(state, payload) {
      state.theme.mode = payload
    },
    setAside(state, payload) {
      state.aside.id = payload.id
      state.aside.open = payload.open
    },
    setAvatar(state, payload) {
      state.avatar = payload
    },
    setErrorLogin(state, e) {
      console.error('[Mutations.setErrorLogin]', { error: e })

      if (typeof e === 'object') {
        const status = e.response.status
        // 400 Bad request
        // 401 Unauthorized
        // 412 Precondition failed
        switch (status) {
          case 422: // Unprocessable entity
            state.alerts[0].content = e.response.data.errors
            break
          case 500: // Server error
            state.alerts[0].content = 'Internal server error'
            break
          default:
            state.alerts[0].content = e.response.data.message
            break
        }
      } else {
        state.alerts[0].content = e
      }
    },
    async setError(state, e) {
      console.error('[Mutations.setError]', { error: e })

      const modals = window.document.getElementsByClassName('modal')
      for (let i = 0; i < modals.length; i++) {
        modals[i].scrollTop = 0
      }

      if (typeof e.response === 'object') {
        const statusCode = e.response.status
        switch (statusCode) {
          case 401: // Unauthorized
            await this.dispatch('Auth/userUnauthorized')
            break
          case 402: // Require payment
            state.alerts[0].content = e.response.data.message
            break
          case 403: // Require Authorization
            state.alerts[0].content = e.response.data.message
            break
          case 422: // Unprocessable entity
            state.alerts[0].content = e.response.data.errors
            break
          case 500: // Server error
            state.alerts[0].content = 'Internal server error'
            break
          default:
            state.alerts[0].content = e.response.data.message
            break
        }
      } else if (e.message === 'Network Error') {
        state.alerts[0].content = e.message
      } else {
        state.alerts[0].content = e
      }
    },
    setSuccess(state, payload) {
      state.alerts[1].content = payload
    },
    setWarning(state, payload) {
      state.alerts[2].content = payload
    },
    setInfo(state, payload) {
      state.alerts[3].content = payload
    },
    setValidateSocket(state, payload) {
      state.socket.status = payload
    },
  },
  getters: {
    loadingTable: (state) => state.loading.table,
    loadingSkeleton: (state) => state.loading.skeleton,
    loadingSkeletonHeader: (state) => state.loading.skeletonHeader,
    loadingButton: (state) => state.loading.button,
    loadingInput: (state) => state.loading.input,
    getAside: (state) => state.aside,
    env: (state) => state.env.enviroment,
    alertNotification: (state) => {
      return state.alerts.find((item) => item.content != null)
    },
    userAvatar: (state) => state.avatar,
    validateSocket: (state) => state.socket.status,
  },
  actions: {
    resetVuex(context) {
      context.commit('setAuthUser', {
        access_token: null,
        session_id: null,
        exchange_rate: null,
        menus: null,
        routes: null,
        operationState: null,
        operationService: null,
        expires_at: null,
      })
    },
  },
})
