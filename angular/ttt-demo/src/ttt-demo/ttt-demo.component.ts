import { Component, OnInit } from '@angular/core';
import {
  TTTEngine,
  Player,
  PlayingValue,
  Result,
  ResultStatus,
} from 'tic-tac-toe-engine';

@Component({
  selector: 'ttt-demo',
  templateUrl: './ttt-demo.html',
  styleUrls: ['./ttt-demo.scss'],
})
export class TTTDemoComponent implements OnInit {
  boxes: Array<any>;
  tttEngine: TTTEngine;

  constructor() {
    this.initGame();
  }
  ngOnInit() {}
  initGame() {
    this.boxes = new Array<any>();
    for (let index = 0; index < 9; index++) {
      this.boxes.push({
        index: index,
        playedBy: null,
      });
    }
    this.initTTTEngine();
  }
  /* Actions <-- */
  play(box) {
    console.log(box);
    const res: Result = this.tttEngine.playMove(box.index);
    console.log(res);
    if (res.status === ResultStatus.win || res.status === ResultStatus.draw) {
      box.playedBy = 'P';
      var r = confirm("Game Won! Reset!");
      if (r == true) {
        this.initGame();
      }
      return;
    } else if (res.status === ResultStatus.ok) {
      box.playedBy = 'P';
      const computerPlayedIndex = res.computerMoveIndex;
      if (computerPlayedIndex !== null &&
          typeof(computerPlayedIndex) !== 'undefined') {
        const filteredData = this.boxes.filter((box: any) => {
          return box.index === computerPlayedIndex;
        });
        if ((filteredData || []).length) {
          filteredData[0].playedBy = 'C';
        }
      }
    }
  }
  /* Actions --> */
  /* TTTEngine methods <-- */
  initTTTEngine() {
    this.tttEngine = new TTTEngine();
    const player: Player = {
      name: 'Inder',
      value: PlayingValue.cross,
    };
    this.tttEngine.setPlayer(player);
  }
  /* TTTEngine methods --> */
}
