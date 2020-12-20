<template id="movieArray">
  <q-page class="bg-home">
    <q-page v-if="movieArray.title=undefined" class="flex-center">
      test
    </q-page>

    <q-page v-else class="flex-center">
      <div class="q-pa-md doc-container">

        <div class="row items-start flex-center">
          <div v-for="title in movieArray">

            <q-img :alt="title.title"
                   :src="'https://image.tmdb.org/t/p/w200' + title.poster_path"
                   class="border-poster"
                   height="300px"
                   width="200px"
                   @click="searchById(title.id)"/>


          </div>
        </div>
        <div class="row justify-center">
          <q-pagination
            v-model="current"
            :boundary-numbers="false"
            :max="10"
            :max-pages="6"/>
        </div>

      </div>
    </q-page>

  </q-page>


</template>

<script>

export default {
  name: 'PageHome',
  data() {
    return {
      movieArray: [],
      current: 1
    }
  },
  /**
   * load movies when page is loaded
   */
  mounted() {
    this.loadData()
  },
  watch: {
    /**
     * reload movie when route changes
     * @param to
     * @param from
     */
    $route(to, from) {
      this.show = false;
      this.loadData()
    },
    current: function () {
      this.loadData()
    },
  },



  methods: {
    /**
     * loads movieData from MovieDB
     */
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

    /**
     * search movie by ID on Moviepage
     * @param movieId
     */
    searchById(movieId) {
      this.$router.replace({name: "searchidresult", params: {idsearch: movieId}}).catch(err => {
      })
    },
  }

}
</script>

