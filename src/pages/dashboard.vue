<template>
   <v-container fill-height justify-center fluid class="bg-img bg-gradient-animation">
     <div class="elevation-5">
      <v-img width="80vw" src="@/assets/logo.png"></v-img>
     </div>
     <h1 style="color:#24344B">네모네모로직</h1>
    <v-row align="center" justify="center" class="btn-container">
      <v-col cols="10">
        <v-btn block @click="$router.push('/stages/5')" class="elevation-6" dark color="#495689">플레이</v-btn>
      </v-col>
      <v-col cols="10">
        <v-btn block @click="$router.push('/achievements')" class="elevation-6" dark color="#495689">업적</v-btn>
      </v-col>
      <v-col cols="10">
        <v-btn block @click="$router.push('/settings')" class="elevation-6" dark color="#495689">설정</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'Dashboard'

}
</script>

<style>

/* .bg-img{
    background-image: url("/dashboard_bg.jpg");
    background-color: rgba( 255, 255, 255, 0.5 );
} */
/* .bg-gradient-animation{
    background: linear-gradient(140deg, #a73439, #5a1f1f, #ff9090, #e36f74, #a73439, #5a1f1f, #ff9090, #e36f74);
    background-size: 110% 110%;

    -webkit-animation: AnimationName 15s ease infinite;
    -moz-animation: AnimationName 15s ease infinite;
    animation: AnimationName 15s ease infinite;
} */
@-webkit-keyframes AnimationName {
    0%{background-position:0% 5%}
    50%{background-position:100% 96%}
    100%{background-position:0% 5%}
}
@-moz-keyframes AnimationName {
    0%{background-position:0% 5%}
    50%{background-position:100% 96%}
    100%{background-position:0% 5%}
}
@keyframes AnimationName {
    0%{background-position:0% 5%}
    50%{background-position:100% 96%}
    100%{background-position:0% 5%}
}
.bg-card {
    background-color:#A51B37 !important;
}
.css-selector {
    background: linear-gradient(147deg, #a73439, #5a1f1f);
    background-size: 400% 400%;

    -webkit-animation: AnimationName 32s ease infinite;
    -moz-animation: AnimationName 32s ease infinite;
    animation: AnimationName 32s ease infinite;
}

@-webkit-keyframes AnimationName {
    0%{background-position:0% 17%}
    50%{background-position:100% 84%}
    100%{background-position:0% 17%}
}
@-moz-keyframes AnimationName {
    0%{background-position:0% 17%}
    50%{background-position:100% 84%}
    100%{background-position:0% 17%}
}
@keyframes AnimationName {
    0%{background-position:0% 17%}
    50%{background-position:100% 84%}
    100%{background-position:0% 17%}
}
</style>