<template>
  <v-app>
    <v-main>
      <loading-indicator/>
      <toast/>
      <router-view/>

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
    //
  }),
};
</script>
