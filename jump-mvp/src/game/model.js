import Event from '../utils/event.js';
class GameModel {
    constructor() {
        this.stage = '';
        this.stageChange = new Event(this);
    }

    getStage() {
        return this.stage;
    }
    setStage(stage) {
        this.stage = stage;
        this.stageChange.notify({
            stage: stage,
        })
    }
}

export default new GameModel();