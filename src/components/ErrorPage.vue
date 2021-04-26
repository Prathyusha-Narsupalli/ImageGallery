<template>
  <div class="card mx-auto" style="width: 600px">
    <img
      class="card-img-top"
      src="../assets/PageNotFound.jpg"
      alt="Page Not Found"
    />
    <div class="card-body">
      <center>
        <h3 class="card-text">This Page Doesn't Exist</h3>
        <b-button pill variant="info" to="/">Go To Home Page</b-button>
      </center>
    </div>
  </div>
</template>

<script>
export default {
  name:"ErrorPage"
};
</script>

<style scoped>
</style>