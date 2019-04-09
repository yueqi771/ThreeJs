import { scene } from '../scene/index';

class GameStart {

    constructor(callbacks) {
        this.callbacks = callbacks;
    }

    init() {
        console.log('game init page show');
        this.scene = scene;
        this.scene.init();
        this.render();
        
    }

    render() {
        this.scene.render();
        requestAnimationFrame(this.render.bind(this));
    }

    show() {
        this.mesh.visible = true;
    }

    hide() {
        this.mesh.visible = false;
    }

    restart() {
        console.log('game page restart')
    }
}

export default GameStart;