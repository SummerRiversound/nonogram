<template>
  <table>
      <tr>
          <td v-for="(row, rowIndex) in topHints" :key="`top-hints-row-${rowIndex}`">
              <div v-for="(col, colIndex) in row" :key="`top-hints-col-${colIndex}`">
                  {{col}}
              </div>
        </td>
      </tr>
  </table>
</template>

<script>
export default {
    props:[
        'topHints'
    ]

}
</script>

<style scoped>

table{
    width:100%
}
td{
    text-align: center;
    background-color:#ECEFF7;
    /* width: 50px; */
}
</style>