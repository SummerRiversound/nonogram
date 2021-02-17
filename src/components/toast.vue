<template>
        <v-snackbar
        @input="removeToast"
        :timeout="toast.type=='loading'?-1:3000"
        :color="toast.color"
        elevation="5"
        tile
        :value="toast.show">
        {{toast.message}}
        </v-snackbar>
</template>

<script>
export default {
    computed: {
        toast () {
            return this.$store.getters.toast
        },
    },
    watch:{
        // toast() {
        //     console.log("없어짐")
        //     this.removeToast()
        // }
    },
    methods:{
        removeToast(obj){
            console.log(obj)
            console.log("클릭됨")
            this.$store.dispatch("removeToast")
            console.log(this.toast)
        }
    }

}
</script>

<style>

</style>