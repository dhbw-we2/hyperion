<template>
  <q-page class="flex-center">
    Trackerlist Page
    <div class="q-pa-md doc-container">

      <div class="row items-start">
        <div
          v-for="title in this.fullMovieArray"
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

          <p></p> <!-- Abstand -->

          <div style="text-align: center">
            <!--Titel:-->
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


  </q-page>

</template>



<style scoped>

</style>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Watchlist",
  data: function () {
    const state = this.$store.state.user.currentUser
    return {
      state,
      movieIDs: 0,
      fullMovieArray: [],
    }
  },
  async mounted() {
    await this.get()
    this.getEveryWatchListMovie()
  },
  computed: {
    ...mapGetters('user', ['currentUser']),
    meta () {
      return {
        id: this.currentUser.id,
      }
    },
  },
  methods: {
    ...mapActions('user', ['getWholeWatchList']),

    searchPosterClick(givenId) {
      this.$router.replace({name: "searchidresult", params: {idsearch: givenId}}).catch(err => {
      })
    },

    async get() {
      const { currentUser} = this
      try {
        this.movieIDs = await this.getWholeWatchList({
          id: currentUser.id,
        })
      } catch (err) {
        this.$q.notify({
          message: `Fehler bei Testfunktion: ${err}`,
          color: 'negative'
        })
      } finally {
        this.$q.loading.hide()


      }
    },

    getEveryWatchListMovie(){
      this.movieIDs.forEach(element => this.loadData(element))

    },

    loadData(searchid) {
      if (searchid == null){
        return
      }
      let config
      config = require('../../config.json')
      let api_base_url
      api_base_url = 'https://api.themoviedb.org/3/movie/'
      let api_key
      api_key = config.api_key_movie


      this.$axios.get(`${api_base_url}${searchid}?api_key=${api_key}&language=de`)
        .then((response) => {
          this.data =response.data
          this.extMovieArray= this.data
          this.fullMovieArray.push(this.data)
        })
        .catch(() => {

        })
    },
  },

}
</script>
