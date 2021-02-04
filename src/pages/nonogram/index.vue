<template>
    <v-container class="pa-1" fluid>
        <v-row align="center" align-content="center" v-if="!!(celltype) && !!(stage_id)">
            <v-col cols="12">
                <v-app-bar flat color="#495689" dark>
                    <v-btn icon @click="closeGame">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-spacer />
                    <h2 style='font-size:18px;color:white;text-align:center;vertical-align: middle;'>{{timecode}}</h2>
                    <!-- {{celltype+'X'+celltype}} STAGE No.{{stage_id}} -->
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        <v-icon>mdi-cog</v-icon>
                    </v-btn>
                </v-app-bar>
            </v-col>
                        </v-row>
        <v-row align="center" align-content="center">
            <v-col class="text-center">
                <GameContainer :type="celltype" :drawmode="drawmode" :stage_id="stage_id" @completed="gotCompleted"></GameContainer>
                <div class="resp_switch_wrap" :style="`margin-top:${0.1*w}px`">
                    <v-switch v-model="drawmode" inset class="resp_switch" :style="`transform:scale(${0.003*w})`" :prepend-icon="drawmode?'mdi-pencil':'mdi-close'"></v-switch>
                </div>
            </v-col>
        </v-row>
        <v-dialog v-model="complete">
            <v-card >
                <v-row style='height:51px;background:#eff1fa;margin:0;padding:0;margin-bottom:36px;'>
                      <h2 style='font-size:bold;color:#34383e;font-size:18px;padding-top:12px;padding-left:18px;'>{{celltype+'X'+celltype}} STAGE No.{{stage_id}}</h2>
                </v-row>
                <v-row style='margin:0;padding:0;margin-bottom:42px;text-align:center;'>
                    <v-col col=12 sm=12>
                        <h2 style='font-size:15px;color:#505050;text-align:center;vertical-align: middle;'>완료하였습니다!</h2>
                    </v-col>
                </v-row>
                <v-row style='margin:0;padding:0;' class="text-center">
                    <v-col  class="text-center">
                        <v-btn color='#49a0d5' style='color:#fff;width:181px;height:46px;border-radius:25px;' class='btn' @click="$router.push('/stages')">스테이지선택</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import GameContainer from './components/GameContainer.vue'
import Vue from 'vue'
import VueConfetti from 'vue-confetti'
Vue.use(VueConfetti)
export default {
    props:[
        'h',
        'w',
    ],
    components: {
        GameContainer
    },
    data() {
        return {
            // type:5,
            complete: false,
            drawmode:true,
            timecode:''
        }
    },
    created(){
        this.setTimer(500000)
    },
    computed:{
        stage_id(){
            return this.$route.params.stage_id*1
        },
        celltype(){
            return this.$route.params.celltype*1
        }
    },
    watch:{
        drawmode(newval){
            console.log(newval)
        }
    },
    methods:{
        closeGame(){
            if(!confirm("정말 게임을 종료할까요? 진행상태는 저장되지 않습니다")) return
            this.$router.push('/stages')
        },
        gotCompleted(){
            this.$confetti.start()
            setTimeout(()=>{this.$confetti.stop()},1500)


            this.complete = true
        },
        setTimer(time){
            const allSec = time/1000
            const min = allSec/60
            const sec = allSec%60
            this.timecode = `${min} : ${sec}`
            this.runTimer(time)
        },
        runTimer(time){
            let interval = setInterval(()=>{
                this.setTimer(time-1000)
                if(time<1000) clearInterval(interval)
            },1000)
        }
    }

}
</script>
<style>
.resp_switch{
    width:48px;
    padding:0px;
    left:45%;
    position:absolute;
    transform-origin:center center;
}

</style>
