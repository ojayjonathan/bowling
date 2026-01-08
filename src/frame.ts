

class Frame{
    protected frameNumber: number;
    protected rolls: number[] = []

  constructor(frameNumber: number){
    this.frameNumber = frameNumber
  }
  getRolls(){
   return []
  }
  setRolls(rolls: number[]){

  }

  getFrameNumber(){

  }

    /*
     * 
     * @returns true if the roll has a strike, else false
     */
    public isStrike(){
        return false;
    }
   /**
     * 
     * @returns true if the roll has a spare, else false
     */
    public isSpare(){

    }
    
    /**
     * 
     * @param roll a number representing a roll
     * @returns true if the roll is valid, i.e does not exceed expected number 
     * and false if the roll is invalid
     */
    public addRoll(roll: number){
        return false
    }

    /**
     * 
     * @returns true if the rolls in the frame has completed so that we can move to the next frame
     */
    public isComplete(){

        return false
    }
}

export default Frame;