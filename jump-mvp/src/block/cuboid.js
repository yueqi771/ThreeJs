import BaseBlock from './base';
import utils from '../utils/index';

class Cuboid extends BaseBlock {
    constructor(x, y, z, name, width) {
        // 执行父类的构造函数
        super('cuboid');

        this.loader = new THREE.TextureLoader();

        const size = width || this.width;
        // const geometry = new THREE.BoxGeometry(size, this.height, size);
        // 材质
        // const material = new THREE.MeshPhongMaterial({
        //     color: 0xffffff,
        // });
        if(name === 'color') {

        }else if(name === 'well') {
            const geometry = new THREE.BoxGeometry(size, this.height, size);
            const material = new THREE.MeshLambertMaterial({
                map: this.loader.load('resource/images/well.png')
            });
            utils.mapUv(280, 428, geometry, 1, 0, 0, 280, 148); // front
            utils.mapUv(280, 428, geometry, 2, 0, 148, 280, 428); // top
            utils.mapUv(280, 428, geometry, 4, 0, 0, 280, 148, true); // right
            this.instance = new THREE.Mesh(geometry, material);
        }

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
