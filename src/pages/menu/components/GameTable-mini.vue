<template>
    <table>
        <tr v-for="(row, row_i) in answer" :key="`row-${row_i}`">
            <td v-for="(col, col_i) in row" :key="`col-${col_i}`"  >
                <div :class="`cell-item ${col==true?'got':''}`"/>
            </td>
        </tr>
        <!-- {{answer}} -->
    </table>
</template>
<script>
export default {
    props: [
        'answer',
    ],
}
</script>
<style scoped>
    table {
        height:100%;
        width: 100%;
        border: 3px solid #343434;
        border-collapse: collapse;
    }
    td {
        border: 1px solid #EDEDF2;
        width: 17px;
        height: 17px;
    }
    .cell-item.not {
        width: 100%;;
        height: 100%;;
    }
    .cell-item.got{
        width: 100%;;
        height: 100%;;
        background-color:#344762;
    }
    .cell-item.miss{
        width: 100%;;
        height: 100%;;
        background-color:#e55454;
    }
    .cell-item.exclude{
        width: 100%;;
        height: 100%;;
        background-image: url('~@/assets/game/exclude-marker.png');
        background-size:cover;
    }
</style>