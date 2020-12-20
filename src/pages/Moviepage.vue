<template>
  <q-page class="bg-moviepage flex-center">
    <div v-model="extMovieArray" class="q-pt-xl  row justify-center items-start">
      <q-card bordered class="my-card" flat inline>
        <q-card-section>
          <q-item>
            <q-item-section>
              <q-item-label caption>
                Titel
              </q-item-label>
              <q-item-label class="text-weight-bolder" style="font-size: 50px">{{ extMovieArray.title }}</q-item-label>

            </q-item-section>
          </q-item>
        </q-card-section>
        <q-separator/>
        <div class="large-screen-only">
          <q-card-section horizontal>
            <q-card-section style="width: 50%;">
              <img v-if="extMovieArray.poster_path"
                   alt="Poster"
                   :src="'https://image.tmdb.org/t/p/w200' + extMovieArray.poster_path"/>
              <img alt="No Poster" v-else src="../assets/noposter.jpg"/>
            </q-card-section>
            <q-card-section>
              <q-card-section>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>
                      Genres
                    </q-item-label>
                    <q-item-label>{{ getGenres }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator/>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>
                      Erscheinungsdatum
                    </q-item-label>
                    <q-item-label>{{ extMovieArray.release_date }}</q-item-label>

                  </q-item-section>
                </q-item>
                <q-separator/>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>
                      Produktion
                    </q-item-label>
                    <q-item-label>{{ getProductionCompanies }}</q-item-label>

                  </q-item-section>
                </q-item>
                <q-separator/>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>
                      Durschnittsbewertung
                    </q-item-label>
                    <q-item-label>{{ extMovieArray.vote_average }} von 10.0</q-item-label>

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
        </div>

        <div class="small-screen-only">
          <q-card-section>
            <q-card-section style="width: 25%;">
              <img alt="Poster" v-if="extMovieArray.poster_path"
                   :src="'https://image.tmdb.org/t/p/w200' + extMovieArray.poster_path"/>
              <img alt="No Poster" v-else src="../assets/noposter.jpg"/>
            </q-card-section>
            <q-card-section>
              <q-card-section>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>
                      Genres
                    </q-item-label>
                    <q-item-label>{{ getGenres }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator/>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>
                      Erscheinungsdatum
                    </q-item-label>
                    <q-item-label>{{ extMovieArray.release_date }}</q-item-label>

                  </q-item-section>
                </q-item>
                <q-separator/>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>
                      Produktion
                    </q-item-label>
                    <q-item-label>{{ getProductionCompanies }}</q-item-label>

                  </q-item-section>
                </q-item>
                <q-separator/>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>
                      Durschnittsbewertung
                    </q-item-label>
                    <q-item-label>{{ extMovieArray.vote_average }} von 10.0</q-item-label>

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
        </div>
        <q-card-actions>
          <q-btn v-if="!inWatchList" :loading="addingToWatchList" color="primary" label="Watch-List"
                 outline type="submit"
                 @click="addToWatchlist(extMovieArray.id, $store.state.auth.isAuthenticated)"/>
          <q-btn v-else color="primary" label="Lösche aus Watch-List" outline
                 type="submit" @click="deleteFromWatchList(extMovieArray.id, $store.state.auth.isAuthenticated)"/>
          <q-btn v-if="!inWatchedList" :loading="addingToWatchedList" color="primary" label="Watched-List"
                 outline type="submit"
                 @click="addToWatchedList(extMovieArray.id, $store.state.auth.isAuthenticated)"/>
          <q-btn v-else color="primary" label="Lösche aus Watched-List" outline
                 type="submit" @click="deleteFromWatchedList(extMovieArray.id, $store.state.auth.isAuthenticated)"/>

          <q-space/>

          <q-btn v-if="trailerExists" :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                 color="black"
                 dense
                 flat
                 label="Trailer anzeigen"
                 round
                 @click="expanded = !expanded"
          />
          <span v-else>Kein Trailer vorhanden!</span>
        </q-card-actions>
        <q-slide-transition>
          <div v-show="expanded">
            <q-separator/>
            <q-card-section class="text-subitle2">
              <div class="fluidMedia">
                <iframe :src="videoEmbedLink" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        frameborder="0"></iframe>
              </div>
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
    </div>
  </q-page>

</template>

<style lang="sass" scoped>

</style>

<script>
import {mapActions, mapGetters} from 'vuex'
import {checkIfMovieIsInWatchList} from "src/store/user/actions";

export default {
  name: "Moviepage",
  /**
   *
   * @returns {{expanded: boolean, addingToWatchList: boolean, inWatchList: boolean, trailerExists: boolean, videoEmbedLink: string, inWatchedList: boolean, state: null, addingToWatchedList: boolean, extMovieArray: []}}
   */
  data() {
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

  /**
   * function to change buttons based on DB state
   * @returns {Promise<void>}
   */
  async created() {
    this.idsearch = this.$route.params.idsearch
    this.inWatchList = await this.checkIfInWatchList(this.idsearch)
    this.inWatchedList = await this.checkIfInWatchedList(this.idsearch)
  },
  /**
   * load movies when page is finished loading
   */
  mounted() {
    this.idsearch = this.$route.params.idsearch;
    this.loadData(this.idsearch)
  },

  watch: {
    /**
     * reload movies on route change
     * @param to
     * @param from
     */
    $route(to, from) {
      this.show = false;
      this.idsearch = this.$route.params.idsearch;
      this.loadData(this.idsearch)
    }
  },


  computed: {
    ...mapGetters('user', ['currentUser']),
    /**
     *
     * @returns {{id: *}} currentUserID
     */
    meta() {
      return {
        id: this.currentUser.id,
      }
    },
    /**
     *
     * @returns {string} genres
     */
    getGenres() {
      if (this.extMovieArray.genres) {
        let genresArray = this.extMovieArray.genres.map(genre => genre.name)
        return genresArray.join(", ")
      }
    },
    /**
     *
     * @returns {string} productionCompanies
     */
    getProductionCompanies() {
      if (this.extMovieArray.production_companies) {
        let productionCompanies = this.extMovieArray.production_companies.map(company => company.name)
        return productionCompanies.join(", ")
      }
    }
  },

  methods: {
    ...mapActions('user', ['updateUserAddWatchlistItem', 'updateUserAddWatchedlistItem', 'checkIfMovieIsInWatchList', 'checkIfMovieIsInWatchedList', 'updateUserDeleteWatchlistItem', 'updateUserDeleteWatchedlistItem']),
    /**
     * function to get movieData from MovieDB
     * @param searchid
     */
    loadData(searchid) {
      if (searchid == null) {
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
          this.extMovieArray = this.data

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

    /**
     * function to add movie to watchlist
     * @param movieId
     * @param authenticated
     * @returns {Promise<void>}
     */
    async addToWatchlist(movieId, authenticated) {

      let movieId_temp;
      movieId_temp = movieId
      if (!authenticated) {
        this.$q.notify({
          type: 'negative',
          message: "Für diese Aktion musst du eingeloggt sein!"
        })
      } else {
        const {currentUser} = this
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

    /**
     * function to add movie to watchedList
     * @param movieId
     * @param authenticated
     * @returns {Promise<void>}
     */
    async addToWatchedList(movieId, authenticated) {
      let movieId_temp;
      movieId_temp = movieId
      if (!authenticated) {
        this.$q.notify({
          type: 'negative',
          message: "Für diese Aktion musst du eingeloggt sein!"
        })
      } else {
        const {currentUser} = this
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

    /**
     * function to check if movie is in Watchlist
     * @param movieId
     * @returns {Promise<boolean>} isInWatchList
     */
    async checkIfInWatchList(movieId) {
      const {currentUser} = this
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


    /**
     * function to check if movie is in WatchedList
     * @param movieId
     * @returns {Promise<boolean>} isInWatchedList
     */
    async checkIfInWatchedList(movieId) {
      const {currentUser} = this
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

    /**
     * function to delete movie form watchList
     * @param movieId
     * @param authenticated
     * @returns {Promise<void>}
     */
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

    /**
     * function to delete movie from watchedList
     * @param movieId
     * @param authenticated
     * @returns {Promise<void>}
     */
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
