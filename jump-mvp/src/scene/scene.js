import camera from './camera'
import light from './light'
import background from '../objects/background' 
class Scene {
    constructor() {
        this.instance = null;
    }

    init() {
        this.instance = new THREE.Scene();
        const renderer = this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true, // 抗掉锯齿效果
            preserveDrawingBuffer: true
        })

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSShadowMap

        this.camera = camera;
        this.light = light;
        this.light.init();
        this.camera.init();

        this.axesHelper = new THREE.AxesHelper(100);
        this.instance.add(this.axesHelper);
        this.instance.add(this.camera.instance);

        for (let lightType in this.light.instances) {
            this.instance.add(this.light.instances[lightType])
        }

        // 初始化背景, 添加到相机中， 因为必须保证背景是平的
        this.background = background;
        this.background.init();
        this.background.instance.position.z = -84;
        this.camera.instance.add(this.background.instance);
    }

    render() {
        this.renderer.render(this.instance, this.camera.instance);
    }
}

export default new Scene;