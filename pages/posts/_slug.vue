<template>
    <div>

        <h1 class="title">
            {{post.attrs.title}}
        </h1>

        <div class="content" v-html="post.body"></div>

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