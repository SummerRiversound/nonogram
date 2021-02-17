<template>
    <v-container class="pa-1 settings-bg" fluid>
        <v-row>
            <v-col cols="12">
                <v-app-bar flat color="#495689" dark>
                    <v-btn icon @click="$router.go(-1)">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-spacer />
                    {{'SETTINGS'}}
                    <v-spacer></v-spacer>
                </v-app-bar>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="text-center">
                <v-list>
                    <v-list-item style="height:66px">
                        음향효과<v-spacer></v-spacer><v-switch inset :input-value="soundEffect" @change="$store.dispatch('toggleSoundSetting')"></v-switch>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item style="height:66px">
                        진동효과<v-spacer></v-spacer><v-switch inset :input-value="viberateEffect" @change="$store.dispatch('toggleVibrateSetting')"></v-switch>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item style="height:66px">
                        어플리케이션 정보<v-spacer></v-spacer><v-icon>mdi-information</v-icon>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item style="height:66px">
                        제작자 <v-spacer></v-spacer>하은-Haeun
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item style="height:66px">
                        <v-btn block color="error" @click="warning=true">초기화</v-btn>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
        <v-dialog v-model="warning">
            <v-card >
                <v-row class="card-header">
                      <h2 class="card-header-title">WARNING!</h2>
                </v-row>
                <v-row class="card-contents">
                    <v-col col=12 sm=12>
                        <h5 >어플리케이션의 진행상태(클리어기록, 업적기록)를<br>모두 제거하고 초기화합니다<br></h5>
                    </v-col>
                </v-row>
                <v-row class="ma-0 pa-0 text-center">
                    <v-col  class="text-center">
                        <v-btn color='secondray' dark id="btn-to-stages" class="mx-2" @click="warning=false">취소</v-btn>
                        <v-btn color='error' dark id="btn-to-stages" class="mx-2" @click="resetApplication">초기화</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            typeIndex:0,
            warning:false
        }
    },
    computed:{
        soundEffect(){
            return this.$store.getters.sound
        },
        viberateEffect(){
            return this.$store.getters.vibrate
        }
    },
    mounted(){
        this.$bus.$emit("checkAchievement", 7)
    },
    methods:{
        resetApplication(){
            this.$store.dispatch("resetAppSetting")
            this.$store.dispatch("resetUserPlayHistory")
            this.warning = false
            this.$toast.error('어플리케이션이 초기화되었습니다')
            this.$router.replace("/dashboard")
        }
    }
}
</script>

<style scoped>
.settings-bg{
    height:100vh;
    background-color: #edeff4;
}
.card-header{
    height:51px;background:#f2ab60;margin:0;padding:0;margin-bottom:36px;
}
.card-header-title{
    font-size:bold;color:#34383e;font-size:18px;padding-top:12px;padding-left:18px;
}
.card-contents{
    margin:0;padding:0;margin-bottom:10px;text-align:center;
}
.v-main{
  background-color:#EDEFF4
}
</style>