<template>
  <v-app dark>
    <v-toolbar fixed>
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

      <v-toolbar-title>
        <nuxt-link to="/" class="toolbarTitle">Markdown-to-API Test</nuxt-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat nuxt to="/posts">All Posts</v-btn>
        <v-btn flat nuxt to="/categories">Posts by Category</v-btn>
        <v-btn flat nuxt to="/tags">Posts by Tag</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content style="margin-top: 70px">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    }
  }
</script>

<style>
  ol {
    margin-left: 35px !important;
  }

  .toolbarTitle {
    text-decoration: none;
    color: #fff;
    font-weight: 900;
  }

  .toolbarTitle:hover {

    color: #ccc;

  }
</style>