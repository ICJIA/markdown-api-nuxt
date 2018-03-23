<template>
    <div>

        <div v-for="category in filterArray">
            <strong>{{category}}</strong>
            <div v-for="item in itemList[category]">
                <nuxt-link :key="item.slug" :to="'/posts/'+item.slug">
                    {{item.attrs.title}}
                </nuxt-link>
            </div>
        </div>




    </div>
</template>

<script>
    export default {
        name: 'DisplayByCategory',
        mounted() {
            this.itemList = this.$store.state.postsByCategory
            if (!this.filter) {
                this.filterArray = this.$store.state.categories
            } else {
                this.filterArray = this.filter.replace(/\s/g, '').split(',')
            }
        },
        data() {
            return {
                filterArray: [],
                itemList: {},
                error: true
            }
        },
        props: ['filter', 'display'],
    }
</script>