<template>
    <v-container class="pa-1 settings-bg" fluid >
        <v-row align="center" align-content="center">
            <v-col cols="12">
                <v-app-bar flat color="#495689" dark>
                    <v-btn icon @click="$router.push('/dashboard')">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-spacer />
                    {{'SETTINGS'}}
                    <v-spacer></v-spacer>
                </v-app-bar>
            </v-col>
        </v-row>
        <v-row align="center" align-content="center">
            <v-col class="text-center">
                <v-list>
                    <v-list-item style="height:66px">
                        음향효과<v-spacer></v-spacer><v-switch inset :input-value="soundEffect" @change="$store.dispatch('toggleSoundSetting')"></v-switch>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item style="height:66px">
                        어플리케이션 정보<v-spacer></v-spacer><v-icon>mdi-information</v-icon>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item style="height:66px">
                        제작자 <v-spacer></v-spacer>하은-Haeun
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
        <perfect-scrollbar :style="{height:'70vh'}">
            <v-row class="ma-0 mt-0">
                <v-col></v-col>
            </v-row>
        </perfect-scrollbar>
    </v-container>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

export default {
    components:{
        PerfectScrollbar
    },
    data(){
        return{
            typeIndex:0
        }
    },
    computed:{
        soundEffect(){
            return this.$store.getters.sound
        }
    },
    mounted(){
        console.log("이게왜뜨지?")
        this.$bus.$emit("checkAchievement", 7)
    }
}
</script>

<style>
.settings-bg{
    background-color: #edeff4;

}
</style>