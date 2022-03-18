// Vueインスタンスを作成
Vue.createApp({
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
    createTodo: function () {
      if (!this.canCreateTodo) {
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
    },
    createCategory: function () {
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