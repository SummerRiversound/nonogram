<template>
  <table
    :key="clicked"
    @touchmove="touchGameTableEvt"
    @touchend="resetLastClick"
  >
    <tr v-for="(row, row_i) in answer" :key="`row-${row_i}`">
      <td
        v-for="(col, col_i) in row"
        :key="`col-${col_i}`"
        @mousemove="dragCellEvt(row_i, col_i, $event)"
        @mouseup="resetLastClick"
        @click.once="clickCellEvt(row_i, col_i, $event)"
      >
        <div
          :class="`cell-item ${checkCellType(col)}`"
          :row="row_i"
          :col="col_i"
        />
      </td>
    </tr>
  </table>
</template>
<script>
import CellType from "./cell_type.js";
export default {
  props: ["type", "answer", "clicked"],
  data() {
    return {
      lastClick: {
        row: -1,
        col: -1,
      },
    };
  },
  methods: {
    checkCellType(cell) {
      return CellType[cell];
    },
    clickCellEvt(row_i, col_i, evt) {
      if (!evt.which) return;
      this.$emit("update", {
        row: row_i,
        col: col_i,
      });
    },
    dragCellEvt(row_i, col_i, evt) {
      if (this.lastClick.row == row_i && this.lastClick.col == col_i) return;
      if (!evt.which) return;
      this.lastClick = { row: row_i, col: col_i };
      this.$emit("update", {
        row: row_i,
        col: col_i,
      });
    },
    touchGameTableEvt(evt) {
      const point = {
        x: evt.changedTouches[0].clientX,
        y: evt.changedTouches[0].clientY,
      };
      const target = window.document.elementFromPoint(point.x, point.y);
      if (!!target && target.classList.contains("cell-item")) {
        const row = target.attributes.row.value;
        const col = target.attributes.col.value;
        if (this.lastClick.row == row && this.lastClick.col == col) return;
        this.lastClick = { row: row, col: col };
        this.$emit("update", {
          row: row,
          col: col,
        });
      }
    },
    isItemSelected(el, point) {
      if (el.classList.contains("cell-item")) {
        const box = {
          top: el.offsetTop,
          left: el.offsetLeft,
          width: el.clientWidth,
          height: el.clientHeight,
        };
        return !!(
          point.x >= box.left &&
          point.x <= box.left + box.width &&
          point.y >= box.top &&
          point.y <= box.top + box.height
        );
      }
      return false;
    },
    resetLastClick() {
      this.lastClick = {
        row: -1,
        col: -1,
      };
    },
  },
};
</script>
<style scoped>
table {
  height: 100%;
  width: 100%;
  border: 3px solid #343434;
  border-collapse: collapse;
}
td {
  border: 1px solid #ededf2;
  width: 27px;
  /* height: 27px; */
}
.cell-item.not {
  width: 100%;
  height: 100%;
}
.cell-item.got {
  width: 100%;
  height: 100%;
  background-color: #344762;
}
.cell-item.miss {
  width: 100%;
  height: 100%;
  background-color: #e55454;
}
.cell-item.exclude {
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/game/exclude-marker.png");
  background-size: cover;
}
</style>