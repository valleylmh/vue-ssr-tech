import Vue from 'vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component)
let notificationPool = []
let seed = 1

const removeInstance = instance => {
  if (!instance) return
  let len = notificationPool.length
  let index = notificationPool.findIndex(inst => instance.id === inst.id)
  notificationPool.splice(index, 1)
  if (len <= 1) return
  const removeHeight = instance.vm.height
  for (let i = index; i < len - 1; i++) {
    notificationPool[i].verticalOffset = parseInt(notificationPool[i].vm.verticalOffset) - removeHeight - 16
  }
}

const notify = (options = {}) => {
  if (Vue.prototype.$isServer) return
  const {
    autoClose,
    ...rest
  } = options
  const instance = new NotificationConstructor({
    propsData: {
      ...rest
    },
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  })
  instance.id = `notification_${seed++}`
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true

  let verticalOffset = 0
  notificationPool.forEach(item => {
    verticalOffset += item.vm.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  notificationPool.push(instance) // 放入内存中
  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })
  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })
  return instance.vm
}

export default notify
