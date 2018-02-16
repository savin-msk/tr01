import {HTTPS} from '../../utils/https-get'

const container = {
    containerURL: '',
    name: '',
    config: {},
    devices: {},
    profiles: {},
    description: '',
    created_at: '',
    status: '',
    status_code: ''
}

const state = {
    containers: []
}

const actions = {
    LOAD_CONTAINER_DATA: ({commit}, payload) => {
        console.log('LOAD_CONTAINER_DATA')
        console.log(payload)
        HTTPS.get(payload).then((response) => {
            console.log(response)
            commit('SET_CONTAINER_DATA', { list: response.data.metadata })
        }, (err) => {
            console.log(err)
        })
    }
}

const mutations = {
    SET_CONTAINER_DATA: (state, { list }) => {
        console.log('SET_CONTAINER_DATA')
        console.log(list)
        state.containers.push(list)
        console.log(state.containers)
    }
}

const getters = {
    getContainerDetailsByName: state => (containerURL) =>  {
        console.log('getContainerDetailsByName')
        return state.containers.find(container => container.containerURL === containerURL)
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}