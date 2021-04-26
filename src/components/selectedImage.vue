<template>
<div>
  <div v-if="loading && error==null " style="text-align: center">
    <div class="spinner-border"></div>
    <span class="sr-only">Loading...</span>
    <h3 class="text-dark pt-4">Loading</h3>
  </div>

  <div class="errordisplay" v-else-if="error!=null">
   <h1>{{error.message}}</h1>
   </div>

  <div v-else>
    <center>
      <img :src=imageSize(image) class="img-thumbnail display" />
      <br />
      <h3 @click="author(image.url)" id="test-author">
        Author: <b>{{ image.author }}</b>
      </h3>
      <h3>
        Image Id: <b>{{ image.id }}</b>
      </h3>
      <br />
      <button @click="download" class="btn btn-primary">
        <b>Download Image</b>
      </button>
    </center>
  </div>
</div>
</template>

<script>
import { mapGetters} from 'vuex'

export default {
  props: ["id"],
  data() {
    return {
      loading: true,
      error:null
    };
  },
  created() {
    this.$store.dispatch("getImageById", this.id).catch(err => { this.error=err})

  },
  methods: {

      download(){
        this.$store.dispatch("DownloadImage", this.image).catch(err => { this.error=err})
      },
    author(url) {
      window.open(url);
    },
    imageSize(image){
      return image.download_url.substring(0,24)+'/'+image.id+'/600'
    },
  },
  computed: {

    ...mapGetters({
  image:'getImageById'
  })
  },
  watch: {
    image() {
      this.loading = false;
    },
  }
};
</script>

<style scoped>
.display {
  margin: 25px 0px 5px 0px;
}
h3 {
  margin: 15px 0px 0px 0px;
}
.spinner-border {
  width: 65px;
  height: 65px;
  margin-top: 240px;
}
.errordisplay{
    text-align: center;
    color: black;
    padding: 100px;
}
</style>