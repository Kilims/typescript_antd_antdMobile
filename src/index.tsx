/*
 * @Author: Kilims Ye
 * @Date: 2021-02-09 09:41:17
 * @LastEditTime: 2021-02-09 15:35:26
 * @LastEditors: Kilims Ye
 * @Description:
 * @FilePath: /my-app/src/index.tsx
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import FastClick from 'fastclick';
import { AppProvider } from 'context/appContext';
import { AliveScope } from 'react-activation';
import { ThemeProvider } from 'styled-components';
import { Toast } from 'antd-mobile';
import { message } from 'antd';
import Routes from 'routes';
import 'lib-flexible';

FastClick.attach(document.body);
FastClick.prototype.focus = (ele: HTMLElement) => {
    'use strict';
    ele.focus();
}; //修改focus()方法

ReactDOM.render(
    <React.StrictMode>
        <AppProvider>
            <AliveScope>
                <ThemeProvider
                    theme={{
                        btnBgImage: 'linear-gradient(137deg, #ff5b5b 0%, #db0113 100%)',
                    }}
                >
                    <Routes />
                </ThemeProvider>
            </AliveScope>
        </AppProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
Toast.config({
    duration: 2,
    mask: false,
});
message.config({
    maxCount: 1,
    duration: 2,
});
reportWebVitals();
