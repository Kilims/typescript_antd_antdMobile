/*
 * @Author: Kilims Ye
 * @LastEditors: Kilims Ye
 * @Date: 2020-06-30 21:37:21
 * @LastEditTime: 2021-02-09 16:00:46
 * @Description:BorrowMoneyDetailPage
 */
import React, { Suspense, lazy } from 'react';
import SkeletonLoading from 'components/SkeletonLoading';
import { Router, Route, Redirect } from 'react-router-dom';
import { CacheSwitch } from 'react-router-cache-route';
// import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import history from './history';
import { retry } from 'utils/UtilsFunc';

const IndexPage = lazy(() => retry(() => import('../pages/IndexPage')));

const routeName = process.env.REACT_APP_ROUTE_NAME; //  edu_loan

const routesList = [
    {
        path: 'IndexPage',
        Component: IndexPage,
        Route: Route,
    },
];

const Routes = () => {
    return (
        <Router history={history}>
            <Suspense fallback={<SkeletonLoading />}>
                <CacheSwitch>
                    {routesList.map((item, index) => {
                        return (
                            <item.Route
                                key={index}
                                path={`/${routeName}/${item.path}`}
                                exact
                                render={(props) => <item.Component {...props} />}
                            />
                        );
                    })}
                    {/** 重定向 */}
                    <Redirect to={`/${routeName}/IndexPage`} />
                </CacheSwitch>
            </Suspense>
        </Router>
    );
};

export default Routes;
