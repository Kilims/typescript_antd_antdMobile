/*
 * @Author: Kilims Ye
 * @Date: 2020-09-24 16:37:57
 * @LastEditTime: 2021-02-09 15:31:31
 * @LastEditors: Kilims Ye
 * @Description:
 * @FilePath: /my-app/src/context/appContext.tsx
 */
import React, { useReducer } from 'react';
import reducer from 'context/reducers/appReducers';
import PropTypes from 'prop-types';

const initialState = {
    count: 0,
    anyOther: 'string',
};

const AppContext = React.createContext(initialState);

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

function AppProvider({ children }: { children: JSX.Element }): JSX.Element {
    const [{ count, anyOther }, dispatch] = useReducer(reducer, initialState);
    const value = { count: count, anyOther: anyOther, dispatch };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export default {
    AppContext,
};
export { AppProvider };
