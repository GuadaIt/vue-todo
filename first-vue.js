Vue.component('todo-list', {
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  template: `
  <section>
   <div class="form">
     <form @submit.prevent="onSubmit">
       <input type="text" v-model="newTodo">
       <input type="submit" value="+">
     </form>
   </div>

   <ul>
     <div v-for="(todo, index) in todos" class="li-container"> 
       <li :class="{isDone: todo.completed}">{{ todo.name }}</li>
       <div class="btns-container">
         <button v-if="todo.completed" @click="mark(index)">&#10004;</button>
         <button v-if="!todo.completed" @click="mark(index)">&#10004;</button>
         <button @click="deleteTask(index)">&#10006;</button>
       </div>
     </div>
   </ul>

  </section>
  `,
  data() {
    return {
      newTodo: null,
    }
  },
  methods: {
    onSubmit() {
      if (this.newTodo) {
        let todo = {
          name: this.newTodo,
          id: this.todos.length,
          completed: false
        }
        this.$emit('add-todo', todo)
        this.newTodo = null
      }
    },
    mark(index) {
      this.$emit('mark', index)
    },
    deleteTask(index) {
      this.$emit('delete', index)
    }
  }
})

const app = new Vue({
  el: '#app',
  data: {
    todos: []
  },
  methods: {
    addItem(todo) {
      this.todos.push(todo);
    },
    removeItem(index) {
      this.todos.splice(index, 1)
    },
    markDoneUndone(index) {
      this.todos[index].completed = !this.todos[index].completed
    }
  }
})