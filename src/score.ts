import type Frame from "./frame";

export type ScoreType = {
  frameNumber: number;
  frameScore: number | null;
};

class Score {
  /**
   *
   * @param frames list of frame
   * @returns score for each frame, if a frame has not completed it's score will be null
   */
  public computeScore(frames: Frame[]): ScoreType[] {
    const results: ScoreType[] = [];

    const rolls: number[] = [];
    for (const frame of frames) {
      for (const roll of frame.getRolls()) {
        rolls.push(roll);
      }
    }

    let rollIndex = 0;
    let runningTotal = 0;

    // When Frame is not complete score is null
    for (const frame of frames) {
      if (!frame.isComplete()) {
        results.push({
          frameNumber: frame.getFrameNumber(),
          frameScore: null,
        });
        break;
      }

      // Calculating Strike
      if (frame.isStrike()) {
        const nextRoll = rolls[rollIndex + 1];
        const nextNextRoll = rolls[rollIndex + 2];
        if (nextRoll === undefined || nextNextRoll === undefined) {
          results.push({
            frameNumber: frame.getFrameNumber(),
            frameScore: null,
          });
          break;
        }
        runningTotal += 10 + nextRoll + nextNextRoll;
        rollIndex += 1;
      }

      // Calculating Spare
      else if (frame.isSpare()) {
        const nextRoll = rolls[rollIndex + 2];
        if (nextRoll === undefined) {
          results.push({
            frameNumber: frame.getFrameNumber(),
            frameScore: null,
          });
          break;
        }
        runningTotal += 10 + nextRoll;
        rollIndex += 2;
      }

      // Calculating Normal
      else {
        const nextRoll = rolls[rollIndex];
        const nextNextRoll = rolls[rollIndex + 1];
        if (nextRoll === undefined || nextNextRoll === undefined) {
          results.push({
            frameNumber: frame.getFrameNumber(),
            frameScore: null,
          });
          break;
        }
        runningTotal += nextRoll + nextNextRoll;
        rollIndex += 2;
      }

      // Computing Total Results
      results.push({
        frameNumber: frame.getFrameNumber(),
        frameScore: runningTotal,
      });
    }

    return results;
    
  }
}

export default Score;
