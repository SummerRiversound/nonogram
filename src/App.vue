<template>
  <v-app class="off-drag">
    <v-main>
      <transition
      name="fade"
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter">
      <router-view :w="appWidth" :h="appHeight"/>
      </transition>
      <achievements-listner/>
      <loading-indicator/>
      <toast/>
    </v-main>

  </v-app>
</template>

<script>
import LoadingIndicator from './components/loading-indicator';
import Toast from './components/toast'
import AchievementsListner from './components/achievements-listner'

export default {
  name: 'App',

  components: {
    LoadingIndicator,
    Toast,
    AchievementsListner
  },

  data: () => ({
    appWidth: innerWidth,
    appHeight: innerHeight
  }),
  created() {
    window.addEventListener('resize', () => {
      this.appWidth = window.innerWidth
      this.appHeight = window.innerHeight
    })
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);
      element.style.height = this.prevHeight;
      setTimeout(() => {
        element.style.height = height;
      });
    },
  }
};
</script>
<style>

.off-drag{
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}



.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>