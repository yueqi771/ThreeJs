import blockConfig from '../../config/block.config';

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
        console.log('触发shrink方法了')
        const DELTA_SCALE = 0.005;
        const MIN_SCALE = 0.55;
        this.scale -= DELTA_SCALE;
        this.scale = Math.max(MIN_SCALE, this.scale);
        if(this.scale <= MIN_SCALE) {
            return;
        }

        this.instance.scale.y = this.scale;
        console.log(this.scale)
        
        // 方块质心改变的距离
        const deltaY = this.height * DELTA_SCALE / 2;
        this.instance.position.y -= deltaY;
    }

    stop() {
        this.scale = 1;
        this.status = 'stop';
    }
}

export default BaseBlock;
