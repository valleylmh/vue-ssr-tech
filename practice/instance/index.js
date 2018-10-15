import Vue from 'vue'

const app = new Vue({
  el: '#root',
  template: `
    <div>{{text}}</div>
  `,
  data: {
    text: 0
  }
})

// app.$mount('#root')

setInterval(() => {
  // app.text += 1
  // app.$options.data.text += 1
  // app.$data.text += 1
}, 1000)

console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)

// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }

// console.log(app.$root === app)
// console.log(app.$children)
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// console.log(app.$refs)
// console.log(app.$isServer)
