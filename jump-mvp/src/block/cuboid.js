import BaseBlock from './base';

class Cuboid extends BaseBlock {
    constructor(x, y, z, width) {
        // 执行父类的构造函数
        super('cuboid');

        const size = width || this.width;
        const geometry = new THREE.BoxGeometry(size, this.height, size);
        // 材质
        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
        });

        this.instance = new THREE.Mesh(geometry, material);
        // 允许接受光源阴影
        this.instance.receiveShadow = true;
        this.instance.name = 'block';
        this.x = x;
        this.y = y;
        this.z = z;

        // 允许投射阴影
        this.instance.castShadow = true;

        this.instance.position.x = this.x;
        this.instance.position.y = this.y;
        this.instance.position.z = this.z;

    }
}

export default Cuboid;
