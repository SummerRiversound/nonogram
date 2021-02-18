<template>
<div></div>
</template>

<script>
import Achievements from '@/assets/achievements'

export default {
    computed:{
        stagesStatus () {
            return this.$store.getters.stages
        },
        achievementsStatus(){
            return this.$store.getters.achievements
        }
    },
    created(){
        this.$bus.$on("checkAchievement", this.checkAchievement)
    },
    methods:{
        checkAchievement(target_i){
            console.log(target_i,"여기는 들어옴")
            if(this.achievementsStatus[target_i]) return
            if((target_i>3 || target_i==0)&& Achievements[target_i].func()){
                console.log(target_i,"여기도 들어옴")
                this.$store.dispatch("setAchievementClear", target_i)
                this.$toast.success(`'${Achievements[target_i].name.kr}' 달성`)
                this.$sounds.achieve()
            }
            if(target_i>0 && Achievements[target_i].func(this.stagesStatus)){
                this.$store.dispatch("setAchievementClear", target_i)
                this.$toast.success(`'${Achievements[target_i].name.kr}' 달성`)
                this.$sounds.achieve()
            }

        },
    }
}
</script>

<style>

</style>