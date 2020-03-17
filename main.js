// title (標題)、description (專案描述)、url (專案網址)，其餘資訊自行決定

const UserCard = httpVueLoader('./components/UserCard.vue')
const RepoCard = httpVueLoader('./components/RepoCard.vue')

new Vue({
  el: '#app',
  components: {
    UserCard,
    RepoCard
  },
  data() {
    return {
      repos: []
    }
  },
  created() {
    this.fetchRepos()
  },
  methods: {
    async fetchRepos() {
      try {
        const { data } = await axios.get('https://api.github.com/users/lastor-chen/repos?sort=created')

        this.repos = data.map(repo => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          created_at: repo.created_at
        }))

      } catch (err) {
        console.log(err)
      }
    }
  }
})