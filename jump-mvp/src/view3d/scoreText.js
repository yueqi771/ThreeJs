import font from './font';

class ScoreText {
    constructor() {

    }

    init(options) {
        const color =  (options && options.fillStyle) ? options.fillStyle : 0xffffff
        this.meterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true // 使opacit属性生效
        });

        if(options && options.opacity) {
            this.materila.opacity = options.opacity;
        } 

        this.options = options || {};

        const geometry = new THREE.TextGeometry('0', {
            font: font,
            size: 6.0,
            height: 0.1
        })

        this.instance = new THREE.Mesh(geometry, this.meterial);

        this.instance.name = 'scoreText';
    }

    // 更新当前文字
    updateScore(score) {
        const scoreString = score.toString();
        this.instance = new THREE.Mesh(
            new THREE.TextGeometry(scoreString, {
                font: font,
                size: 6.0,
                height: 0.1
            }),
            this.meterial
        )
    }
}

export default ScoreText;