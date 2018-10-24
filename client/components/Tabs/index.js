
import tabs from './tabs.vue'
import tab from './tab.vue'

export default (vue) => {
  vue.component(tabs.name, tabs)
  vue.component(tab.name, tab)
}
