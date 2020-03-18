<template>
  <div class="card avatar-card-rwd">
    <img
      :src="user.avatar_url"
      alt="user_avatar"
      :title="user.accountName"
      class="card-img-top"
    >
    <div class="card-body">
      <h5>{{user.name}}</h5>
      <p class="mb-0">{{user.accountName}}</p>
    </div>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      user: {
        avatar_url: 'https://via.placeholder.com/253?text=No+Image',  // default img
        name: '',
        accountName: ''
      }
    }
  },
  created() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      try {
        const { data } = await githubAPI.getUser('https://api.github.com/users/lastor-chen')

        this.user = {
          avatar_url: data.avatar_url,
          name: data.name,
          accountName: data.login,
        }

        this.$emit('after-fetch-user', data.public_repos)

      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 767.98px) {
  .avatar-card-rwd {
    max-width: 253px;
    margin: 0 auto;
  }
}
</style>