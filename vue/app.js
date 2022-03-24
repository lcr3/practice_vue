// コンポーネント
const todoItem = {
  template: '#template-todo-item',
  props: {
    todo: {
      type: Object,
      required: true,
    },
    done: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    hasCategories: function() {
      console.log('hascategory')
      return this.todo.categories.length > 0
    },
  },
  methods: {
    onChangeTodo: function($event) {
      // 親にイベントを発火
      this.$emit('update:done', $event.target.checked)
    }
  }
}

// Vueインスタンスを作成
Vue.createApp({
  components: {  // コンポーネント
    'todo-item': todoItem,
  },
  data() { // プロパティ
    return {
      todoTitle: '',
      todoDescription: '',
      todoCategories: [],
      selectedCategory: '',
      todos: [],
      categories: [],
      hideDoneTodo: false,
      searchWord: '',
      order: 'desc',
      categoryName: '',
    }
  },
  computed: { // コンピューテッドプロパティ
    resultTodos: function() {
      const selectedCategory = this.selectedCategory
      const hideDoneTodo = this.hideDoneTodo
      const order = this.order
      const searchWord = this.searchWord
      return this.todos
      .filter(function(todo) {
        return (
          selectedCategory === '' || todo.categories.indexOf(selectedCategory) !== -1
        )
      })
      .filter(function(todo) {
        if (hideDoneTodo) {
          return !todo.done
        }
        return true
      })
      .filter(function(todo) {
        console.log(todo.length)
        return (
          todo.title.indexOf(searchWord) !== -1 || todo.description.indexOf(searchWord) !== -1
        )
      })
    },
    canCreateTodo: function () {
      return this.todoTitle !== ''
    },
    canCreateCategory: function () {
      return this.categoryName !== '' && !this.existsCategory
    },
    existsCategory: function () {
      const categoryName = this.categoryName
      return this.categories.indexOf(categoryName) !== -1
    },
    hasTodos: function() {
      return this.todos.length > 0
    }
  },
  watch: { // 監視
    todos: { // todosに変更があったとき、handlerが実行される
      handler: function (next) {
        window.localStorage.setItem('todos', JSON.stringify(next))
      },
      deep: true,
    },
  },
  methods: { // メソッドたち
    createTodo: function() {
      if (!this.canCreateTodo) {
        console.log("作成できませんでした")
        return
      }

      // Todoタスクを追加する処理
      this.todos.push({
        id: 'todo-' + Date.now(),
        title: this.todoTitle,
        description: this.todoDescription,
        categories: this.todoCategories,
        datetime: Date.now(),
        done: false,
      })

      // 初期化
      this.todoTitle = ''
      this.todoDescription = ''
      this.todoCategories = []
      console.log("作成成功" + this.todos.length)
    },
    createCategory: function() {
      if (!this.canCreateCategory) {
        return
      }
      // カテゴリーを追加する処理
      this.categories.push(this.categoryName)
      // 初期化
      this.categoryName = ''
    },
  },
  created() { // ライフサイクルの一つ インスタンスが作成されデータが初期化された痕
    // ローカルストレージに保存された値を取得
    // TODO: これクラス化して責務を分けたい
    const todos = window.localStorage.getItem('todos')
    const categories = window.localStorage.getItem('categories')

    if (todos) {
      this.todos = JSON.parse(todos)
    }
    if (categories) {
      this.categories = JSON.parse(categories)
      console.log(this.categories)
    }
  },
}).mount('#app')