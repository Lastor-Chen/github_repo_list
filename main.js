// title (標題)、description (專案描述)、url (專案網址)，其餘資訊自行決定

const UserCard = httpVueLoader('./components/UserCard.vue')
const RepoCard = httpVueLoader('./components/RepoCard.vue')

new Vue({
  el: '#app',
  components: {
    UserCard,
    RepoCard
  }
})