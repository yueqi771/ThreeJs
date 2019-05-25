import GameStart from '../pages/gamestart.js'
import GameOver from '../pages/gameover.js'
import Event from '../utils/event'

class GameView {
    constructor() {
        this.restartButtonClicked = new Event(this)
    }

    initGamePage(callbacks) {
        this.gameStart = new GameStart(callbacks);
        this.gameStart.init();
    }

    initGameOver(callbacks) {
        this.gameOver = new GameOver(callbacks);
        this.gameOver.init({
            scene: this.gameStart.scene,
            camera: this.gameStart.scene.camera.instance,
        });
    }

    showGameOverPage() {
        this.gameOver.show();
        // this.gameStart.hide();
        console.log('游戏结束了');
    }

    showGameStartPage() {
        this.gameOver.hide();
        this.gameStart.restart();
        this.gameStart.show();
    }

    restartGame() {
        this.gameStart.restart();
    }
}

export default new GameView();