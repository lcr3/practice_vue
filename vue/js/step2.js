// Vueインスタンスを作成
Vue.createApp({
  // ここにアプリケーションの機能を定義していく
  data: function() {
    return {
      message: 'ToDoアプリケーション',
    }
  }
}).mount('#app')