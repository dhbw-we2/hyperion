<template>
  <q-page flex-center>
    <q-input v-model="fullName" :placeholder="currentUser.fullName" label="Username"/>
    <q-input v-model="email" :placeholder="currentUser.email" label="Mail" readonly/>
    <q-btn color="primary" label="Profil ändern!" @click="saveUserData"/>
  </q-page>

</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  name: 'UserSettings',
  /**
   * return data
   * @returns {{fullName: string | {description: string, type: string} | string, email: *}}
   */
  data() {
    const state = this.$store.state.user.currentUser
    return {
      email: state.email,
      fullName: state.fullName
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser']),
    /**
     * @returns {{id: *}} currentUserID
     */
    meta() {
      return {
        id: this.currentUser.id,
      }
    },
  },
  methods: {
    ...mapActions('user', ['updateUserData']),
    ...mapMutations('user', ['setEditUserDialog']),
    /**
     * Saves User-Data to FB
     * @returns {Promise<void>}
     */
    async saveUserData() {
      const {currentUser} = this
      let email_temp;
      let fullName_temp;
      email_temp = this.email
      fullName_temp = this.fullName
      this.$q.loading.show({
        message: 'Updating your data, please stand by...',
        customClass: 'text-h3, text-bold'
      })
      try {
        await this.updateUserData({
          id: currentUser.id,
          email: email_temp,
          fullName: fullName_temp,
        })
      } catch (err) {
        this.$q.notify({
          message: `Looks like a problem updating your profile: ${err}`,
          color: 'negative'
        })
      } finally {
        this.$q.loading.hide()
      }
    },
  }
}
</script>

<style scoped>

</style>
