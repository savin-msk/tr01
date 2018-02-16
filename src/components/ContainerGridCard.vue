<template>
    <div>
        <div v-if="loading">
            <p>Loading...</p>
        </div>
        <div v-if="!loading">
            <b-table striped hover :items="items" :fields="fields" caption-top>
                <template slot="table-caption">
                    Containers
                </template>
                <template slot="actions" slot-scope="cell">
                    <b-button size="sm" class="mr-2" v-on:click="startContainer">
                        Start
                    </b-button>
                    <b-button size="sm" class="mr-2" v-on:click="stopContainer">
                        Config
                    </b-button>
                    <b-button size="sm" class="mr-2">
                        Snapshot
                    </b-button>
                    
                </template>
            </b-table>
        </div>
    </div>
</template>

<script>
import { HTTPS } from '../utils/https-get'
import { eventHub } from '../utils/eventhub.js'

import store from '../store'

function reqUrl(req) {
    return new Promise((resolve, reject) => {
    HTTPS.get(req)
        .then(response => resolve(response))
        .catch(() => reject)
  })
}

export default {
    name: 'ContainerGridCard',
    methods: {
        fetchData () {
            console.log('loading true')
            this.loading = true
                this.getContdata().then(() => {
                    console.log('getContdata finished')
                    console.log('loading false')
                    this.loading = false
                })
            console.log(this.items)
        },
        
        getContdata() {
            return new Promise ((resolve, reject) => {
                console.log('getContdata')
                for (let i in this.containerUrl) {
                    let rowitem = {}

                    let query1 = reqUrl(this.containerUrl[i]).then((response) => {
                        console.log('cont url')
                        let urlArray = this.containerUrl[i].split('/')
                        rowitem.name = urlArray[urlArray.length-1]
                        rowitem.state = response.data.metadata.status
                        this.containerDetails = response.data.metadata
                    })
                    
                    let query2 = reqUrl(this.stateUrl[i]).then((response) => {
                        if (response.data.metadata.network != null) {
                            console.log('if true')
                            let networks = response.data.metadata.network
                            let ifName = Object.keys(networks)[0]
                            rowitem.inet4 = networks[ifName].addresses[0].address
                            rowitem.inet6 = networks[ifName].addresses[1].address
                        }
                        else {
                            console.log('if false')
                            rowitem.inet4 = ''
                            rowitem.inet6 = ''
                        }
                    })

                    let query3 = reqUrl(this.snapshotsUrl[i]).then((response) => {
                        if (response.data.metadata.length != 0) {
                            console.log('query3')
                            console.log(response.data.metadata)
                            let url = response.data.metadata[0]
                            let name = url.split('/')
                            rowitem.snapshot = name[name.length-1]
                        }
                        else {
                            console.log('if false')
                            rowitem.snapshot = ''
                        }
                    })

                    Promise.all([query1, query2, query3]).then(() => {
                        console.log('All ajax calls finished')
                        console.log(rowitem)    
                        this.items.push(rowitem)
                    }).catch(function(err){
                        console.log('There is an error', err)
                    })
                }
                console.log(this.items)
                resolve()
            })
        },
        startContainer () {
            HTTPS.put('/1.0/containers/nodejs/state', { "action": "start" })
        },
        stopContainer () {
            HTTPS.put('/1.0/containers/nodejs/state', { "action": "stop" })
        }
    },
    computed: {
        containerUrl () {
            return this.$store.getters.getContainersURL
        },
        stateUrl () {
            return this.$store.getters.getContainersStateURL
        },
        snapshotsUrl () {
            return this.$store.getters.getContainersSnapshotsURL
        }
    },
    data() {
        return {
            items: [],
            fields: [ 'name', 'state', 'inet4', 'inet6', 'snapshot', 'actions' ],
            containersURL: [],
            loading: false
        }
    },
    created () {
        console.log('ContainerGridCard created')
        this.fetchData()
    }
}
</script>

<style scoped>
</style>