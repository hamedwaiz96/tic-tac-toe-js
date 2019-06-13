class Board {
	constructor() {
		var grid = new Array(3);
		for(let i = 0; i <= grid.length - 1; i++){
			grid[i] = new Array(3);
		}
		this.grid = grid;
		this.current_player = "X";
		this.DIRS = [[1, 0], [0, 1], [1, 1]];
	}

	won() {
		var board = this;
		for(let i = 0; i <= board.grid.length - 1; i++){
			for(let k = 0; k <= board.grid[i].length - 1; k++){
				for(let x = 0; x <= board.DIRS.length - 1; x++){
					let second_pos = [i + board.DIRS[x][0], k + board.DIRS[x][1]];
					let third_pos = [second_pos[0] + board.DIRS[x][0], second_pos[1] + board.DIRS[x][1]];
					if(!(board.isValidPos(second_pos)) || !(board.isValidPos(third_pos))){
						continue;
					}
					else if((board.grid[i][k] === board.grid[second_pos[0]][second_pos[1]] && board.grid[second_pos[0]][second_pos[1]] === board.grid[third_pos[0]][third_pos[1]]) && (board.grid[i][k] != undefined)){
						return board.grid[i][k];
					}
				}
			}
		}	
		return false;
	}

	winner() {
		if(won()){
			return won();
		}
		else {
			throw "No Winner";
		}
	}

	empty(pos) {
		if(this.grid[pos[0]][pos[1]] == undefined){
			return true;
		}
		return false;
	}

	place_mark(pos, mark) {
		var board = this;
		if(board.isValidPos(pos) && (mark === "X" || mark === "O")){
			board.grid[pos[0]][pos[1]] = mark;
			return true;
		}
		else {
			return false;
		}
	}

	isValidPos(pos){
		if(((pos[0] < 0 || pos[0] > 2) || (pos[1] < 0 || pos[1] > 2)) || !(this.empty(pos))){
			return false;
		}
		return true;
	}

	print() {
		var board = this;
		let printed = ""
		for(let i = 0; i <= board.grid.length - 1; i++){
			for(let k = 0; k <= board.grid[i].length - 1; k++){
				if(board.grid[i][k] == undefined){
					printed += " #";
				}
				else {
					printed += ` ${board.grid[i][k]}`;
				}
				if(k != 2){
					printed += " |"
				}
			}
			if(i != 2){
				printed += "\n-----------\n"
			}
		}
		console.log(printed);
	}

	noWin() {
		let count = 0;
		let board = this;
		for(let i = 0; i <= board.grid.length - 1; i++){
			for(let k = 0; k <= board.grid[i].length - 1; k++){
				if(board.grid[i][k] === "X" || board.grid[i][k] === "O"){
					count += 1;
				}
			}
		}
		if(count === 9 && !(this.won())){
			return true;
		}
		return false;
	}

	switch(){
		this.current_player = (this.current_player === "X") ? "O" : "X";
	}
}

module.exports = Board;