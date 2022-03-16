// Vueインスタンスを作成
Vue.createApp({
  // ここにアプリケーションの機能を定義していく
  data: function() {
    return {
      todoTitle: '',
      todoDescription: '',
      todoCategories: [],
      hideDoneTodo: false,
      searchWord: '',
      order: 'desc',
    }
  }
}).mount('#app')