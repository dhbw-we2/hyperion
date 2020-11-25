<template>
  <q-page  flex-center>
    <q-input v-model="fullName" label="Username" :placeholder="currentUser.fullName" hint="With placeholder" />
    <q-input v-model="email" label="Mail" :placeholder="currentUser.email" hint="With placeholder" readonly/>
    <q-btn color="primary" label="Profil ändern!" @click="saveUserData" />
  </q-page>

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'UserSettings',
  data () {
    const state = this.$store.state.user.currentUser
    return {
      email: state.email,
      fullName: state.fullName,
    }
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
    ...mapActions('user', ['updateUserData']),
    ...mapMutations('user', ['setEditUserDialog']),
    async saveUserData () {
      const { currentUser} = this
      const { email1 } = "test123@gmx.de"
      const { fullName1 } = "gabriel"
      this.$q.loading.show({
        message: 'Updating your data, please stand by...',
        customClass: 'text-h3, text-bold'
      })
      try {
        await this.updateUserData({
          id: currentUser.id,
          email: email1,
          fullName: fullName1,
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
