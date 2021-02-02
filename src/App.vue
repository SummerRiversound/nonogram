<template>
  <v-app>
    <v-main>
      <loading-indicator/>
      <toast/>
      <router-view :w="appWidth" :h="appHeight"/>

    </v-main>

  </v-app>
</template>

<script>
import LoadingIndicator from './components/loading-indicator';
import Toast from './components/toast'

export default {
  name: 'App',

  components: {
    LoadingIndicator,
    Toast
  },

  data: () => ({
    appWidth:innerWidth,
    appHeight:innerHeight
  }),
  created(){
    window.addEventListener('resize',()=>{
      this.appWidth = window.innerWidth
      this.appHeight = window.innerHeight
    })
  }
};
</script>
