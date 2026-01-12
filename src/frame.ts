class Frame {
  protected frameNumber: number
  protected rolls: number[] = []

  constructor(frameNumber: number) {
    this.frameNumber = frameNumber
  }

  getRolls() {
    return [...this.rolls]
  }

  setRolls(rolls: number[]) {
    this.rolls = [...rolls]
  }

  getFrameNumber() {
    return this.frameNumber
  }

  /**
   * @returns true if the roll has a strike, else false
   */
  public isStrike() {
    return this.rolls.length > 0 && this.rolls[0] === 10
  }

  /**
   * @returns true if the roll has a spare, else false
   */
  public isSpare() {
    return (
      this.rolls.length >= 2 &&
      this.rolls[0] !== undefined &&
      this.rolls[1] !== undefined &&
      this.rolls[0] !== 10 &&
      this.rolls[0] + this.rolls[1] === 10
    )
  }

  /**
   * @param roll a number representing a roll
   * @returns true if the roll is valid, i.e does not exceed expected number
   * and false if the roll is invalid
   */
  public addRoll(roll: number) {
    if (roll < 0 || roll > 10) return false

    // 10th frame rules
    if (this.frameNumber === 10) {
      return this.addRollTenthFrame(roll)
    }

    // Frames 1-9
    return this.addRollNormalFrame(roll)
  }

  /**
   * @returns true if the rolls in the frame has completed so that we can move to the next frame
   */
  public isComplete() {
    if (this.frameNumber === 10) {
      if (this.rolls.length < 2) return false

      const first = this.rolls[0]
      const second = this.rolls[1]

      if (
        first !== undefined &&
        second !== undefined &&
        (first === 10 || first + second === 10)
      ) {
        return this.rolls.length === 3
      }

      return this.rolls.length === 2
    }

    if (this.isStrike()) return true
    return this.rolls.length === 2
  }

  
  private addRollNormalFrame(roll: number) {
    if (this.rolls.length === 0) {
      this.rolls.push(roll)
      return true
    }

    if (
      this.rolls.length === 1 &&
      this.rolls[0] !== undefined &&
      this.rolls[0] + roll <= 10
    ) {
      this.rolls.push(roll)
      return true
    }

    return false
  }

  private addRollTenthFrame(roll: number) {
    if (this.rolls.length === 0) {
      this.rolls.push(roll)
      return true
    }

    if (this.rolls.length === 1) {
      if (this.rolls[0] === 10) {
        this.rolls.push(roll)
        return true
      }

      if (
        this.rolls[0] !== undefined &&
        this.rolls[0] + roll <= 10
      ) {
        this.rolls.push(roll)
        return true
      }

      return false
    }

    if (this.rolls.length === 2) {
      const first = this.rolls[0]
      const second = this.rolls[1]

      if (
        first !== undefined &&
        second !== undefined &&
        (first === 10 || first + second === 10)
      ) {
        this.rolls.push(roll)
        return true
      }

      return false
    }

    return false
  }
}

export default Frame
