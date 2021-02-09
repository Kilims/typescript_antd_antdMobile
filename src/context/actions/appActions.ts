/*
 * @Author: Kilims Ye
 * @LastEditors: Kilims Ye
 * @Date: 2020-06-30 21:02:53
 * @LastEditTime: 2021-02-09 14:34:48
 * @Description:
 */
import { INCREMENT, DECREMENT } from 'context/constants/appConstants';

export const increment = (dispatch: any, payload: any) =>
    dispatch({
        type: INCREMENT,
        payload,
    });

export const decrement = (dispatch: any, payload: any) =>
    dispatch({
        type: DECREMENT,
        payload,
    });
