
class GameOver {
    constructor(callbacks) {
        this.callbacks = callbacks;

    }

    init() {
        // canvas理论上是一张图片， 那么可以通过document.createElement('canvas')的方式来创建一个离屏canvas，将它复制到three.js的
        // 一个对象上， 通过空间的关系， 那么看到的效果就是2d的效果
        this.initGameoverCanvas();
    }

    initGameoverCanvas() {
        const aspact = window.innerHeight / window.innerWidth;
    }

    show() {
        console.log('game over show')
    }
}

export default GameOver;
