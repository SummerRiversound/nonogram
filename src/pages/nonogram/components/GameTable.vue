<template>
    <table>
        <tr v-for="(row, row_i) in answer" :key="`row-${row_i}`">
            <td v-for="(col, col_i) in row" :key="`col-${col_i}`" @v-touch="{
                move: () => touchCellEvnt(row_i, col_i,$event)
            }">
                <div :class="`cell-item ${checkCellType(col)}`"  :row="row_i" :col="col_i" />
            </td>
        </tr>
    </table>
</template>
<script>
import CellType from './cell_type.js'
export default {
    props: [
        'type',
        'answer'
    ],
    created() {
        console.log(this.answer)
    },
    methods: {
        checkCellType(cell) {
            return CellType[cell]
        },
        // clickCellEvt(row_i, col_i,evt) {
        //     if(!evt.which) return
        //     this.$emit("update", {
        //         row: row_i,
        //         col: col_i
        //     })
        // },
        touchCellEvt(row_i, col_i,evt) {
            console.log(evt)
            // console.log(evt.target.attributes.row.value)
            // console.log(evt.target.attributes.col.value)
            console.log(row_i)
            console.log(col_i)
            this.$emit("update", {
                row: row_i,
                col: col_i
            })
        },
        onMouseDown(evt) {

            //if()
            this.startPoint = {
                x: evt.pageX,
                y: evt.pageY
            }
            // Start listening for mouse move and up events
            // window.addEventListener('mousemove', this.onMouseMove)
            this.$refs.cell.$on('mousemove',this.onMouseMove)
            // window.addEventListener('mouseup', this.onMouseUp, {
            //     once: true
            // })
        },
        onMouseMove(evt) {
            // Update the end point position
            if (this.mouseDown) {
                this.endPoint = {
                    x: evt.pageX,
                    y: evt.pageY
                }
                const children = this.$children.length ?
                    this.$children :
                    this.$el.children
                if (children) {
                    // const selected = Array.from(children).filter((item) => {
                    //     return this.isItemSelected(item.$el || item)
                    // })
                    console.log(children)
                    // If shift was held during mousedown the new selection is added to the current. Otherwise the new selection
                    // will be selected
                }
            }
        },
        onMouseUp() {
            // Clean up event listeners
            window.removeEventListener('mousemove', this.onMouseMove)
            // window.removeEventListener('mouseup', this.onMouseUp)
            // Reset state
            // this.mouseDown = false
            // this.concat = false
            // this.startPoint = null
            // this.endPoint = null
        },
        dragged() {
            console.log('드래그')
        },
        dragenter() {
            console.log('드래그엔터')
        },
        clickStop() {
            console.log('클릭스탑')
        }
    }
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
        width: 50px;
        height: 50px;
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