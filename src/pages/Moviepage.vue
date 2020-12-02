<template>
  <q-page class="flex-center">


    <div class="col" v-for="title in extMovieArray">
      {{ title }}
      {{ title.original_title }}
    </div>
    <div class="q-pa-md doc-container">


    <div class="row items-start">
      <div class="col">
        <h3>Movie Titel</h3>
      </div>

      <div class="col">
        <q-img
          src="../assets/bg_grid_search.jpg"
          alt="Nix"
          width="50%"
          height="40%"
        >
        </q-img>
      </div>
    </div>

    <div class="row">
      <div class="col">
        Altersfreigabe: keine <p></p>
        Genres: Abenteuer, Fantasy <p></p>
        Erscheinungsdatum: XX.XX.XXXX <p></p>
        Durschnittsbewertung: X.X <p></p>
        Overview: blablablablubbblablablablubbblablablablubbblablablablubbblablablablubbblablablablubbblablablablubb
        blablablablubbblablablablubbblablablablubbblablablablubbblablablablubbblablablablubbblablablablubbblablablablubb
      </div>

      <div class="col">
        <p></p>
        <q-btn outline color="primary" label="Watch-List" @click="$router.push({ path: '../trackerlist' })" type="submit"/>
        <p></p>
        <q-btn outline color="primary" label="Watched-List" @click="$router.push({ path: '../trackerlist' })" type="submit"/>
      </div>
    </div>

    </div>



  </q-page>
</template>

<script>
export default {
  name: "Moviepage",

  mounted() {
    this.idsearch = this.$route.params.idsearch;
    this.loadData(this.idsearch)
  },

  watch: {
    $route(to, from) {
      this.show = false;
      this.idsearch = this.$route.params.idsearch;
      this.loadData(this.idsearch)
    }
  },

  data: function () {
    return {
      extMovieArray: []
    }
  },

  methods: {
    loadData(searchid) {
      if (searchid == null){
        return
      }
      let config;
      config = require('../../config.json')
      let api_base_url;
      api_base_url = 'https://api.themoviedb.org/3/movie/'
      let api_key;
      api_key = config.api_key_movie
      this.$axios.get(`${api_base_url}${searchid}?api_key=${api_key}`)

        .then((response) => {
          this.data = response.data
          this.data.results.forEach(function (entry) {
          })
          this.extMovieArray = this.data.results
          return this.data.results

        })
        .catch(() => {

        })
    }
  }
}
</script>

<style scoped>

</style>
