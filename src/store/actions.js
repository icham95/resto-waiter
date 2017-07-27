import * as mutation from './mutation-types.js'

export default {
  changeLogged (context, param) {
    context.commit(mutation.CHANGE_LOGGED, param)
  },
  ftoggleMenuServicing (context, param) {
    context.commit(mutation.FTOGGLE_MENU_SERVICING, param)
  },
  faddOrders (context, param) {
    context.commit(mutation.FADD_ORDERS, param)
  },
  faddTable (context, param) {
    context.commit(mutation.FADD_TABLE, param)
  }
}
