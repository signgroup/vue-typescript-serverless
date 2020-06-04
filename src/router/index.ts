import Vue from 'vue';
import Router from 'vue-router';
//路由懒加载 webpackChunkName 可打包成一个文件
// import Home from './../views/home/Index.vue';
const Home = () => import(/* webpackChunkName: "home" */ './../views/home/Index.vue')
// import Guide from './../views/guide/Index.vue';
const Guide = () => import(/* webpackChunkName: "guide" */ './../views/guide/Index.vue')
// import ArticleDetails from './../views/home/ArticleDetails.vue';
const ArticleDetails = () => import(/* webpackChunkName: "article-details" */ './../views/home/ArticleDetails.vue')
// import Essays from './../views/home/Essays.vue';
const Essays = () => import(/* webpackChunkName: "essays" */ './../views/home/Essays.vue')
// import Classification from './../views/classification/Index.vue';
const Classification = () => import(/* webpackChunkName: "classification" */ './../views/classification/Index.vue')
// import Calculation from './../views/home/Calculation.vue';
const Calculation = () => import(/* webpackChunkName: "calculation" */ './../views/home/Calculation.vue')
// import Books from './../views/home/Books.vue';
const Books = () => import(/* webpackChunkName: "books" */ './../views/home/Books.vue')
// import Pdf from './../views/home/Pdf.vue';
// const Pdf = () => import(/* webpackChunkName: "pdf" */ './../views/home/Pdf.vue')
Vue.use(Router);

export default new Router({
    mode: 'hash', // hash
    base: process.env.BASE_URL,
    routes: [
        {path: '/', redirect: '/guide'},
        {
            path: '/guide',
            name: 'guide',
            component:Guide,
        },
        {
            path: '/home',
            name: 'home',
            component:Home,
        },
        {
            path: '/article-details',
            name: 'article-details',
            component:ArticleDetails,
        },
        {
            path: '/essays',
            name: 'essays',
            component:Essays,
        },
        {
            path: '/classification',
            name: 'classification',
            component:Classification,
        },
        {
            path: '/calculation',
            name: 'calculation',
            component:Calculation,
        },
        {
            path: '/books',
            name: 'books',
            component:Books,
        },
        /*{
            path: '/pdf',
            name: 'pdf',
            component: Pdf,
        },*/
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './../views/About.vue'),
        },
        {
            path: '/xlsx',
            name: 'xlsx',
            component: () => import(/* webpackChunkName: "xlsx" */ './../views/home/Xlsx.vue'),
        },
    ],
});
