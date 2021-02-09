/*
 * @Author: Kilims Ye
 * @Date: 2021-01-20 14:11:30
 * @LastEditTime: 2021-02-09 15:51:00
 * @LastEditors: Kilims Ye
 * @Description:
 * @FilePath: /my-app/src/routes/history.js
 */
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const customizedPush = (arr) => {
    history.push(arr);
};

export default history;
