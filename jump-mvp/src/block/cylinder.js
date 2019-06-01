import BaseBlock from './base';
import utils from '../utils/index';
import blockConfig from '../../config/block.config';

class Cylinder extends BaseBlock {
    constructor(x, y, z, name, width) {
        // 执行父类的构造函数
        super('cylinder');

        const size = width || this.width;
        if (name == 'color') {
            let currentColor
            const seed = Math.floor(Math.random() * 6)
            switch (seed) {
                case 0:
                    currentColor = blockConfig.colors.orange
                    break
                case 1:
                    currentColor = blockConfig.colors.orangeDark
                    break
                case 2:
                    currentColor = blockConfig.colors.green
                    break
                case 3:
                    currentColor = blockConfig.colors.blue
                    break
                case 4:
                    currentColor = blockConfig.colors.yellow
                    break
                case 5:
                    currentColor = blockConfig.colors.purple
                    break
                default:
            }
            const innerMaterial = new THREE.MeshLambertMaterial({
                color: blockConfig.colors.white
            })
            const outerMaterial = new THREE.MeshLambertMaterial({
                color: currentColor
            })

            const innerHeight = 3
            const outerHeight = (blockConfig.height - innerHeight) / 2
            const outerGeometry = new THREE.CylinderGeometry(size / 2, size / 2, outerHeight, 120)
            const innerGeometry = new THREE.CylinderGeometry(size / 2, size / 2, innerHeight, 120)

            const totalMesh = new THREE.Object3D()
            const topMesh = new THREE.Mesh(outerGeometry, outerMaterial)
            topMesh.position.y = (innerHeight + outerHeight) / 2
            topMesh.receiveShadow = true
            topMesh.castShadow = true

            const middleMesh = new THREE.Mesh(innerGeometry, innerMaterial)
            middleMesh.receiveShadow = true
            middleMesh.castShadow = true

            const bottomMesh = new THREE.Mesh(outerGeometry, outerMaterial)
            bottomMesh.position.y = -(innerHeight + outerHeight) / 2
            bottomMesh.receiveShadow = true
            bottomMesh.castShadow = true
            totalMesh.add(topMesh)
            totalMesh.add(middleMesh)
            totalMesh.add(bottomMesh)
            this.instance = totalMesh
        } 

        this.instance.name = 'block'

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

export default Cylinder;
