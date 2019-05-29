import audioConfig from '../../config/audio.config'
import gameView from '../game/view'

class AudioManager {
    constructor() {
        this.init()
    }

    init() {
        for (let key in audioConfig.audioSources) {
            this[key] = wx.createInnerAudioContext()
            this[key].src = audioConfig.audioSources[key]
        }
        this.shrink_end.loop = true
        this.shrink.onEnded(() => {
            if (gameView.gameStart.bottle.status == 'shrink') {
                this.shrink_end.play()
            }
        })
    }
}

export default new AudioManager()