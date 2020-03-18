// title (標題)、description (專案描述)、url (專案網址)，其餘資訊自行決定

// 設定 API tools
const apiHelper = axios.create({
  baseURL: 'https://api.github.com'
})

function getRepos({ page, limit }) {
  return apiHelper.get(`/users/lastor-chen/repos?sort=updated&page=${page}&per_page=${limit}`)
}

const App = httpVueLoader('./App.vue')

new Vue({
  el: '#app',
  components: {
    App
  },
})