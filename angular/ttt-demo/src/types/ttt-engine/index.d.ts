export declare enum PlayingValue {
    cross = "CROSS",
    circle = "CIRCLE",
    empty = ""
}
export interface Player {
    name: string;
    value: string;
}
interface Box {
    value?: string;
    index: number;
    playerId?: number;
    isAlreadyPlayed: boolean;
}
export declare enum ResultStatus {
    win = "WIN",
    draw = "DRAW",
    loose = "LOOSE",
    moveAlreadyPlayed = "Move Already Played",
    emptyData = "Empty Data",
    ok = "OK",
    invalid = "Invalid Data",
    outOfBounds = "Index out of bounds"
}
export interface Result {
    status: ResultStatus;
    computerMoveIndex?: number;
}
export declare class TTTEngine {
    dataset: Box[];
    private humanPlayer;
    private computerPlayer;
    private winningCombinations;
    constructor();
    setPlayer(player: Player): Result;
    playMove(currentIndex: number): Result;
    private playMoveFor;
    private validatePlayer;
    private validateEmptyData;
    private validateWinningChanceForMove;
    private validateCombination;
    private checkAllCompleted;
    private playNextMove;
}
export {};
