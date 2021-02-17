<template>
    <v-container class="pa-1" fluid>
        <v-row align="center" align-content="center">
            <v-col cols="12">
                <v-app-bar flat color="#495689" dark>
                    <v-btn icon @click="$router.push('/dashboard')">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-spacer />
                    {{'SELECT STAGES'}}
                    <v-spacer></v-spacer>
                    <v-btn icon @click="settingDialog=true">
                        <v-icon>mdi-cog</v-icon>
                    </v-btn>
                </v-app-bar>
            </v-col>
        </v-row>
        <v-row align="center" align-content="center">
            <v-col class="text-center">
                <v-btn-toggle v-model="typeIndex" mandatory>
                    <v-btn @click="$router.replace('/stages/5')">
                        5X5
                    </v-btn>
                    <v-btn  @click="$router.replace('/stages/10')">
                        10X10
                    </v-btn>
                    <v-btn  @click="$router.replace('/stages/15')">
                        15X15
                    </v-btn>
                </v-btn-toggle>
            </v-col>
        </v-row>
        <perfect-scrollbar :style="{height:'70vh'}">
            <v-row class="ma-0 mt-0" v-if="!!(type)" :key="refresh">
                <v-col v-for="(stage, index) in stages[type]" :key="`stage-${index}`" class="mt-10"
                    min-width="100">

                    <div class="stage-wrapper" v-if="stagesStatus[type][index]"
                        @click="$router.push(`/nonogram/${type}/${index+1}`)" >
                        <div class="stage-title">
                            {{stage['name']['kr']}}
                        </div>
                        <GameTable :answer="stage['solution']"/>
                    </div>
                    <div class="stage-wrapper" v-else
                        @click="$router.push(`/nonogram/${type}/${index+1}`)" >
                        <div class="stage-title">
                            {{notClearedTitle(stage['name']['kr'].length)}}
                        </div>
                        <GameTable :answer="[[true]]"/>
                    </div>
                </v-col>

            </v-row>
        </perfect-scrollbar>
        <v-dialog v-model="settingDialog" fullscreen transition="fade">
            <Settings></Settings>
        </v-dialog>
    </v-container>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

import Settings from '@/pages/menu/settings'
import GameTable from './components/GameTable-mini'
import Stages from '@/assets/stages'
export default {
    name:'Stages',
    components:{
        GameTable,
        PerfectScrollbar,
        Settings
    },
    data(){

        return{
            stages: Stages,
            typeIndex:0,
            refresh:0,
            settingDialog:false
        }
    },
    created(){
        this.typeIndex = this.celltype
    },
    mounted(){
        this.refresh++
    },
    computed:{
        type(){
            return (this.typeIndex+1)*5
        },
        stagesStatus () {
            return this.$store.getters.stages
        },
        celltype(){
            return (this.$route.params.celltype/5)-1
        },
    },
    methods:{
        notClearedTitle(length){
            let title = ""
            for(let i =0; i<length ; i++){
                title+="?"
            }
            return title

        }
    }
}
</script>

<style>

.stages-container{
    height:50vh;
}
.stage-wrapper{
    width:92vw;
    height:92vw;
}
.stage-title{
    text-align:center;
    font-size:2rem;

}

</style>