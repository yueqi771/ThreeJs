import blockConfig from '../../config/block.config';

class BaseBlock {
    constructor(type) {
        this.type = type; // cuboid | cylinder
        this.height = blockConfig.height;
        this.width = blockConfig.width;
    }
}

export default BaseBlock;
