/**
 *  小游戏入口
 */
import * as THREE from '../lib/three.js';
import game from './game/game.js'

window.THREE = THREE;

class Main {
    constructor() {
    }

    static init() {
        game.init();
    }
}

export default Main;