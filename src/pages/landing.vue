<template>
    <div>
    </div>
</template>
<script>
export default {
    name: 'Landing',
    mounted() {
        try {
            this.$router.push('dashboard')
        } catch(error) {
            if(this.$route.path!= '/login') this.$router.push("login")
        }
    }
}
</script>

<style>

</style>