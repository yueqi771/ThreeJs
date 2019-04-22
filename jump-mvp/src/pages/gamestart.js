import { scene } from '../scene/index';
import Cuboid from '../block/cuboid';
import Cylinder from '../block/cylinder';
import ground from '../objects/ground';

class GameStart {

    constructor(callbacks) {
        this.callbacks = callbacks;
    }

    init() {
        console.log('game init page show');
        this.scene = scene;
        this.ground = ground;
        this.scene.init();
        this.ground.init();
        this.addBlock();
        this.addGround();
        this.render();
        
    }

    // 添加地面
    addGround() {
        this.scene.instance.add(this.ground.instance)
    }

    addBlock() {
        const cuboldBlock = new Cuboid(-15, 0, 0);
        const cylinderBlock = new Cylinder(23, 0, 0);
        this.scene.instance.add(cuboldBlock.instance);
        this.scene.instance.add(cylinderBlock.instance);
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