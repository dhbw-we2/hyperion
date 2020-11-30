<template>
  <q-page class="flex-center">
    Movie Page

    <div class="col" v-for="title in extMovieArray">
      {{ title }}
      {{ title.original_title }}
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
