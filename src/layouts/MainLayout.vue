<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
            <q-avatar>
              <img @click="$router.push({ path: '../home' })"
                   class="hover"
                   src="../assets/icon_1.png" alt="Hier wäre ein Bild"
              >
            </q-avatar>
          Filmtracker

        </q-toolbar-title>
        <!--       <q-input dark v-model="search" filled type="search" color="white">
                  <template v-slot:append>
                    <q-btn class="btn">
                    <q-icon name="search" />
                    </q-btn>
                  </template>
                </q-input>-->
        <div class="absolute-center" style="min-width: 35%">
          <q-input dark v-model="search" filled type="search" color="white">
            <template v-slot:after>
              <q-btn round dense flat icon="search" @click="searchBtnClick" type="submit"/>
            </template>
          </q-input>
        </div>
        <q-btn v-if="!$store.state.auth.isAuthenticated" dense color="secondary" icon-right="fas fa-sign-in-alt"
               label="Login" to="/auth/login"/>
        <q-btn v-if="$store.state.auth.isAuthenticated" dense color="secondary" icon-right="fas fa-sign-in-alt"
               label="Logout" @click="logout"/>
        <q-btn dense flat round icon="menu" @click="right = !right"/>

      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/home" label="Startseite"/>
        <q-route-tab to="/searcher" label="Suche"/>
        <q-route-tab to="/trackerlist" label="Eigene Liste"/>
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="right" side="right" elevated>
      <!-- drawer content -->

      <div>

        <q-list>
          <q-item clickable v-ripple to="/profile">
            <q-item-section>Mein Profil</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>Wunschliste</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>Einstellungen</q-item-section>
          </q-item>

        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view/>

    </q-page-container>

  </q-layout>
</template>

<script>
import {mapActions} from "vuex"

export default {
  data() {
    search: ''
    return {
      right: false
    }
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    searchBtnClick() {
      let searchtext;
      searchtext = this.search;
      this.$router.replace({name: "searchresult", params: {search: searchtext}}).catch(err => {
      })
    },
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
    }
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
