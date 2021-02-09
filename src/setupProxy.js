/*
 * @Author: Kilims Ye
 * @LastEditors: Kilims Ye
 * @Date: 2020-04-14 10:46:48
 * @LastEditTime: 2021-01-22 18:05:50
 * @Description:
 */
const { createProxyMiddleware } = require("http-proxy-middleware");

const settings = function (app) {
  app.use(
    createProxyMiddleware("/edu_loan/DEV", {
      target: 'https://apptest.tcl.com/creditapp-uat/',  // 服务器测试地址
      // target: "http://10.0.17.225:8090/", // 测试地址
      // target: "http://127.0.0.1:3003/mock/14/", // 本地mock地址
      changeOrigin: true,
      pathRewrite: {
        "^/edu_loan/DEV": "/",
      },
    })

  );
};

module.exports = settings;
