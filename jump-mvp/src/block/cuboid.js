import BaseBlock from './base';

class Cuboid extends BaseBlock {
    constructor(x, y, z, width) {
        // 执行父类的构造函数
        super('cuboid');
        const size = width || this.width;
        const geometry = new THREE.BoxGeometry(size, this.height, size)
    }
}

export default Cuboid;
