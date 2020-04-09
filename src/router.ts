import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Index.vue'
import Guide from './views/guide/Index.vue'
import ArticleDetails from './views/home/ArticleDetails.vue'
import Essays from './views/home/Essays.vue'

Vue.use(Router)

export default new Router({
    mode: 'hash',//hash
    base: process.env.BASE_URL,
    routes: [
        {path: '/', redirect: '/guide'},
        {
            path: '/guide',
            name: 'guide',
            component: Guide
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/article-details',
            name: 'article-details',
            component: ArticleDetails
        },
        {
            path: '/essays',
            name: 'essays',
            component: Essays
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})
