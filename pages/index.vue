<template>
  <div>

    <h1>All Posts:</h1>
    <display-all-posts />
    <h1>Posts By Category:</h1>
    <display-by-category />

    <h1>Posts By Tag:</h1>
    <display-by-tag />



    <h1>All Tags</h1>

    <div v-for="tag in Tags">
      <nuxt-link class="card" :key="tag" :to="'/tags/'+tag">{{tag}}</nuxt-link>
    </div>
    <h1>All Categories</h1>

    <div v-for="category in Categories">
      <nuxt-link class="card" :key="category" :to="'/categories/'+category">{{category}}</nuxt-link>
    </div>
  </div>
</template>

<script>
  import DisplayByCategory from '~/components/DisplayByCategory'
  import DisplayByTag from '~/components/DisplayByTag'
  import DisplayAllPosts from '~/components/DisplayAllPosts'
  export default {
    head() {
      return {
        title: 'Home'
      }
    },
    fetch({ store }) {
      store.dispatch('getPosts')

    },
    components: {
      DisplayByCategory,
      DisplayByTag,
      DisplayAllPosts
    },
    computed: {
      Posts() {
        return this.$store.state.posts
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