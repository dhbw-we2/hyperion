<template>
  <q-page class="float-left">
<div style="min-width: 500px">
    <q-list bordered separator>
      <q-item clickable v-ripple>
        <q-item-section>
          Poster 1
          <q-img src="https://images-na.ssl-images-amazon.com/images/I/71Zy0yoxrdL._AC_SL1023_.jpg" class="rounded-borders"> </q-img>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          Poster 2
          <q-img src="https://images-na.ssl-images-amazon.com/images/I/51Q7Psa2ufL._AC_.jpg" class="rounded-borders"> </q-img>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          Poster 3
          <q-img src="https://images-na.ssl-images-amazon.com/images/I/61pHNnq9dpL._AC_SL1200_.jpg" class="rounded-borders"> </q-img>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          Poster 4
          <q-img src="https://images-na.ssl-images-amazon.com/images/I/71aL85dFDIL._AC_SY550_.jpg" class="rounded-borders"> </q-img>
        </q-item-section>
      </q-item>
    </q-list>
</div>

    <template>
      <div class="q-pa-md">
        <div class="q-col-gutter-md row items-start">
          <div class="col-10">
            <q-img
              src="https://images-na.ssl-images-amazon.com/images/I/71Zy0yoxrdL._AC_SL1023_.jpg"
              style="width: 100%"
            >
              <div class="absolute-bottom text-subtitle1 text-center">
                Caption
              </div>
            </q-img>
          </div>

          <div class="col-10">
            <q-img src="https://images-na.ssl-images-amazon.com/images/I/51Q7Psa2ufL._AC_.jpg">
              <div class="absolute-top text-center">
                Caption
              </div>
            </q-img>
          </div>

          <div class="col-10">
            <q-img src="https://images-na.ssl-images-amazon.com/images/I/61pHNnq9dpL._AC_SL1200_.jpg">
              <div class="absolute-bottom-right text-subtitle2">
                Caption
              </div>
            </q-img>
          </div>

          <div class="col-10">
            <q-img src="https://images-na.ssl-images-amazon.com/images/I/71aL85dFDIL._AC_SY550_.jpg">
              <div class="absolute-full text-subtitle2 flex flex-center">
                Caption
              </div>
            </q-img>
          </div>
        </div>
      </div>
    </template>


  </q-page>


</template>

<script>
export default {
  name: 'PageHome'
}
</script>
