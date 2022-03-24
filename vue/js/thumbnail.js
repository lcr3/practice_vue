Vue.createApp({
  data: function() {
    return {
      thumbnails: [
          {
            id: 1,
            src: "https://placehold.jp/300x300.png"
          },
          {
            id: 2,
            src: "https://placehold.jp/3d4070/ffffff/300x300.png"
          },
          {
            id: 3,
            src: "https://placehold.jp/b32020/ffffff/300x300.png"
          }
      ],
      selectedThumbnailId: undefined, // 選択したサムネイルID
      isVisible: false, // 表示状態
      thumbnailHeight: 0,
      isThumbnailLoaded: false // サムネイルの読み込みフラグ
    }
  },
  methods: {
    // モーダル表示
    openModal: function(thumb) {
      console.log(thumb)
      this.isVisible = true
      this.selectedThumbnailId = thumb.id
    },
    // 画像の読み込み完了時
    onLoad: function(event) {
      console.log('onLoad')
      this.thumbnailHeight =
        event.target.naturalHeight > 300 ? 300 :event.target.naturalHeight
        this.isThumbnailLoaded = false
    },
  },
  watch: {
    // サムネイルが選択(変更)されたらサムネイルの読み込み状態フラグを変更する
    selectedThumbnailId: function() {
      console.log('せれくとされた')
      this.isThumbnailLoaded = false
    }
  },
  computed: {
    currentThumbnail: function() {
      const self = this
      return _.find(self.thumbnails, function(thumb) {
        return thumb.id === self.selectedThumbnailId
      })
    },
    // サムネイルをラップしている要素の高さ
    containerStyle: function() {
      return {
        height: this.thumbnailHeight + "px"
      }
    }    
  },

}).mount("#app")