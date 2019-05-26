import audioConfig from '../../config/audio.config';
import gameView from '../game/view'
class AudioManager {
    constructor() {
        this.init();
    }
    
    init() {
        // 实例化音频
        for(let key in audioConfig.audioSources) {
            this[key] = wx.createInnerAudioContext();
            this[key].src = audioConfig.audioSources[key];

            console.log(this[key].src)
            console.log(this[key])

        }

        console.log(this)

        
        
        // 当按压收缩时， 收缩的音频要一直播放
        // this.shrink_end.loop = true;
        // this.shrink.onEnded(() => {
        //     if(gameView.gameStart.bottle.status === 'shrink') {
        //         this.shrink_end.play();
        //     }
        // })
    }
}

export default new AudioManager()