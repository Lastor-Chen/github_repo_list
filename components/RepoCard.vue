<template>
  <div class="card">
    <div class="card-body">
      <a :href="repo.html_url" target="_blank" rel="noopener">
        <h5 class="card-title d-inline-block">{{repo.name}}</h5>
      </a>
      <div class="card-subtitle">Updated {{repo.updated_at | fromNow}}</div>
      <p class="card-text">{{repo.description || 'No description...'}}</p>
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