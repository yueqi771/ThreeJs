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
        this.gameOver.init({
            scene: this.gameStart.scene
        });
    }

    showGameOverPage() {
        this.gameStart.hide();
        this.gameOver.show();
        console.log('游戏结束了');
    }

    showGameStartPage() {
        this.gameOverPage.hide();
        this.gameStartPage.restart();
        this.gameStartPage.show();
    }

    restartGame() {
        this.gameStart.restart();
    }
}

export default new GameView();