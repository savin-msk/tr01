import Vue from 'vue'
import Vuex from 'vuex'
import {HTTPS} from '../utils/https-get'
import modServer from './modules/server'
import modContainer from './modules/container'

Vue.use(Vuex)

const modules = {
    server: modServer,
    containers: modContainer
}

const state = {
  loading: false
}

const actions = {}

const mutations = {}

const getters = {}

const store = new Vuex.Store({
  modules,
  state,
  actions,
  mutations,
  getters
})

export default store