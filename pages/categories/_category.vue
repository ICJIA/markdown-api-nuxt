<template>
    <div>

        <h1 class="list">Posts categorized as: '{{$route.params.category}}'</h1>
        <div v-for="post in categorizedPosts">
            <nuxt-link class="card" :key="post.slug" :to="'/posts/'+post.slug">{{post.attrs.title}}</nuxt-link>
        </div>



    </div>
</template>

<script>



    export default {
        head() {
            return {

            }
        },
        mounted() {

        },
        fetch({ store, params }) {
            store.dispatch('getCategorizedPosts', params.category)

        },
        computed: {
            categorizedPosts() {
                return this.$store.state.categorizedPosts
            }
        }
    }
</script>

<style>
    .list {
        margin-bottom: 30px;
    }
</style>