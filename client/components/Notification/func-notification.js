import Notification from './notification.vue'

export default {
  extends: Notification,
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  mounted () {
    this.createTimer()
  },
  methods: {
    createTimer () {
      console.log(this.autoClose)
      this.timer = setTimeout(() => {
        this.visible = false
      }, this.autoClose)
    },
    clearTimer () {
      clearTimeout(this.timer)
    },
    afterEnter () {
      this.height = this.$el.offsetHeight
    }
  },
  data () {
    return {
      visible: false,
      verticalOffset: 20,
      height: 0,
      autoClose: 1000
    }
  }
}
