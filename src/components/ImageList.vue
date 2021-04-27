<template>
  <div>

    <div v-if="error == null">

      <div class="print">
        <h5>Limit: {{ limit }}</h5>
      </div>
      <b-container center>
        <input type="text" id="limit" @input="changelimit(limit)" v-model.number="limit" placeholder="Enter number of images u want to see" />
      </b-container>

      <div class="row">
        <div class="gallery col-lg-3 col-md-4 col-sm-6" v-for="image in images" :key="image.id">
          <router-link :to="{ name: 'selectedImage', params: { id: image.id } }">
            <b-img :src="imageSize(image)" class="img-thumbnail focus mb-3"/>
          </router-link>
          <br />
          <router-link class="author text-dark" :to="{ name: 'selectedImage', params: { id: image.id } }">
            <b>{{ image.author }}</b>
          </router-link>
        </div>
      </div>

      <div class="page-buttons">
        <b-button variant="primary" id="prev" :disabled="pageNumber <= 1" @click="previous(); scrollUp();">
          <b>Previous</b>
        </b-button>
        <b-button variant="primary" id="next" @click="next(); scrollUp();">
          <b>Next</b>
        </b-button>
      </div>

    </div>

    <div class="errordisplay" v-else>
      <h1>{{ error.message }}</h1>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"

export default {
  name: "ImageList",
  data() {
    return {
      limit: 30,
      error:null
    };
  },
created() {
   this.$store.dispatch("getImages", this.getpageUrl).catch(err => { this.error=err })
  },
  computed: {
    ...mapGetters({
      pageNumber: "pageNumber",
      getpageUrl: "getUrl",
      images: "getImages"
    }),
  },
  methods: {
    ...mapMutations({
      changelimit: "ChangeLimit",
      next: "nextPage",
      previous: "previousPage",
    }),
    imageSize(image) {
      return image.download_url.substring(0, 24) + "/" + image.id + "/272"
    },
    scrollUp() {
      window.scrollTo(0, 0)
    },
  },
  watch: {
    getpageUrl() {
      this.$store.dispatch("getImages", this.getpageUrl).catch(err => { this.error=err })
    },
  }
};
</script>

<style scoped>
.gallery {
  padding: 50px 40px 0px 40px;
}

.page-buttons {
  padding: 30px 20px 20px 20px;
}
.print {
  text-align: center;
  padding: 20px;
}
#next {
  float: right;
  width: 100px;
}
.errordisplay{
  padding: 100px;
  padding-top:10px;
  text-align: center;
  padding-bottom: 10px;
  color: black;
}
#limit{
  width:100%;
}
</style>