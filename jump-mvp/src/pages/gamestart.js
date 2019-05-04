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
        this.render();
    }

    // 添加地面
    addGround() {
        this.scene.instance.add(this.ground.instance);
    }

    addBlock() {
        const cuboldBlock = new Cuboid(-15, 0, 0);
        const cylinderBlock = new Cylinder(23, 0, 0);
        this.scene.instance.add(cuboldBlock.instance);
        this.scene.instance.add(cylinderBlock.instance);
    }

    render() {
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