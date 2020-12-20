<template>
  <q-page class="bg-moviepage flex-center">
    <div class="q-pt-xl  row justify-center items-start" v-model="extMovieArray">
      <q-card class="my-card" inline flat bordered>
        <q-card-section>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Titel
              </q-item-label>
              <q-item-label style="font-size: 50px" class="text-weight-bolder">{{ extMovieArray.title }}</q-item-label>

            </q-item-section>
          </q-item>
        </q-card-section>
<q-separator/>

    <q-card-section horizontal>
      <q-card-section style="width: 50%;">
        <img v-if="extMovieArray.poster_path"
          :src="'https://image.tmdb.org/t/p/w200' + extMovieArray.poster_path"/>
        <img v-else src="../assets/noposter.jpg"/>
      </q-card-section>
      <q-card-section>
        <q-card-section>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Genres
              </q-item-label>
              <q-item-label>{{getGenres}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator/>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Erscheinungsdatum
              </q-item-label>
              <q-item-label>{{extMovieArray.release_date}}</q-item-label>

            </q-item-section>
          </q-item>
          <q-separator/>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Produktion
              </q-item-label>
              <q-item-label>{{getProductionCompanies}}</q-item-label>

            </q-item-section>
          </q-item>
          <q-separator/>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Durschnittsbewertung
              </q-item-label>
              <q-item-label>{{ extMovieArray.vote_average }} von 10.0 </q-item-label>

            </q-item-section>
          </q-item>
          <q-separator/>
          <q-item v-if="extMovieArray.overview">
            <q-item-section>
              <q-item-label caption>
                Overview
              </q-item-label>
              <q-item-label>{{ extMovieArray.overview }}</q-item-label>

            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card-section>

    </q-card-section>
        <q-card-actions>
          <q-btn v-if="!inWatchList" outline color="primary" label="Watch-List" @click="addToWatchlist(extMovieArray.id, $store.state.auth.isAuthenticated)" type="submit" :loading="addingToWatchList"/>
          <q-btn v-else outline color="primary" label="Lösche aus Watch-List" @click="deleteFromWatchList(extMovieArray.id, $store.state.auth.isAuthenticated)" type="submit"/>
          <q-btn v-if="!inWatchedList" outline color="primary" label="Watched-List" @click="addToWatchedlist(extMovieArray.id, $store.state.auth.isAuthenticated)" type="submit" :loading="addingToWatchedList"/>
          <q-btn v-else outline color="primary" label="Lösche aus Watched-List" @click="deleteFromWatchedList(extMovieArray.id, $store.state.auth.isAuthenticated)" type="submit"/>

          <q-space />

          <q-btn v-if="trailerExists" label="Trailer anzeigen"
            color="black"
            round
            flat
            dense
            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded = !expanded"
          />
          <span v-else>Kein Trailer vorhanden!</span>
        </q-card-actions>
        <q-slide-transition>
          <div v-show="expanded">
            <q-separator />
            <q-card-section class="text-subitle2">
              <div class="fluidMedia">
              <iframe :src="videoEmbedLink" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
    </div>
  </q-page>

</template>

<style lang="sass" scoped>
.my-card
  min-width: 70%
  max-width: 80%
  background-color: rgba(90, 168, 220, 0.79)
  border-style: solid
  border-color: black
  border-width: 2px

.fluidMedia
  position: relative
  padding-bottom: 56.25% /* proportion value to aspect ratio 16:9 (9 / 16 = 0.5625 or 56.25%) */
  height: 0
  overflow: hidden



.fluidMedia iframe
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%


</style>

<script>
import { mapActions, mapGetters} from 'vuex'
import {checkIfMovieIsInWatchList} from "src/store/user/actions";

export default {
  name: "Moviepage",

  data: function () {
    const state = this.$store.state.user.currentUser
    return {
      extMovieArray: [],
      videoEmbedLink: "",
      inWatchList: false,
      addingToWatchList: false,
      inWatchedList: false,
      addingToWatchedList: false,
      expanded: false,
      trailerExists: true,
      state
    }
  },

  async created() {
    this.idsearch = this.$route.params.idsearch
    this.inWatchList = await this.checkIfInWatchList(this.idsearch)
    this.inWatchedList = await this.checkIfInWatchedList(this.idsearch)
  },
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
    ...mapActions('user', ['updateUserAddWatchlistItem', 'updateUserAddWatchedlistItem', 'checkIfMovieIsInWatchList', 'checkIfMovieIsInWatchedList', 'updateUserDeleteWatchlistItem', 'updateUserDeleteWatchedlistItem']),
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
            .catch(() => {
                this.trailerExists = false
            })


          return this.data

        })
        .catch(() => {

        })
    },
    async addToWatchlist(movieId, authenticated) {

      let movieId_temp;
      movieId_temp = movieId
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
          this.addingToWatchList = true
          await this.updateUserAddWatchlistItem({
            id: currentUser.id,
            movieId: movieId_temp
          })
          this.$q.notify({
            type: 'positive',
            message: "Der Film wurde zu deiner Watch-List hinzugefügt!"
          })
          this.inWatchList = true
        } catch (err) {
          this.$q.notify({
            message: `Der Film konnte leider nicht zur Watchlist hinzugefügt werden: ${err}`,
            color: 'negative'
          })
        } finally {
          this.$q.loading.hide()
          this.addingToWatchList = false


        }
      }
    },
    async addToWatchedlist(movieId, authenticated) {
      let movieId_temp;
      movieId_temp = movieId
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
          this.addingToWatchedList = true
          await this.updateUserAddWatchedlistItem({
            id: currentUser.id,
            movieId: movieId_temp
          })
          this.inWatchedList = true
        } catch (err) {
          this.$q.notify({
            message: `Der Film konnte leider nicht zur Watchlist hinzugefügt werden: ${err}`,
            color: 'negative'
          })
        } finally {
          this.$q.loading.hide()
          this.addingToWatchedList = false
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
      } finally {
        this.$q.loading.hide()
      }
      return !!alreadyIncluded;

    },

    async checkIfInWatchedList(movieId) {
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

      } finally {
        this.$q.loading.hide()


      }
      return !!alreadyIncluded;
    },

    async deleteFromWatchList(movieId, authenticated) {
      if (!authenticated) {
        this.$q.notify({
          type: 'negative',
          message: "Für diese Aktion musst du eingeloggt sein!"
        })
      } else {
        const {currentUser} = this
        let movieId_temp
        movieId_temp = movieId
        try {
          await this.updateUserDeleteWatchlistItem({
            id: currentUser.id,
            movieId: movieId_temp
          })
          this.$q.notify({
            type: 'positive',
            message: "Der Film wurde aus deiner Watch-List gelöscht!"
          })
          this.inWatchList = false
        } catch (err) {
          this.$q.notify({
            message: `Fehler beim Löschen: ${err}`,
            color: 'negative'
          })
        }
      }
    },

    async deleteFromWatchedList(movieId, authenticated) {
      if (!authenticated) {
        this.$q.notify({
          type: 'negative',
          message: "Für diese Aktion musst du eingeloggt sein!"
        })
      } else {
        const {currentUser} = this
        let movieId_temp
        movieId_temp = movieId
        try {
          await this.updateUserDeleteWatchedlistItem({
            id: currentUser.id,
            movieId: movieId_temp
          })
          this.$q.notify({
            type: 'positive',
            message: "Der Film wurde aus deiner Watched-List gelöscht!"
          })
          this.inWatchedList = false
        } catch (err) {
          this.$q.notify({
            message: `Fehler bei Löschen: ${err}`,
            color: 'negative'
          })
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
