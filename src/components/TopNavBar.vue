<template>
  <div class="TopNavBar">
    <b-navbar toggleable="md" type="dark" variant="info">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#">lxd-gui</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
            <b-nav-item :to="'/'">Server</b-nav-item>
            <b-nav-item :to="'home'">Containers</b-nav-item>
            <b-nav-item href="#">Load</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

            <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <b-nav-item-dropdown text="Lang" right>
                <b-dropdown-item href="#">EN</b-dropdown-item>
                <b-dropdown-item href="#">ES</b-dropdown-item>
                <b-dropdown-item href="#">RU</b-dropdown-item>
                <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            </b-navbar-nav>

        </b-collapse>
        </b-navbar>
  </div>
</template>

<script>
export default {
   name: 'TopNavBar',
   data () {
     return {
       msg: 'TopNavBar MSG'
     }
   }
}
</script>

<style scoped>
</style>