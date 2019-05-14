import sceneConf from '../../config/scene.config'
class Camera {
    constructor() {
        this.instance = null;
    }

    init() {
        // 透视相机和正焦相机（无近大远小的效果）
        const aspect = window.innerHeight / window.innerWidth;
        this.instance = new THREE.OrthographicCamera(-sceneConf.frustumSize, sceneConf.frustumSize, sceneConf.frustumSize * aspect, -sceneConf.frustumSize * aspect, -100, 85);
        this.instance.position.set(-10, 10, 10);
        // this.instance.position.set(0, 0, 10);
        this.target = new THREE.Vector3(0, 0, 0);
        this.instance.lookAt(this.target);
    }
}

export default new Camera();