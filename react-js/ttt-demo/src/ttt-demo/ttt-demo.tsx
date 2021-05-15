import * as React from "react";
import Swal from "sweetalert2";

import {
  TTTEngine,
  Result,
  PlayingValue,
  Player,
  DifficultyLevel,
  ResultStatus,
} from "tic-tac-toe-engine";

import "./ttt-demo.scss";

type Props = {};
type State = {
  boxes: Array<any>;
};

class TTTDemo extends React.Component<Props, State> {
  player: Player;
  tttEngine: TTTEngine;

  constructor(props: any) {
    super(props);
    this.state = {
      boxes: [],
    };
    this.player = {
      name: "Inder",
      value: PlayingValue.cross,
      difficultyLevel: DifficultyLevel.hard,
    };
    this.tttEngine = new TTTEngine();
  }
  initGame() {
    const _boxes = [];
    for (let index = 0; index < 9; index++) {
      _boxes.push({
        index: index,
        playedValue: null,
      });
    }
    this.setState({
      boxes: _boxes,
    });
    /* Step 1: Initialize TTTEngine */
    this.tttEngine = new TTTEngine();
    /* Step 2: Initialize Player Details */
    this.tttEngine.setPlayer(this.player);
  }
  play(box: any): any {
    const res: Result = this.playMove(box);
    this.handlePlayedResponse(res, box);
  }
  updateIndexPlayedValue(index?: number, value?: PlayingValue) {
    this.updatebox({
      index: index,
      value: value,
    });
  }
  updatebox(payload: any) {
    const filteredData = this.state.boxes.filter((box: any) => {
      return box.index === payload.index;
    });
    if ((filteredData || []).length) {
      filteredData[0].playedValue = payload.value;
    }
    this.setState({
      boxes: this.state.boxes,
    });
  }
  /* Lifecycle Events <-- */
  componentDidMount() {
    this.initGame();
  }
  /* Lifecycle Events --> */
  /* TTTEngine methods <-- */
  initTTTEngine() {
    /* Step 1: Initialize TTTEngine */
    this.tttEngine = new TTTEngine();
    /* Step 2: Initialize Player Details */
    this.player = {
      name: "Inder",
      value: PlayingValue.cross,
      difficultyLevel: DifficultyLevel.hard,
    };
    this.tttEngine.setPlayer(this.player);
  }
  playMove(box: any) {
    /* Step 3: Play Move for Index */
    return this.tttEngine.playMove(box.index);
  }
  handlePlayedResponse(res: Result, box: any) {
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
        typeof computerPlayedIndex !== "undefined"
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
        typeof playerPlayedIndex !== "undefined"
      ) {
        this.updateIndexPlayedValue(res.playerMoveIndex, this.player.value);
      }
      /* Step 4.3: If Game Status is WIN OR DRAW, show message and provide reset option */
      if (res.status === ResultStatus.win || res.status === ResultStatus.draw) {
        const isDraw = res.status === ResultStatus.draw;
        const message =
          "Game Over, " +
          (!isDraw ? "WON BY: " + res.player : "Status: " + res.status);
        Swal.fire({
          title: message,
          text: "Do you want to continue?",
          icon: "success",
          confirmButtonText: "Reset",
        });
        this.initGame();
      }
      return;
    }
  }
  /* TTTEngine methods --> */
  /* Render <-- */
  render() {
    return (
      <div className="main-container">
        <div className="container-fluid ttt-demo-container">
          {this.state.boxes.map((box) => (
            <div
              key={box.index}
              className="box"
              onClick={this.play.bind(this, box)}
            >
              <span>{box.playedValue || ""}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  /* Render --> */
}

export default TTTDemo;
