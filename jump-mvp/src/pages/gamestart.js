import { scene } from '../scene/index';
import Cuboid from '../block/cuboid';
import Cylinder from '../block/cylinder';
import ground from '../objects/ground';
import bottle from '../objects/bottle'
import blockConfig from '../../config/block.config';
import gameConfig from '../../config/game.config';
import bottleConfig from '../../config/bottle.config';
import utils from '../utils/index'
import ScoreText from '../view3d/scoreText';

// 跳跃后的状态
const HIT_NEXT_BLOCK_CENTER = 1;
const HIT_CURRENT_BLOCK = 2;
const GAME_OVER_NEXT_BLOCK_BACK = 3;
const GAME_OVER_CURRENT_BLOCK_BAKC = 4;
const GAME_OVER_NEXT_BLOCK_FRONT = 5;
const GAME_OVER_BOTH = 6;
const HIT_NEXT_BLOCK_NORMAL = 7;

class GameStart {

    constructor(callbacks) {
        this.callbacks = callbacks;
        this.state = 'stop';
        this.targetPosition = {}; 
        // 是否检测结束逻辑
        this.checkingHit = false;
        this.score = 0;
        // 连续combo
        this.combo = 0;
        // console.log(audioManager.success.play())
    }

    init() {
        console.log('game init page show');
        this.scene = scene;
        this.ground = ground;
        this.bottle = bottle;
        this.scoreText = new ScoreText();
        this.scene.init();
        this.ground.init();
        this.bottle.init();
         this.scoreText.init({
            fillStyle: 0x666699,
        })
        this.addBlock();
        this.addGround();
        this.addBottle();
        this.addScore();
       
        // this.bindTouchEvent()
        // 添加touch事件
        this.render();


       
    }

    // 添加touch事件
    bindTouchEvent() {
        canvas.addEventListener('touchstart', this.touchStartCallback);
        canvas.addEventListener('touchend', this.touchEndCallback);
    }

    // 移除touch事件
    removeTouchEvent() {
        console.log('remove event')
        canvas.removeEventListener('touchstart', this.touchStartCallback);
        canvas.removeEventListener('touchend', this.touchEndCallback);
    }

    touchStartCallback = () => {
        this.touchStartTime = Date.now();
        this.currentBlock.shrink();
        this.bottle.shrink();
        // 播放收缩音频
        // audioManager.shrink.play();
    }

    touchEndCallback = () => {
        this.touchEndTime = Date.now();
        const duration = this.touchEndTime - this.touchStartTime;
        
        // 水平方向的速度
        this.bottle.velocity.vx = Math.min(duration / 6, 400);
        this.bottle.velocity.vx = +this.bottle.velocity.vx.toFixed(2);
        this.bottle.velocity.vy = Math.min(150 + duration / 20, 400);
        this.bottle.velocity.vy = +this.bottle.velocity.vy.toFixed(2);

        // currentBlock 下压的距离
        const initY = (1 - this.currentBlock.instance.scale.y) * blockConfig.height;

        // 碰撞监测
        this.hit = this.getHitStatus(this.bottle, this.currentBlock, this.nextBlock, initY);
        // console.log(this.hit)
        this.checkingHit = true; 

        this.currentBlock.rebound()
        this.bottle.stop();
        this.bottle.rotate();
        this.bottle.jump(duration);

        // 关闭音频
        // audioManager.shrink.stop()
        // audioManager.shrink_end.stop();
        console.log('touch end callback')
    }

    // 将分数添加到场景中
    addScore() {
        this.scene.addScore(this.scoreText.instance);
    }

    updateScore(score) {
        this.scoreText.updateScore(score);
        this.scene.updateScore(this.scoreText.instance);
    }

    // 更新下一个砖块
    updateNextBlock() {
        const seed = Math.round(Math.random());
        const type = seed ? 'cuboid' : 'cylinder';
        // 0 => x 1=> y
        const direction = Math.round(Math.random()); 
        // 下一个block的宽度
        const width = Math.round(Math.random() * 12) + 8;
        // 下一个砖块的距离
        const distance = Math.round(Math.random() * 20) + 20;
        this.currentBlock = this.nextBlock;
        // 下一个砖块的中心位置
        const targetPosition = this.targetPosition = {};
        if(direction == 0) {
            targetPosition.x = this.currentBlock.instance.position.x + distance;
            targetPosition.y = this.currentBlock.instance.position.y;
            targetPosition.z = this.currentBlock.instance.position.z;
        }else if(direction == 1) {
            targetPosition.x = this.currentBlock.instance.position.x;
            targetPosition.y = this.currentBlock.instance.position.y;
            targetPosition.z = this.currentBlock.instance.position.z - distance;
        }

        this.setDirection(direction);
        if(type == 'cuboid') {
            this.nextBlock = new Cuboid(targetPosition.x, targetPosition.y, targetPosition.z, width);
        }else {
            this.nextBlock = new Cylinder(targetPosition.x, targetPosition.y, targetPosition.z, width);
        }

        // 添加到场景中
        this.scene.instance.add(this.nextBlock.instance);
        
        const cameraTargetPosition = {
            x: (this.currentBlock.instance.position.x + this.nextBlock.instance.position.x) / 2,
            y: (this.currentBlock.instance.position.y + this.nextBlock.instance.position.y) / 2,
            z: (this.currentBlock.instance.position.z + this.nextBlock.instance.position.z) / 2
        }

        this.scene.updateCameraPosition(cameraTargetPosition);
        this.ground.updatePosition(cameraTargetPosition);
    }

    // 瓶子运动动画结束逻辑判断
    checkBottleHit() {
        if(this.bottle.obj.position.y <= blockConfig.height / 2 && this.bottle.status === 'jump' && this.bottle.flyingTime > 0.3) {
            this.checkingHit = true;
            if(this.hit == HIT_NEXT_BLOCK_CENTER || this.hit == HIT_NEXT_BLOCK_NORMAL || this.hit == HIT_CURRENT_BLOCK)  {
                // 游戏继续
                this.bottle.stop();
                this.bottle.obj.position.y = blockConfig.height / 2;
                this.bottle.obj.position.x = this.bottle.destination[0];
                this.bottle.obj.position.z = this.bottle.destination[1];

                // 渲染下一个砖块
                if(this.hit == HIT_NEXT_BLOCK_CENTER || this.hit == HIT_NEXT_BLOCK_NORMAL) {
                    console.log(this.hit)
                    // combo逻辑
                    if(this.hit === HIT_NEXT_BLOCK_CENTER) {
                        this.combo = this.combo + 1;
                        // audioManager['combo' + (this.combo <= 8 ? this.combo : '8')].play();
                        this.score = 2 * this.combo + this.score;
                    }else if(this.hit === HIT_NEXT_BLOCK_NORMAL) {
                        this.combo = 0;
                        // audioManager.success.play();
                        // 更新分数
                        this.score = this.score + 1;
                    }

                    this.updateScore(this.score)
                    this.updateNextBlock();
                }
            }else {
                this.checkingHit = false;

                // game over
                this.removeTouchEvent();
                this.callbacks.showGameOverPage();
            }
        }
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

        if(this.bottle) {
            this.bottle.update()
        }

        // 是否开始检测结束逻辑
        if(this.checkingHit) {
            this.checkBottleHit();
        }

        if (this.visible) {
            this.scene.render()
        }
        requestAnimationFrame(this.render.bind(this));
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    restart() {
        this.deleteObject();
        this.scene.reset();
        this.bottle.reset();
        this.addBlock();
        this.addGround();
        this.addBottle();
        this.bindTouchEvent();
        this.updateScore('0');
        this.score = 0
        
        console.log('game page restart')
    }


    // 重新启动游戏
    deleteObject() {
        let obj = this.scene.instance.getObjectByName('block');
        while(obj) {
            this.scene.instance.remove(obj);
            if(obj.geometry) {
                obj.geometry.dispose();
            }
            if(obj.material) {
                obj.material.dispose();
            }
            obj = this.scene.instance.getObjectByName('block');

        }
        this.scene.instance.remove(this.bottle.obj);
        this.scene.instance.remove(this.ground.instance);
    }

    // 添加bottle（瓶子）
    addBottle() {
        this.scene.instance.add(this.bottle.obj);
        this.bottle.showup();
    } 

    // 瓶子碰撞监测
    getHitStatus(bottle, currentBlock, nextBlock, initY) {
        // 总时间
        let flyingTime = parseFloat(bottle.velocity.vy) / parseFloat(gameConfig.gravity) * 2.0;
        initY = initY || bottle.obj.position.y.toFixed(2);
        let time = +((bottle.velocity.vy - Math.sqrt(Math.pow(bottle.velocity.vy, 2) - 2 * initY * gameConfig.gravity)) / gameConfig.gravity).toFixed(2 )
        flyingTime -= time;
        flyingTime = +flyingTime.toFixed(2);

        // 瓶子运动的距离
        let destination = [];
        const bottlePosition = new THREE.Vector2(bottle.obj.position.x, bottle.obj.position.z);
        const translate = new THREE.Vector2(this.axis.x, this.axis.z).setLength(bottle.velocity.vx * flyingTime);
        bottlePosition.add(translate);
        bottle.destination = [+bottlePosition.x.toFixed(2), +bottlePosition.y.toFixed(2)];
        destination.push(+bottlePosition.x.toFixed(2), +bottlePosition.y.toFixed(2));

        // 瓶子宽度
        const bodyWitth = 1.8141 * bottleConfig.headRadius;
        // 
        let result1, result2;

        // 和跳在nextBlock上
        if(nextBlock) {
            const nextDiff = Math.pow(destination[0] - nextBlock.instance.position.x, 2) + Math.pow(destination[1] - nextBlock.instance.position.y, 2);
            
            // nextblock的边缘
            const nextPolygon = nextBlock.getVertices();

            // 判断当前的点是否在polygon里面
            if(utils.pointInPolygon(destination, nextPolygon)) {
                if(Math.abs(nextDiff) < 10) {
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
        // 跳在currentBlock上
        if(currentBlock) {
            const currentPolygon = currentBlock.getVertices();
            if(utils.pointInPolygon(destination, currentPolygon)) {
                result2 = HIT_CURRENT_BLOCK;
            }else if(utils.pointInPolygon([destination[0] - bodyWitth / 2, destination[1]], currentPolygon) || utils.pointInPolygon([destination[0], destination[1] + bodyWitth / 2], currentPolygon)) {
                if(result1) {
                    result2 = GAME_OVER_BOTH;
                }
                result2 = GAME_OVER_CURRENT_BLOCK_BAKC;
            }
        }
        
        return result1 || result2 || 0
    }
}

export default GameStart;