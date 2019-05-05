import bottleConfig from '../../config/bottle.config';
import blockConfig from '../../config/block.config';
import { customAnimation } from '../../lib/animation'

class Bottle {
    constructor(x, y, z) {
        // 瓶子延x轴进行旋转跳跃
        this.direction = 0;

        // 跳跃的轴坐标
        this.axis = null;
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

    // 更新瓶子的动作
    update() {
        this.head.rotation.y += 0.06;
    }

    showup() {
        customAnimation.to(0.5, this.obj.position,  {
            x: bottleConfig.initPosition.x, 
            y: bottleConfig.initPosition.y + blockConfig.height / 2, 
            z: bottleConfig.initPosition.z
        }, 'BounceEaseOut')
    }

    setDirection(direction, axis) {
        this.direction = direction;
        this.axis = axis;
    }

    // 瓶子旋转方法
    rotate() {
        const scale = 1.4;
        this.human.rotation.x = this.human.rotation.z = 0;
        // x
        if(this.direction == 0) {
            customAnimation.to(this.human.rotation, 0.14, { z: this.human.rotation.z - Math.PI });
            customAnimation.to(this.human.rotation, 0.18, { z: this.human.rotation.z - 2 * Math.PI }, 'Linear', 0.14);
            customAnimation.to(this.head.position, 0.1, { y: this.head.position.y + 0.9 * scale, x: this.head.position.x + 0.45 * scale });
            customAnimation.to(this.head.position, 0.1, { y: this.head.position.y - 0.9 * scale, x: this.head.position.x - 0.45 * scale, delay: 0.1});
            customAnimation.to(this.head.position, 0.15, { y: 7.56, x: 0, delay: 0.25 })
            
            customAnimation.to(this.body.scale, 0.1, { y: Math.max(scale, 1), x: Math.max(Math.min(1 / scale, 1), 0.7), z: Math.max(Math.min(1 / scale, 1), 0.7) })
            customAnimation.to(this.body.scale, 0.1, { y: Math.min(0.9 / scale, 0.7), x: Math.max(scale, 1.2), z: Math.max(scale, 1.2), delay: 0.1 })
            customAnimation.to(this.body.scale, 0.3, { y: 1, x: 1, z: 1, delay: 0.2 })
        }
    }
}

export default new Bottle();