/*
 * @Author: Kilims Ye
 * @Date: 2021-02-09 15:44:33
 * @LastEditTime: 2021-02-09 15:48:21
 * @LastEditors: Kilims Ye
 * @Description:
 * @FilePath: /my-app/src/services/index.js
 */
import apiConfig from './apiConfig';
// import { urlParams } from 'utils/UtilsFunc';
import _randkey from 'utils/randkey';
import { isResponseValid, isTokenValid } from 'utils/Validater';
import { customizedPush } from 'routes/history';
import _R from './fetchConfig/fetch_util';
import { Toast } from 'antd-mobile';

const env = process.env.REACT_APP_ENV;
const routeName = process.env.REACT_APP_ROUTE_NAME; //  edu_loan

let currentHost = `${apiConfig.HOST[env]}`;
currentHost = 'DEV';

currentHost = process.env.NODE_ENV === 'production' ? `${apiConfig.HOST[env]}` : currentHost;

const commonPromiseHandler = (uri, params, isFormData) => {
    return new Promise((resolve, reject) => {
        _R[`${isFormData ? 'customizedFetch' : 'fetch'}`](uri, params)
            .then((res) => {
                if (isResponseValid(res)) {
                    resolve(res);
                } else if (!isTokenValid(res)) {
                    Toast.hide();
                    Toast.fail(res.header.retMsg);
                    localStorage.setItem('edu_token', '');

                    var arr = window.location.pathname.split('/');
                    var fromPage = arr[arr.length - 1];

                    var data = {
                        pathname: `/${routeName}/LoginPage`,
                        state: {
                            fromPage: fromPage,
                            params: window.location.search,
                        },
                    };

                    if (fromPage === 'LoginPage') {
                        return;
                    } else {
                        customizedPush(data);
                    }
                } else {
                    Toast.hide();
                    const {
                        header: { retMsg } = {
                            retMsg: '报文返回体错误！',
                        },
                    } = res;
                    Toast.fail(retMsg);
                    reject(res);
                }
            })
            .catch((e) => {
                reject(e);
                console.log('失败 e', e);
            });
    });
};

const getCommonHeader = () => {
    const timestamp = Math.round(new Date().getTime()) + '';
    return {
        openId: localStorage.getItem('edu_openId') || '1.0',
        timestamp: timestamp,
    };
};

const api = {
    pwdLogin(phone, pwd) {
        const commonHeader = getCommonHeader();

        const randKey = _randkey.do_generate();
        const encryptedPwd = _randkey.encodeDES(pwd, randKey);

        return commonPromiseHandler(`${currentHost}/${apiConfig.URI.PWD_LOGIN}`, {
            data: {
                mobileNumber: phone,
                loginPwd: encryptedPwd,
                randKey: randKey,
                from: getSceneParams(),
                loginType: 'MobileNumber_Password',
            },
            header: commonHeader,
        });
    },
};

export default api;
