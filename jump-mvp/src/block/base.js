import blockConfig from '../../config/block.config';
import { customAnimation } from '../../lib/animation'
class BaseBlock {
    constructor(type) {
        this.type = type; // cuboid | cylinder
        this.height = blockConfig.height;
        this.width = blockConfig.width;
        this.status = 'stop'; 
        this.scale = 1;
    }

    update() {
        if(this.status === 'shrink') {
            this._shrink();
        }
    }

    shrink() {
        this.status = 'shrink';
    }

    _shrink() {
        // console.log('触发shrink方法了')
        const DELTA_SCALE = 0.005;
        const MIN_SCALE = 0.55;
        this.scale -= DELTA_SCALE;
        this.scale = Math.max(MIN_SCALE, this.scale);
        if(this.scale <= MIN_SCALE) {
            return;
        }

        this.instance.scale.y = this.scale;
        // console.log(this.scale)
        
        // 方块质心改变的距离
        const deltaY = this.height * DELTA_SCALE / 2;
        this.instance.position.y -= deltaY;
    }

    rebound() {
        this.status = 'stop';
        this.scale = 1;
        customAnimation.to(this.instance.scale,  0.5, {y: 1, ease: 'Elastic.easeOut'})
        customAnimation.to(this.instance.position,  0.5,  {y: 0, ease: 'Elastic.easeOut'})
    }

    // 获取block的边缘距离
    getVertices() {
        const vertices = [];
        const centerPosition = {
            x: this.instance.position.x,
            z: this.instance.position.z
        }

        vertices.push([centerPosition.x + this.width / 2, centerPosition.y + this.width / 2 ]);
        vertices.push([centerPosition.x + this.width / 2, centerPosition.y - this.width / 2 ]);
        vertices.push([centerPosition.x - this.width / 2, centerPosition.y + this.width / 2 ]);
        vertices.push([centerPosition.x - this.width / 2, centerPosition.y - this.width / 2 ]);

        return vertices;

    }

}

export default BaseBlock;
