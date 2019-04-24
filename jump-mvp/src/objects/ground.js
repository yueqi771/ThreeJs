class Ground {
    constructor() {

    }

    init() {
        const groundGeometry = new THREE.PlaneGeometry(200, 200);
        // 材质
        const material = new THREE.ShadowMaterial({
            transparent: true,
            color: 0x000000,
            opacity: 0.3,
        });

        this.instance = new THREE.Mesh(groundGeometry, material);

        this.instance.receiveShadow = true;
        this.instance.rotation.x = - (Math.PI / 2);
        this.instance.position.y = - 16 / 3.2;

    }
}

export default new Ground();
