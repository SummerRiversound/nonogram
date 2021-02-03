<template>
    <v-container class="pa-1" fluid>
        <v-row align="center" align-content="center">
            <v-col cols="12">
                <v-app-bar flat>
                    <v-btn icon @click="closeGame">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-spacer />
                    {{complete?'축하합니다!':''}}
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        <v-icon>mdi-cog</v-icon>
                    </v-btn>
                </v-app-bar>
                <GameContainer :type="type" :drawmode="drawmode" :stage_id="stage_id" @completed="gotCompleted"></GameContainer>
                <div class="resp_switch_wrap" :style="`margin-top:${0.1*w}px`">
                    <v-switch v-model="drawmode" inset class="resp_switch" :style="`transform:scale(${0.003*w})`" :prepend-icon="drawmode?'mdi-pencil':'mdi-close'"></v-switch>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import GameContainer from './components/GameContainer.vue'
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
            type: 5,
            complete: false,
            drawmode:true
        }
    },
    created(){
    },
    computed:{
        stage_id(){
            return this.$route.params.stage_id
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
            this.complete = true
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
