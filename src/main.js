// import 'babel-polyfill'
import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store';
//表格数据解析
import vueXlsxTable from 'vue-xlsx-table';
//HTML5 FileReader API 有两个方法可以读取本地文件 readAsBinaryString 和 readAsArrayBuffer, 默认rABS为true，也就是使用readAsBinaryString
Vue.use(vueXlsxTable, { rABS: false });
// MintUI框架[http://mint-ui.github.io/#!/zh-cn]
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
if (process.env.NODE_ENV === 'production') {
    require('./assets/js/consoleInfo');
}
// 网络环境提示
import network from './assets/js/network';
const nt = network.networkType;
console.log(nt);
if (nt == '2g' || nt == '3g') {
    MintUI.Toast({
        message: '当前网络环境较慢',
        position: 'top',
        duration: 3000,
    });
}
// 导入版本
import version from './assets/js/version';
console.log('version', version.version);
// import VConsole from 'vconsole'
// let vConsole = new VConsole()
// yarn add vue-tcb
// 引入云开发
// import * as tcb from 'vue-tcb'
const tcb = require('tcb-js-sdk');
// rem弹性
import 'lib-flexible/flexible';
// 加载进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 滚动动画效果 scrollreveal
import wow from 'wowjs';
import 'animate.css';
// Vue.prototype.$wow=wow
// 初始化滚动动画
// new wow.WOW().init()
Vue.prototype.$wow = wow;
Vue.prototype.$MintUI = MintUI;
// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false;
// @ts-ignore
router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
});
router.afterEach(() => {
    NProgress.done();
});
// 云开发初始化
Vue.prototype.tcb = tcb.init({
    env: 'cj-25ff8c',
});
console.log(Vue.prototype);
Vue.use(MintUI);
// Vue.use(vConsole)
new Vue({
    router,
    store,
    render: (h) => h(App),
    async beforeCreate() {
        // @ts-ignore
        const auth = this.tcb.auth({
            // 身份认证状态如何持久保留，有三个选项 local、session 和 none，默认为 session。
            persistence: 'local',
        });
        // @ts-ignore
        this.tcb.auth().getLoginState().then((loginState) => {
            console.log(loginState);
            if (loginState) {
                // 登录态有效
                // @ts-ignore
            }
            else {
                // 没有登录态，或者登录态已经失效
            }
        });
        /*this.tcb.auth().signInAnonymously().then((res:{}) => {
            console.log(res)
        });
        const loginState = await auth.getLoginState();
        console.log(loginState)
        */
        await auth.signInAnonymously();
    },
}).$mount('#app');
//# sourceMappingURL=main.js.map