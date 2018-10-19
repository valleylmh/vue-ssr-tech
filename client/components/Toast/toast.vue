<template>
  <transition name="toast-pop">
    <div v-show="visible" class="toast">
      <span class="text" >{{ message }}</span>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      visible: true
    }
  },
  props: {
    message: {type: String, default: '奖励'}
  }

}
</script>

<style lang="stylus" scoped>
.toast
  position: fixed
  max-width: 80%
  padding: 10px 20px
  border-radius: 5px
  background: rgba(0, 0, 0, 0.85)
  color: #fff
  box-sizing: border-box
  text-align: center
  z-index: 1000
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)
  transition: opacity .3s linear
  .text
    font-size: 14px
    display: block
    text-align: center
    margin-bottom: .06rem
.toast-pop-enter, .toast-pop-leave-active
  opacity: 0

</style>

