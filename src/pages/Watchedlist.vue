<template>
  <q-page class="bg-watchlist flex-center">

    <div class="q-pa-md doc-container">
      <div class="row items-start flex-center" >
        <div v-for="title in this.fullMovieArray"
             @click="searchPosterClick(title.id)">

          <q-img v-if="title.poster_path" class="border-poster"
                 :src="'https://image.tmdb.org/t/p/w200' + title.poster_path"
                 :alt="title.title"
                 width="200px"
                 height="300px"
          >
            <div class="absolute-bottom">
              <div class="text-h6">{{ title.title }}</div>
              <div class="text-subtitle2">{{ title.release_date }}</div>
            </div>
          </q-img>

          <q-img v-else class="border-poster"
                 src="../assets/noposter.jpg"
                 :alt="title.title"
                 width="200px"
                 height="300px"
          >
            <div class="absolute-bottom">
              <div class="text-h6">{{ title.title }}</div>
              <div class="text-subtitle2">{{ title.release_date }}</div>
            </div>
          </q-img>


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

