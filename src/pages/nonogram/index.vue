<template>
  <v-container>
	  <GameTable :type="type"></GameTable>
  </v-container>
</template>
<script>
import GameTable from './components/GameTable.vue'
export default {
	components:{
		GameTable
	},
	data(){
		return{
			type: 5
		}
	},

}
</script>
