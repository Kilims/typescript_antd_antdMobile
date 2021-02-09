/*
 * @Author: Kilims Ye
 * @LastEditors: Kilims Ye
 * @Date: 2020-06-30 21:04:04
 * @LastEditTime: 2021-02-09 15:21:17
 * @Description:
 */
import { INCREMENT, DECREMENT } from 'context/constants/appConstants';

interface actionProps {
    payload: any;
    type: string;
}

const reducer = (state: any, action: actionProps): any => {
    const { is } = Object;

    if (is(action.type, INCREMENT)) {
        return {
            ...state,
            count: state.count + action.payload,
        };
    }

    if (is(action.type, DECREMENT)) {
        return {
            ...state,
            count: state.count - action.payload,
        };
    }

    return state;
};

export default reducer;
