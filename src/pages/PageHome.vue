<template>
  <q-page>

    <div class="q-pa-md doc-container">

      <div class="row items-start">

        <div class="col">
          Poster 1
          <q-img @click="$router.push({ path: 'camera' })"
                 src="https://images-na.ssl-images-amazon.com/images/I/71Zy0yoxrdL._AC_SL1023_.jpg"
                 class="hover rounded-borders"></q-img>
        </div>

        <div class="col">
          Poster 2
          <q-img src="https://images-na.ssl-images-amazon.com/images/I/51Q7Psa2ufL._AC_.jpg"
                 class="rounded-borders"></q-img>
        </div>

        <div class="col">
          Poster 3

          <q-img src="https://images-na.ssl-images-amazon.com/images/I/61pHNnq9dpL._AC_SL1200_.jpg"
                 class="rounded-borders"></q-img>
        </div>

        <div class="col">
          Poster 4
          <q-img src="https://images-na.ssl-images-amazon.com/images/I/71aL85dFDIL._AC_SY550_.jpg"
                 class="rounded-borders"></q-img>
        </div>

        <div class="col">
          <div class="row">
            Poster 5
            <q-img src="https://images-na.ssl-images-amazon.com/images/I/510hYySJ6HL._AC_.jpg"
                   class="rounded-borders"></q-img>
          </div>
          <div class="row">
            Poster 11
            <q-img src="https://images-na.ssl-images-amazon.com/images/I/61pHNnq9dpL._AC_SL1200_.jpg"
                   class="rounded-borders"></q-img>
          </div>
        </div>

        <div class="col">
          Poster 6
          <q-img src="https://images-na.ssl-images-amazon.com/images/I/5184-DjkaVL._AC_.jpg"
                 class="rounded-borders"></q-img>
        </div>

      </div>
    </div>


  </q-page>


</template>

<script>

export default {
  name: 'PageHome',
  async created() {

  }

}
</script>

<style>
.hover {
  cursor: pointer;
}
</style>
