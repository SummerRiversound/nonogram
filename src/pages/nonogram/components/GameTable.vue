<template>
	<div>
	<table>
		<tr v-for="(row, row_i) in answer" :key="`row-${row_i}`">
			<td v-for="(col, col_i) in row" :key="`col-${col_i}`">
				{{col}}
			</td>
		</tr>
	</table>
		{{leftHints}}
		{{topHints}}
	</div>
</template>

<script>
const example = [
	[true, false, false, false, true],
	[false, true, false, true, false],
	[false, false, true, false, false],
	[false, true, false, true, false],
	[true, false, false, false, true]
]
export default {
	props:[
		'type'
	],
	data(){
		return{
			answer:example,
			leftHints:[],
			topHints:[]
		}
	},
	created () {
		this.leftHints = getSideClues(this.answer);
		this.topHints = getTopClues(this.answer);
	},
	methods:{
		getTopClues(solution) {
		  let consecutive = 0;
		  const finalClues = new Array(solution[0].length).fill(true);
		  return finalClues.map((column, colIndex) => {
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
		}
	}
}
</script>