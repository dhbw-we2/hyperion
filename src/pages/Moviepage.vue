<template xmlns:Altersfreigabe="http://www.w3.org/1999/xhtml">
  <q-page class="flex-center">



    <div class="q-pa-md doc-container">


    <div class="row items-start" v-model="extMovieArray">

      <div class="col">
        <h3>{{ extMovieArray.title }}</h3>

        <div v-model="video">
          <iframe width="560" height="315" src=this.video></iframe> <p></p>
        </div>

<!--        <iframe width="560" height="315" src="https://www.youtube.com/embed/SUXWAEX2jlg?autoplay=1&modestbranding=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> <p></p> -->
      </div>

      <div class="col">
        <q-img
          :src="'https://image.tmdb.org/t/p/w200' + extMovieArray.poster_path"
          alt="poster"
          width="50%"
          height="40%"
        >
        </q-img>
      </div>

    </div>

    <div class="row">
      <div class="col">
        <span v-if="extMovieArray.adult = 'false'">
          Altersfreigabe: keine
        </span>
        <span v-else>
          Altersfreigabe: {{extMovieArray.adult}}
        </span>
        <p></p>
        Genres:
          <span v-for="name in extMovieArray.genres" :key="name">
             {{name.name }},
          </span>
        <p></p>
        Erscheinungsdatum: {{extMovieArray.release_date}} <p></p>
        Produktion:
          <span v-for="name in extMovieArray.production_companies" :key="name">
            {{name.name }},
          </span>
        <p></p>

        Durschnittsbewertung: {{ extMovieArray.vote_average }} von 10.0 <p></p>
        Overview: {{ extMovieArray.overview }}
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
      let movie_id_url
      movie_id_url = 550
      let movie_id
      movie_id = '{movie_id_url}/videos'


      this.$axios.get(`${api_base_url}${searchid}?api_key=${api_key}&language=de`)

        .then((response) => {
          this.data = response.data
          this.extMovieArray= this.data

          this.$axios.get(`${api_base_url}${movie_id}?api_key=${api_key}&language=de`)

            .then((response) => {
              this.video = response.data
              console.log("Hallo" + this.video)
              //return this.video
            })

          return this.data

        })
        .catch(() => {

        })
    }
  }
}
</script>

<style scoped>

</style>
