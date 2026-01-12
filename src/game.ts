import Frame from "./frame.js";
import Score from "./score.js";

class Game {
    protected frames: Frame[] = [];
    protected currentFrameIndex = 0;
    protected scoreCalculator = new Score();

    constructor() {
        for (let i = 0; i < 10; i++) {
            this.frames.push(new Frame(i + 1));
        }
    }
   
    /**
     * 
     * @returns current frame index 0-9
     */
    getCurrentFrameIndex(){
        return this.currentFrameIndex
    }

    roll(pins: number) {
        if (this.isComplete()) {
            throw new Error("Game is complete");

        }

        let frame = this.frames[this.currentFrameIndex]!
        frame.addRoll(pins)

        if (frame.isComplete()) {
            this.currentFrameIndex++
        }
    }
    Score() {
        let scores = this.scoreCalculator.computeScore(this.frames);
        return scores.reduce(
            (prevScore, curr) => prevScore + (curr.frameScore ?? 0),
            0
        );
    }
    getFrames(): Frame[] {
        return this.frames;
    }

    /**
     *
     * @returns true if the game has completed
     */
    public isComplete() {
        return (
            this.currentFrameIndex === 9 &&
            this.frames[this.currentFrameIndex]?.isComplete()
        );
    }

    public printGame() {
        let scores = this.scoreCalculator.computeScore(this.frames);
        let separator = "|-----------------------|"
        console.log(separator);
        console.log(`|${this.centerText("frame", 12)}|${this.centerText("score", 10)}|`);
        console.log(separator);

        for (const score of scores) {
            console.log(separator);
            console.log(
                `|${this.centerText(this.currentFrameIndex + 1, 12)}|${this.centerText(score.frameScore ?? "", 10)}|`
            );
            console.log(separator);
        }

        console.log(separator);
        console.log(
            `|${this.centerText("Final Score", 12)}|${this.centerText(this.Score(), 10)}|`
        );
        console.log(separator);
    }

    private centerText(text: string | number, size: number) {
        let s = text.toString()
        let currentLen = s.length
        let padLength =  Math.max(0, size - currentLen)
        let leftPad =Math.floor(padLength / 2)
        let rightPad = padLength-leftPad

        return  " ".repeat(leftPad) + s + " ".repeat(rightPad);

    }
}



export default Game;
