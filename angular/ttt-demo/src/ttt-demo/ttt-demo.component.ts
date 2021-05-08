import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  TTTEngine,
  Player,
  PlayingValue,
  Result,
  ResultStatus,
  DifficultyLevel,
} from 'tic-tac-toe-engine';

@Component({
  selector: 'ttt-demo',
  templateUrl: './ttt-demo.html',
  styleUrls: ['./ttt-demo.scss'],
})
export class TTTDemoComponent implements OnInit {
  boxes: Array<any>;
  player: Player;
  tttEngine: TTTEngine;

  constructor(private snackBar: MatSnackBar) {
    this.initGame();
  }
  ngOnInit() {}
  initGame() {
    this.boxes = new Array<any>();
    for (let index = 0; index < 9; index++) {
      this.boxes.push({
        index: index,
        playedValue: null,
      });
    }
    this.initTTTEngine();
  }
  /* Actions <-- */
  play(box) {
    const res: Result = this.playMove(box);
    this.handlePlayedResponse(res, box);
  }
  updateIndexPlayedValue(index, value) {
    const filteredData = this.boxes.filter((box: any) => {
      return box.index === index;
    });
    if ((filteredData || []).length) {
      filteredData[0].playedValue = value;
    }
  }
  /* Actions --> */
  /* TTTEngine methods <-- */
  initTTTEngine() {
      /* Step 1: Initialize TTTEngine */
    this.tttEngine = new TTTEngine();
      /* Step 2: Initialize Player Details */
    this.player = {
      name: 'Inder',
      value: PlayingValue.cross,
      difficultyLevel: DifficultyLevel.hard,
    };
    this.tttEngine.setPlayer(this.player);
  }
  playMove(box) {
      /* Step 3: Play Move for Index */
      return this.tttEngine.playMove(box.index);
  }
  handlePlayedResponse(res: Result, box) {
    /* Step 4: Handle Response from move played */
    /* Step 4.1: Check for WIN, DRAW OR OK status */
    if (
      res.status === ResultStatus.win ||
      res.status === ResultStatus.draw ||
      res.status === ResultStatus.ok
    ) {
      /* Step 4.2: Update computer index value to reflect in the HTML */
      const computerPlayedIndex = res.computerMoveIndex;
      /* Step 4.3: Update Player index value to reflect in the HTML */
      const playerPlayedIndex = res.playerMoveIndex;
      if (
        computerPlayedIndex !== null &&
        typeof computerPlayedIndex !== 'undefined'
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
        typeof playerPlayedIndex !== 'undefined'
      ) {
        this.updateIndexPlayedValue(res.playerMoveIndex, this.player.value);
      }
      /* Step 4.3: If Game Status is WIN OR DRAW, show message and provide reset option */
      if (res.status === ResultStatus.win || res.status === ResultStatus.draw) {
        const isDraw = res.status === ResultStatus.draw;
        const message = 'Game Over, ' + (!isDraw ? ('WON BY: ' + res.player) : ('Status: ' + res.status));
        let snackBarRef = this.snackBar.open(message, "Reset");
        snackBarRef.onAction().subscribe(() => {
          this.initGame();
        });
      }
      return;
    }
  }
  /* TTTEngine methods --> */
}
