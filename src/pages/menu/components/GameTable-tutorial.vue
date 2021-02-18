<template>
    <div>
        <table class="game_wrapper">
            <tr>
                <td style="width:15vw"></td>
                <td colspan="5" style="width:80vw">
                    <TopHints :topHints="topHints" :topHintsStatus="topHintsStatus"></TopHints>
                </td>
            </tr>
            <tr>
                <td style="width:15vw;height:80vw">
                    <SideHints :sideHints="sideHints" :sideHintsStatus="sideHintsStatus"></SideHints>
                </td>
                <td style="width:83vw;height:80vw">
                    <GameTable :answer="answer" :drawmode="drawmode" @update="updateAnswer" :clicked="clicked"></GameTable>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
import GameTable from '@/pages/nonogram/components/GameTable'
import TopHints from '@/pages/nonogram/components/TopHints'
import SideHints from '@/pages/nonogram/components/SideHints'
// import Sounds from '@/sounds'
const TutorialSolution = [
    [true, true,true,true,true],
    [true, true,true,true,true],
    [false, false, false,false,false],
    [true, true,true,true,true],
    [true, true,true,true,true]
]
export default {
    components:{
        GameTable,
        TopHints,
        SideHints,
    },
    props: [
        'type',
        'drawmode',
    ],
    data() {
        return {
            stage:null,
            solution: [],
            answer: [],
            sideHints: [],
            topHints: [],
            clicked:0,
            sideHintsStatus:[],
            topHintsStatus:[],
            complete: false
        }
    },
    watch:{
        clicked(){
            this.sideHintsStatus = this.getSideClues(this.answer)
            this.topHintsStatus = this.getTopClues(this.answer)
            this.checkComplete(this.answer, this.solution)
        }
    },
    created() {
        this.answer = this.resetAnswer(this.type)
        this.solution = TutorialSolution
        this.sideHintsStatus = this.getSideClues(this.answer)
        this.topHintsStatus = this.getTopClues(this.answer)
        this.sideHints = this.getSideClues(this.solution);
        this.topHints = this.getTopClues(this.solution);
    },
    mounted(){

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
                    if (consecutive && !(cell==1)) {
                        columnClues.push(consecutive);
                        consecutive = 0;
                    }
                    if (cell == 1) {
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
                    if (consecutive && !(cell==1) ) {
                        rowClues.push(consecutive);
                        consecutive = 0;
                    }
                    if (cell == 1) {
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
            if(answer[row][col]===1 || answer[row][col] ===2) return
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
                this.$sounds.success()
                return
            }
            answer[row][col] = 2
            this.$sounds.miss()
            this.$emit("dropLifeCount")
        },
        removeOrExclude(row, col, answer){
            this.$sounds.exclude()
            if(answer[row][col]==3) {
                answer[row][col] = 0
                return
            }
            answer[row][col] = 3
        },
        checkComplete(answer, solution){
            const res = answer.every((row, row_i)=>{
                return row.every((col, col_i)=> col==1?true:false == solution[row_i][col_i] )
            })
            if(res) this.$emit("completed")
        }
    }
}
</script>
<style scoped>
.game_wrapper{
    width:98vw;
}
</style>