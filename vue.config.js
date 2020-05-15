module.exports = {
    publicPath: './',
    // 部署应用时的基本 URL
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    // 把px单位换算成rem单位
                    require("postcss-pxtorem")({
                        rootValue: 35, // 换算的基数(设计图750的根字体为32)
                        selectorBlackList: [".van"],// 要忽略的选择器并保留为px。
                        propList: ["*"], //可以从px更改为rem的属性。
                        minPixelValue: 2 // 设置要替换的最小像素值。
                    })
                ]
            }
            }
        },
    // 输出文件目录 vue ui build 也可配置
    outputDir: 'build',
    //放置生成的静态资源（js、css、img、fonts）的相对路径
    assetsDir: './static',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    productionSourceMap:false,//关闭js map文件
    devServer: {
        port: 9900,
        hotOnly: true,//热更新
    },

}
