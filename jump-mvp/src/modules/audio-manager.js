import audioConfig from '../../config/audio.config';
import gameView from '../game/view'
class AudioManager {
    constructor() {
        console.log(123)
        this.init();

    }
    
    init() {
        // 实例化音频
        for(let key in audioConfig.audioSources) {
            this[key] = wx.createInnerAudioContext();
            this[key].src = audioConfig.audioSources[key];

            this[key].play()
            this[key].onError((e) => {
                console.log(e)
            });

        }
        
        
        // 当按压收缩时， 收缩的音频要一直播放
        this.shrink_end.loop = true;
        this.shrink.onEnded(() => {
            if(gameView.gameStart.bottle.status === 'shrink') {
                this.shrink_end.play();
            }
        })
    }
}

export default new AudioManager()