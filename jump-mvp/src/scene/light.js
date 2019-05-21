
import { customAnimation } from '../../lib/animation'
class Light {
    constructor() {
        this.instances = {}
    }

    init() {
        const ambienLight = new THREE.AmbientLight(0xffffff, 0.8);
        const shadowLight = this.shadowLight = new THREE.DirectionalLight(0xffffff, 0.3);

        shadowLight.position.set(10, 30, 20);

        // 允许投射阴影
        shadowLight.castShadow = true;
        
        // 设置shadowTarget;
        let basicMaterial = new THREE.MeshBasicMaterial({color: 0xf5f5f5});
        this.shadowTarget = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), basicMaterial);
        this.shadowTarget.visibile = false;
        this.shadowTarget.name = 'shadowTarget';
        shadowLight.target = this.shadowTarget;

        shadowLight.shadow.camera.near = 0.5;
        shadowLight.shadow.camera.far = 500;
        shadowLight.shadow.camera.left = -100;
        shadowLight.shadow.camera.right = 100;
        shadowLight.shadow.camera.bottom = -100;
        shadowLight.shadow.camera.top = 100;

        // 纹理的大小
        shadowLight.shadow.mapSize.width = 1024;
        shadowLight.shadow.mapSize.height = 1024;


        this.instances.ambienLight = ambienLight;
        this.instances.shadowLight = shadowLight;
        this.instances.shadowTarget = this.shadowTarget;

    }

    reset() {
        this.shadowLight.position.set(10, 30, 30);
        this.shadowTarget.position.set(0, 0, 0);
    }

    // 更新光线位置
    updatePosition(targetPosition) { 
        customAnimation.to(this.shadowTarget.position, 0.5, {x: targetPosition.x, y: targetPosition.y, z: targetPosition.z});
        customAnimation.to(this.shadowLight.position, 0.5, {x: 10 + targetPosition.x, y: 30 + targetPosition.y, z: 20 + targetPosition.z});
    } 
}

export default new Light()