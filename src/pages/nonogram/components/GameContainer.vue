<template>
    <div>
        <!-- <Hints :sideHints="leftHints" :topHints="topHints"></Hints> -->
        <table class="game_wrapper">
            <tr>
                <td style="width:18vw"></td>
                <td colspan="5" style="width:80vw">
                    <TopHints :topHints="topHints"></TopHints>
                </td>
            </tr>
            <tr>
                <td style="width:18vw;height:80vw">
                    <SideHints :sideHints="sideHints"></SideHints>
                </td>
                <td style="width:80vw;height:80vw">
                    <GameTable :answer="answer" :drawmode="drawmode" @update="updateAnswer" :key="clicked"></GameTable>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
import GameTable from './GameTable'
import TopHints from './TopHints'
import SideHints from './SideHints'
import Stages from '@/assets/stages/index'


export default {
    components:{
        GameTable,
        TopHints,
        SideHints,
    },
    props: [
        'type',
        'drawmode',
        'stage_id',

    ],
    data() {
        return {
            stage:null,
            solution: [],
            answer: [],
            sideHints: [],
            topHints: [],
            clicked:0
        }
    },
    created() {
        this.answer = this.resetAnswer(this.type)
        this.stage = Stages[this.type][this.stage_id-1]
        this.solution = this.stage.solution
        this.sideHints = this.getSideClues(this.stage.solution);
        this.topHints = this.getTopClues(this.stage.solution);
    },
    methods: {
        resetAnswer(type){
            return new Array(type)
                .fill(0)
                .map(()=>{
                    return new Array(type).fill(0)
                })
        },
        getTopClues(solution) {
            let consecutive = 0;
            const finalClues = new Array(solution[0].length).fill(true);
            return finalClues.map((col, colIndex) => {
                const columnClues = [];
                solution.forEach((row, rowIndex) => {
                    const cell = row[colIndex];
                    if (consecutive && !cell) {
                        columnClues.push(consecutive);
                        consecutive = 0;
                    }
                    if (cell) {
                        consecutive += 1;
                    }
                    if (rowIndex === solution.length - 1) {
                        if (consecutive || !columnClues.length) {
                            columnClues.push(consecutive);
                        }
                    }
                });
                consecutive = 0;
                return columnClues;
            });
        },
        getSideClues(solution) {
            return solution.map((row) => {
                let consecutive = 0;
                const rowClues = [];
                row.forEach((cell, index) => {
                    if (consecutive && !cell) {
                        rowClues.push(consecutive);
                        consecutive = 0;
                    }
                    if (cell) {
                        consecutive += 1;
                    }
                    if (index === row.length - 1) {
                        if (consecutive || !rowClues.length) {
                            rowClues.push(consecutive);
                        }
                    }
                });
                consecutive = 0;
                return rowClues;
            });
        },
        updateAnswer({row, col}){
            const solution = this.solution
            const answer = this.answer
            if(this.drawmode) {
                this.checkAnswer(row, col, solution, answer)
                this.clicked++
                return
            }
            this.removeOrExclude(row, col, answer)
            this.clicked++

        },
        checkAnswer(row, col, solution, answer){
            if(solution[row][col]){
                answer[row][col] = 1
                return
            }
            answer[row][col] = 2


        },
        removeOrExclude(row, col, answer){
            if(answer[row][col]==3) {
                answer[row][col] = 0
                return
            }
            answer[row][col] = 3

        }
    }
}
</script>
<style scoped>
.game_wrapper{

    width:98vw;
}
</style>