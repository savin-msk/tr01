<template>
    <div>
        <b-card-group deck>
            <div v-for="item in containers.data">
                <container-card :containerURL="item"></container-card>
            </div>
        </b-card-group>
    </div>
</template>

<script>
import ContainerCard from './ContainerCard.vue'

export default {
   name: 'ContainerView',
   methods: {
        fetchData () {
            this.loading = true
            this.$store.dispatch("LOAD_CONTAINERS_URL").then(response => {
                console.log(this.$store.state.server.containersURL)
                this.containers.data = this.$store.state.server.containersURL
            })
         }
    },
    components: {
        "ContainerCard": ContainerCard
    },
    data() {
        return {
            containers: {
                name: [],
                data: {}
            },
            loading: false,
        }
    },
    created () {
        this.fetchData()
    }
}
</script>

<style scoped>
</style>