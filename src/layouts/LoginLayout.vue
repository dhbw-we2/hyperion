<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img @click="$router.push({ path: '/' })"
                 class="hover"
                 src="../assets/logo.png" alt="Hier wäre ein Bild"
            >
          </q-avatar>
          movietracker
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
