import type Frame from "./frame"

export type ScoreType={
frameNumber: number,
frameScore: number|null
}

class Score{
    /**
     * 
     * @param frames list of frame
     * @returns score for each frame, if a frame has not completed it's score will be null
     */
  public computeScore(frames: Frame[]): ScoreType[]{
    return []
  }
 
}