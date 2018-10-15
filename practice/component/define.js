import Vue from 'vue'

const data = {
  text: 0
}

const component = {
  props: {
    active: Boolean,
    propOne: String
    // onChange: Function
  },
  // template: '<div>{{text}}</div>',
  template: `
    <div>
     <input type="text" v-model="text"/>
     <span @click="handleChange">{{propOne}}</span>
     <span v-show="active">see me if active</span>
    </div>
  `,
  data () {
    // return {
    //   text: 123
    // }
    return data
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

// Vue.component('CompOne', component)

new Vue({
  el: '#root',
  data: {
    prop1: 'text1'
  },
  methods: {
    handleChange () {
      this.prop1 += 1
    }
  },
  template: `
    <div>
      <comp-one
        :active="true"
        prop-one="prop1"
        :on-change="handleChange"
      >
      </comp-one>
      <comp-one :active="true" prop-one="text1" @hange="handleChange"></comp-one>
      <comp-one :active="false" propOne="text2"></comp-one>
    </div>
  `,
  components: {
    CompOne: component
  }
})
