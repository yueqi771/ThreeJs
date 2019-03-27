import GameStart from '../pages/gamestart.js'
import GameOver from '../pages/gameover.js'

class GameView {
    constructor() {

    }

    initGamePage(callbacks) {
        this.gameStart = new GameStart(callbacks);
        this.gameStart.init();
    }

    initGameOver(callbacks) {
        this.gameOver = new GameOver(callbacks);
        this.gameOver.init();
    }

    showGameOverPage() {
        this.GameOver.show();
        console.log('游戏结束了');
    }

    restartGame() {
        this.gameStart.restart();
    }
}

export default new GameView();