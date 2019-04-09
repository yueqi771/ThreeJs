import camera from './camera'
class Scene {
    constructor() {
        this.instance = null;
    }

    init() {
        this.instance = new THREE.Scene
        const renderer = this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antilias: true, // 抗掉锯齿效果
            preserveDrawingBuffer: true
        })

        this.camera = camera
    }
}

export default new Scene;