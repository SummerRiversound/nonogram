<template>
        <table>
            <tr v-for="(row, rowIndex) in sideHints" :key="`side-hints-row-${rowIndex}`">
                <td>
                    <span v-for="(col, colIndex) in row" :key="`side-hints-col-${colIndex}`" class="ma-1">
                        {{col}}
                    </span>
                </td>
            </tr>
        </table>
</template>

<script>
export default {
    props:[
        'sideHints'
    ]

}
</script>

<style scoped>

table{
    width:100%;
    height:100%;
    /* text-align: end; */
}
tr{
    background-color:#ECEFF7
}
td{
    text-align: right;
}
.full-h{
    height:100%;
}
</style>