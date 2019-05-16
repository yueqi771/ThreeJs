import { scene } from '../scene/index';
import Cuboid from '../block/cuboid';
import Cylinder from '../block/cylinder';
import ground from '../objects/ground';
import bottle from '../objects/bottle'
import blockConfig from '../../config/block.config';
import gameConfig from '../../config/game.config';
import bottleConfig from '../../config/bottle.config';
import utils from '../utils/index'

class GameStart {

    constructor(callbacks) {
        this.callbacks = callbacks;
        this.targetPosition = {}; 
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
        this.touchStartTime = Date.now();
        this.currentBlock.shrink();
        this.bottle.shrink();
    }

    touchEndCallback() {
        this.touchEndTime = Date.now();
        const duration = this.touchEndTime - this.touchStartTime;
        
        // 水平方向的速度
        this.bottle.velocity.vx = Math.min(duration / 6, 400);
        this.bottle.velocity.vx = +this.bottle.velocity.vx.toFixed(2);
        this.bottle.velocity.vy = Math.min(150 + duration / 20, 400);
        this.bottle.velocity.vy = +this.bottle.velocity.vy.toFixed(2);

        // currentBlock 下压的距离
        const initY = blockConfig.height - (1 - this.bottle.scale.y) * blockConfig.height;

        // 碰撞监测
        this.hit = this.getHitStatus(this.bottle, currentBlock, nextBlock, initY)

        this.currentBlock.rebound()
        this.bottle.stop();
        this.bottle.rotate();
        this.bottle.jump(duration);
        console.log('touch end callback')
    }

    setDirection(direction) {
        // bottle当前的位置
        const currentPosition = {
            x: this.bottle.obj.position.x,
            z: this.bottle.obj.position.z,
        }

        // block当前的位置
        this.axis =  new THREE.Vector3(this.targetPosition.x - currentPosition.x, 0, this.targetPosition.z - currentPosition.z)
        // 将当前变量归一化
        this.axis.normalize();
        this.bottle.setDirection(direction, this.axis);
    }

    // 添加地面
    addGround() {
        this.scene.instance.add(this.ground.instance);
    }

    addBlock() {
        const cuboldBlock = this.currentBlock = new Cuboid(-15, 0, 0);
        const cylinderBlock = this.nextBlock = new Cylinder(23, 0, 0);
        this.targetPosition = {
            x: 23,
            y: 0,
            z: 0
        }
        const initPosition = 0;
        this.scene.instance.add(cuboldBlock.instance);
        this.scene.instance.add(cylinderBlock.instance);
        this.setDirection(initPosition)
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

    // 瓶子碰撞监测
    getHitStatus(bottle, currentBlock, nextBlock, initY) {
        // 跳跃后的状态
        const HIT_NEXT_BLOCK_CENTER = 1;
        const HIT_CURRENT_BLOCK = 2;
        const GAME_OVER_NEXT_BLOCK_BACK = 3;
        const GAME_OVER_CURRENT_BLOCK_BAKC = 4;
        const GAME_OVER_NEXT_BLOCK_FRONT = 5;
        const GAME_OVER_BOTH = 6;
        const HIT_NEXT_BLOCK_NORMAL = 7;
        // 总时间
        const flyingTime = bottle.valocity.vy / gameConfig.gravity * 2;
        initY = initY || bottle.obj.position.y.toFixed(2);
        let time = +((-bottle.velocity.vy + Math.sqrt(Math.pow(bottle.velocity.vy, 2) - 2 * initY * gameConfig.gravity)) / gameConfig.gravity).toFixed(2 )
        flyingTime -= time;
        flyingTime = +flyingTime.toFixed(2);

        // 瓶子运动的距离
        let destination = [];
        const bottlePosition = new THREE.vector2(bottle.obj.position.x, bottle.obj.position.z);
        const translate = new THREE.Vector2(this.axis.x, this.axis.z).setLength(bottle.velocity.vx * flyingTime);
        bottlePosition.add(translate);
        bottle.destination = [+bottlePosition.x.toFixed(2), +bottlePosition.y.toFixed(2)];
        destination.push(+bottlePosition.x.toFixed(2), +bottlePosition.y.toFixed(2));

        // 瓶子宽度
        const bodyWitth = 1.8141 * bottleConfig.headRadius;
        // 

        if(nextBlock) {
            const nextDiff = Math.pow(destination[0] - nextBlock.instance.position.x) + Math.pow(destination[1] - nextBlock.instance.position.y);
            
            // nextblock的边缘
            const nextPolygon = nextBlock.getVertices();

            // 跳在currentBlock上和跳在nextBlock上
            let result1;

            // 判断当前的点是否在polygon里面
            if(utils.pointInPolygon(destination, nextPolygon)) {
                if(Math.abs(nextDiff) < 5) {
                    result1 = HIT_NEXT_BLOCK_CENTER;
                }else {
                    result1 = HIT_NEXT_BLOCK_NORMAL;
                }
            }else if(utils.pointInPolygon([destination[0] - bodyWitth / 2, destination[1]], nextPolygon) || utils.pointInPolygon([destination[0], destination[1] + bodyWitth / 2], nextPolygon)) {
                result1 = GAME_OVER_CURRENT_BLOCK_BAKC;
            }else if(utils.pointInPolygon([destination[0] + blockConfig.bodyWitth / 2, destination[1]], nextPolygon) || utils.pointInPolygon([destination[0], destination[1] - bottleConfig.bodyWitth / 2], nextPolygon)) {
                result1 = GAME_OVER_NEXT_BLOCK_FRONT;
            }
        }

        const currentPolygon = currentBlock.getVertices();
        let result2;
        if(utils.pointInPolygon(destination, currentPolygon)) {
            result2 = HIT_CURRENT_BLOCK;
        }else if(utils.pointInPolygon([destination[0] - bodyWitth / 2, destination[1]], currentPolygon) || utils.pointInPolygon([destination[0], destination[1] + bodyWitth / 2], currentPolygon)) {
            if(result1) {
                result2 = GAME_OVER_BOTH;
            }
            result2 = GAME_OVER_CURRENT_BLOCK_BAKC;
        }

        return result1 || result2 || 0
    }
}

export default GameStart;