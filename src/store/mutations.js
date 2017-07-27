import * as mutations from './mutation-types'

import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)

export default {
  [mutations.SOCKET_LOGINWAITERFEEDBACK] (state, data) {
    if (data.success === false) {
      state.logged = 'rejected'
    } else {
      data.logged = true
      Vue.localStorage.set('dataUserLevelWaiter', data)
      state.logged = true
    }
    state.loginWaiterFeedback = data
  },
  [mutations.CHANGE_LOGGED] (state, data) {
    state.logged = data
  },
  [mutations.SOCKET_GETDATATABLESWAITERFEEDBACK] (state, data) {
    state.tables = data.body
  },
  [mutations.SOCKET_GETDATAFOODSWAITERFEEDBACK] (state, data) {
    for (let key in data.body) {
      data.body[key].jumlah = 0
    }
    state.foods = data.body
  },
  [mutations.FTOGGLE_MENU_SERVICING] (state, data) {
    state.toggleMenuServicing = data
  },
  [mutations.FADD_ORDERS] (state, data) {
    state.orders = data
  },
  [mutations.FADD_TABLE] (state, data) {
    state.orderTable = data
  }
}
