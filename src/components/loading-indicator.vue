<template>
    <div class="loading">
        <v-progress-circular
        v-if="loading"
        :size="70"
        :width="9"
        color="primary"
        indeterminate
        ></v-progress-circular>
    </div>
</template>

<script>
export default {
    computed:{
        loading(){
            return this.$store.getters.loading
        }
    }
}
</script>

<style>
.loading {
    z-index: 999;
    position:fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
}
</style>