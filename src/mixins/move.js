var move = {
  methods: {
    initmovement (e) {
      var target = this.$store.state.pageDesign.dActiveElement

      // 设置移动状态初始值
      this.$store.dispatch('initDMove', {
        startX: e.pageX,
        startY: e.pageY,
        originX: target.left,
        originY: target.top
      })

      // 绑定鼠标移动事件
      window.addEventListener('mousemove', this.handlemousemove, true)

      // 取消鼠标移动事件
      window.addEventListener('mouseup', this.handlemouseup, true)
    },

    handlemousemove (e) {
      e.stopPropagation()
      e.preventDefault()

      this.$store.dispatch('dMove', {
        x: e.pageX,
        y: e.pageY
      })
    },

    handlemouseup () {
      window.removeEventListener('mousemove', this.handlemousemove, true)
      window.removeEventListener('mouseup', this.handlemouseup, true)
      this.$store.dispatch('stopDMove')
    }
  }
}

export { move }
