<template xmlns:Altersfreigabe="http://www.w3.org/1999/xhtml">
  <q-page class="flex-center">



    <div class="q-pa-md doc-container">


    <div class="row items-start" v-model="extMovieArray">

      <div class="col">
        <h3>{{ extMovieArray.title }}</h3>

        <iframe width="560" height="315" :src="videoEmbedLink" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> <p></p>
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
          <span>
             {{getGenres}}
          </span>
        <p></p>
        Erscheinungsdatum: {{extMovieArray.release_date}} <p></p>
        Produktion:
          <span>
            {{getProductionCompanies}}
          </span>
        <p></p>

        Durschnittsbewertung: {{ extMovieArray.vote_average }} von 10.0 <p></p>
        Overview: {{ extMovieArray.overview }}
      </div>

      <div class="col">
        <p></p>
        <q-btn v-if="inWatchList" outline color="primary" label="Watch-List" @click="addToWatchlist(extMovieArray.id, $store.state.auth.isAuthenticated)" type="submit"/>
        <q-btn v-else outline color="primary" label="Lösche aus Watch-List" @click="addToWatchlist(extMovieArray.id, $store.state.auth.isAuthenticated)" type="submit"/>
        <p></p>
        <q-btn outline color="primary" label="Watched-List" @click="addToWatchedlist(extMovieArray.id, $store.state.auth.isAuthenticated)" type="submit"/>
      </div>
    </div>

    </div>



  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: "Moviepage",

  data: function () {
    const state = this.$store.state.user.currentUser
    return {
      extMovieArray: [],
      videoEmbedLink: "",
      inWatchList: false
    }
  },

  async created() {
    console.log(this.extMovieArray)
    console.log("Funktioniert es:  " + await this.checkIfInWatchList(671583))
  },
  async mounted() {

    this.idsearch = this.$route.params.idsearch;
    this.data = await  this.loadData(this.idsearch)
    console.log(this.data)
  },

  watch: {
    $route(to, from) {
      this.show = false;
      this.idsearch = this.$route.params.idsearch;
      this.loadData(this.idsearch)
    }
  },



  computed: {
    ...mapGetters('user', ['currentUser']),
    meta () {
      return {
        id: this.currentUser.id,
      }
    },
    getGenres() {
      if(this.extMovieArray.genres)
      {
        let genresArray = this.extMovieArray.genres.map(genre => genre.name)
        return genresArray.join(", ")
      }
    },
    getProductionCompanies() {
      if(this.extMovieArray.production_companies)
      {
        let productionCompanies = this.extMovieArray.production_companies.map(company => company.name)
        return productionCompanies.join(", ")
      }
    }
  },

  methods: {
    ...mapActions('user', ['updateUserAddWatchlistItem', 'updateUserAddWatchedlistItem', 'checkIfMovieIsInWatchList', 'checkIfMovieIsInWatchedList']),
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


      this.$axios.get(`${api_base_url}${searchid}?api_key=${api_key}&language=de`)

        .then((response) => {
          this.data = response.data
          this.extMovieArray= this.data

          let movie_id
          movie_id = `${this.extMovieArray.id}/videos`

          this.$axios.get(`${api_base_url}${movie_id}?api_key=${api_key}&language=de`)

            .then((response) => {
              const videoKey = response.data.results[0].key
              // only youtube link
              this.videoEmbedLink = `https://www.youtube.com/embed/${videoKey}?autoplay=0&modestbranding=1`
            })

          return this.data

        })
        .catch(() => {

        })
    },
    async addToWatchlist(movieId, authenticated) {
      const { currentUser} = this
      let alreadyIncluded;
      let movieId_temp;
      movieId_temp = movieId
      try {
        alreadyIncluded = await this.checkIfMovieIsInWatchList({
          id: currentUser.id,
          movieId: movieId_temp
        })
      } catch (err) {
        this.$q.notify({
          message: `Fehler bei Testfunktion: ${err}`,
          color: 'negative'
        })
      } finally {
        if (alreadyIncluded) {
          this.$q.notify({
            message: `Der Film ist bereits in deiner Watchlist!`,
            color: 'negative'
          })
          return
        }
        this.$q.loading.hide()
      }
      if(!authenticated) {
        this.$q.notify({
          type: 'negative',
          message: "Für diese Aktion musst du eingeloggt sein!"
        })
      }
      else {
        const { currentUser} = this
        let movieId_temp;
        movieId_temp = movieId
        try {
          await this.updateUserAddWatchlistItem({
            id: currentUser.id,
            movieId: movieId_temp
          })
        } catch (err) {
          this.$q.notify({
            message: `Der Film konnte leider nicht zur Watchlist hinzugefügt werden: ${err}`,
            color: 'negative'
          })
        } finally {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'positive',
            message: "Der Film wurde zu deiner Watch-List hinzugefügt!"
          })
        }
      }
    },
    async addToWatchedlist(movieId, authenticated) {
      const { currentUser} = this
      let alreadyIncluded;
      let movieId_temp;
      movieId_temp = movieId
      try {
        alreadyIncluded = await this.checkIfMovieIsInWatchedList({
          id: currentUser.id,
          movieId: movieId_temp
        })
      } catch (err) {
        this.$q.notify({
          message: `Fehler bei Testfunktion: ${err}`,
          color: 'negative'
        })
      } finally {
        if (alreadyIncluded) {
          this.$q.notify({
            message: `Der Film ist bereits in deiner Watched-List!`,
            color: 'negative'
          })
          return
        }
        this.$q.loading.hide()
      }
      if(!authenticated) {
        this.$q.notify({
          type: 'negative',
          message: "Für diese Aktion musst du eingeloggt sein!"
        })
      }
      else {
        const { currentUser} = this
        let movieId_temp;
        movieId_temp = movieId
        try {
          await this.updateUserAddWatchedlistItem({
            id: currentUser.id,
            movieId: movieId_temp
          })
        } catch (err) {
          this.$q.notify({
            message: `Der Film konnte leider nicht zur Watchlist hinzugefügt werden: ${err}`,
            color: 'negative'
          })
        } finally {
          this.$q.loading.hide()
          this.$q.notify({
            type: 'positive',
            message: "Der Film wurde zu deiner Watched-List hinzugefügt!"
          })
        }
      }
    },

    async checkIfInWatchList(movieId) {
      const { currentUser} = this
      let alreadyIncluded;
      let movieId_temp;
      movieId_temp = movieId
      try {
        alreadyIncluded = await this.checkIfMovieIsInWatchList({
          id: currentUser.id,
          movieId: movieId_temp
        })
      } catch (err) {
        this.$q.notify({
          message: `Fehler bei Testfunktion: ${err}`,
          color: 'negative'
        })
      } finally {
        this.$q.loading.hide()
        if (alreadyIncluded) {
          this.$q.notify({
            message: `Der Film ist bereits in deiner Watchlist!`,
            color: 'negative'
          })
          return true
        }
        else {
          return false
        }

      }
    }


  }
}
</script>

<style scoped>

</style>
