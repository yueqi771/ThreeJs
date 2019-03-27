import gameView from './view';
// import gameModel from './model';

class GameController {
    constructor() {
        this.gameView = gameView;
        // this.gameModel = gameView;

    }

    initPages() {
        const gamePageCallbacks = {
            showGameOverPage: this.showGameOverPage,
        }

        const gameOverCallbacks = {
            gameRestart: this.restartGame
        }

        this.gameView.initGamePage(gamePageCallbacks);
        this.gameView.initGameOver(gameOverCallbacks);
    }

    showGameOverPage() {
        this.gameView.showGameOverPage()
    }

    restartGame() {
        this.gameView.restartGame()
    }


}

export default new GameController();