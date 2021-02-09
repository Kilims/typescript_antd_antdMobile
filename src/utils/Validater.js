/*
 * @Author: Kilims Ye
 * @Date: 2021-02-09 15:45:44
 * @LastEditTime: 2021-02-09 15:50:29
 * @LastEditors: Kilims Ye
 * @Description:
 * @FilePath: /my-app/src/utils/Validater.js
 */
import { Toast } from 'antd-mobile';

export const isEmpty = (value) => {
    if (typeof value === 'undefined' || value === 'undefined' || value === '' || value === null || value.length < 1) {
        return true;
    } else {
        return false;
    }
};

export const isResponseValid = (res) => {
    if (res.header && res.header.retCode === '000000') {
        return true;
    } else {
        return false;
    }
};

export const isTokenValid = (res) => {
    if (res && res.header && res.header.retCode && ['101000', '101001', '101002'].includes(res.header.retCode)) {
        return false;
    } else {
        return true;
    }
};

export const isLoginPwdValid = (loginPwd) => {
    /**
     * 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
     *  if(loginPwd.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)){
     */
    if (this.isEmpty(loginPwd) || loginPwd.length < 6 || loginPwd.length > 18) {
        Toast.fail('请设置密码（6-18位数字+字母）');
        return false;
    } else {
        /**
         * 6 to 18 characters which contain at least one numeric digit, one letter
         *  if(loginPwd.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)){
         */
        if (loginPwd.match(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,18}$/)) {
            //此处是仅任意数字和字母字符
            // if (loginPwd.match(/^(?=.*\d)(?=.*[a-zA-Z]).{6,18}$/)) {  //此处是允许任意字符
            return true;
        } else {
            Toast.fail('请设置密码（6-18位数字+字母）');
            return false;
        }
    }
};

export const isDynamicCodeValid = (dynamicCode) => {
    // if(dynamicCode.match(/^\d*$/)){  // 纯数字mapping
    if (isEmpty(dynamicCode) || dynamicCode.length < 6) {
        Toast.fail('请输入正确的6位验证码');
        return false;
    } else {
        return true;
    }
};
