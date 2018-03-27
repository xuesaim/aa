import Vue from 'vue'
import App from './App'
//import Mint from 'mint-ui';
import '../node_modules/mint-ui/lib/style.css';
import './assets/less/public.less';
//import './assets/less/animate.css';
import "./assets/js/rem";
import utils from './assets/js/utils' //ajax
import VueRouter from 'vue-router'
import resource from 'vue-resource'
import VueLazyload from 'vue-lazyload'; //图片懒加载
import * as filters from './assets/js/filters';//引入过滤器

import routers from './routers'


import routes from './router/index.js'//路由

import './assets/js/browser.js';

import Navigation from 'vue-navigation'

Vue.use(VueRouter)
Vue.use(resource);



Vue.prototype.$tool = utils(); // ajax
if (!/ipad|iphone/i.test(navigator.userAgent)) {
  (function () {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
      handleFontSize();
    } else {
      if (document.addEventListener) {
        document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
      } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", handleFontSize);
        document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
      }
    }

    function handleFontSize() {
      // 设置网页字体为默认大小
      WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
      // 重写设置网页字体大小的事件
      WeixinJSBridge.on('menu:setfont', function () {
        WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
      });
    }
  })();
}

/**模板中调用ajax **/
/*this.$tool.sendOPtion(this,"https://api.douban.com/v2/movie/top250?count=10",{},"POST",true,function(data){
  console.log(data);
})*/


Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://mycdn.avicare.cn/group1/M00/00/7F/O24cYVjt4GKAJovCAABAeKv7Krs288.jpg',
  // loading: 'http://mycdn.avicare.cn/group1/M00/00/7F/O24cYVjt4MeATtX-AAAvKdc4p9A543.gif',
  loading: 'http://mycdn.avicare.cn/group1/M00/01/19/O24cYVkRFFWAEyinAAARrQpHyUU170.png',
  attempt: 1
})

//生成路由
const router = new VueRouter({
  // mode: 'history', //切换路径模式，变成history模式
  mode: 'hash', //更改了打包路径
  base: __dirname,
  scrollBehavior: () => ({
    y: 0
  }), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
  routes
})

Vue.use(Navigation, {router})

//filter计算属性
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

Vue.config.keyCodes.enter = 13;
//自定义指令页面title实时更新
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
  }
})

/* eslint-disable no-new */
new Vue({
  router, //挂到vue上
  el: '#app',
  render: h => h(App)
}).$mount('#app')








