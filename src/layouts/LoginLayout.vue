<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-primary text-white" elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img alt="Hier wäre ein Bild"
                 class="hover"
                 src="../assets/logo.png" @click="$router.push({ path: '/' })"
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
