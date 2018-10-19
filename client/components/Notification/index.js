import Notification from './notification.vue'
import notify from './function.js'
export default vue => {
  vue.component(Notification.name, Notification)
  vue.$notify = vue.prototype.$notify = notify
}
