<template id="movieArray">
  <q-page class="bg-home">
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
                   @click="handleBlur" placeholder="first name"

            ></q-img>

          </div>
        </div>
      </div>
      <!-- @click="this.loadData" -->
      <!--                   @click="$router.push({ path: title.original_title })"-->
<!--
    <div class="col" v-for="title in movieArray">
      {{ title }}
    </div> -->
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
      return {
        movieArray: []
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
          return this.data.results

        })
        .catch(() => {

        })
    },

    handleBlur(event) {
      const el = event.target
      // do something here
      //console.log('focus was set here')
      let index = this.movieArray.title 
      console.log(index)
    }
  }

}
</script>

<style>
.hover {
  cursor: pointer;
}
</style>
