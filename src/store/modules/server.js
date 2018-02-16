import {HTTPS} from '../../utils/https-get'

const state = {
    addresses: [],
    driver: "",
    driver_version: "",
    kernel: "",
    kernel_architecture: "",
    kernel_version: "",
    server: "",
    server_pid: "",
    server_version: "",
    storage: "",
    storage_version: "",
    config: {},
    containersURL: [],
    containersStateURL: [],
    containersSnapshotsURL: []
}

const actions = {
  LOAD_SERVER_DETAILS ({commit}) {
    return new Promise((resolve, reject) => {
        console.log('LOAD_SERVER_DETAILS')
        HTTPS.get('/1.0').then((response) => {
            const payload = {
                'addresses': response.data.metadata.environment.addresses,
                'driver': response.data.metadata.environment.driver,
                'driver_version': response.data.metadata.environment.driver_version,
                'kernel': response.data.metadata.environment.kernel,
                'kernel_architecture': response.data.metadata.environment.kernel_architecture,
                'kernel_version': response.data.metadata.environment.kernel_version,
                'server': response.data.metadata.environment.server,
                'server_pid': response.data.metadata.environment.server_pid,
                'server_version': response.data.metadata.environment.server_version,
                'storage': response.data.metadata.environment.storage,
                'storage_version': response.data.metadata.environment.storage_version,
                'config': response.data.metadata.environment.config
            }
            commit('SET_SERVER_DETAILS', { payload })
            resolve ()
        }, (err) => {
            console.log(err)
            reject(err)
        })
    })
  },
  LOAD_CONTAINERS_URL ({commit}) {
    return new Promise((resolve, reject) => {
      console.log('Cleaning Container\'s URLs')
      //commit('SET_CONTAINERS_URL', {})
      console.log('LOAD_CONTAINERS_URL')
        HTTPS.get('/1.0/containers').then((response) => {
            console.log('LOAD_CONTAINERS_URL')
            let payload = response.data.metadata
            commit('SET_CONTAINERS_URL', { payload })
            resolve ()
        }, (err) => {
            console.log(err)
            reject(err)
        })
    })
  }
}

const mutations = {
  SET_SERVER_DETAILS: (state, { payload }) => {
    console.log('SET_SERVER_DETAILS')
    state.addresses = payload.addresses
    state.driver = payload.driver
    state.driver_version = payload.driver_version
    state.kernel = payload.kernel
    state.kernel_architecture = payload.kernel_architecture
    state.kernel_version = payload.kernel_version
    state.server = payload.server
    state.server_pid = payload.server_pid
    state.server_version = payload.server_version
    state.storage = payload.storage
    state.storage_version = payload.storage_version,
    state.config = payload.config
  },
  SET_CONTAINERS_URL: (state, { payload }) => {
    console.log('SET_CONTAINERS_URL')
    state.containersURL = payload
    for (let i in state.containersURL) {
      state.containersStateURL[i] = state.containersURL[i] + '/state'
      state.containersSnapshotsURL[i] = state.containersURL[i] + '/snapshots'
    }
  }
}

const getters = {
  getServerDetails: state => {
    console.log('getServerDetails')
    let result = state
    return result
  },
  getContainersURL: state => {
    console.log('getContainersURL')
    let result = state.containersURL
    return result
  },
  getContainersStateURL: state => {
    console.log('getContainersStateURL')
    let result = state.containersStateURL
    return result
  },
  getContainersSnapshotsURL: state => {
    console.log('getContainersSnapshotsURL')
    let result = state.containersSnapshotsURL
    return result
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
