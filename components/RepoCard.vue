<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title d-flex mb-0">
        <h5 class="mb-0">{{repo.name}}</h5>
        <div class="ml-3" v-if="repo.homepage">
          <a :href="repo.homepage">
            <span class="badge badge-info">demo</span>
          </a>
        </div>
      </div>
      <a :href="repo.html_url">{{repo.html_url}}</a>
      <div class="repo-info my-3">
        <span class="lang-dot mr-3">{{repo.language}}</span>
        <span>Updated {{repo.updated_at | fromNow}}</span>
      </div>
      <hr>
      <p class="card-text" v-if="repo.description">{{repo.description}}</p>
      <p class="card-text text-muted" v-else>No description...</p>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    repo: {
      type: Object,
      required: true
    }
  },
  filters: {
    fromNow(date) {
      return moment(date).fromNow()
    }
  }
}
</script>

<style>
.repo-info {
  font-size: .85rem;
  color: #586069;
}

.lang-dot::before {
  display: inline-block;
  content: '';
  background-color: #000;
  border-radius: 50%;
  margin-right: 0.2rem;
  width: .75rem;
  height: .75rem;
}
</style>