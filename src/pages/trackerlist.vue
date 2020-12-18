<template>
    <q-page  class="flex-center bg-searcher" >
      <div class="q-pa-md doc-container">

        <div class="row items-start">
          <div
          v-for="title in movieArray"
          class="q-pa-ma bg-movie-image"
          @click="searchPosterClick(title.id)"
        >

          <div style="width:45%">
            <q-img
              :src="'https://image.tmdb.org/t/p/w200' + title.poster_path"
              :alt="title.title"
              width="120%"

            >
            </q-img>
          </div>

          <p></p> <!-- Abstand -->

            <div style="text-align: center">
              <!--Titel:-->
              {{ title.title }}
              <p></p>
              <div style="font-size: 80%">
                Erscheinungsdatum:
                {{ title.release_date }}
                <p></p>
                Movie-ID: {{ title.id }}
              </div>
            </div>


          </div>
        </div>
      </div>



    </q-page>


</template>

<script>
export default {

}
</script>

<style scoped>

</style>
