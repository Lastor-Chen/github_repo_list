<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-3">
        <user-card @after-fetch-user="afterFetchUser"></user-card>
        <div class="bg-img mt-5" ref="bgImg"></div>
      </div>
      <div class="col-md-9">
        <div class="mt-3 mt-md-0 text-center text-md-left">
          <span class="font-weight-bold">Repositories</span>
          <span class="badge badge-pill badge-secondary">{{repos.length}}</span>
        </div>
        <hr>
        <div class="position-relative">
          <repo-card
            class="mb-3"
            v-for="repo in repos"
            :key="repo.id"
            :repo="repo"
          ></repo-card>
          <div class="text-center" v-if="isLoading">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
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
      page: 1,
      LIMIT: githubAPI.pageLimit,
      totalPage: 0,
      observe: null,  // 監看滾動分頁
      isLoading: false
    }
  },
  created() {
    this.fetchRepos(this.page)
  },
  mounted() {
    // 滾動分頁
    this.observe = new IntersectionObserver(this.loadMoreRepos)
    this.observe.observe(this.$refs.ob)

    // 視差滾動 (行動裝置時，不動作)
    if (window.innerWidth > 768) {
      window.addEventListener('scroll', this.handleScroll)
    }
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

      } catch (err) {
        this.isLoading = false
        Swal.fire('503', '無法取得 Repositories，請稍後再試', 'error')
      }
    },
    async loadMoreRepos(entries) {
      if (this.isLoading) return

      // ob 初始化時，不加載
      const { isIntersecting } = entries[0]
      const windowHeight = window.innerHeight
      const obPosition = this.$refs.ob.offsetTop
      const isOverWindow = obPosition > windowHeight
      if (!isIntersecting || !isOverWindow) return

      // 滿足條件時 loadMore
      this.page += 1
      await this.fetchRepos(this.page)

      // 如分頁資料已全數加載，移除 observe
      if (this.page === this.totalPage) {
        this.observe.disconnect()
        this.observe = null
      }
    },
    handleScroll(e) {
      // 行動裝置時，不動作
      if (window.innerWidth < 768) return

      const bgImg = this.$refs.bgImg
      const scrollTop = window.scrollY.toFixed(1)
      
      bgImg.style.backgroundPositionY = (scrollTop * 0.7) + 'px'
      bgImg.style.opacity = (scrollTop * 0.0005)
    },
    afterFetchUser(count) {
      this.totalPage = Math.ceil(count / this.LIMIT)
    }
  }
}
</script>

<style>
@media screen and (min-width: 768px) {
  .bg-img {
    height: 80%;
    width: 300px;
    background: url('./img/gundamcat.png') no-repeat;
    background-size: contain;
    opacity: 0;
    position: absolute;
    top: 50vh;
  }
}
</style>