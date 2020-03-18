<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-3">
        <user-card/>
      </div>
      <div class="col-md-9">
        <span class="font-weight-bold">Repositories</span>
        <span>{{repos.length}}</span>
        <hr>
        <div class="position-relative">
          <repo-card
            class="mb-3"
            v-for="repo in repos"
            :key="repo.id"
            :repo="repo"
          />
        </div>
        <div id="ob" ref="ob"></div>
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
      repos: [],
      page: 1
    }
  },
  created() {
    this.fetchRepos(this.page)
  },
  mounted() {
    const ob = new IntersectionObserver(this.loadMoreRepos)
    ob.observe(this.$refs.ob)
  },
  methods: {
    async fetchRepos(page) {
      try {
        const { data } = await githubAPI.getRepos(page)

        const newRepos = data.map(repo => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          updated_at: repo.updated_at
        }))

        this.repos.push(...newRepos)

      } catch (err) {
        console.log(err)
      }
    },
    async loadMoreRepos(entries) {
      const { isIntersecting } = entries[0]
      const windowHeight = window.innerHeight
      const obPosition = this.$refs.ob.offsetTop
      const isOverWindow = obPosition > windowHeight
      if (!isIntersecting || !isOverWindow) return

      // 滿足條件時 loadMore
      this.page += 1
      this.fetchRepos(this.page)
    }
  }
}
</script>