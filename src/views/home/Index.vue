<template>
    <div class="Index container-box">
        <mt-header class="wow fadeInUp" fixed title="首页"></mt-header>
        <div class="wow fadeInUp swiper-box ">
            <mt-swipe :auto="5000">
                <mt-swipe-item v-for="(item,index) in bannerData" :key="index">
                    <img class="swiper-img" v-lazy.container="item.image" alt=""/>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <article class="wow bounceInRight  excerpt">
            <p class="text-animate">
                {{excerptText}}
            </p>
        </article>
        <section class="container">
            <div class="wow fadeInUp  grid-box">
                <!--fadeInUpBig-->
                <ul class="grid">
                    <li v-for="(item,index) in homeNavData" :key="index" :class="['wow slideInRight', item.bg_color]"
                        :data-wow-delay="index*.2+'s'"
                        @click="homeNavClick(item,index)"
                    >
                        <i :class="['iconfont',item.icon]"></i>
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
            <cell-title class="wow fadeInUp" v-if="articleList.length" name="最新文章"></cell-title>
            <article class="wow fadeInUp article-list">
                <div class="wow fadeInUp article-content" v-for="(item,index) in articleList" :key="index"
                     @click="articleDetails(item,index)">
                    <figure>
                        <img class="article-img" v-lazy.container="item.url" alt=""/>
                    </figure>
                    <div class="desc">
                        <p class="d-title">{{item.title}}</p>
                    </div>
                </div>
            </article>
        </section>
    </div>
</template>
<script lang="ts">
    import CellTitle from "@/components/CellTitle.vue";

    import {Component, Vue, Watch} from 'vue-property-decorator';

    @Component({
        components: {
            CellTitle
        }
    })

    export default class Home extends Vue {
        private bannerData = [];//轮播图数据
        private homeNavData = [];//宫格数据
        private articleList = [];//最新文章数据
        private excerptText: string = '当你的才华还撑不起你的野心时，那你就应该静下心来学习；当你的经济还撑不起你的梦想时，那你就应该踏实的去工作；当你的能力还驾驭不了你的目标时，就应该沉下心来，历练；梦想，不是浮躁，而是沉淀和积累，只有拼出来的美丽，没有等出来的辉煌。';
        private hostList = [];//热门文章数据
        private loadStatus: boolean = false;//全局loading状态

        mounted() {
            this.getPromise();
        }

        // 宫格点击
        homeNavClick(item, index) {
            console.log(index);
            console.log(item);
            if (index == 1) {
                this['$router'].push({name: 'calculation'});
                return;
            }
            this['$router'].push({name: item.route});
        }

        /*
        * 点击文章
        * item 当前点击数据
        * index 当前点击索引
        * */
        articleDetails(item, index) {
            console.log(item);
            // console.log(_.inc(1)) //数据库自增1，多人访问
            // _.mul(2)//自乘
            // 修改 查看加1
            this['tcb'].callFunction({
                name: 'incCloud',
                data: {
                    db: 'blog',
                    id: item._id,
                    params: ['view'],
                },
            })
                .then((res) => {
                    // 本地增加1 少请求云函数
                    this.articleList[index].view += 1;
                    console.log(res.result);
                    this['$router'].push({
                        path: 'article-details',
                        query: {id: item._id,title:item.title},
                    });
                });
        }

        // 使用Promise回调
        getPromise() {
            this['$indicator'].open('加载中...');
            this['$store'].commit('showLoading');

            const _this = this;
            Promise.all([
                _this.getBanner(),
                _this.getArticleList(),
                _this.getHotList(),
                _this.getHomeNav(),
                _this.getHomeMate(),
            ])
                .then(function (value) {
                    console.log(value);
                    // new  _this.$wow.WOW().init()
                    _this.loadStatus = true;
                    _this['$store'].commit('hideLoading');
                    _this['$indicator'].close();
                })
                .catch((err) => {
                    console.log(err);
                    _this['$indicator'].close();
                });
        }

        // 获取轮播图
        getBanner() {
            return new Promise((resolve) => {
                this['tcb'].callFunction({
                    name: 'getCloud',
                    data: {
                        db: 'banner',
                        skip: 0, // 条件限制，根据需要传参
                        limit: 5,
                    },
                })
                    .then((res: any) => {
                        const list = res.result.res.data;
                        console.log(list);
                        this.bannerData = list;
                        return resolve(list);
                    })
                    .catch((res) => {
                        console.log(res);

                    });
            });
        }

        // 最新文章
        getArticleList() {
            return new Promise((resolve) => {
                this.getBlog(resolve, 'articleList', 'date', 'desc');
            });
        }

        // 热门推荐
        getHotList() {
            return new Promise((resolve) => {
                this.getBlog(resolve, 'hostList', 'view', 'desc');

            });
        }

        /*
        * 获取日志文章
        * resolve promise 返回
        * str 表名
        * key 要排序的字段（日期）
        * value 排序类型（倒序）
        * */
        getBlog(resolve: any, str: string, key: string, value: string) {
            // console.log(str)
            this['tcb'].callFunction({
                name: 'getCloud',
                data: {
                    db: 'blog',
                    skip: 0, // 条件限制，根据需要传参
                    limit: 8,
                    orderBy: {
                        key,
                        value,
                    },
                },
            })
                .then((res: any) => {
                    console.log(res);
                    const list = res.result.res.data;
                    // console.log(list)
                    // 对象key动态赋值
                    // let obj={}
                    // Object.defineProperty(obj,str,{
                    //   enumerable:false,
                    //   configurable:false,
                    //   writable:false,
                    //   value: list
                    // })
                    // console.log(obj)
                    this[str] = list;
                    return resolve(list);
                })
                .catch((res) => {
                    console.log(res);
                });
        }

        // 获取宫格数据导航
        getHomeNav() {
            const _this = this;
            return new Promise((resolve) => {
                this['tcb'].callFunction({
                    name: 'getCloud',
                    data: {
                        db: 'home_nav',
                        skip: 0, // 条件限制，根据需要传参
                        limit: 4,
                    },
                })
                    .then((res: any) => {
                        console.log(res);
                        const list = res.result.res.data;
                        this.homeNavData = list;
                        return resolve(list);
                    })
                    .catch((res) => {
                        console.log(res);
                    });
            });
        }

        // 获取宫格数据导航
        getHomeMate() {
            return new Promise((resolve) => {
                this['tcb'].callFunction({
                    name: 'getCloud',
                    data: {
                        db: 'home_mate',
                        skip: 0, // 条件限制，根据需要传参
                        limit: 4,
                    },
                })
                    .then((res: any) => {
                        console.log(res);
                        const list = res.result.res.data;
                        return resolve(list);
                    })
                    .catch((res) => {
                        console.log(res);
                    });
            });
        }

        @Watch('loadStatus')
        getLoadStatus(newVal: any, oldVal: any) {
            console.log(newVal);
            if (newVal) {
                this.$nextTick(() => { // 在dom渲染完后,再执行动画
                    const wow = new this['$wow'].WOW(
                        {
                            boxClass: 'wow',      // 默认属性名
                            animateClass: 'animated', // 默认触发的动画类(包含在animate css中)
                            offset: 0,          // 为所有添加wow的元素设置 data-wow-delay属性 的默认值
                            mobile: true,       // 是否在移动设备中开启动画
                            live: false,        // 持续监测页面中是否插入新的wow元素
                            scrollContainer: '.home', //
                        },
                    );
                    wow.init();
                });
            }
        }

    }
</script>
<style lang="less">
    .Index {
        width: 100%;
        height: 100%;
        .swiper-box {
            height: 150px;
            .mint-swipe-item {
                margin: 0 auto;
                background-color: rgba(0, 0, 0, .1);
                .swiper-img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    max-width: 100%;
                }
                .swiper-img[lazy=loading] {
                    /* width: 40px;
                     height: 150px;
                     margin: auto;*/
                }
                
            }
        }
        .excerpt {
            width: calc(100% - 20px);
            text-align: center;
            overflow: hidden;
            border: 1px solid #ddd;
            margin: 10px auto;
            padding: 5px;
            .text-animate {
                color: #fff;
                font-size: 18px;
                padding-left: 60px;
                display: inline-block;
                white-space: nowrap;
                animation: 100s wordsLoop linear infinite normal;
                text-shadow: 3px 1px 5px #aa7a53;
            }
        }
        @keyframes wordsLoop {
            0% {
                transform: translateX(0px);
                -webkit-transform: translateX(0px);
            }
            100% {
                transform: translateX(-100%);
                -webkit-transform: translateX(-100%);
            }
        }
        .container {
            .grid-box {
                margin: 10px;
                height: 82px;
                .grid {
                    height: 100%;
                    > li {
                        width: 25%;
                        height: 100%;
                        float: left;
                        /*border-right: 1px dashed #ddd;*/
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        .iconfont {
                            font-size: 20px;
                            margin-bottom: 5px;
                        }
                        &:first-child {
                            -webkit-border-radius: 5px 0 0 5px;
                            -moz-border-radius: 5px 0 0 5px;
                            border-radius: 5px 0 0 5px;
                        }
                        &:last-child {
                            border-right: none;
                            -webkit-border-radius: 0 5px 5px 0;
                            -moz-border-radius: 0 5px 5px 0;
                            border-radius: 0 5px 5px 0;
                        }
                    }
                    &:after {
                        content: '';
                        display: block;
                        clear: both;
                    }
                }
            }
            .article-list {
                padding: 10px;
                position: relative;
                .article-content {
                    margin: 0 auto 10px;
                    height: 90px;
                    background: inherit;
                    box-sizing: border-box;
                    box-shadow: 0 15px 25px rgba(0, 0, 0, .5);
                    color: #000;
                    text-align: center;
                    display: flex;
                    flex-direction: row;
                    padding: 0 15px 0 0;
                    position: relative;
                    border-radius: 5px;
                    overflow: hidden;
                    figure {
                        height: 90px;
                        width: 135px;
                        overflow: hidden;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        //背景实现cover center
                        .article-img {
                            display: block;
                            height: 100%;
                        }
                        .article-img[lazy=loading] {
                        }
                    }
                    
                    .desc {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        height: 90px;
                        padding: 15px 0;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        margin-left: 15px;
                        .d-title {
                            text-align: left;
                            
                        }
                    }
                    
                }
            }
            .mint-cell {
                background: rgba(255, 255, 255, .8);
            }
        }
    }
</style>
