<template id="movieArray">

  <q-page class="bg-home flex-center bg-searcher">
    <div class="q-pa-md doc-container">
      <div class="row items-start flex-center">
        <div v-for="title in movieArray"
             @click="searchPosterClick(title.id)">

          <q-img v-if="title.poster_path" :alt="title.title"
                 :src="'https://image.tmdb.org/t/p/w200' + title.poster_path"
                 class="border-poster"
                 height="300px"
                 width="200px"
          >
            <div class="absolute-bottom">
              <div class="text-h6">{{ title.title }}</div>
              <div class="text-subtitle2">{{ title.release_date }}</div>
            </div>
          </q-img>

          <q-img v-else :alt="title.title"
                 class="border-poster"
                 height="300px"
                 src="../assets/noposter.jpg"
                 width="200px"
          >
            <div class="absolute-bottom">
              <div class="text-h6">{{ title.title }}</div>
              <div class="text-subtitle2">{{ title.release_date }}</div>
            </div>
          </q-img>

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

</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      movieArray: []
    }
  },
  /**
   * load movies by searchID from route
   */
  mounted() {
    this.search = this.$route.params.search;
    this.loadData(this.search)
  },
  watch: {
    /**
     * reload movieData when route changes
     * @param to
     * @param from
     */
    $route(to, from) {
      this.show = false;
      this.search = this.$route.params.search;
      this.loadData(this.search)
    }
  },


  methods: {
    /**
     * load Moviepage with the current movieID
     * @param givenId
     */
    searchPosterClick(givenId) {
      this.$router.replace({name: "searchidresult", params: {idsearch: givenId}}).catch(err => {
      })
    },

    /**
     * load searchData from MovieDB
     * @param searchtext
     */
    loadData(searchtext) {
      if (searchtext == null) {
        return
      }
      let config;
      config = require('../../config.json')
      let api_base_url;
      api_base_url = 'https://api.themoviedb.org/3/search/'
      let api_key;
      api_key = config.api_key_movie
      this.$axios.get(`${api_base_url}movie?api_key=${api_key}&query=${searchtext}&language=de`)
        .then((response) => {
          this.data = response.data
          this.data.results.forEach(function (entry) {
          })
          this.movieArray = this.data.results
          return this.data.results

        })
        .catch(() => {

        })
    }
  }
}
</script>
