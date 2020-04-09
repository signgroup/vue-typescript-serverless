import Vue from "vue";
import App from './App.vue';
import router from './router';
import store from './store';
//MintUI框架[http://mint-ui.github.io/#!/zh-cn]
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
//yarn add vue-tcb
//引入云开发
// import * as tcb from 'vue-tcb'
const tcb = require('tcb-js-sdk');
//rem弹性
import 'lib-flexible/flexible';
//加载进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
//滚动动画效果
import wow from "wowjs";
import 'animate.css';
// Vue.prototype.$wow=wow
//初始化滚动动画
// new wow.WOW().init()
Vue.prototype.$wow = wow;
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
//云开发初始化
Vue.prototype['tcb'] = tcb.init({
    env: 'cj-25ff8c' // 新增的修改原型
});
console.log(Vue.prototype);
Vue.use(MintUI);
new Vue({
    router,
    store,
    render: h => h(App),
    beforeCreate: async function () {
        // @ts-ignore
        const auth = this.tcb.auth({
            //身份认证状态如何持久保留，有三个选项 local、session 和 none，默认为 session。
            persistence: 'local' //用户显式退出或更改密码之前的30天一直有效
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
    }
}).$mount('#app');
//# sourceMappingURL=main.js.map