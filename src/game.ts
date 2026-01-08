import type Frame from "./frame";

class Game{
    // each time a ball is rolled
    protected frames: Frame[] = []
    roll( pins: number) {

    }
    Score(){
        return 0;
    }
    getFrames(): Frame[]{
        return []
    }

        /**
     * 
     * @returns true if the game has completed
     */
    public isComplete(){

        return false
    }

    public printGame(){
        
    }
}

export default Game;