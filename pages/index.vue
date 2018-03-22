<template>
  <div>

    <h1>Featured</h1>
    <div v-for="post in Featured">
      <nuxt-link class="card" :key="post.slug" :to="'/posts/'+post.slug">{{post.attrs.title}}</nuxt-link>
    </div>
    <h1>News</h1>
    <div v-for="post in News">
      <nuxt-link class="card" :key="post.slug" :to="'/posts/'+post.slug">{{post.attrs.title}}</nuxt-link>
    </div>
    <h1>Tags</h1>
    <div v-for="tag in Tags">
      <nuxt-link class="card" :key="tag" :to="'/tags/'+tag">{{tag}}</nuxt-link>
    </div>
    <h1>Categories</h1>
    <div v-for="category in Categories">
      <nuxt-link class="card" :key="category" :to="'/categories/'+category">{{category}}</nuxt-link>
    </div>
  </div>
</template>

<script>

  export default {
    head() {
      return {
        title: 'Home'
      }
    },
    fetch({ store }) {
      store.dispatch('getPosts')

    },
    computed: {
      Posts() {
        return this.$store.state.posts
      },
      Featured() {
        return this.$store.state.featured
      },
      News() {
        return this.$store.state.news
      },
      Tags() {
        return this.$store.state.tags
      },
      Categories() {
        return this.$store.state.categories
      }
    }
  }
</script>

<style>
</style>