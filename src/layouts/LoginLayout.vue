<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
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
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
