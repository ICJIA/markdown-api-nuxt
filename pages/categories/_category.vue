<template>
    <div>

        <h1>Posts categorized as: '{{$route.params.category}}'</h1>
        <div v-for="post in categorizedPosts">
            <nuxt-link :key="post.slug" :to="'/posts/'+post.slug">{{post.attrs.title}}</nuxt-link>
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
            store.dispatch('getPostsByCategory', params.category)

        },
        computed: {
            categorizedPosts() {
                return this.$store.state.postsByCategory
            }
        }
    }
</script>

<style>
    .list {
        margin-bottom: 30px;
    }
</style>