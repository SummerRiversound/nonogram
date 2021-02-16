<template>
    <v-container class="pa-1" fluid>
        <v-row align="center" align-content="center" v-if="!!(celltype) && !!(stage_id)">
            <v-col cols="12">
                <v-app-bar flat color="#495689" dark>
                    <v-btn icon @click="closeGame">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-spacer />
                    <h2 class="timecode">{{timecode}}</h2>
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
                <v-row class="card-header">
                      <h2 class="card-header-title">{{celltype+'X'+celltype}} STAGE No.{{stage_id}}</h2>
                </v-row>
                <v-row class="card-contents">
                    <v-col col=12 sm=12>
                        <h2 id="dialog-msg">완료하였습니다!</h2>
                    </v-col>
                </v-row>
                <v-row class="ma-0 pa-0 text-center">
                    <v-col  class="text-center">
                        <v-btn color='#49a0d5' id="btn-to-stages" @click="$router.push('/stages/'+celltype)">스테이지선택</v-btn>
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
            timecode:'',
            counter:0,
            // sec:0
        }
    },
    created(){
        this.setTimer(this.celltype)
        this.runCounterForAchievement()
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
            this.$router.push('/stages/'+this.celltype)
        },
        gotCompleted(){
            const payload ={
                type: this.celltype,
                index: this.stage_id-1
            }
            this.$store.dispatch("setStageClear",payload)
            this.$bus.$emit("checkAchievement", 0)
            if(payload.type==5){
                this.$bus.$emit("checkAchievement", 1)
            }
            if(payload.type==10){
                this.$bus.$emit("checkAchievement", 2)
            }
            if(payload.type==15){
                this.$bus.$emit("checkAchievement", 3)
            }
            this.$confetti.start()
            setTimeout(()=>{this.$confetti.stop()},1500)
            this.complete = true
        },
        setTimer(type){
            let time = 180000
            if(type == 5) time = 120000
            if(type == 10) time = 180000
            if(type == 15) time = 300000
            this.runTimer(time)
        },
        runTimer(param){
            let time = param
            let interval = setInterval(()=>{
                const allSec = time/1000
                const min = parseInt((allSec%3600)/60)
                const sec = (allSec%60).toString().length==2 ?(allSec%60).toString():'0'+(allSec%60).toString()
                this.timecode = `${min} : ${sec}`
                time -= 1000
                if(time<0 || this.complete) {
                    if(time<0)  this.$bus.$emit("checkAchievement", 4)

                    clearInterval(interval)
                    }
            },1000)
        },
        runCounterForAchievement(){
            let interval = setInterval(()=>{
                this.counter ++
                if(this.counter>3600){
                    this.$bus.$emit("checkAchievement", 5)
                    clearInterval(interval)
                }

            },1000)
        },

    }

}
</script>
<style scoped>
.resp_switch{
    width:48px;
    padding:0px;
    left:45%;
    position:absolute;
    transform-origin:center center;
}
#btn-to-stages{
    color:#fff;
    width:180px;
    height:45px;
    border-radius:25px;
}
.timecode{
    font-size:18px;
    color:white;
    text-align:center;
    vertical-align: middle;
}
.card-header{
    height:51px;background:#eff1fa;margin:0;padding:0;margin-bottom:36px;
}
.card-header-title{
    font-size:bold;color:#34383e;font-size:18px;padding-top:12px;padding-left:18px;
}
.card-contents{
    margin:0;padding:0;margin-bottom:42px;text-align:center;
}

</style>
