// 套件均使用 CDN 由 index.html 引入

// API tools
// ==================================
import githubAPI from './apis/githubAPI.js'

// 註冊到全域上，供 Vue 組件使用
window.githubAPI = githubAPI

// Vue config
// ==================================
const App = httpVueLoader('./App.vue')

new Vue({
  el: '#app',
  components: {
    App
  },
})