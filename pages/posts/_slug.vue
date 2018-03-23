<template>
    <div>

        <h1 class="title">
            {{post.attrs.title}}
        </h1>
        <h3>Tags:</h3>
        <div v-for="tag in post.attrs.tags">
            <nuxt-link :key="tag" :to="'/tags/'+tag">{{tag}}</nuxt-link>
        </div>

        <h3>Category:</h3>
        <div v-if="post.attrs.category">
            <nuxt-link :to="'/categories/'+post.attrs.category">{{post.attrs.category}}</nuxt-link>
        </div>
        <div v-html="post.body" style="margin-top: 15px"></div>

    </div>
</template>

<script>



    export default {
        head() {
            return {

            }
        },
        fetch({ store, params }) {
            store.dispatch('getPost', params.slug)
        },
        computed: {
            post() {
                return this.$store.state.post
            }
        }
    }
</script>

<style>
</style>