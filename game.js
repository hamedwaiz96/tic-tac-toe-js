const Board = require("./board.js");

const readline = require('readline');
const reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

class Game {
	constructor(){
		let board = new Board();
		this.board = board;
	}

	prompt(reader, callback){
		let board1 = this.board;
		board1.print();
		reader.question(`${board1.current_player}, which row do you want to put your mark?`, ans => {
			const row = parseInt(ans);
			reader.question("Which column?", ans2 => {
				const col = parseInt(ans2);
				callback(row, col);
			});
		});
	}

	run(reader, completionCallback) {
		let game = this;
		let board1 = this.board;
		game.prompt(reader, (row, col) => {
			if(!(board1.place_mark([row, col], board1.current_player))){
				console.log("Wrong position");
				game.run(reader, completionCallback)
			}
			else if(board1.noWin()){
				board1.print();
				console.log("No One Won!");
				completionCallback();
			}
			else if (!(board1.won())){
				board1.switch();
				game.run(reader, completionCallback);
			}
			
			else {
				board1.print();
				console.log(`${board1.current_player} Won!`);
				completionCallback();
			}
		})
	}
}

module.exports = Game;