/*
 * @Author: Kilims Ye
 * @Date: 2021-02-09 09:41:17
 * @LastEditTime: 2021-02-09 10:06:45
 * @LastEditors: Kilims Ye
 * @Description:
 * @FilePath: /my-app/src/reportWebVitals.ts
 */
import { ReportHandler } from 'web-vitals';

const reportWebVitals: VoidFunction = (onPerfEntry?: ReportHandler) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(onPerfEntry);
            getFID(onPerfEntry);
            getFCP(onPerfEntry);
            getLCP(onPerfEntry);
            getTTFB(onPerfEntry);
        });
    }
};

export default reportWebVitals;
