<template>
    <v-container class="pa-1" fluid>
        <v-row align="center" align-content="center" v-if="!!(celltype) && !!(stage_id)">
            <v-col cols="12">
                <v-app-bar flat color="#495689" dark>
                    <v-btn @click="skipTutorial" text>
                        SKIP
                    </v-btn>
                    <v-spacer />
                    <h2 class="timecode">TUTORIAL</h2>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="setting=true">
                        <v-icon>mdi-cog</v-icon>
                    </v-btn>
                </v-app-bar>
            </v-col>
                        </v-row>
        <v-row align="center" align-content="center">
            <v-col class="text-center">
                <TutorialContainer :type="5" :drawmode="drawmode" @completed="gotCompleted" @dropLifeCount="dropLifeCount"></TutorialContainer>
                <div class="resp_switch_wrap" :style="`margin-top:${0.1*w}px`">
                    <v-switch v-model="drawmode" inset class="resp_switch" :style="`transform:scale(${0.003*w})`" :prepend-icon="drawmode?'mdi-pencil':'mdi-close'"></v-switch>
                </div>
            </v-col>
        </v-row>
        <InGameSetting @close="setting=false" :setting="setting"/>
    </v-container>
</template>

<script>
import GameBase from '@/pages/nonogram/'
import TutorialContainer from './components/GameTable-tutorial'
export default {
    name: 'Tutorial',
    extends:GameBase,
    components:{
        TutorialContainer
    },
    data(){
        return{
            steps:0
        }
    },
    computed:{
        celltype(){return 5},
        stage_id(){return 1}
    },
    watch:{
        steps(newval) {
            if(newval === 1){
                this.$sounds.success()
                this.$toast.loading("각 행과 열에 있는 숫자가 퍼즐의 열쇠입니다")
                this.forwardStep(7)
            }
            if(newval === 2){
                this.$sounds.success()
                this.$toast.loading("각 숫자는 연속으로 칠해야하는 칸의 갯수를 의미합니다")
                this.forwardStep(7)
            }
            if(newval === 3){
                this.$sounds.success()
                this.$toast.loading("화면 하단의 스위치를 눌러보세요")
                this.forwardStep(4)
            }
            if(newval === 4){
                this.$sounds.success()
                this.$toast.loading("스위치가 펜모양일때는 화면을 칠 하실 수 있습니다")
                this.forwardStep(10)
            }
            if(newval === 5){
                this.$sounds.success()
                this.$toast.loading("스위치가 가위표(X)일때는 확실히 아닌곳을 X로 표시하실 수 있습니다")
                this.forwardStep(10)
            }
            if(newval === 6){
                this.$sounds.success()
                this.$toast.loading("소리가 거슬리시나요? 화면 상단의 톱니바퀴 버튼을 눌러보세요")
                this.forwardStep(7)
            }
            if(newval === 7){
                this.$sounds.success()
                this.$toast.loading("게임중에 언제든 소리나 진동을 켜고 끌 수 있습니다")
                this.forwardStep(5)
            }
            if(newval === 8){
                this.$sounds.success()
                this.$toast.loading("준비되셨나요? 이제 힌트를 보면서 퍼즐을 풀어 칸을 채워보세요!")
                this.forwardStep(10)
            }
        }
    },
    created(){

    },
    mounted(){
        this.$store.dispatch("setTutorial")
        this.$toast.info("네모네모로직에 오신것을 환영합니다!")
        setTimeout(()=>{
            this.$toast.info("지금부터 게임의 규칙을 설명해드리겠습니다")
            this.forwardStep(4.2)
        },2000)


    },
    beforeDestroy(){
        this.$toast.remove()
    },
    methods:{
        skipTutorial(){
            this.$toast.remove()
            this.$router.replace('/stages/5')
        },
        setTimer(){return false},
        forwardStep(sec){
            setTimeout(()=>{
                this.steps++
            },sec*1000)

        }

    }
}
</script>

<style>

.card-contents{
    margin:0;text-align:center;
}
</style>