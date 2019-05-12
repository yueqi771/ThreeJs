import { scene } from '../scene/index';
import Cuboid from '../block/cuboid';
import Cylinder from '../block/cylinder';
import ground from '../objects/ground';
import bottle from '../objects/bottle'

class GameStart {

    constructor(callbacks) {
        this.callbacks = callbacks;
    }

    init() {
        console.log('game init page show');
        this.scene = scene;
        this.ground = ground;
        this.bottle = bottle;
        this.scene.init();
        this.ground.init();
        this.bottle.init();
        this.addBlock();
        this.addGround();
        this.addBottle();
        // 添加touch事件
        this.bindTouchEvent()
        this.render();

        
    }

    // 添加touch事件
    bindTouchEvent() {
        canvas.addEventListener('touchstart', this.touchStartCallback.bind(this));
        canvas.addEventListener('touchend', this.touchEndCallback.bind(this));
    }

    // 移除touch事件
    removeTouchEvent() {
        canvas.removeEventListener('touchstart', this.touchStartCallback.bind(this));
        canvas.removeEventListener('touchend', this.touchEndCallback.bind(this));
    }

    touchStartCallback() {
        console.log('touch start callback');
        this.currentBlock.shrink();
        this.bottle.shrink();
    }

    touchEndCallback() {
        this.currentBlock.rebound()
        this.bottle.stop();
        this.bottle.rotate();
        console.log('touch end callback')
    }

    // 添加地面
    addGround() {
        this.scene.instance.add(this.ground.instance);
    }

    addBlock() {
        const cuboldBlock = this.currentBlock = new Cuboid(-15, 0, 0);
        const cylinderBlock = new Cylinder(23, 0, 0);
        this.scene.instance.add(cuboldBlock.instance);
        this.scene.instance.add(cylinderBlock.instance);
    }

    render() {
        if(this.currentBlock) {
            this.currentBlock.update()
        }

        this.scene.render();
        if(this.bottle) {
            this.bottle.update()
        }
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

    // 添加bottle（瓶子）
    addBottle() {
        this.scene.instance.add(this.bottle.obj);
        this.bottle.showup();

    }
}

export default GameStart;