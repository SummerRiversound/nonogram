<template>
        <v-snackbar
        @click="removeToast"
        :timeout="toast.type=='loading'?-1:3000"
        :color="toast.color"
        elevation="5"
        tile
        v-model="toast.show">
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
    methods:{
        removeToast(){
            this.$store.dispatch("removeToast")
        }
    }

}
</script>

<style>

</style>