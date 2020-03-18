<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-3">
        <user-card/>
      </div>
      <div class="col-md-9">
        <span class="font-weight-bold">Repositories</span>
        <span class="badge badge-pill badge-secondary">{{repos.length}}</span>
        <hr>
        <div class="position-relative">
          <repo-card
            class="mb-3"
            v-for="repo in repos"
            :key="repo.id"
            :repo="repo"
          ></repo-card>
          <spinner v-if="isLoading"></spinner>
        </div>
        <div id="ob" ref="ob"></div>
      </div>
    </div>
  </div>
</template>

<script>
const UserCard = httpVueLoader('./components/UserCard.vue')
const RepoCard = httpVueLoader('./components/RepoCard.vue')
const Spinner = httpVueLoader('./components/Spinner.vue')

module.exports = {
  components: {
    UserCard,
    RepoCard,
    Spinner
  },
  data() {
    return {
      repos: [],
      page: 1,
      observe: null,  // 監看滾動分頁
      isLoading: false
    }
  },
  created() {
    this.fetchRepos(this.page)
  },
  mounted() {
    this.observe = new IntersectionObserver(this.loadMoreRepos)
    this.observe.observe(this.$refs.ob)
  },
  methods: {
    async fetchRepos(page) {
      try {
        this.isLoading = true
        const { data } = await githubAPI.getRepos(page)

        const newRepos = data.map(repo => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          language: repo.language,
          homepage: repo.homepage,
          updated_at: repo.updated_at
        }))

        this.repos.push(...newRepos)
        this.isLoading = false

        // A flag for loadMoreRepos()
        return data.length

      } catch (err) {
        this.isLoading = false
        console.log(err)
      }
    },
    async loadMoreRepos(entries) {
      // ob 初始化時，不加載
      const { isIntersecting } = entries[0]
      const windowHeight = window.innerHeight
      const obPosition = this.$refs.ob.offsetTop
      const isOverWindow = obPosition > windowHeight
      if (!isIntersecting || !isOverWindow) return

      // 滿足條件時 loadMore
      this.page += 1
      const size = await this.fetchRepos(this.page)

      // 如分頁資料已全數加載，移除 observe
      if (size < LIMIT) {
        this.observe.disconnect()
        this.observe = null
      }
    }
  }
}
</script>