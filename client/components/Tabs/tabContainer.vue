<script>
export default {
  props: {
    panes: { type: Array, required: true }
  },
  render () {
    const contents = this.panes.map(pane => {
      return pane.active ? pane.$slots.default : null
    })
    // const jsx = this.panes.map(pane => {
    //   return (
    //     <li> {pane} </li>
    //   )
    // })
    return (
      // { jsx }
      <div class="tab-container">
        { contents }
      </div>
    )
  }
}
</script>
