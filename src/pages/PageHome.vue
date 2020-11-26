<template id="movieArray">
  <q-page class="bg-home">
<!--
    <div class="q-pa-md doc-container">

      <div class="row items-start">

        <div class="col">
          Poster 1
          <q-img @click="$router.push({ path: 'searcher' })"
                 src="https://images-na.ssl-images-amazon.com/images/I/71Zy0yoxrdL._AC_SL1023_.jpg"
                 class="hover rounded-borders"></q-img>
        </div>

        <div class="col">
          Poster 2
          <q-img src="https://images-na.ssl-images-amazon.com/images/I/51Q7Psa2ufL._AC_.jpg"
                 class="rounded-borders"></q-img>
        </div>

        <div class="col">
          Poster 3

          <q-img src="https://images-na.ssl-images-amazon.com/images/I/61pHNnq9dpL._AC_SL1200_.jpg"
                 class="rounded-borders"></q-img>
        </div>

        <div class="col">
          Poster 4
          <q-img src="https://images-na.ssl-images-amazon.com/images/I/71aL85dFDIL._AC_SY550_.jpg"
                 class="rounded-borders"></q-img>
        </div>

        <div class="col">
          <div class="row">
            Poster 5
            <q-img src="https://images-na.ssl-images-amazon.com/images/I/510hYySJ6HL._AC_.jpg"
                   class="rounded-borders"></q-img>
          </div>
          <div class="row">
            Poster 11
            <q-img src="https://images-na.ssl-images-amazon.com/images/I/61pHNnq9dpL._AC_SL1200_.jpg"
                   class="rounded-borders"></q-img>
          </div>
        </div>

        <div class="col">
          Poster 6
          <q-img src="https://images-na.ssl-images-amazon.com/images/I/5184-DjkaVL._AC_.jpg"
                 class="rounded-borders"></q-img>
        </div>

      </div>
    </div>-->

    <q-page v-if="movieArray.title=undefined" class="flex-center">
      test
    </q-page>

    <q-page v-else class="flex-center">
      <div class="q-pa-md doc-container">

        <div class="row items-start">
          <div v-for="title in movieArray">


            <q-img class="border-poster"
                   :src="'https://image.tmdb.org/t/p/w200' + title.poster_path"
                   :alt="title.title"
                   width="200px"
                   @click="$router.push({ path: title.original_title })"
            ></q-img>


          </div>
        </div>
      </div>


    <div class="col" v-for="title in movieArray">
      {{ title }}
    </div>
    </q-page>

  </q-page>


</template>

<script>

export default {
  // actually displays the movie cover
  mounted() {
    this.loadData()
  },
  watch: {
    $route(to,from){
      this.show = false;
      this.loadData()
    }
  },
  name: 'PageHome',
  data: function(){
    return{
      movieArray:[]
    }
  },
  //async created() {},
/*  async beforeCreate() {
    this.search = this.$route.params.search;
    this.loadData(this.search)
  },*/

  methods: {
    loadData() {
      let config;
      config = require('../../config.json')
      let api_base_url;
      api_base_url = 'https://api.themoviedb.org/3/discover/'
      let api_key;
      api_key = config.api_key_movie
      this.$axios.get(`${api_base_url}movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
        .then((response) => {
          this.data = response.data
          this.data.results.forEach(function (entry) {
          })
          this.movieArray = this.data.results
          console.log("test function")
          return this.data.results

        })
        .catch(() => {
          console.log("test catch")
        })
    }
  }

}
</script>

<style>
.hover {
  cursor: pointer;
}
</style>
