import Vue from 'vue' // eslint-disable-line
import toast from './toast.vue' // 用 import 导入是因为toast.vue里面js有export default 若是用require的话需要.default

const ToastConstructor = Vue.extend(toast)

const toastPool = []

const getAnInstance = () => {
  if (toastPool.length > 0) {
    let instance = toastPool[0]
    toastPool.splice(0, 1)
    return instance
  }
  return new ToastConstructor()
}

const returnAnInstance = instance => {
  if (instance) {
    toastPool.push(instance)
  }
}

const removeDOM = event => {
  if (event.target.parentNode) {
    document.body.removeChild(event.target)
  }
}

ToastConstructor.prototype.close = function () { // prototype定义函数不要用箭头函数，this指向会变成调用该函数的上下文作用域里面
  this.visible = false
  this.$el.addEventListener('transitionend', removeDOM)
  this.closed = true
  returnAnInstance(this)
}

const ToastFun = (options) => {
  let duration = options.duration || 1000
  let instance = getAnInstance().$mount()
  instance.closed = false
  clearTimeout(instance.timer)
  instance.message = typeof options === 'string' ? options : options.message
  document.body.appendChild(instance.$el)
  // Vue.nextTick(function () {
  instance.$el.removeEventListener('transitionend', removeDOM)
  instance.visible = true
  instance.timer = setTimeout(() => {
    instance.close()
  }, duration)
  // })
  return instance
}

export default ToastFun
