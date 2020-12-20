<template id="movieArray">
  <q-page class="bg-home">
    <q-page v-if="movieArray.title=undefined" class="flex-center">
      test
    </q-page>

    <q-page v-else class="flex-center">
      <div class="q-pa-md doc-container">

        <div class="row items-start flex-center" >
          <div v-for="title in movieArray" >

            <q-img class="border-poster"
                   :src="'https://image.tmdb.org/t/p/w200' + title.poster_path"
                   :alt="title.title"
                   width="200px"
                   height="300px"
                   @click="searchById(title.id)"/>


          </div>
        </div>
        <div class="row justify-center">
        <q-pagination
          v-model="current"
          :max="10"
          :max-pages="6"
          :boundary-numbers="false"/>
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
    },
    current: function () {
      this.loadData()
    },
  },
  name: 'PageHome',
  data: function(){
      return {
        movieArray: [],
        current: 1
      }
  },

  methods: {
    loadData() {
      let currentPage
      currentPage = this.current
      let config
      config = require('../../config.json')
      let api_base_url
      api_base_url = 'https://api.themoviedb.org/3/discover/'
      let api_key
      api_key = config.api_key_movie
      this.$axios.get(`${api_base_url}movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}`)
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

    searchById(movieId) {
      this.$router.replace({name: "searchidresult", params: {idsearch: movieId}}).catch(err => {
      })
    },

    handleBlur(event) {
      const el = event.target
      let config;
      config = require('../../config.json')
      let api_base_url;
      api_base_url = 'https://api.themoviedb.org/3/movie/'
      let api_key;
      api_key = config.api_key_movie
      let movie_id;
      movie_id = el.id
      this.$axios.get('${api_base_url}${movie_id}?api_key=${api_key}&language=de')
        .then((response) => {
          this.data = response.data.results

          return this.data.title
        })
        .catch(() => {

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
