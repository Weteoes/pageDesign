import Api from '@/api'
import Vue from 'vue'

const _this = Vue.prototype
// 服务器返回的数据
let $SERVER = {}

const fun = {
  // SDK请求服务器
  // SDK_SERVER: 'http://192.168.1.12:8080/print',
  SDK_SERVER: 'https://tdd.taodianduo.com',
  // 路由标题
  APP_NAME: '淘店多',
  // URL 官网
  URL_WEBSITE: 'https://tdd.taodianduo.com',
  // URL 产品续费
  URL_PRODUCT_RENEWAL: 'https://fuwu.taobao.com/ser/detail.htm?service_code=FW_GOODS-1837988',
  // 服务器返回的数据
  $SERVER () {
    return new Promise((resolve, reject) => {
      // 统一 - 错误
      const error = () => {
        reject()
      }
      let server = $SERVER
      if (Object.keys(server).length === 0) {
        Loading.readyServer()
          .then(() => {
            resolve($SERVER)
          })
          .catch(error)
        return
      }
      resolve(server)
    })
  },
}

const Loading = {
  install: function (Vue) {
    Vue.prototype.$env = fun
  },
  // 初始化服务器变量
  readyServer () {
    return new Promise((resolve, reject) => {
      // 统一 - 错误
      const error = (e) => {
        this.log({ type: 'error', msg: ['获取变量失败', e] })
        reject()
      }
      Api.GlobalVariableRequest({
        user_id: _this.$userInfo.getUserId(),
        company_id: _this.$userInfo.getCompanyId(),
      })
        .then(res => {
          if (!res.isSuccess) {
            error(res)
            return
          }
          $SERVER = res
          resolve()
        })
        .catch(error)
    })
  },
  // 统一 - 输出
  log ({ type = 'debug', msg }) {
    let title = 'env'
    _this.$basis.log({ title, type, msg: msg })
  },
}

export default Loading