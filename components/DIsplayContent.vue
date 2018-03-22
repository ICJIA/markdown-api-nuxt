<template>
    <div>


        <div v-for="tag in $store.state.tags">
            <h1>{{tag}}</h1>
            <div v-for="item in itemList[tag]">
                {{item.title}}
            </div>
        </div>





        <hr>

    </div>
</template>

<script>
    export default {
        name: 'DisplayPosts',
        mounted() {
            console.log('Mounted.')

        },
        computed: {
            itemList: function () {
                let tagArray = [];
                let tmpObj = {}
                if (this.taxonomy) {
                    if (this.taxonomy === 'tags') {
                        this.$store.state.tags.map((tag) => {
                            tmpObj[tag] = []
                            this.$store.state.posts.map((post) => {
                                if (post.attrs.tags) {
                                    post.attrs.tags.map((targetTag) => {
                                        if (tag === targetTag) {
                                            let postObj = {}
                                            postObj.title = post.attrs.title;
                                            postObj.slug = post.slug;
                                            tmpObj[tag].push(postObj)

                                        }
                                    })
                                }
                            })
                        })
                        return tmpObj
                    }
                    if (this.taxonomy === 'categories') {
                        return this.$store.state.categories
                    }
                } else {
                    return 'all posts'
                }

            }
        },
        props: [
            'taxonomy'
        ]
    }
</script>