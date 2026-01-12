/**
 * Simulate game interactions 
 */
import Game from "./game.js";

function rollSequence(game: Game, rolls: number[]) {
	for (const pins of rolls) {
		game.roll(pins);
	}
}

function playGame() {
	// Scenario 1: Perfect game (12 strikes)
	console.log("Scenario: Perfect game");
	let game = new Game();
	rollSequence(game, Array(12).fill(10));
	game.printGame();

	// Scenario 2: Gutter game (all zeros)
	console.log("\nScenario: Gutter game");
	game = new Game();
	rollSequence(game, Array(20).fill(0));
	game.printGame();

	// Scenario 3: Mixed game (example rolls)
	console.log("\nScenario: Mixed game");
	game = new Game();
	const mixedRolls = [1,4, 4,5, 6,4, 5,5, 10, 0,1, 7,3, 6,4, 10, 2,8,6];
	rollSequence(game, mixedRolls);
	game.printGame();
}

playGame();