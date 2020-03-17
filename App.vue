<template>
  <div class="container pt-5">
    <div class="row">
      <aside class="col-md-3">
        <user-card/>
      </aside>
      <div class="col-md-9">
        <span class="font-weight-bold">Repositories</span>
        <span>{{repos.length}}</span>
        <hr>
        <main role="main">
          <repo-card
            class="mb-3"
            v-for="repo in repos"
            :key="repo.id"
            :repo="repo"
          />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
const UserCard = httpVueLoader('./components/UserCard.vue')
const RepoCard = httpVueLoader('./components/RepoCard.vue')

module.exports = {
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
        const { data } = await axios.get('https://api.github.com/users/lastor-chen/repos?sort=updated')

        this.repos = data.map(repo => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          updated_at: repo.updated_at
        }))

      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>