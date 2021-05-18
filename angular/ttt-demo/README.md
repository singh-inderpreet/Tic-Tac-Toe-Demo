
# Tic Tac Toe Engine Demo

An engine created to make it simple to integrate TicTacToe computer gaming into any major platform, including Angular, React JS, and VUE Js.

It has a "Easy" and "Hard" game mode for single player against the computer.

## How to use

- `npm install 'tic-tac-toe-engine'`

- Then go to the project where you want to use this package and import `tic-tac-toe-engine` 

```
import {
	TTTEngine,
	Player,
	PlayingValue,
	Result,
	ResultStatus,
	DifficultyLevel,
} from  'tic-tac-toe-engine';
...
```
- Initialize the `TTTEngine`

```
this.tttEngine = new  TTTEngine();
```
- Initialize `Player` details

```
this.player = {
	name:  'Inder',
	value:  PlayingValue.cross,
	difficultyLevel:  DifficultyLevel.hard,
};
this.tttEngine.setPlayer(this.player);
```
- Play move `tttEngine.playMove(playedIndex)`

```
const  res: Result = this.tttEngine.playMove(box.index);
```
- Handle response and update the state of the DOM element accordingly

```
handlePlayedResponse(res: Result, box) {
	/* Handle Response from move played */
	/* Check for WIN, DRAW OR OK status */
	if (
		res.status === ResultStatus.win ||
		res.status === ResultStatus.draw ||
		res.status === ResultStatus.ok
	) {
		/* Update computer index value to reflect in the HTML */
		const  computerPlayedIndex = res.computerMoveIndex;
		/* Update Player index value to reflect in the HTML */
		const  playerPlayedIndex = res.playerMoveIndex;
		if (
			computerPlayedIndex !== null &&
			typeof  computerPlayedIndex !== 'undefined'
		) {
			this.updateIndexPlayedValue(
			res.computerMoveIndex,
			this.player.value === PlayingValue.cross
			? PlayingValue.circle
			: PlayingValue.cross
			);
		}
		if (
			playerPlayedIndex !== null &&
			typeof  playerPlayedIndex !== 'undefined'
		) {
			this.updateIndexPlayedValue(res.playerMoveIndex, this.player.value);
		}
		/* If Game Status is WIN OR DRAW, show message and provide reset option */
		if (res.status === ResultStatus.win || res.status === ResultStatus.draw) {
			const  isDraw = res.status === ResultStatus.draw;
			const  message = 'Game Over, ' + (!isDraw ? ('WON BY: ' + res.player) : ('Status: ' + res.status));
			console.log(message);
			this.initGame(); // Reset Game
		}
		return;
	}
}
```