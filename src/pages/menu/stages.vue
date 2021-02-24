<template>
  <v-container class="pa-1" fluid>
    <v-row align="center" align-content="center">
      <v-col cols="12">
        <v-app-bar flat color="#495689" dark>
          <v-btn icon @click="$router.push('/dashboard')">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-spacer />
          {{ "SELECT STAGES" }}
          <v-spacer></v-spacer>
          <v-btn icon @click="setting = true">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </v-app-bar>
      </v-col>
    </v-row>
    <v-row align="center" align-content="center">
      <v-col class="text-center">
        <v-btn-toggle v-model="typeIndex" mandatory>
          <v-btn @click="$router.replace('/stages/5')"> 5X5 </v-btn>
          <v-btn @click="$router.replace('/stages/10')"> 10X10 </v-btn>
          <v-btn @click="$router.replace('/stages/15')"> 15X15 </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <perfect-scrollbar :style="{ height: '80vh' }">
      <v-row class="ma-0 mt-0" v-if="!!type">
        <v-col
          v-for="(stage, index) in stages[type]"
          :key="`stage-${index}`"
          class="mt-10 stages-wrapper"
          min-width="100"
        >
          <div
            class="stage-wrapper"
            v-if="stagesStatus[type][index]"
            :ref="`stage-${index}`"
            tabindex="0"
            @click="$router.push(`/nonogram/${type}/${index + 1}`)"
          >
            <div class="stage-title">
              {{ stage["name"]["kr"] }}
            </div>
            <GameTable :answer="stage['solution']" :key="refresh" />
          </div>
          <div
            class="stage-wrapper"
            v-else
            @click="$router.push(`/nonogram/${type}/${index + 1}`)"
            :ref="`stage-${index}`"
            tabindex="0"
          >
            <div class="stage-title">
              {{ notClearedTitle(stage["name"]["kr"].length) }}
            </div>
            <GameTable :answer="[[true]]" :key="refresh" />
          </div>
        </v-col>
      </v-row>
    </perfect-scrollbar>
    <InGameSetting @close="setting = false" :setting="setting" />
  </v-container>
</template>

<script>
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

import InGameSetting from "@/pages/menu/InGameSetting";
import GameTable from "./components/GameTable-mini";
import Stages from "@/assets/stages";
export default {
  name: "Stages",
  components: {
    GameTable,
    PerfectScrollbar,
    InGameSetting,
  },
  data() {
    return {
      setting: false,
      stages: Stages,
      typeIndex: 0,
      refresh: 0,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
  created() {
    this.typeIndex = this.celltype;
  },
  mounted() {
    if (!this.hasPlayTutorial) this.$router.push("/tutorial");
    try {
      if (this.prevRoute.params.stage_id) {
        this.$refs[`stage-${this.prevRoute.params.stage_id - 1}`][0].focus();
      }
    } catch (e) {
      console.log(e);
    }
    // this.refresh++
  },
  computed: {
    type() {
      return (this.typeIndex + 1) * 5;
    },
    stagesStatus() {
      return this.$store.getters.stages;
    },
    celltype() {
      return this.$route.params.celltype / 5 - 1;
    },
    hasPlayTutorial() {
      return this.$store.getters.tutorial;
    },
  },
  methods: {
    notClearedTitle(length) {
      let title = "";
      for (let i = 0; i < length; i++) {
        title += "?";
      }
      return title;
    },
  },
};
</script>

<style scoped>
.stages-container {
  height: 50vh;
}
.stage-wrapper {
  width: 92vw;
  height: 92vw;
}
.stage-title {
  text-align: center;
  font-size: 2rem;
}
.stages-wrapper {
  transform: scale(0.8);
}
div:focus {
  outline: 0;
}
</style>