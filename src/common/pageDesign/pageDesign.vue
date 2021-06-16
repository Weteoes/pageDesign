<template>
  <div
    id="page-design"
    ref="page-design"
  >
    {{ 
      void (
        designWidth = dPage.width * dZoom / 100,
        designHeight = dPage.height * dZoom / 100
      )
    }}
    <div
      class="out-page"
      :style="{
        width: designWidth + 120 + 'px',
        height: designHeight + 120 + 'px',
        opacity: 1 - (dZoom < 100 ? dPage.tag : 0)
      }"
    >
      <div
        class="design-canvas"
        :data-type="dPage.type"
        :data-uuid="dPage.uuid"
        :id="pageDesignCanvasId"
        :style="{
          width: dPage.width + 'px',
          height: dPage.height + 'px',
          transform: 'scale(' + dZoom / 100 + ')',
          transformOrigin: (dZoom >= 100 ? 'center' : 'left') + ' top',
          backgroundColor: dPage.backgroundColor,
          backgroundImage: 'url(\'' + (dPage.backgroundImage ? dPage.backgroundImage : '') + '\')',
          opacity: dPage.opacity + (dZoom < 100 ? dPage.tag : 0)
        }"
      >
        <grid-size />

        <component
          :is="layer.type"
          class="layer"
          :class="{
            'layer-active': getIsActive(layer.uuid),
            'layer-hover': layer.uuid === dHoverUuid || dActiveElement.parent === layer.uuid
          }"
          :data-title="layer.type"
          v-for="layer in getlayers()"
          :key="layer.uuid"
          :params="layer"
          :parent="dPage"
          :data-type="layer.type"
          :data-uuid="layer.uuid"
        >
          <template v-if="layer.isContainer">
            <component
              :is="widget.type"
              class="layer"
              :class="{
              'layer-active': getIsActive(widget.uuid),
              'layer-no-hover': dActiveElement.uuid !== widget.parent && dActiveElement.parent !== widget.parent,
              'layer-hover': widget.uuid === dHoverUuid
            }"
              :data-title="widget.type"
              v-for="widget in getChilds(layer.uuid)"
              :key="widget.uuid"
              :params="widget"
              :parent="layer"
              :data-type="widget.type"
              :data-uuid="widget.uuid"
            />
          </template>
        </component>
        <ref-line v-if="dSelectWidgets.length === 0" />
        <size-control v-if="dSelectWidgets.length === 0" />
      </div>
      <div
        :style="{
          width: designWidth + 'px',
          height: designHeight + 'px',
        }"
        id="backgroundTransparent"
      >
        <template v-if="designWidth && designHeight">
          {{ 
              void (
                rowOnlyCount = parseInt(designWidth / 20) + 1,
                rowCount = parseInt(designHeight / 20) + 1
              )
            }}
          <div
            v-for="(i, index) in (new Array(rowCount))"
            :key="'backgroundTransparent_rows_' + index"
            class="rows"
          >
            <div
              v-for="(i, index) in (new Array(rowOnlyCount))"
              :key="'backgroundTransparent_rows_only_' + index"
              class="only"
            ></div>
          </div>
          <div></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

// 页面设计组件
const NAME = 'page-design'

import { move } from '@/mixins/move'
import templateSelect from './panel/templateSelect.vue'

export default {
  components: { templateSelect },
  name: NAME,
  props: ['pageDesignCanvasId'],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'dPage',
      'dZoom',
      'dScreen',
      'dWidgets',
      'dActiveElement',
      'dHoverUuid',
      'dSelectWidgets',
      'dAltDown'
    ])
  },
  mixins: [move],
  mounted () {
    this.getScreen()
    document.getElementById('page-design').addEventListener('mousedown', this.handleSelection, false)
  },
  beforeDestroy () {
  },
  methods: {
    ...mapActions([
      'updateScreen',
      'selectWidget',
      'deleteWidget'
    ]),
    getScreen () {
      let screen = this.$refs['page-design']
      this.updateScreen({
        width: screen.offsetWidth,
        height: screen.offsetHeight
      })
    },
    handleSelection (e) {
      if (e.which === 3) {
        return
      }
      let target = e.target
      let type = target.getAttribute('data-type')

      // if (type === 'w-text' && e.target.contentEditable === 'true') {
      //   return
      // }

      if (type) {
        let uuid = target.getAttribute('data-uuid')
        if (uuid !== '-1' && !this.dAltDown) {
          let widget = this.dWidgets.find(item => item.uuid === uuid)
          if (widget.parent !== '-1' && widget.parent !== this.dActiveElement.uuid && widget.parent !== this.dActiveElement.parent) {
            uuid = widget.parent
          }
        }

        // 设置选中元素
        this.selectWidget({
          uuid: uuid
        })

        if (uuid !== '-1') {
          this.initmovement(e) // 参见 mixins
        }
      } else {
        // 取消选中元素
        this.selectWidget({
          uuid: '-1'
        })
      }
    },
    getlayers () {
      return this.dWidgets.filter(
        item => item.parent === this.dPage.uuid
      )
    },
    getChilds (uuid) {
      return this.dWidgets.filter(
        item => item.parent === uuid
      )
    },
    getIsActive (uuid) {
      if (this.dSelectWidgets.length > 0) {
        let widget = this.dSelectWidgets.find(item => item.uuid === uuid)
        if (widget) {
          return true
        }
        return false
      } else {
        return uuid === this.dActiveElement.uuid
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/stylus/page-design.styl';

#page-design {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;

  .out-page {
    position: relative;
    margin: 0 auto;
    padding: 60px;
    z-index: 1;

    .design-canvas {
      position: relative;
      margin: 0 auto;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, 0.1);
    }

    #backgroundTransparent {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: absolute;
      top: 60px;
      z-index: -99999999;

      >.rows {
        height: 20px;
        overflow: hidden;
        white-space: nowrap;

        &:nth-child(2n) {
          >.only:nth-child(2n) {
            background: #ddd;
          }
        }

        &:nth-child(2n + 1) {
          >.only:nth-child(2n + 1) {
            background: #ddd;
          }
        }

        >.only {
          height: 20px;
          width: 20px;
          display: inline-block;
          vertical-align: top;
        }
      }
    }
  }
}
</style>