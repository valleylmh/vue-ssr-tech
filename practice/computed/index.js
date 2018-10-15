import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <p>Name: {{name}}</p>
      <p>Name: {{getName()}}</p>
      <p>Number: {{number}}</p>
      <p>
        <input type="text" v-model="number"/>
      </p>
      <p>
        firstName: <input type="text" v-model="firstName"/>
      </p>
      <p>
        lastName: <input type="text" v-model="lastName"/>
      </p>
      <p>
        name: <input type="text" v-model="name"/>
      </p>
      <p>
        FullName: {{fullName}}
      </p>
      <p>
        Obj.a: <input type="text" v-model="obj.a"/>
      </p>
    </div>
  `,
  data: {
    firstName: 'Jocky',
    lastName: 'Lou',
    number: 0,
    fullName: '',
    obj: {
      a: '123'
    }
  },
  computed: {
    name: {
      get () {
        console.log('new name')
        return `${this.firstName} ${this.lastName}`
      },
      set (name) {
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  watch: {
    firstName: {
      handler (newName, oldName) {
        this.fullName = newName + this.firstName
      },
      immediate: true,
      deep: false
    },
    'obj.a': {
      handler () {
        console.log('obj.a changed')
      },
      immediate: true
      // deep: true
    }
  },
  mounted () {
    this.obj = {
      a: '456'
    }
  },
  methods: {
    getName () {
      console.log('getname invoked')
      return `${this.firstName} ${this.lastName}`
    }
  }
})
