<template id="movieArray">
    <!-- <q-btn dense flat round icon="menu" @click="loadData"/>
    <ul>
      <li v-for="title in movieArray">{{ title.original_title + " und " + title.id }}</li>
    </ul>
    -->
  <q-page  class="flex-center bg-home" >
    <div class="q-pa-md doc-container">

      <div class="row items-start">
        <div
          v-for="title in movieArray"
          class="border-poster-alwon bg-poster-alwon"
          @click="$router.push({ path: title.original_title })"
        >

          <div>
            <q-img
              :src="'https://image.tmdb.org/t/p/w200' + title.poster_path"
              :alt="title.title"
              width="40%"

            >
            </q-img>

            <div>
             Titel:
             {{ title.original_title }}
             <p></p>
             Erscheinungsdatum:
              {{ title.release_date }}
           </div>
          </div>

        </div>
      </div>
    </div>


    <div class="col" v-for="title in movieArray">
      {{ title }}
    </div>
  </q-page>
  <!--</q-page> -->
</template>

<script>
export default {
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
  name: "search",
  data: function () {
    return {
      movieArray: []
    }
  },

  methods: {
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
