<template>
  <div class="card">
    <div class="card-body">
      <a :href="repo.html_url" target="_blank" rel="noopener">
        <h5 class="card-title d-inline-block">{{repo.name}}</h5>
      </a>
      <div class="card-subtitle">{{repo.created_at}}</div>
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
  }
}
</script>