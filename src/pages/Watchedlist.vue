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

          <q-card>
            <q-img :src="'https://image.tmdb.org/t/p/w200' + title.poster_path"
                   height="100%">
              <div class="absolute-bottom">
                <div class="text-h6">{{ title.title }}</div>
                <div class="text-subtitle2">{{ title.release_date }}</div>
              </div>
            </q-img>

          </q-card>


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
  name: "Watchedlist",
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
    ...mapActions('user', ['getWholeWatchedList']),

    searchPosterClick(givenId) {
      this.$router.replace({name: "searchidresult", params: {idsearch: givenId}}).catch(err => {
      })
    },

    async get() {
      const { currentUser} = this
      try {
        this.movieIDs = await this.getWholeWatchedList({
          id: currentUser.id,
        })
      } catch (err) {
        this.$q.notify({
          message: `Fehler beim Holen der Filme: ${err}`,
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

