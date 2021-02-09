/*
 * @Author: Kilims Ye
 * @LastEditors: Kilims Ye
 * @Date: 2020-06-28 09:02:41
 * @LastEditTime: 2021-02-09 16:24:08
 * @Description:
 */
const {
    override,
    addPostcssPlugins,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias,
    disableChunk,
    useBabelRc,
    addBundleVisualizer,
    disableEsLint,
    addWebpackPlugin,
} = require('customize-cra');
const theme = require('./antd-theme');
const path = require('path');
const rewireUglifyjs = require('react-app-rewire-uglifyjs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashWebpackPlugin = require('lodash-webpack-plugin');

let version = 'v0.0.1';

const dropConsole = () => {
    return (config) => {
        if (config.optimization.minimizer) {
            config.optimization.minimizer.forEach((minimizer) => {
                if (minimizer.constructor.name === 'TerserPlugin') {
                    minimizer.options.terserOptions.compress.drop_console = true;
                }
            });
        }
        config.optimization.splitChunks = {
            cacheGroups: {
                // common: {                     //公共模块
                //     name: "common",
                //     chunks: "initial",        //入口处开始提取代码
                //     minSize: 0,               //代码最小多大，进行抽离
                //     minChunks: 2,             //代码复 2 次以上的抽离
                //     //priority: 2
                // },
                // utils: {
                //     chunks: 'initial',
                //     minSize: 0,
                //     minChunks: 2
                // },
                // vendors: {
                //   test: /[\\/]node_modules[\\/]/,
                //   name: "vendors",
                //   minSize: 50000,
                //   minChunks: 1,
                //   chunks: "initial",
                //   priority: 1, // 该配置项是设置处理的优先级，数值越大越优先处理，处理后优先级低的如果包含相同模块则不再处理
                // },
                // commons: {
                //   test: /[\\/]src[\\/]/,
                //   name: "commons",
                //   minSize: 50000,
                //   minChunks: 2,
                //   chunks: "initial",
                //   priority: -1,
                //   reuseExistingChunk: true, // 这个配置允许我们使用已经存在的代码块
                // },
                // antdDesign: {
                //   name: "antd-design", // 单独将 antd-design 拆包
                //   priority: 20,
                //   test: /[\\/]node_modules[\\/]@ant-design[\\/]/,
                //   chunks: "all",
                // },
                // lodash: {
                //   name: "lodash", // 单独将 lodash 拆包
                //   priority: 20,
                //   test: /[\\/]node_modules[\\/]lodash[\\/]/,
                //   chunks: "all",
                // },
                // reactLib: {
                //   name: "react-lib", // 单独将 lodash 拆包
                //   priority: 20,
                //   test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                //   chunks: "all",
                // },
            },
        };
        return config;
    };
};

// 打包配置
const addCustomize = () => (config) => {
    if (process.env.NODE_ENV === 'production') {
        // 关闭sourceMap
        config.devtool = false;
        // 配置打包后的文件位置
        // config.output.path = __dirname + '../dist/demo/';
        // config.output.publicPath = './demo';
        // 添加js打包gzip配置
        // config.plugins.push(
        //     new CompressionWebpackPlugin({
        //         test: /\.js$|\.css$/,
        //         threshold: 1024,
        //     }),
        // )
        // Analyze bundle
        config.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static', //输出静态报告文件report.html，而不是启动一个web服务
            }),
        );
        // config.plugins.push(
        //   new HtmlWebpackExternalsPlugin({
        //     externals: [
        //       {
        //         // 引入的模块
        //         module: "react",
        //         // cdn的地址
        //         entry: "https://cdn.bootcdn.net/ajax/libs/react/16.13.1/umd/react.production.min.js",
        //         // 挂载到了window上的名称
        //         // window.jQuery就可以全局使用
        //         global: "React",
        //       },
        //       {
        //         module: "react-dom",
        //         entry: "https://cdn.bootcdn.net/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js",
        //         global: "ReactDOM",
        //       },
        //       {
        //         module: "react-router-dom",
        //         entry: "https://cdn.bootcdn.net/ajax/libs/react-router-dom/5.2.0/react-router-dom.min.js",
        //         global: "ReactRouterDOM",
        //       },
        //       {
        //         module: "styled-components",
        //         entry: "https://cdn.bootcdn.net/ajax/libs/styled-components/5.1.1/styled-components.min.js",
        //         global: "styled",
        //       },
        //       {
        //           module: 'antd',
        //           entry: 'https://cdn.bootcdn.net/ajax/libs/antd/4.3.5/antd.min.js',
        //           global: 'antd'
        //       },
        //       {
        //         module: '@ant-design/icons',
        //         entry: 'https://cdn.bootcdn.net/ajax/libs/ant-design-icons/4.2.2/index.umd.min.js',
        //         global: 'icons'
        //     },
        //     //   {
        //     //       module: 'antd-mobile',
        //     //       entry: 'https://cdn.bootcdn.net/ajax/libs/antd-mobile/2.3.3/antd-mobile.min.js',
        //     //       global: 'antd-mobile'
        //     //   }
        //     ],
        //   })
        // );
        config.output.filename = `static/js/[name].[contenthash:8].${version}.js`;
        config.output.chunkFilename = `static/js/[name].[contenthash:8].${version}.chunk.js`;
    }
    return config;
};

/**
 *
 * @description 解决打包的时候如下报错
 * @url{https://github.com/ant-design/ant-design/issues/15696}
 * https://blog.csdn.net/peade/article/details/84890399
chunk 3 [mini-css-extract-plugin]
Conflicting order between:
 * css ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-7-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js??ref--6-oneOf-7-3!./node_modules/antd/es/input/style/index.less
 * css ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-7-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js??ref--6-oneOf-7-3!./node_modules/antd/es/message/style/index.less
 */
// const delConflictingOrder = () => {
//     return config => {
//         for (let i = 0; i < config.plugins.length; i++) {
//             const p = config.plugins[i]
//             if (!!p.constructor && p.constructor.name === MiniCssExtractPlugin.name) {
//                 const miniCssExtractOptions = { ...p.options, ignoreOrder: true }
//                 config.plugins[i] = new MiniCssExtractPlugin(miniCssExtractOptions)
//                 break
//             }
//         }
//     }
// }

// const addMiniCssExtractPlugin = () => {
//     return config => {
//         config.plugins.unshift(
//             new FilterWarningsPlugin({
//                 // exclude: /any-warnings-matching-this-will-be-hidden/
//                 // exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
//                 exclude: /\[mini-css-extract-plugin\][^]*Conflicting order. Following module has been added:/
//             })
//         )
//     }
// }

process.env.GENERATE_SOURCEMAP = false;

module.exports = override(
    fixBabelImports('antd', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    fixBabelImports('antd-mobile', {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: theme,
        },
    }),
    // ant theme :
    // https://ant.design/docs/react/customize-theme-cn
    // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less

    // ant-mobile theme:
    // https://mobile.ant.design/docs/react/customize-theme-cn
    // https://github.com/ant-design/ant-design-mobile/blob/master/components/style/themes/default.less
    addWebpackAlias({
        ['@/context']: path.resolve(__dirname, 'src/context'),
        ['@/components']: path.resolve(__dirname, 'src/components'),
        ['@/api']: path.resolve(__dirname, 'src/services'),
        ['@/utils']: path.resolve(__dirname, 'src/utils'),
        ['@/pages']: path.resolve(__dirname, 'src/pages'),
        ['@/routes']: path.resolve(__dirname, 'src/routes'),
        ['@/assets']: path.resolve(__dirname, 'src/assets'),
        ['@/actions']: path.resolve(__dirname, 'src/store/actions'),
        ['@/statics']: path.resolve(__dirname, 'src/statics'),
    }),
    addWebpackPlugin(
        // new WebpackBuildNotifierPlugin({
        //     title: '',
        //     logo: path.resolve('./public/logo192.png'),
        //     suppressSuccess: true
        // }),
        new MiniCssExtractPlugin({
            filename: `static/css/[name].[contenthash:8].${version}.css`,
            chunkFilename: `static/css/[name].[contenthash:8].${version}.chunk.css`,
            ignoreOrder: true,
            // moduleFilename: ({ name }) => `${name.replace('/js/', '/css/')}.css`
        }),
        new LodashWebpackPlugin({ collections: true, paths: true }), // 美化控制台
        // // new DashboardPlugin(dashboard.setData),
        // // 进度条
        // // new ProgressBarPlugin(),
        // delConflictingOrder(),
        // addMiniCssExtractPlugin()
        // new FilterWarningsPlugin({
        //     exclude: /chunk 0 \[mini-css-extract-plugin\][^]*Conflicting order. Following module has been added:/
        // })
    ),
    useBabelRc(),
    disableChunk(),
    disableEsLint(),
    dropConsole(),
    // rewiredMap(),
    addCustomize(),
    addPostcssPlugins([
        require('postcss-pxtorem')({ rootValue: 37.5, propList: ['*'], minPixelValue: 2, selectorBlackList: [] }),
    ]),
    // addPostcssPlugins([require('postcss-pxtorem')({ rootValue: 37.5, propList: ['*'], minPixelValue: 2, selectorBlackList: ['am-', 'ant-'] })]),
    rewireUglifyjs,
    process.env.BUNDLE_VISUALIZE === 1 && addBundleVisualizer(),
);
