<!-- 模板选择 -->
<template>
  <div id="panelTemplateSelect">
    <div
      class="only"
      v-for="(item, index) in new Array(2)"
      :key="index"
    >
      <el-image
        fit="cover"
        @click.native="templateClick(index)"
      ></el-image>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'panelTemplateSelect',
  data () {
    return {

    }
  },
  mounted () {
    this.activeTab = 0
  },
  methods: {
    ...mapActions([
      'setdWidgets',
    ]),
    // 模板选择事件
    templateClick (item) {
      let index = item
      switch (index) {
        case 0: {
          this.setdWidgets([])
          break
        }
        case 1: {
          let template = [
            { "name": "图片", "type": "w-image", "uuid": "18e4ed27e4d4", "width": 208, "height": 78, "left": 60, "top": 0, "radiusTopLeft": 0, "radiusTopRight": 0, "radiusBottomLeft": 0, "radiusBottomRight": 0, "opacity": 1, "parent": "-1", "imgUrl": "http://127.0.0.1:8080/static/template/1.png", "setting": [{ "label": "图片", "parentKey": "imgUrl", "value": true }], "record": { "width": 208, "height": 78, "minWidth": 10, "minHeight": 10, "dir": "all" } },
            { "name": "图片", "type": "w-image", "uuid": "a73a8fe4b841", "width": 800, "height": 130, "left": 0, "top": 670, "radiusTopLeft": 0, "radiusTopRight": 0, "radiusBottomLeft": 0, "radiusBottomRight": 0, "opacity": 1, "parent": "-1", "imgUrl": "http://127.0.0.1:8080/static/template/bottom.png", "setting": [{ "label": "图片", "parentKey": "imgUrl", "value": true }], "record": { "width": 800, "height": 130, "minWidth": 10, "minHeight": 10, "dir": "all" } },
            { "name": "图片", "type": "w-image", "uuid": "b99117c537e5", "width": 541, "height": 104, "left": 126, "top": 612, "radiusTopLeft": 0, "radiusTopRight": 0, "radiusBottomLeft": 0, "radiusBottomRight": 0, "opacity": 1, "parent": "-1", "imgUrl": "http://127.0.0.1:8080/static/template/bottomTop.png", "setting": [{ "label": "图片", "parentKey": "imgUrl", "value": true }], "record": { "width": 541, "height": 104, "minWidth": 10, "minHeight": 10, "dir": "all" } },
            { "name": "图片", "type": "w-image", "uuid": "771e5921eb70", "width": 256, "height": 240, "left": 544, "top": 560, "radiusTopLeft": 0, "radiusTopRight": 0, "radiusBottomLeft": 0, "radiusBottomRight": 0, "opacity": 1, "parent": "-1", "imgUrl": "http://127.0.0.1:8080/static/template/rightbottom.png", "setting": [{ "label": "图片", "parentKey": "imgUrl", "value": true }], "record": { "width": 256, "height": 240, "minWidth": 10, "minHeight": 10, "dir": "all" } },
            { "name": "图片", "type": "w-image", "uuid": "1064d4393dc6", "width": 100, "height": 49, "left": 115, "top": 13, "radiusTopLeft": 0, "radiusTopRight": 0, "radiusBottomLeft": 0, "radiusBottomRight": 0, "opacity": 1, "parent": "-1", "imgUrl": "http://127.0.0.1:8080/static/template/618.png", "setting": [{ "label": "图片", "parentKey": "imgUrl", "value": true }], "record": { "width": 100, "height": 49, "minWidth": 10, "minHeight": 10, "dir": "all" } },
            { "name": "文本", "type": "w-text", "uuid": "316af0a436dd", "editable": true, "width": 300, "left": 0, "top": 0, "lineHeight": 1.5, "letterSpacing": 0, "fontSize": 96, "fontClass": { "name": "默认字体", "value": "" }, "fontWeight": "bold", "fontStyle": "normal", "textDecoration": "none", "textColor": "rgba(0, 0, 0, 1)", "textAlign": "left", "text": "大标题", "opacity": 1, "backgroundColor": "", "parent": "-1", "setting": [{ "label": "文本内容", "parentKey": "text", "value": true }, { "label": "文本颜色", "parentKey": "textColor", "value": false }], "record": { "width": 300, "height": 144, "minWidth": 96, "minHeight": 144, "dir": "horizontal" } },
          ]
          this.setdWidgets(template)
          break
        }
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
#panelTemplateSelect {
  .only {
    width: 145px;
    height: 145px;
    padding: 10px;
    display: inline-block;

    .el-image {
      width: 130px;
      height: 130px;
      cursor: pointer;
    }
  }
}
</style>
