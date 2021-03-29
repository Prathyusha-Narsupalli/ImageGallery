<template>
  <div class="display">
    <div class="heading">
      <h3>Image</h3>
    </div>

    <div v-if="loading && error==null ">
      <div class="spinner-border"></div>
      <span class="sr-only">Loading...</span>
      <h3 class="text-dark pt-4">Loading</h3>
    </div>
    
    <div class="errordisplay" v-else-if="error!=null">
   <h1>{{error.message}}</h1>
   </div>

    <div v-else>
      <img :src="imageurl" class="img-thumbnail" />
    </div>
  </div>
</template>

<script>
import { getRandomImage } from "../services/ApiCalls";


export default {
  name: "RandomImage",
  data() {
    return {
      imageurl: "",
      loading: true,
      error:null
    };
  },
  created() {
    
    getRandomImage("https://picsum.photos/600").then((res) => {
      this.imageurl = res.request.responseURL;
      this.loading = false;
    }).catch(err => {
            this.error=err
        })
  },
};
</script>
<style scoped>
.heading {
  padding: 30px;
  color: black;
}
.display {
  text-align: center;
}

.spinner-border {
  width: 65px;
  height: 65px;
  margin-top: 120px;
}

.errordisplay{
    text-align: center;
    color: black;
    padding: 100px;
}
</style>