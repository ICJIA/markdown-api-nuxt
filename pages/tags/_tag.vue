<template>
    <div>

        <h1 class="list">Posts tagged with: '{{$route.params.tag}}'</h1>
        <!-- <div v-for="post in taggedPosts">
            <nuxt-link class="card" :key="post.slug" :to="'/posts/'+post.slug">{{post.attrs.title}}</nuxt-link>
        </div> -->

        <display-by-tag :filter="$route.params.tag" />

    </div>
</template>

<script>
    import DisplayByTag from '~/components/DisplayByTag'
    export default {
        name: "AllPostsOfTag",
        mounted() {

        },
        components: {
            DisplayByTag
        }
    }
</script>

<style>
    .list {
        margin-bottom: 30px;
    }
</style>