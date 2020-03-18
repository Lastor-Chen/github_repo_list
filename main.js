// 套件均使用 CDN 由 index.html 引入

// API tools
// ==================================
const apiHelper = axios.create({
  baseURL: 'https://api.github.com'
})

const USER = 'lastor-chen'  // github username
const LIMIT = 7             // page limit

const githubAPI = {
  getRepos(page) {
    return apiHelper.get(`/users/${USER}/repos?sort=updated&page=${page}&per_page=${LIMIT}`)
  },
  getUser() {
    return apiHelper.get(`https://api.github.com/users/${USER}`)
  }
}

// Vue config
// ==================================
const App = httpVueLoader('./App.vue')

new Vue({
  el: '#app',
  components: {
    App
  },
})