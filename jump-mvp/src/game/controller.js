import gameView from './view';
import gameModel from './model';
import audioManager from '../modules/audio-manager'

class GameController {
    constructor() {
        this.gameView = gameView;
        this.gameModel = gameModel;
        window.audioManager = audioManager;

        this.gameModel.stageChange.attach((sender, args) => {
            const stageName = args.stage;
            switch(stageName) {
                case 'game-over':
                    this.gameView.showGameOverPage();
                    break;
                case 'game-start': 
                    this.gameView.showGameStartPage();
                    break;
                default:
                    return;
            }
        })

    }

    initPages() {
        const _this = this;
        const gamePageCallbacks = {
            showGameOverPage: () => {
                this.gameModel.setStage('game-over');
            }
        }

        const gameOverCallbacks = {
            gameRestart: () => {
                this.gameModel.setStage('game-start');
            }
        }

        this.gameView.initGamePage(gamePageCallbacks);
        this.gameView.initGameOver(gameOverCallbacks);
        this.gameModel.setStage('game-start')
    }

}

export default new GameController();