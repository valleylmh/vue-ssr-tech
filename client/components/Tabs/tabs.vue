<script>
import TabContainer from './tabContainer.vue'
export default {
  name: 'Tabs',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      panes: []
    }
  },
  components: { TabContainer },
  render (createElement) {
    // h('div', {}, [h('h2', 'render is difficulty')])
    // return createElement('div',
    //   Array.apply(null, { length: 20 }).map(function () {
    //     return createElement('p', 'hi')
    //   })
    // )
    return (
      <div class="tabs">
        <ul class="tabs-header">
          {this.$slots.default}
        </ul>
        <tab-container class="container" panes={this.panes}></tab-container>
      </div>
    )
  },
  methods: {
    onChange (index) {
      this.$emit('change', index)
    }
  }
}
</script>

<style lang="stylus" scoped>
.tabs-header
  display flex
  list-style none
  margin 0
  padding 0
  border-bottom 2px solid #ededed
</style>


