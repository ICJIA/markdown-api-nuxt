<template>
    <div>

        <h1 class="title">
            {{post.attrs.title}}
        </h1>
        <h3>Tags:</h3>
        <div v-for="tag in post.attrs.tags">
            <nuxt-link class="card" :key="tag" :to="'/tags/'+tag">{{tag}}</nuxt-link>
        </div>

        <h3>Category:</h3>
        <div v-if="post.attrs.category">
            <nuxt-link class="card" :to="'/categories/'+post.attrs.category">{{post.attrs.category}}</nuxt-link>
        </div>
        <div class="content" v-html="post.body" style="margin-top: 15px"></div>

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
    .box {
        border: 1px solid #ccc;
    }
</style>