/**
 * @description animation library
 * @detail requestAnimationFrame
 * @params 
 * 1. duration 
 * 2. from
 * 3. to
 * 4. type 
 */

import Tween from './tween';

export const customAnimation = exports.customAnimation = {};

customAnimation.to = function(duration, from, to, type, deley) {
    for(let key in from) {
        setTimeout(function (key) {
            return function() {
                tweenAnimation(from[key], to[key], duration, type, (value, complete) => {
                    from[key] = value
                })
            }
        }(key), deley * 1000)
        
    }
}

// duration unit second
 function tweenAnimation(from, to, duration, type, callback) {
    const frameCount = duration * 1000 / 17;
    let start = -1,
        startTime = Date.now(),
        lastTime = Date.now();
    
    const tweenFn = Tween[type];
    const options = {
        callback: function() {},
        type: 'Linear',
        duration: 300
    };

    if(callback) {
        options.callback = callback;
    }

    if(type) {
        options.type = type;
    }

    if(duration) {
        options.duration = duration
    }

    const step = function () {
        const currentTime = Date.now();
        // 间隔时间
        const interval = currentTime - lastTime;
        let fps;

        if(interval) {
            fps = Math.ceil( 1000 / interval);
        }else {
            requestAnimationFrame(step);
            return
        }

        if(interval >= 16) {
            // 绘制下一帧
            start ++ ;
        }else {
            // 如果大于17的话， 那么判断下一帧在哪
            const _start = Math.floor(interval / 30);

            start = start + _start
        }
        const value = tweenFn(start, from, to - from, frameCount);
        // console.log(interval, from,  frameCount)

        if(start <= frameCount) {
            // 动画继续
            options.callback(value)
            requestAnimationFrame(step)
        }else{
            // 动画结束
            options.callback(to, true)
        }

        requestAnimationFrame(step);
        
        lastTime = Date.now();

    }

    step()
};
