<template>
  <NavComp @city-changed="updateCity"/>
  
  <router-view :selectedCity="selectedCity"></router-view>
</template>

<script>
import NavComp from './components/NavComp.vue'

export default {
  name: 'App',
  components: {
    NavComp
  },
  data() {
    return {
      selectedCity: "Moscow",
    };
  },
  methods: {
    updateCity(city) {
      this.selectedCity = city;
    },
  },
}
</script>

<style>
#app{
  /* background-color: #ffd8d4a6; */
  background-color: #fff;
  height: auto;
}
</style>
