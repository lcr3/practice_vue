// Vueインスタンスを作成
Vue.createApp({
  // ここにアプリケーションの機能を定義していく
  data: function() {
    return {
      todoTitle: '',
      todoDescription: '',
      todoCategories: [],
      selectedCategory: '',
      todos:[],
      categories:[],
      hideDoneTodo: false,
      searchWord: '',
      order: 'desc',
      categoryName: '',
    },
    computed: {
      canCreateTodo: function() {
        return this.todoTitle !== ''
      },
      canCreateCategory: function() {
        return this.categoryName !== ''  && !this.existsCategory
      },
      existsCategory: function() {
        const categoryName = this.categoryName
        return this.categories.indexOf(categoryName) !== -1
      },
    },
    methods: {
      createTodo: function() {
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
      createCategory: function() {
        if (!this.canCreateCategory) {
          return
        }

        // カテゴリーを追加する処理
        this.categories.push(this.categoryName)
        // 初期化
        this.categoryName = ''
      },
    }
  }
}).mount('#app')