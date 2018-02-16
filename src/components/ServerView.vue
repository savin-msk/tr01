<template>
    <div>
        <div v-if="loading">
            <div class="white-widget grey-bg author-area">
            <div class="auth-info row">
            <div class="timeline-wrapper">
            <div class="timeline-item">
                <div class="animated-background">
                    <div class="background-masker header-top"></div>
                    <div class="background-masker header-left"></div>
                    <div class="background-masker header-right"></div>
                    <div class="background-masker header-bottom"></div>
                    <div class="background-masker subheader-left"></div>
                    <div class="background-masker subheader-right"></div>
                    <div class="background-masker subheader-bottom"></div>
                </div>
            </div>
            </div>
            </div>
            </div>
        </div>
        <div v-if="!loading">
            <b-table striped hover :items="items" caption-top>
                <template slot="table-caption">
                    lxd server
                </template>
            </b-table>
            <container-grid-card></container-grid-card>
        </div>
    </div>
</template>

<script>
import store from '../store'
import {eventHub} from '../utils/eventhub.js'

import ContainerGridCard from './ContainerGridCard.vue'

export default {
    name: 'ServerView',
    methods: {
        fetchData () {
            this.loading = true
            this.$store.dispatch('LOAD_SERVER_DETAILS').then(response => {
                console.log(this.$store)
                this.items.push([ 'Name', this.$store.state.server.server])
            })
            this.$store.dispatch('LOAD_CONTAINERS_URL').then(response => {
                console.log(this.$store)
                this.loading = false
            })
        }
    },
    components: {
        'ContainerGridCard': ContainerGridCard
    },
    data() {
        return {
            items: [],
            loading: false
        }
    },
    created () {
        this.fetchData()
    }
}
</script>

<style scoped>
</style>