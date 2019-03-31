import gameView from './view';
// import gameModel from './model';

class GameController {
    constructor() {
        this.gameView = gameView;
        // this.gameModel = gameView;

    }

    initPages() {
        const _this = this;
        debugger;
        const gamePageCallbacks = {
            showGameOverPage: () => {
                this.gameView.showGameOverPage()
            },
        }

        const gameOverCallbacks = {
            gameRestart: () => {
                this.gameView.restartGame()
            }
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