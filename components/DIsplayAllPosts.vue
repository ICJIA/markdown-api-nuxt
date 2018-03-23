<template>
    <div>

        <div v-for="post in Posts">
            <nuxt-link :key="post.slug" :to="'/posts/'+post.slug">
                {{post.attrs.title}}
            </nuxt-link>
        </div>


    </div>
</template>

<script>
    export default {
        name: 'DisplayAllPosts',
        mounted() {
            console.log('Mounted.')

        },
        computed: {
            Posts() {
                return this.$store.state.posts
            }
        }


    }
</script>