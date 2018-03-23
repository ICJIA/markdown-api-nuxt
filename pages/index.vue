<template>
  <div>

    <h1>All Posts:</h1>
    <div v-for="post in Posts">
      <nuxt-link :key="post.slug" :to="'/posts/'+post.slug">
        {{post.attrs.title}}
      </nuxt-link>
    </div>

    <h2>Featured</h2>

    <div v-for="post in Featured">
      <nuxt-link :key="post.slug" :to="'/posts/'+post.slug">
        {{post.attrs.title}}
      </nuxt-link>
    </div>

    <h2>News</h2>

    <div v-for="post in News">
      <nuxt-link :key="post.slug" :to="'/posts/'+post.slug">
        {{post.attrs.title}}
      </nuxt-link>
    </div>

    <h1>All Tags</h1>

    <div v-for="tag in Tags">
      <nuxt-link :key="tag" :to="'/tags/'+tag">{{tag}}</nuxt-link>
    </div>
    <h1>All Categories</h1>

    <div v-for="category in Categories">
      <nuxt-link :key="category" :to="'/categories/'+category">{{category}}</nuxt-link>
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
    data() {
      return {
        featured: []
      }
    },
    fetch({ store }) {
      store.dispatch('getPosts')
      store.dispatch('getTagArray')
      store.dispatch('getCategoryArray')

    },
    mounted() {

    },

    computed: {
      Posts() {
        return this.$store.state.posts
      },
      Tags() {
        return this.$store.state.tagArray
      },
      Categories() {
        return this.$store.state.categoryArray
      },
      Featured() {
        let featured = this.$store.state.posts.filter((post) => {
          if (post.attrs.category === 'Featured') {
            return post
          }
        })
        return featured
      },
      News() {
        let news = this.$store.state.posts.filter((post) => {
          if (post.attrs.category === 'News') {
            return post
          }
        })
        return news
      }

    }
  }
</script>

<style>
</style>