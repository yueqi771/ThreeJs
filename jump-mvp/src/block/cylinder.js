import BaseBlock from './base';

class Cylinder extends BaseBlock {
    constructor(x, y, z, width) {
        // 执行父类的构造函数
        super('cylinder');

        const size = width || this.width;
        const geometry = new THREE.CylinderGeometry(size / 2, size / 2 , this.height, 120);
        // 材质
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
        });

        this.instance = new THREE.Mesh(geometry, material);
        this.instance.name = 'block';
        this.x = x;
        this.y = y;
        this.z = z;
        this.instance.position.x = this.x;
        this.instance.position.y = this.y;
        this.instance.position.z = this.z;

    }
}

export default Cylinder;
