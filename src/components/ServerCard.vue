<template>
    <div>
        <b-card header="featured"
                header-tag="header"
                footer="Card Footer"
                footer-tag="footer"
                :title="container.name">
            <p class="card-text">{{container.name}}</p>
            <p class="card-text">{{container.containerURL}}</p>
            <p class="card-text">{{container.created_at}}</p>
            <p class="card-text">{{container.status}}</p>
            <p class="card-text">{{container.status_code}}</p>
            <p>{{container.config['image.description']}}</p> -->
            <b-button href="#" variant="primary">Details</b-button>
        </b-card>
    </div>
</template>

<script>
import {HTTPS} from '../utils/https-get'

let containerDetails = {}

export default {
    name: 'ContainerCard',
    props: {
        containerURL: ""
    },
    methods: {
        fetchData () {
            let urlArray = this.containerURL.split('/')
            this.container.name = urlArray[urlArray.length-1]
            this.loading = true
            HTTPS.get(this.containerURL).then((response) => {
                this.containerDetails = response.data.metadata
                this.container.containerURL = this.containerURL
                this.container.created_at = response.data.metadata.created_at
                this.container.status = response.data.metadata.status
                this.container.status_code = response.data.metadata.status_code
                this.container.config = response.data.metadata.config
                console.log(this.container.config)
                this.loading = false
            })
        }
    },
    data () {
        return {
            container: {
                containerURL: '',
                name: '',
                config: {},
                devices: {},
                profiles: {},
                description: '',
                created_at: '',
                status: '',
                status_code: ''
            },
            containerDetails: {},
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