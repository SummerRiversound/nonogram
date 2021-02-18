<template>
    <v-container class="pa-1" fluid>
        <v-row align="center" align-content="center" v-if="!!(celltype) && !!(stage_id)">
            <v-col cols="12">
                <v-app-bar flat color="#495689" dark>
                    <v-btn icon @click="warning = true">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-spacer />
                    <h2 class="timecode">{{timecode}}</h2>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="setting=true">
                        <v-icon>mdi-cog</v-icon>
                    </v-btn>
                </v-app-bar>
            </v-col>
                        </v-row>
        <v-row align="center" align-content="center">
            <v-col class="text-center">
                <GameContainer :type="celltype" :drawmode="drawmode" :stage_id="stage_id" @completed="gotCompleted" @dropLifeCount="dropLifeCount"></GameContainer>
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
         <v-dialog v-model="warning">
            <v-card >
                <v-row class="warning-card-header">
                      <h2 class="warning-card-header-title">WARNING!</h2>
                </v-row>
                <v-row class="card-contents">
                    <v-col col=12 sm=12>
                        <h5 >정말 게임을 종료할까요? 진행상태는 저장되지 않습니다<br></h5>
                    </v-col>
                </v-row>
                <v-row class="ma-0 pa-0 text-center">
                    <v-col  class="text-center">
                        <v-btn color='secondray' dark id="warning-btn-to-stages" class="mx-2" @click="warning=false">취소</v-btn>
                        <v-btn color='error' dark id="warning-btn-to-stages" class="mx-2" @click="closeGame">스테이지종료</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
         <v-dialog v-model="failed">
            <v-card >
                <v-row class="warning-card-header">
                      <h2 class="warning-card-header-title">FAILED...</h2>
                </v-row>
                <v-row class="card-contents">
                    <v-col col=12 sm=12>
                        <h5>세번이상 틀리어 클리어에 실패하였습니다<br>다시 도전할까요?</h5>
                    </v-col>
                </v-row>
                <v-row class="ma-0 pa-0 text-center">
                    <v-col  class="text-center">
                        <v-btn color='error' dark id="warning-btn-to-stages" class="mx-2" @click="closeGame">스테이지종료</v-btn>
                        <v-btn color='secondray' dark id="warning-btn-to-stages" class="mx-2" @click="$router.go()">다시하기</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
        <InGameSetting @close="setting=false" :setting="setting"/>

    </v-container>
</template>
<script>
import GameContainer from './components/GameContainer.vue'
import Vue from 'vue'
import VueConfetti from 'vue-confetti'
import InGameSetting from '@/pages/menu/InGameSetting'
Vue.use(VueConfetti)
export default {
    props:[
        'h',
        'w',
    ],
    components: {
        GameContainer,
        InGameSetting
    },
    data() {
        return {
            life:3,
            failed:false,
            warning:false,
            complete: false,
            drawmode:true,
            timecode:'',
            counter:0,
            setting:false
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
        },
        warning(newval){
            if(newval) this.$sounds.warning()
        },
        complete(newval){
            if(newval) this.$sounds.clear()
        },
        failed(newval){
            if(newval) this.$sounds.failed()
        }
    },
    methods:{
        closeGame(){
            this.$router.push('/stages/'+this.celltype)
            // this.$router.go(-1)
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
                if(time<0){
                    this.$bus.$emit("checkAchievement", 4)
                    this.failed=true
                    clearInterval(interval)
                }
                if( this.complete) clearInterval(interval)
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
        dropLifeCount(){
            console.log(this.life)
            if(this.life){
                this.life --
                if(!this.life){
                    this.failed=true
                }

            }


        }

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
.warning-card-header{
    height:51px;background:#f2ab60;margin:0;padding:0;margin-bottom:36px;
}
.warning-card-header-title{
    font-size:bold;color:#34383e;font-size:18px;padding-top:12px;padding-left:18px;
}
.warning-card-contents{
    margin:0;padding:0;margin-bottom:10px;text-align:center;
}

</style>
