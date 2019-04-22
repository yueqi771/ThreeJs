
class Light {
    constructor() {
        this.instances = {}
    }

    init() {
        const ambienLight = new THREE.AmbientLight(0xffffff, 0.8);
        const shadowLight = new THREE.DirectionalLight(0xffffff, 0.3);

        shadowLight.position.set(10, 30, 20);
        
        // 设置shadowTarget;
        let basicMaterial = new THREE.MeshBasicMaterial({color: 0xf5f5f5});
        this.shadowTarget = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), basicMaterial);
        this.shadowTarget.visibile = false;
        this.shadowTarget.name = 'shadowTarget';
        shadowLight.target = this.shadowTarget;


        this.instances.ambienLight = ambienLight;
        this.instances.shadowLight = shadowLight;
        this.instances.shadowTarget = this.shadowTarget;

    }
}

export default new Light()