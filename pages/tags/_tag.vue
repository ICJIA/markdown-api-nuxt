<template>
    <div>

        <h1>Posts tagged with: '{{$route.params.tag}}'</h1>
        <div v-for="post in taggedPosts" class="list">
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
            store.dispatch('getTaggedPosts', params.tag)

        },
        computed: {
            taggedPosts() {
                return this.$store.state.taggedPosts
            }
        }
    }
</script>

<style>
    .list {
        margin-top: 30px;
    }
</style>