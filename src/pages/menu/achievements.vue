<template>
    <v-container class="pa-1" fluid>
        <v-row align="center" align-content="center">
            <v-col cols="12">
                <v-app-bar flat color="#495689" dark>
                    <v-btn icon @click="$router.push('/dashboard')">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-spacer />
                    {{'ACHIEVEMENTS'}}
                    <v-spacer></v-spacer>
                </v-app-bar>
            </v-col>
        </v-row>

        <v-row align="center" align-content="center">
            <v-col class="text-center bg-logo">

            </v-col>
        </v-row>
        <perfect-scrollbar :style="{height:'65vh'}">
            <v-row class="ma-0 mt-0" :key="refresh">
                <v-col>
                    <v-list>
                    <div v-for="(achieve, index) in achievements" :key="`achidevement-${index}`">
                        <v-divider></v-divider>
                        <v-list-item style="height:66px">
                            <span>
                                <v-img v-if="achievementsStatus[index]" height="60" width="60" contain src="@/assets/achievements/img/2.png"></v-img>
                                <v-img v-else height="60" width="60" contain src="@/assets/achievements/img/1.png"></v-img>
                            </span>
                            {{achieve.name.kr}}

                        </v-list-item>
                        <div class="achieve-detail">{{achieve.detail}}</div>

                    </div>
                </v-list>
                </v-col>
            </v-row>
        </perfect-scrollbar>
    </v-container>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import Achievements from '@/assets/achievements'

export default {
    components:{
        PerfectScrollbar
    },
    data(){
        return{
            typeIndex:0,
            achievements:Achievements,
            refresh:0
        }
    },
    computed: {
        achievementsStatus () {
            return this.$store.getters.achievements
        },
    },
    mounted(){
        this.$bus.$emit("checkAchievement", 6)
        this.refresh++
    }
}
</script>

<style>

.stages-container{
    height:50vh;

}
.bg-logo{
    height:200px;
    background-image: url("~@/assets/achievements/img/logo.png");
    background-position: center;
}
.achieve-detail{
    text-align: right;
    font-size:12px;
    color: #575757;
}
</style>