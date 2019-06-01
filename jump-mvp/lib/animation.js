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

let animationId = -1;
let killAnimationId = animationId - 1;

const customAnimation = exports.customAnimation = {};

customAnimation.to = function(obj, duration, options) {
    let delay = options.delay || 0;
    duration *= 1000;

    for (let name in options) {
        if(name === 'delay') {
            // 覆盖delay
            delay = options[name]
        }  else if(name === 'ease') {

        } else {
            setTimeout(function(name) {
                return function() {
                    tweenAnimation(obj[name], options[name], duration, options.ease || 'Linear', function(value, complete) {
                        obj[name] = value;
                        if(complete) {
                            options.onComplete && options.onComplete(value);
                        }
                    });
                }
            }(name), delay * 1000);
        }
    }
}


// 对运动方法进行封装
const tweenAnimation = exports.tweenAnimation = function tweenAnimation(from, to, duration, easing, callback) {

    let selfAnimationId = ++animationId;
    const isUndefined = function isUndefined(obj) {
        return typeof obj == 'undefined';
    }
    const isFunction = function isFunction(obj) {
        return typeof obj == 'function';
    }
    const isNumber = function isNumber(obj) {
        return typeof obj == 'number';
    }
    const isString = function isString(obj) {
        return typeof obj == 'string';
    }

    // 时间过滤器：转化为毫秒
    const toMillisecond = function (obj) {
        if(isNumber(obj)) {
            return obj;
        }else if(isString(obj)) {
            if(/\d+m?s$/.test(obj)) {
                if(/ms/.test(obj)) {
                    return 1 * obj.replace('ms', '');
                }

                return 1000 * obj.replace('s', '');
            }else if(/^\d+$/.test(obj)) {
                return +obj
            }
        } 
        return -1;
    };

    // 缓动算法
    let tween = Tween;
    
    if(!tween) {
        if(window.console) {
            console.error('缓动算法确实')
        }
        return 0;
    }
    
    // duration, easing, callback均为可选参数
    // 而且顺序可以任意
    let options = {
        duration: 500,
        easing: 'Linear',
        callback: function callback() {}
    }
    
    const setOptions = function setOptions(obj) {
        if(isFunction(obj)) {
            options.callback = obj
        } else if(toMillisecond(obj) != -1) {
            options.duration = toMillisecond(obj);
        } else if(isString(obj)) {
            options.easing = obj
        }
    }
    
    setOptions(duration);
    setOptions(easing);
    setOptions(callback);
    
    // requestAnimationFrame的兼容处理
    if(!window.requestAnimationFrame) {
        requestAnimationFrame = function requestAnimationFrame(fn) {
            setInterval(fn, 17);
        }
    }
    
    // 算法需要的几个变量
    let start = -1;
    // duration根据设置的总时间计算
    let during = Math.ceil(options.duration / 17);
    
    // 当前动画算法
    // 确保首字母答大些
    options.easing = options.easing.slice(0, 1).toUpperCase() + options.easing.slice(1);
    let arrKeyTween = options.easing.split('.'),
        fnGetValue;
    
    
    if(arrKeyTween.length == 1) {
        fnGetValue = tween[arrKeyTween[0]]
    }else if(arrKeyTween.length == 2) {
        fnGetValue = tween[arrKeyTween[0]] && tween[arrKeyTween[0]][arrKeyTween[1]];
    }
    
    if(isFunction(fnGetValue) == false) {
        console.error('没有找到名为' + options.easing + '的动画算法');
        return;
    }
    
    let startTime = Date.now();
    let lastTime = Date.now();
    
    // 运动
    const step = function step() {
        let currentTime = Date.now();
        let interval = currentTime - lastTime,
            fps = 0;
    
        if(interval) {
            fps = Math.ceil(1000 / interval);
        } else {
            requestAnimationFrame(step);
            return;
        }
    
        lastTime = currentTime;
        if(interval > 100) {
            requestAnimationFrame(step);
            return;
        }
    
        if(fps >= 30) {
            start ++;
        }else {
            let _start = Math.floor((currentTime - startTime) / 17);
            start = _start > start ? _start : start + 1;
        }
    
        // 当前运动的位置
        let value = fnGetValue(start, from , to-from, during);
    
        // 如果还没有运动到目标位置， 继续
        if(start <= during && selfAnimationId > killAnimationId) {
            options.callback(value);
            requestAnimationFrame(step);
        }else if(start > during && selfAnimationId > killAnimationId)  {
            // 动画结束， 这里可以插入回调
            options.callback(to, true)
        };
    
        
    }

    // 开始循环执行动画
    step();

}

const stopAllAnimation = exports.stopAllAnimation =  function stopAllAnimation() {
    killAnimationId = animationId;
}

tweenAnimation.killAll = function() {
    killAnimationId = animationId;
}
