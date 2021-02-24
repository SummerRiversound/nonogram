<template>
  <table>
    <tr v-for="(row, row_i) in sideHints" :key="`side-hints-row-${row_i}`">
      <td>
        <span
          v-for="(col, col_i) in row"
          :key="`side-hints-col-${col_i}`"
          class="ma-1"
          :class="checkAnswerWithHint(row_i, col_i) ? 'complete' : ''"
        >
          {{ col }}
        </span>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: ["sideHints", "sideHintsStatus"],
  methods: {
    checkAnswerWithHint(row, col) {
      return (
        !!(this.sideHints[row][col] == this.sideHintsStatus[row][col]) || false
      );
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  height: 100%;
  /* text-align: end; */
}
tr {
  background-color: #eceff7;
}
td {
  text-align: right;
  white-space: nowrap;
  font-size: 12px;
  letter-spacing: -2px;
  /* height: 25px; */
}
.full-h {
  height: 100%;
}
.complete {
  color: darkgrey;
}
</style>