<template id="movieArray">

  <q-page  class="flex-center bg-home" >
    <div class="q-pa-md doc-container">

      <div class="row items-start">
        <div
          v-for="title in movieArray"
          class="q-pa-ma bg-movie-image"
          @click="searchPosterClick(title.id)"
        >

          <div style="width:45%">
            <q-img
              :src="'https://image.tmdb.org/t/p/w200' + title.poster_path"
              :alt="title.title"
              width="120%"

            >
            </q-img>
          </div>

            <div style="text-align:center">
                Titel:
                {{ title.title }}
                <p></p>
             <div style="font-size: 80%">
               Erscheinungsdatum:
              {{ title.release_date }}
              <p></p>
              Movie-ID: {{ title.id }}
             </div>
           </div>


        </div>
      </div>
       </div>


        <div class="col" v-for="title in movieArray">
          {{ title }}
        </div>
  </q-page>

</template>

<script>
export default {
  name: "search",
  mounted() {
    this.search = this.$route.params.search;
    this.loadData(this.search)
  },
  watch: {
    $route(to, from) {
      this.show = false;
      this.search = this.$route.params.search;
      this.loadData(this.search)
    }
  },
  data: function () {
    return {
      movieArray: []
    }
  },


  methods: {
    searchPosterClick(givenId) {
      this.$router.replace({name: "searchidresult", params: {idsearch: givenId}}).catch(err => {
      })
    },

    loadData(searchtext) {
      if (searchtext == null){
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
