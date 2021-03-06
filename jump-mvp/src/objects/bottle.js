import bottleConfig from '../../config/bottle.config';
import blockConfig from '../../config/block.config';
import { customAnimation, tweenAnimation } from '../../lib/animation'
import gameConfig from '../../config/game.config'
import ScoreText from '../view3d/scoreText';

class Bottle {
    constructor(x, y, z) {
        // 瓶子延x轴进行旋转跳跃
        this.direction = 1;

        // 跳跃的轴坐标
        this.axis = null;

        // 瓶子当前状态
        this.status = 'stop'

        this.scale = 1;

        // 瓶子运动的总时间
        this.flyingTime = 0;

        this.velocity = {
            vx: 0, // 水平方向速度，
            vy: 0 // 竖直方向速度
        }
    }

    init() {
        // 加载纹理loader;
        this.loader = new THREE.TextureLoader();

        // 存放bottle的整体
        this.obj = new THREE.Object3D();
        this.obj.name = 'bottle';
        this.obj.position.set(bottleConfig.initPosition.x, bottleConfig.initPosition.y + 30, bottleConfig.initPosition.z)
        
        const { specularMaterial,  middleMaterial, bottomMaterial } = this.loadTexture();
        // 存储瓶子的组合
        this.bottle = new THREE.Object3D();

        // 瓶子的上层控制, 专门来控制动画
        this.human = new THREE.Object3D();

        // 计算菱形头部的大小
        let headRadius = bottleConfig.headRadius;

        // 接受两个参数， 一个geometry， material 纹理
        this.head = new THREE.Mesh(
            new THREE.OctahedronGeometry(headRadius),
            bottomMaterial,
        );

        this.head.castShadow = true;

        // 人物中间部分
        this.middle = new THREE.Mesh(
            new THREE.CylinderGeometry(
                headRadius / 1.4, headRadius / 1.44 * 0.88, headRadius * 1.2, 20
            ),
            middleMaterial
        );
        this.middle.castShadow = true;
        this.middle.position.y = 1.3857 * headRadius;
        this.middle.position.x = 0;
        this.middle.position.z = 0;
                
      
        // 人物底部， 圆台
        this.bottom = new THREE.Mesh(
            new THREE.CylinderGeometry(0.62857 * headRadius, 0.907143 * headRadius, 1.91423 * headRadius, 20),
            bottomMaterial
        );
        
        // 设置半球
        this.topGeometry = new THREE.SphereGeometry(headRadius / 1.14, 20, 20);
        this.topGeometry.scale(1, 0.54, 1);
        this.top = new THREE.Mesh(
            this.topGeometry,
            bottomMaterial
        );

        
        this.top.castShadow = true;
        this.top.position.y = 1.8143 * headRadius;
        this.top.position.x = 0;
        this.top.position.z = 0;

        // 人物身体
        this.body = new THREE.Object3D();
        this.body.add(this.bottom);
        this.body.add(this.middle);
        this.body.add(this.top)

        this.head.position.y = 3.57143 * headRadius;
        this.head.position.x = 0;
        this.head.position.z = 0;
            
        this.human.add(this.head);
        this.human.add(this.body);

        this.bottle.add(this.human);

        this.bottle.position.y = 2.2;
        this.bottle.position.z = 0;
        this.bottle.position.x = 0;

        this.obj.add(this.bottle);

        this.particles = [];
        // 定义一个纹理
        const whiteParticleMaterial = new THREE.MeshBasicMaterial({map: this.loader.load('/game/resource/images/white.png'), alPhaTest: 0.5});
        const greenParticleMaterial = new THREE.MeshBasicMaterial({map: this.loader.load('/game/resource/images/green.png'), alPhaTest: 0.5});
        
        const particleGeometry = new THREE.PlaneGeometry(2, 2);

        for(let i = 0; i < 15; i++) {
            const particle = new THREE.Mesh(particleGeometry, whiteParticleMaterial);
            particle.rotation.x = -Math.PI / 4;
            particle.rotation.y = -Math.PI / 5;
            particle.rotation.z = -Math.PI / 5; 
            this.particles.push(particle);
            this.obj.add(particle)
        }

        for(let i = 0; i < 5; i++) {
            const particle = new THREE.Mesh(particleGeometry, greenParticleMaterial);
            particle.rotation.x = -Math.PI / 4;
            particle.rotation.y = -Math.PI / 5;
            particle.rotation.z = -Math.PI / 5; 
            this.particles.push(particle);
            this.obj.add(particle)
        }

        // 实例化分数
        this.scoreText = new ScoreText();
        this.scoreText.init({
            fillStyle: 0x252525
        });
        this.scoreText.instance.visible = false;
        // 将分数正对于用户
        this.scoreText.instance.rotation.y = -Math.PI / 4; 
        this.scoreText.instance.scale.set(0.5, 0.5, 0.5);
        this.obj.add(this.scoreText.instance)
    }

    showAddScore(score) {
        const value = "+" + score;
        this.scoreText.updateScore(value); 
        this.scoreText.instance.visible = true;
        this.scoreText.instance.material.opacity = 1;
        this.scoreText.instance.position.y = 3;

        // y轴方向改变
        customAnimation.to(this.scoreText.instance.position, 0.7, {
            y: blockConfig.height + 6 
        })

        tweenAnimation(this.scoreText.instance.material.opacity, 0, 700, 'Linear', (value, complete) => {
            this.scoreText.instance.material.opacity = value;
            if(complete) {
                this.scoreText.instance.visible = false;
            }
        })
    }

    // 重置粒子状态
    resetParticles() {
        if(this.gatherTimer) {
            clearTimeout(this.gatherTimer);
        }

        this.gatherTimer = null;

        for(let i = 0; i < this.particles.length; i++) {
            this.particles[i].gathering = false;
            this.particles[i].scattering = false;
            this.particles[i].visible = false;
        }
    }

    scatterParticles() {
        for(let i = 0; i < 10; i ++ ) {
            this.particles[i].scattering = true;
            this.particles[i].gathering = false;
            this._scatterParticle(this.particles[i]);
        }
    }

    // 粒子散开效果
    _scatterParticle(particle) {
        const minDistance = bottleConfig.bodyWidth / 2;
        const maxDistance = 2;
        const x = (minDistance + Math.random() * (maxDistance - minDistance)) * (1 - 2 * Math.random());
        const z = (minDistance + Math.random() * (maxDistance - minDistance)) * (1 - 2 * Math.random());

        particle.scale.set(1, 1, 1);
        particle.visible = false;
        particle.position.x = x;
        particle.position.y = -0.5;
        particle.position.z = z;

        setTimeout(((particleItem) => {
            return () => {
                if(!particleItem.scattering) { return };
                particleItem.visible = true;

                const duration = 0.3 + Math.random() * 0.4;

                // 聚集动画
                customAnimation.to(particleItem.scale, duration, {
                    x: 0.2,
                    y: 0.2,
                    z: 0.2,
                })

                customAnimation.to(particleItem.position, duration, {
                    x: 2 * x,
                    y: Math.random() * 2.5 + 2,
                    z: 2 * z,
                    onComplete: () => {
                        if(particleItem.gathering) {
                            // this._gatherParticles(particle);
                            particleItem.scattering = false;
                            particleItem.visible = false;
                        }
                    }
                })
            }
        })(particle), Math.random() * 500)
    }
    
    gatherParticles() {
        for(let i = 10; i < 20; i++) {
            // 设置状态
            this.particles[i].gathering = true;
            this.particles[i].scattering = false;
            // 开始聚集
            this._gatherParticles(this.particles[i]); 
        }

        // 循环运动的粒子
        this.gatherTimer = setTimeout(() => {
            for(let i = 0; i < 10; i++) {
                // 设置状态
                this.particles[i].gathering = true;
                this.particles[i].scattering = false;
                // 开始聚集
                this._gatherParticles(this.particles[i]);
            }
        }, 500 + 1000 * Math.random())
    }

    // 单独粒子向中心聚集方法
    _gatherParticles(particle) {
        const minDistance = 1;
        const maxDistance = 8;
        particle.scale.set(1, 1, 1);
        particle.visible = false;

        const x = Math.random() > 0.5 ? 1 : -1;
        const z = Math.random() > 0.5 ? 1 : -1;
        particle.position.x = (minDistance + (maxDistance - minDistance) * Math.random()) * x;
        particle.position.y = minDistance + (maxDistance - minDistance) * Math.random();
        particle.position.z = (minDistance + (maxDistance - minDistance) * Math.random()) * x;
        // particle.position.x = (maxDistance * Math.random()) * x;
        // particle.position.y = maxDistance * Math.random();
        // particle.position.z = (maxDistance * Math.random()) * x;

        setTimeout(((particleItem) => {
            return () => {
                if(!particleItem.gathering) { return };
                particleItem.visible = true;

                const duration = 0.5 + Math.random() * 0.4;

                // 聚集动画
                customAnimation.to(particleItem.scale, duration, {
                    x: 0.8 + Math.random(),
                    y: 0.8 + Math.random(),
                    z: 0.8 + Math.random(),
                })

                customAnimation.to(particleItem.position, duration, {
                    x: Math.random() * x,
                    y: Math.random() * 2.5,
                    z: Math.random() * z,
                    onComplete: () => {
                        if(particleItem.gathering) {
                            this._gatherParticles(particleItem);
                        }
                    }
                })
            }
        })(particle), Math.random() * 500)
    }

    loadTexture() {
        // 给人物的head添加纹理
        const specularTexture = this.loader.load('../../resource/images/head.png');

        // 定义一个高光材质的纹理,
        const specularMaterial = new THREE.MeshBasicMaterial({
            map: specularTexture
        });

        const middleTexture = this.loader.load('/game/resource/images/top.png');
        const middleMaterial = new THREE.MeshBasicMaterial({
            map: middleTexture
        })

        const bottomTexture = this.loader.load('/game/resource/images/bottom.png');
        const bottomMaterial = new THREE.MeshBasicMaterial({
            map: bottomTexture
        })

        return {
            specularMaterial, 
            middleMaterial,
            bottomMaterial
        }
    }

    reset() {
        this.stop();
        this.obj.rotation.x = 0;
        this.obj.rotation.z = 0;
        this.obj.position.set(bottleConfig.initPosition.x, bottleConfig.initPosition.y + 30, bottleConfig.initPosition.z)
    }


    // 更新瓶子的动作
    update() {
        if(this.status === 'shrink') {
            this._shrink();
        }else if(this.status == 'jump') {
            const tickTime = Date.now() - this.lastFrameTime;
            this._jump(tickTime);
        } 

        this.head.rotation.y += 0.06;
        this.lastFrameTime = Date.now();
        
    }

    // 瓶子坠落动画
    showup() {
        // audioManager.init.play();
        customAnimation.to(this.obj.position, 0.5, {
            x: bottleConfig.initPosition.x, 
            y: bottleConfig.initPosition.y + blockConfig.height / 2, 
            z: bottleConfig.initPosition.z,
            ease: 'Bounce.easeOut'
        })
    }

    // 瓶子前倾 
    forerake() {
        this.status = "forerake"; 
        setTimeout(() => {
            // 如果沿着x轴跳跃， 旋转
            if(this.direction == 0) {
                customAnimation.to(this.obj.rotation, 1, {
                    z: -Math.PI / 2
                })
            }else {
                customAnimation.to(this.obj.rotation, 1, {
                    x: -Math.PI / 2
                })
            }

            // 位置下移
            setTimeout(() => {
                customAnimation.to(this.obj.position, 0.4, {
                    y: -blockConfig.height / 2 + 1.2
                })
            }, 350)
        }, 200);

    }

    // 瓶子后倒
    hypsokinesis() {
        this.status = 'hypsokinesis';
        setTimeout(() => {
            if(this.direction === 0) {
                customAnimation.to(this.obj.rotation, 0.8, {
                    z: Math.PI / 2
                })
            }else {
                customAnimation.to(this.obj.rotation, 0.8, {
                    x: Math.PI / 2
                })
            }

            setTimeout(() => {
                customAnimation.to(this.obj.position, 0.4, {
                    y: -blockConfig.height / 2 + 1.2
                })
                customAnimation.to(this.head.position, 0.2, {
                    x: 1.125
                })
                customAnimation.to(this.head.position, 0.2, {
                    x: 0,
                    ease: 'Linear',
                    deley: '0.2'
                })
            }, 350)
        }, 200)
    }

    setDirection(direction, axis) {
        this.direction = direction;
        this.axis = axis;
    }

    shrink() {
        this.status = "shrink";
        this.gatherParticles();
    }

    jump() {
        this.status = 'jump';
        this.resetParticles();
    }

    stop() {
        this.scale = 1;
        this.flyingTime = 0;
        this.status = "stop"
    }


    // 内部瓶子收缩
    _shrink() {
        // 设置压缩范围
        const MIN_SCALE = 0.55;
        // 水平
        const HORIZON_DELTA_SCALE = 0.007;
        const DELTA_SCALE = 0.005;
        // 头部改变
        const HEAD_DELTA = 0.03;

        this.scale -= DELTA_SCALE; 
        this.scale = Math.max(MIN_SCALE, this.scale);

        // 当按压小于最小压缩数值的时候， 停止动画
        if(this.scale <= MIN_SCALE) {
            return;
        }

        this.body.scale.y = this.scale;
        this.body.scale.x += HORIZON_DELTA_SCALE;
        this.body.scale.z += HORIZON_DELTA_SCALE;
        this.head.position.y -= HEAD_DELTA;

        // bottle跟随砖块一起收缩
        const deltaY = blockConfig.height * DELTA_SCALE / 2;
        const bottleDeltaY = HEAD_DELTA / 2;
        // // 重心向下移
        this.obj.position.y = this.obj.position.y - (bottleDeltaY + deltaY * 2);

    }

    _jump(tickTime) {
        const t = tickTime / 1000;
        this.translateH = this.velocity.vx * t;
        this.translateY = this.velocity.vy * t - 0.5 * gameConfig.gravity * t * t - gameConfig.gravity * this.flyingTime * t;
        this.obj.translateY(this.translateY);
        this.obj.translateOnAxis(this.axis, this.translateH);
        this.flyingTime = this.flyingTime + t;
    }

    // 瓶子旋转方法
    rotate() {
        const scale = 1.4;
        this.human.rotation.x = this.human.rotation.z = 0;
        this.human.rotation.z = 0;
        // x
        if(this.direction == 0) {
            customAnimation.to( this.human.rotation, 0.14, { z: this.human.rotation.z - Math.PI });
            customAnimation.to( this.human.rotation, 0.18, { z: this.human.rotation.z - 2 * Math.PI, delay: 0.14});

            customAnimation.to(this.head.position,  0.1, { y: this.head.position.y + 0.9 * scale, x: this.head.position.x + 0.45 * scale });
            customAnimation.to(this.head.position,  0.1, { y: this.head.position.y - 0.9 * scale, x: this.head.position.x - 0.45 * scale, delay: 0.1});
            customAnimation.to(this.head.position, 0.15, { y: 7.56, x: 0, delay: 0.25 })
            customAnimation.to(this.body.scale, 0.1, { y: Math.max(scale, 1), x: Math.max(Math.min(1 / scale, 1), 0.7), z: Math.max(Math.min(1 / scale, 1), 0.7) })
            customAnimation.to(this.body.scale, 0.1, { y: Math.min(0.9 / scale, 0.7), x: Math.max(scale, 1.2), z: Math.max(scale, 1.2), delay: 0.1 })
            customAnimation.to(this.body.scale, 0.3, { y: 1, x: 1, z: 1, delay: 0.2 })
        }else if(this.direction == 1){ // z
            customAnimation.to(this.human.rotation, 0.14, { x: this.human.rotation.x - Math.PI })
            customAnimation.to(this.human.rotation, 0.18, { x: this.human.rotation.x - 2 * Math.PI, delay: 0.14 })
            
            customAnimation.to(this.head.position, 0.1, { y: this.head.position.y + 0.9 * scale, z: this.head.position.z - 0.45 * scale })
            customAnimation.to(this.head.position, 0.1, { z: this.head.position.z + 0.45 * scale, y: this.head.position.y - 0.9 * scale, delay: 0.1 })
            customAnimation.to(this.head.position, 0.15, { y: 7.56, z: 0, delay: 0.25 })
            
            customAnimation.to(this.body.scale, 0.05, { y: Math.max(scale, 1), x: Math.max(Math.min(1 / scale, 1), 0.7), z: Math.max(Math.min(1 / scale, 1), 0.7) })
            customAnimation.to(this.body.scale, 0.05, { y: Math.min(0.9 / scale, 0.7), x: Math.max(scale, 1.2), z: Math.max(scale, 1.2), delay: 0.1 })
            customAnimation.to(this.body.scale, 0.2, { y: 1, x: 1, z: 1, delay: 0.2 })
        }
    }
}

export default new Bottle();