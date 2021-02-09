/*
 * @Author: Kilims Ye
 * @Date: 2021-02-09 11:02:01
 * @LastEditTime: 2021-02-09 15:59:42
 * @LastEditors: Kilims Ye
 * @Description:
 * @FilePath: /my-app/src/utils/UtilsFunc.js
 */
import { useState, useEffect, useCallback } from 'react';
// import { Toast } from 'antd-mobile';
import api from 'services';
import wx from 'weixin-js-sdk';
/** 获取当前url的参数 对象
 *
 * 使用方法：
 *
 * urlParams.get("keyName");
 *
 */
export const urlParams = new URLSearchParams(window.location.search);

/**
 * 判断是否iOS机子
 */
export const isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

export const onInputBlur = () => {
    /**
     * 处理IOSInput兼容性问题
     *
     * 问题描述: 当Input唤起小键盘输入完后，blur，页面无法到达顶部
     *
     */
    setTimeout(() => {
        let scrollHeight =
            parseInt(document.documentElement.scrollTop) === 0
                ? false
                : parseInt(document.documentElement.scrollTop) || parseInt(document.body.scrollTop) || 0;
        // alert(document.documentElement.scrollTop)
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }, 100);
};

/**
 * 阻止浏览器后退按钮默认操作
 * @param onBackClick 点击回退时的操作
 */
export function preventBack(onBackClick) {
    function handleGoBack() {
        window.history.pushState(null, null, window.location.href);
        onBackClick();
        window.removeEventListener('popstate', handleGoBack);
    }

    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', handleGoBack);
}

/**
 * px to rem
 */
export const rem = (value) => {
    const radio = 37.5;
    // const radio = 22;
    return (value / radio).toFixed(3) + 'rem';
};

/*
  三个参数
  file：一个是文件(类型是图片格式)，
  w：一个是文件压缩的后宽度，宽度越小，字节越小
  objDiv：一个是容器或者回调函数
  photoCompress()
*/
export function photoCompress(file, w, objDiv) {
    var ready = new FileReader();
    /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
    ready.readAsDataURL(file);
    ready.onload = function () {
        var re = this.result;
        canvasDataURL(re, w, objDiv);
    };
}

function canvasDataURL(path, obj, callback) {
    var img = new Image();
    img.src = path;
    img.onload = function () {
        var that = this;
        // 默认按比例压缩
        var w = that.width,
            h = that.height,
            scale = w / h;
        w = obj.width || w;
        h = obj.height || w / scale;
        var quality = 0.7; // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute('width');
        anw.nodeValue = w;
        var anh = document.createAttribute('height');
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        callback(base64);
    };
}

/** 将base64转换为文件对象
 *  @param {String} base64 base64字符串
 * */
export function convertBase64ToBlob(base64) {
    var base64Arr = base64.split(',');
    var imgtype = '';
    var base64String = '';
    if (base64Arr.length > 1) {
        //如果是图片base64，去掉头信息
        base64String = base64Arr[1];
        imgtype = base64Arr[0].substring(base64Arr[0].indexOf(':') + 1, base64Arr[0].indexOf(';'));
    }
    // 将base64解码
    var bytes = atob(base64String);
    //var bytes = base64;
    var bytesCode = new ArrayBuffer(bytes.length);
    // 转换为类型化数组
    var byteArray = new Uint8Array(bytesCode);

    // 将base64转换为ascii码
    for (var i = 0; i < bytes.length; i++) {
        byteArray[i] = bytes.charCodeAt(i);
    }
    // 生成Blob对象（文件对象）
    return new Blob([bytesCode], { type: imgtype });
}

//将base64转换为文件
export function dataURLtoFile(dataurl, filename) {
    console.log('dataurl', dataurl);
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

/** 监听窗口变化，返回size */
export function ChangeSize() {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        hieght: document.documentElement.clientHeight,
    });

    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        });
    }, []);

    useEffect(() => {
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return size;
}

/**  掩码处理
 *  str：字符串
 *  frontLen：前面保留位数
 *  endLen：后面保留位数
 */

export function plusXing(str, frontLen, endLen) {
    var len = str.length - frontLen - endLen;
    var xing = '';
    for (var i = 0; i < len; i++) {
        xing += '*';
    }
    return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
}

export const getElementOffsetTop = (el) => {
    let top = el.offsetTop;
    let cur = el.offsetParent;
    while (cur != null) {
        top += cur.offsetTop;
        cur = cur.offsetParent;
    }
    return top;
};
// 解决Android输入框被键盘挡住的问题
export const inputHandleForAndroid = (formElClasName) => {
    console.log('formElClasName', formElClasName);
    if (!isiOS) {
        const body = document.getElementsByTagName('body')[0]; // 兼容获取body

        const content = document.querySelector(formElClasName); // 表单内容部分
        // const content = document.querySelector('.personalForm') // 表单内容部分

        const clientHeight = body.clientHeight; //可见高
        const fixHeight = clientHeight / 3; // 定位高，弹出键盘时input距浏览器上部的距离，自己定义合适的

        // 符合需弹出键盘的元素query
        const queryStr = 'input[type="text"], input[type="tel"], input[type="password"], textarea';
        const inputs = content.querySelectorAll(queryStr);

        const offsetTopArr = Array.prototype.map.call(inputs, (item) => {
            return getElementOffsetTop(item); // offsetTop只能获取到顶部距它的offsetParent的距离，需此方法获取到元素距顶部的距离
        });

        inputs.forEach((item, i) => {
            item.addEventListener('focus', () => {
                // 改变top上移页面
                // regDom.style.top = '-' + (offsetTopArr[i] - fixHeight) + 'px'
                window.scrollTo({ top: offsetTopArr[i] - fixHeight, left: 0, behavior: 'smooth' });
            });

            // item.addEventListener('blur',()=>{
            //   // 恢复top
            //   regDom.style.top = 0
            // })
        });
    }
};
/**
 * 将千分位转化成正常数字
 * @param {Number}} value 数字
 */
export const normalizeAmount = (value) => {
    // format to normal amount
    if (value && value.length > 0) {
        if (value.indexOf('.') !== value.length - 1) {
            return JSON.parse(value.split(',').join(''));
        } else {
            return JSON.parse(
                value
                    .substr(0, value.length - 1)
                    .split(',')
                    .join(''),
            );
        }
    }
};

export function insertStr(soure, position, newStr) {
    return soure.slice(0, position) + newStr + soure.slice(position);
}

export function phoneFormatter(phoneNo) {
    return insertStr(insertStr(phoneNo, 3, ' '), 8, ' ');
}

//千分位
export function toThousand(num) {
    // let afterNumber = Number(num).toFixed(0) // 需求更改，不需要保留两位小数
    if (num === '') {
        return '';
    } else {
        if (num.indexOf('.') > 0) {
            return parseInt(num.split('.')[0])
                .toString()
                .replace(/\d(?=(\d{3})+$)/g, '$&,'); // 不要千分位
            // return parseInt(num.split('.')[0]).toString().replace(/\d(?=(\d{3})+$)/g, "$&,") + '.' + num.split('.')[1];
        } else {
            return parseInt(num)
                .toString()
                .replace(/\d(?=(\d{3})+$)/g, '$&,');
        }
    }
}

const closest = (el, selector) => {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
};

export const onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
        return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
        e.preventDefault();
    }
};

export function retry(fn, retriesLeft = 5, interval = 1000) {
    return new Promise((resolve, reject) => {
        fn()
            .then(resolve)
            .catch((error) => {
                setTimeout(() => {
                    if (retriesLeft === 1) {
                        // reject('maximum retries exceeded');
                        reject(error);
                        return;
                    }

                    // Passing on "reject" is the important part
                    retry(fn, retriesLeft - 1, interval).then(resolve, reject);
                }, interval);
            });
    });
}

export function getLocationDetails() {
    let passedUrl = window.location.href;
    const userAgent = navigator.userAgent;
    if (userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        passedUrl = localStorage.getItem('edu_originUrl');
    }
    api.getWxSignData(passedUrl).then((wxSignResponse) => {
        if (wxSignResponse && wxSignResponse.data && wxSignResponse.data.appId) {
            wx.config({
                beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: wxSignResponse.data.appId, // 必填，公众号的唯一标识
                timestamp: wxSignResponse.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: wxSignResponse.data.nonceStr, // 必填，生成签名的随机串
                signature: wxSignResponse.data.signature, // 必填，签名
                jsApiList: ['getLocation'], // 必填，需要使用的JS接口列表(笔者用的是扫一扫，更多API请看下方)
            });

            wx.ready(() => {
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                        const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        localStorage.setItem('edu_latitude', latitude);
                        localStorage.setItem('edu_longitude', longitude);
                    },
                    cancel: function (res) {
                        console.log('res', res);
                        localStorage.setItem('edu_latitude', '');
                        localStorage.setItem('edu_longitude', '');
                    },
                });
            });
        }
    });
}

export function wxConfig(funcList) {
    let passedUrl = window.location.href;
    const userAgent = navigator.userAgent;
    if (userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        passedUrl = localStorage.getItem('edu_originUrl');
    }
    api.getWxSignData(passedUrl).then((wxSignResponse) => {
        if (wxSignResponse && wxSignResponse.data && wxSignResponse.data.appId) {
            wx.config({
                beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: wxSignResponse.data.appId, // 必填，公众号的唯一标识
                timestamp: wxSignResponse.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: wxSignResponse.data.nonceStr, // 必填，生成签名的随机串
                signature: wxSignResponse.data.signature, // 必填，签名
                jsApiList: funcList, // 必填，需要使用的JS接口列表(笔者用的是扫一扫，更多API请看下方)
            });
        }
    });
}
