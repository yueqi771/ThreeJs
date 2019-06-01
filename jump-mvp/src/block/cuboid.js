import BaseBlock from './base';
import utils from '../utils/index';
import blockConfig from '../../config/block.config';

class Cuboid extends BaseBlock {
    constructor(x, y, z, name, width) {
        // 执行父类的构造函数
        super('cuboid');

        this.loader = new THREE.TextureLoader();

        const size = width || this.width
        
        if(name === 'color') {
            const seed = Math.floor(Math.random() * 6);
            let currentColor;

            switch(seed) {
                case 0:
                    currentColor = blockConfig.colors.orange;
                    break;
                case 1:
                    currentColor = blockConfig.colors.orangeDark;
                    break;
                case 2:
                    currentColor = blockConfig.colors.green;
                    break;
                case 4:
                    currentColor = blockConfig.colors.blue;
                    break;
                case 4:
                    currentColor = blockConfig.colors.yellow;
                    break;
                case 5:
                    currentColor = blockConfig.colors.purple;
                    break;
                default: 
                    currentColor = blockConfig.colors.purple;
            }

            const innerMaterial = new THREE.MeshLambertMaterial({
                color: blockConfig.colors.white
            })
            const outerMaterial = new THREE.MeshLambertMaterial({
                color: currentColor
            })
            const innerHeight = 3;
            const outerHeight = (blockConfig.height - innerHeight) / 2;
            const outerGeometry = new THREE.BoxGeometry(size, outerHeight, size);
            const innerGeometry = new THREE.BoxGeometry(size, innerHeight, size);

            const totalMesh = new THREE.Object3D();
            const topMesh = new THREE.Mesh(outerGeometry, outerMaterial);
            topMesh.position.y = (innerHeight + outerHeight) / 2;
            topMesh.receiveShadow = true;
            topMesh.castShadow = true;

            const middleMesh = new THREE.Mesh(innerGeometry, innerMaterial);
            middleMesh.receiveShadow = true;
            middleMesh.castShadow = true;

            const bottomMesh = new THREE.Mesh(outerGeometry, outerMaterial);
            bottomMesh.position.y = -(innerHeight + outerHeight) / 2;
            bottomMesh.receiveShadow = true;
            bottomMesh.castShadow = true;

            totalMesh.add(topMesh);
            totalMesh.add(middleMesh);
            totalMesh.add(bottomMesh);

            this.instance = totalMesh;
        }else {
            const geometry = new THREE.BoxGeometry(size, this.height, size);
            const material = new THREE.MeshLambertMaterial({
                map: this.loader.load('resource/images/well.png')
            });
            utils.mapUv(280, 428, geometry, 1, 0, 0, 280, 148); // front
            utils.mapUv(280, 428, geometry, 2, 0, 148, 280, 428); // top
            utils.mapUv(280, 428, geometry, 4, 0, 0, 280, 148, true); // right
            this.instance = new THREE.Mesh(geometry, material);
            this.instance.receiveShadow = true;
            // 允许投射阴影
            this.instance.castShadow = true;
        }

        // 允许接受光源阴影
        this.instance.name = 'block';
        this.x = x;
        this.y = y;
        this.z = z;

        this.instance.position.x = this.x;
        this.instance.position.y = this.y;
        this.instance.position.z = this.z;
    }
}

export default Cuboid;
