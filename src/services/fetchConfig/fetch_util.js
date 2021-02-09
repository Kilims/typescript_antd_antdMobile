import { Toast } from 'antd-mobile';
import hex_sa from './sa';
import hex_spe from './spe';
import uuid from 'uuid-random';

const _R = {
    fetch: async function (url, data) {
        var myHeaders = new Headers({
            'Content-Type': 'application/json',
            // "Content-Type": "application/x-www-form-urlencoded"
            reqno: uuid(),
        });

        if (localStorage.getItem('edu_token')) {
            myHeaders.append('authorization', `Bearer ${localStorage.getItem('edu_token')}`);
        }

        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'cors',
            headers: myHeaders,
        });

        if (!res.ok) {
            Toast.hide();
            if (res.status === 403 || res.status === '403') {
                Toast.fail('登录超时,请重新登录!', 2, function () {
                    //window.history.back();;
                });
            } else if (res.status === 404 || res.status === '404') {
                Toast.fail('系统出错,请联系我们', 2, function () {
                    //window.history.back();;
                });
            } else if (res.statusText === 'timeout') {
                Toast.fail('系统超时, 请刷新重试, 如多次刷新无效,请联系客服', 2, function () {
                    //window.history.back();;
                });
            } else if (res.statusText === 'error') {
                Toast.fail('对不起, 您没有权限访问,请联系客服', 2, function () {
                    //window.history.back();;
                });
            } else {
                Toast.fail('请刷新重试, 如多次刷新无效,请联系客服', 2, function () {
                    //window.history.back();;
                });
            }

            return Promise.reject(res);
        }

        return res.json();
    },

    httpGet: async function (url) {
        var myHeaders = new Headers({
            'Content-Type': 'application/json',
            // "Content-Type": "application/x-www-form-urlencoded"
            reqno: uuid(),
        });

        const res = await fetch(url, {
            method: 'GET',
            // body: JSON.stringify(data),
            mode: 'cors',
            headers: myHeaders,
        });

        if (!res.ok) {
            Toast.hide();
            if (res.status === 403 || res.status === '403') {
                Toast.fail('登录超时,请重新登录!', 2, function () {
                    //window.history.back();;
                });
            } else if (res.status === 404 || res.status === '404') {
                Toast.fail('系统出错,请联系我们', 2, function () {
                    //window.history.back();;
                });
            } else if (res.statusText === 'timeout') {
                Toast.fail('系统超时, 请刷新重试, 如多次刷新无效,请联系客服', 2, function () {
                    //window.history.back();;
                });
            } else if (res.statusText === 'error') {
                Toast.fail('对不起, 您没有权限访问,请联系客服', 2, function () {
                    //window.history.back();;
                });
            } else {
                Toast.fail('请刷新重试, 如多次刷新无效,请联系客服', 2, function () {
                    //window.history.back();;
                });
            }

            return Promise.reject(res);
        }
        return res.json();
    },
    customizedFetch: async function (url, data) {
        var myHeaders = new Headers({
            reqno: uuid(),
        });

        if (localStorage.getItem('edu_token')) {
            myHeaders.append('Authorization', `Bearer ${localStorage.getItem('edu_token')}`);
        }

        const res = await fetch(url, {
            method: 'POST',
            body: data,
            mode: 'cors',
            headers: myHeaders,
        });

        if (!res.ok) {
            Toast.hide();
            if (res.status === 403 || res.status === '403') {
                Toast.fail('登录超时,请重新登录!', 2, function () {
                    //window.history.back();;
                });
            } else if (res.status === 404 || res.status === '404') {
                Toast.fail('系统出错,请联系我们', 2, function () {
                    //window.history.back();;
                });
            } else if (res.statusText === 'timeout') {
                Toast.fail('系统超时, 请刷新重试, 如多次刷新无效,请联系客服', 2, function () {
                    //window.history.back();;
                });
            } else if (res.statusText === 'error') {
                Toast.fail('对不起, 您没有权限访问,请联系客服', 2, function () {
                    //window.history.back();;
                });
            } else {
                Toast.fail('请刷新重试, 如多次刷新无效,请联系客服', 2, function () {
                    //window.history.back();;
                });
            }

            return Promise.reject(res);
        }

        return res.json();
    },

    fetchAll: function (...params) {
        var myHeaders = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        var len = params.length;

        return new Promise(function (resolve, reject) {
            let arr = Array(len);
            params.forEach(function (ele, i) {
                let option = {
                    method: 'POST',
                    body: JSON.stringify(ele.data),
                    headers: myHeaders,
                };
                fetch(ele.url, option).then(
                    function (result) {
                        arr[i] = result;
                        len--;
                        if (len === 0 || len === '0') {
                            resolve(arr);
                        }
                    },
                    function (err) {
                        reject(err);
                    },
                );
            });
        });
    },

    signature: function (data, time) {
        var arr = [];
        for (var key in data) {
            if (!this.isEmpty(data[key])) {
                arr.push(key);
            }
        }
        arr.sort();

        var param = '';
        arr.forEach(function (element) {
            param += element + '=' + data[element] + '&';
        }, this);
        param = param.substr(0, param.length - 1);
        // console.log('业务排序>>>>>>>>>>' + param)

        var sign = hex_spe(param);
        sign = sign.toLocaleUpperCase();
        // console.log('第一个>>>>>>>>>>' + sign)

        //terminalType,token,timestamp
        var arr_sing = [];
        arr_sing.push('1234567890123456' + time);
        arr_sing.push(sign);
        arr_sing.sort();
        arr_sing.reverse();
        // console.log(arr_sing)

        var signature = '';
        arr_sing.forEach(function (ele) {
            signature += ele;
        }, this);
        // console.log(signature)

        signature = hex_sa(signature);

        // console.log(signature.toLocaleUpperCase())
        return signature.toLocaleUpperCase();
    },
};

export default _R;
