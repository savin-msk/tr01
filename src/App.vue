<template>
  <div id="app">
    <!-- <top-nav-bar></top-nav-bar> -->
    <router-view></router-view>
  </div>
</template>

<script>
import TopNavBar from './components/TopNavBar.vue'
import { eventHub } from './utils/eventhub'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    TopNavBar
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    this.$store.dispatch("LOAD_SERVER_DETAILS").then(response => {
      console.log("Got some data, now lets show something in this component")
    }, error => {
      console.error("Got nothing from server. Prompt user to check internet connection and try again")
    })
  }
}
</script>

<style>
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/css/font-awesome.min.css';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/css/simple-line-icons.css';
  /* Import Bootstrap Vue Styles */
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
</style>

<style lang="scss">
  // Import Main styles for this application
  @import './scss/style';
</style>
