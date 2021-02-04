<template>
  <table>
      <tr>
          <td v-for="(row, row_i) in topHints" :key="`top-hints-row-${row_i}`">
              <div v-for="(col, col_i) in row" :key="`top-hints-col-${col_i}`" :class="checkAnswerWithHint(row_i, col_i)?'complete':''">
                  {{col}}
              </div>
        </td>
      </tr>
  </table>
</template>

<script>
export default {
    props:[
        'topHints',
        'topHintsStatus'
    ],
    methods:{
        checkAnswerWithHint(row, col){
            return !!(this.topHints[row][col] == this.topHintsStatus[row][col])
        }
    }

}
</script>

<style scoped>

table{
    width:100%
}
td{
    text-align: center;
    background-color:#ECEFF7;
    width: 50px;
    font-size:12px;
    letter-spacing:-2px;
}
.complete{
    color:darkgrey
}
</style>