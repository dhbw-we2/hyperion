<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="large-screen-only bg-primary text-white" elevated height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img alt="movietracker"
                 class="hover"
                 src="../assets/logo.png" @click="$router.push({ path: '/' })"
            >
          </q-avatar>
          movietracker

        </q-toolbar-title>

        <div class="absolute-center" style="min-width: 35%">
          <q-input v-model="search" color="white" dark filled type="search" @keydown.enter.prevent="searchBtnClick">
            <template v-slot:after>
              <q-btn dense flat icon="search" round type="submit" @click="searchBtnClick"/>
            </template>
          </q-input>
        </div>

        <div class="q-pa-md q-gutter-sm">
          <q-btn v-if="$store.state.auth.isAuthenticated" to="/profile">
            <q-avatar
              v-for="size in ['xm']"
              :key="size"
              :size="size"
              color="primary"
              icon="person"
              text-color="white"/>
          </q-btn>
        </div>

        <q-btn v-if="!$store.state.auth.isAuthenticated" color="secondary" dense icon-right="fas fa-sign-in-alt"
               label="Login" to="/auth/login"/>
        <q-btn v-if="$store.state.auth.isAuthenticated" color="secondary" dense icon-right="fas fa-sign-in-alt"
               label="Logout" @click="logout"/>

      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab label="Startseite" to="/"/>
        <q-route-tab label="Watch-List" to="/watchlist"/>
        <q-route-tab label="Watched-List" to="/watchedlist"/>
      </q-tabs>
    </q-header>

    <q-header class="small-screen-only bg-primary text-white" elevated height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img alt="movietracker"
                 class="hover"
                 src="../assets/logo.png" @click="$router.push({ path: '/' })"
            >
          </q-avatar>
          movietracker

        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar>

        <div class="row justify-center" style="margin-bottom: 10px; margin-top: 10px">
          <q-input v-model="search" color="white" dark filled type="search" @keydown.enter.prevent="searchBtnClick">
            <template v-slot:after>
              <q-btn dense flat icon="search" round type="submit" @click="searchBtnClick"/>
            </template>
          </q-input>
        </div>

        <div class="q-pa-md q-gutter-sm">
          <q-btn v-if="$store.state.auth.isAuthenticated" to="/profile">
            <q-avatar
              v-for="size in ['xm']"
              :key="size"
              :size="size"
              color="primary"
              icon="person"
              text-color="white"/>
          </q-btn>
        </div>

        <div class=" row justify-center" style="margin-left: 15px">
          <q-btn v-if="!$store.state.auth.isAuthenticated" color="secondary" dense icon-right="fas fa-sign-in-alt"
                 label="Login" to="/auth/login"/>
          <q-btn v-if="$store.state.auth.isAuthenticated" color="secondary" dense icon-right="fas fa-sign-in-alt"
                 label="Logout" @click="logout"/>
        </div>


      </q-toolbar>

      <q-footer elevated>
        <q-tabs align="left">
          <q-route-tab label="Start" to="/"/>
          <q-route-tab label="Watch-List" to="/watchlist"/>
          <q-route-tab label="Watched-List" to="/watchedlist"/>
        </q-tabs>
      </q-footer>

    </q-header>

    <q-page-container>
      <router-view/>

    </q-page-container>

  </q-layout>
</template>


<script>
import {mapActions} from "vuex"

export default {
  /**
   *
   * @returns {{search: string, right: boolean}}
   */
  data() {
    return {
      right: false,
      search: ''
    }
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),

    /**
     * route to PageSearch with searchtext in route
     */
    searchBtnClick() {
      let searchtext;
      searchtext = this.search;
      this.$router.replace({name: "searchresult", params: {search: searchtext}}).catch(err => {
      })
    },

    /**
     * logout user
     * @returns {Promise<void>}
     */
    async logout() {
      try {
        await this.logoutUser()
        this.$q.notify({
          type: 'info',
          message: "You are now logged out!"
        })
      } catch (err) {
        this.$q.notify({
          type: 'negative',
          message: `${err}`,
        })
      }
    },
  }
}
</script>

<style lang="sass">
.q-toolbar
  @media (min-width: $breakpoint-sm-min)
    height: 77px

.q-toolbar__title
  font-size: 30px
  @media (max-width: $breakpoint-xs-max)
    text-align: center

.q-footer
  .q-tab__icon
    font-size: 30px


</style>
