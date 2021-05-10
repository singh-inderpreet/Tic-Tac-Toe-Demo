<template>
  <div class="container-fluid ttt-demo-container">
    <div
      v-for="box in state.boxes"
      :key="box.playedValue"
      class="box"
      @click="play(box)"
    >
      <span>{{ box.playedValue || "" }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  TTTEngine,
  ResultStatus,
  PlayingValue,
  DifficultyLevel,
  Result,
  Player,
} from "tic-tac-toe-engine";
import { defineComponent, reactive } from "vue";
import Swal from "sweetalert2";

export default defineComponent({
  name: "TTTDemo",
  data() {
    return {
      player: {},
    };
  },
  setup(props) {
    // const boxes = ref([{}]);
    const state = reactive({
      boxes: Array<any>(),
    });
    state.boxes = [];
    for (let index = 0; index < 9; index++) {
      state.boxes.push({
        index: index,
        playedValue: null,
      });
    }
    /* Step 1: Initialize TTTEngine */
    const tttEngine = new TTTEngine();
    /* Step 2: Initialize Player Details */
    const player: Player = {
      name: "Inder",
      value: PlayingValue.cross,
      difficultyLevel: DifficultyLevel.hard,
    };
    tttEngine.setPlayer(player);
    return {
      tttEngine,
      player,
      state,
    };
  },
  created() {},
  methods: {
    initGame() {
      this.state.boxes = [];
      for (let index = 0; index < 9; index++) {
        this.state.boxes.push({
          index: index,
          playedValue: null,
        });
      }
      this.initTTTEngine();
    },
    /* Actions <-- */
    play(box: any) {
      const res = this.playMove(box);
      this.handlePlayedResponse(res, box);
    },
    updateIndexPlayedValue(index?: number, value?: PlayingValue) {
      const filteredData: Array<any> = this.state.boxes.filter((box: any) => {
        return box.index === index;
      });
      if ((filteredData || []).length) {
        filteredData[0].playedValue = value;
      }
    },
    /* Actions --> */
    /* TTTEngine methods <-- */
    initTTTEngine() {
      /* Re-Initialize TTTEngine */
      this.tttEngine = new TTTEngine();
      this.tttEngine.setPlayer(this.player);
    },
    playMove(box: any) {
      /* Step 3: Play Move for Index */
      return this.tttEngine.playMove(box.index);
    },
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
        if (
          res.status === ResultStatus.win ||
          res.status === ResultStatus.draw
        ) {
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
    },
    /* TTTEngine methods --> */
  },
});
</script>

<style lang="scss">
@import "../theme.scss";
.ttt-demo-container {
  border-top: 1px solid #aaa;
  border-left: 1px solid #aaa;
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  height: 300px;
  margin: auto;
  margin-top: auto;
  padding: 0;
  background: #293250;
  .box {
    border-bottom: 1px solid #aaa;
    border-right: 1px solid #aaa;
    width: calc(100% / 3 - 1px);
    height: calc(100% / 3 - 1px);
    display: flex;
    color: $body-background-color;
    &:hover {
      transform: scale(1.1);
      background: #1b2133;
      border: 0;
    }
    span {
      margin: auto;
    }
  }
}
</style>
