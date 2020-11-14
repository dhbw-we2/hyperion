<template>
  <q-page class="flex-center">
    Trackerlist Page
    <q-btn dense flat round icon="menu" @click="loadData"/>
    <ul>
      <li v-for="title in movieArray">{{ title.original_title + "und" + title.id }}</li>
    </ul>

  </q-page>

</template>

<script>
export default {
  mounted() {
    console.log("Route Changed")
    this.search = this.$route.params.search;
    console.log("Parameter " + this.search)
    this.loadData(this.search)
  },
  watch: {
    $route(to, from) {
      this.show = false;
      console.log("Route Changed")
      this.search = this.$route.params.search;
      console.log("Parameter " + this.search)
      this.loadData(this.search)
    }
  },
  name: "trackerlist",
  data: function () {
    return {
      movieArray: []
    }
  },

  methods: {
    loadData(searchtext) {
      let config;
      config = require('../../config.json')
      let api_base_url;
      api_base_url = 'https://api.themoviedb.org/3/search/'
      let api_key;
      api_key = config.api_key_movie
      this.$axios.get(`${api_base_url}movie?api_key=${api_key}&query=${searchtext}&language=de`)
        .then((response) => {
          this.data = response.data
          console.log(this.data)
          console.log(this.data.results[0].original_title)
          this.data.results.forEach(function (entry) {
            console.log(entry.original_title)
          })
          this.movieArray = this.data.results
          return this.data.results

        })
        .catch(() => {
          console.log("Failed")

        })
    }
  }
}
</script>

<style scoped>

</style>
