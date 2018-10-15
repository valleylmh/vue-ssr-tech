import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <div v-show="active">Text: {{ text }}</div>

      <div v-if="active">Text: {{ text }}</div>
      <div v-else>else content</div>

      <div v-html="html"></div>

      <div v-if="active">Text: {{ text }}</div>
      <div v-else-if="text === 0">Else Text: {{ text }}</div>

      <ul>
        <li v-for="(item, index) in arr" :key="item">{{item}}:{{index}}</li>
      </ul>

      <ul>
        <li v-for="(value, key, index) in obj">{{value}}:{{key}}:{{index}}</li>
      </ul>

      <div>
        <input type="checkbox" :value="1" v-model="arr" />
        <input type="checkbox" :value="2" v-model="arr" />
        <input type="checkbox" :value="3" v-model="arr" />
      </div>

      <div>
        <input type="radio" value="one" v-model="picked" />
        <input type="radio" value="two" v-model="picked" />
      </div>
    </div>
  `,
  data: {
    arr: [1, 2, 3],
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },
    picked: '',
    text: 0,
    active: false,
    html: '<span>this is html</span>'
  }
})
