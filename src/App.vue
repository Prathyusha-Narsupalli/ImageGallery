<template>
  <div id="app">
    <b-navbar toggleable="sm" type="dark" variant="dark">
      <b-navbar-brand href="#"><b><i>Image Gallery</i></b></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link class="route" to="/">Images</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link class="route" to="/random">Random Image</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>


    <keep-alive include="ImageList">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>

.route {
  font-weight: bold;
  color: rgba(143, 185, 202, 0.959);
}

.nav-link :hover {
  color: white;
  text-decoration: none;
}
</style>
