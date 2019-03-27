import gameController from './controller';


class Game {
    constructor() {
        this.gameController = gameController;
    }

    init() {
        console.log('执行了Game的init方法')
        this.gameController.initPages()
    }


}

export default new Game()