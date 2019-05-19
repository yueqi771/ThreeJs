
import sceneConfig from '../../config/scene.config'

class GameOver {
    constructor(callbacks) {
        this.callbacks = callbacks;

    }

    init(options) {
        // canvas理论上是一张图片， 那么可以通过document.createElement('canvas')的方式来创建一个离屏canvas，将它复制到three.js的
        // 一个对象上， 通过空间的关系， 那么看到的效果就是2d的效果
        this.initGameoverCanvas(options);
    }

    initGameoverCanvas(options) {
        const aspect = window.innerHeight / window.innerWidth;
        this.camera = options.camera;
        this.canvas = document.createElement('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // 纹理
        this.texture = new THREE.Texture(this.canvas);
        // 用纹理生成meterial
        this.material = new THREE.MeshBasicMaterial({
            map: this.texture,
            transparent: true,
            side: THREE.DoubleSide
        })
        // 几何图形
        this.geometry = new THREE.PlaneGeometry(sceneConfig.frustumSize * 2, aspect * sceneConfig.frustumSize * 2);
        // 通过geometry和meterial生成一个THREE.js的网格
        this.obj = new THREE.Mesh(this.geometry, this.material);
        this.obj.position.z = 20;
        // this.obj.rotation.y = Math.PI

        // 绘制canvas的图像
        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = "#333";
        this.context.fillRect((window.innerWidth - 200) / 2, (window.innerHeight - 100) / 2, 200, 100);
        // 刷新texture
        this.context.fillStyle = "#eee";
        this.context.font = "20px Georgia";
        this.context.fillText('Game Over', (window.innerWidth - 200) / 2 + 50 , (window.innerHeight - 100) / 2 + 55);
        // 将文字进行旋转
        this.texture.needsUpdate = true;
        this.obj.visible = false;
        this.camera.add(this.obj);
    }

    show() {
        this.obj.visible = true;
        console.log('game over show')
    }

    hide() {
        this.obj.visible = false;
    }

    bindTouchEvent() {

    }
}

export default GameOver;
