<template>
    <div class="Index">
        <mt-header class="wow fadeInUp" ref="header" fixed title="分类"></mt-header>
        <mt-navbar class="wow fadeInUp" v-model="selected" id="nab" data-wow-delay=".2s">
            <mt-tab-item v-for="(item,index) in navList" :id="String(index)" :key="index"
            >
                <span class="naval-title">{{item.name}}</span>
            </mt-tab-item>
        </mt-navbar>
        <!-- tab-container -->
        <mt-tab-container class="container" v-model="selected" swipeable>
            <mt-tab-container-item v-for="(item,index) in navList" :id="String(index)" :key="index">
                <article class="wows fadeInUp article-list" v-if="navContainer.length">
                    <div class="wow fadeInUp article-content" v-for="(item,index) in navContainer" :key="index"
                         @click="articleDetails(item,index)">
                        <figure>
                            <img class="article-img" v-lazy.container="item.url" alt="" src="">
                        </figure>
                        <div class="desc">
                            <p class="d-title">{{item.title}}</p>
                        </div>
                    </div>
                </article>
                <div class="not-data" v-else>
                    <mt-spinner v-if="contStatus" type="fading-circle"></mt-spinner>
                    <span v-else>暂无数据</span>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';

@Component
export default class Classification extends Vue {
    public screenWidth = document.body.clientWidth; // 可视屏幕宽度
    private selected: string = '0'; // 导航默认选中项
    private navList = []; // 接收导航数据
    private empty: boolean = false; // 是否为空数据
    private navContainer = []; // 导航内容数据
    private loadStatus: boolean = false; // 导航内容加载状态
    private contStatus: boolean = false; // 导航内容加载状态

    public getViewPortHeight(): number {
        console.log(document.documentElement.clientHeight || document.body.clientHeight);
        return document.documentElement.clientHeight || document.body.clientHeight;
    }

    // 获取tab数据
    public getTab() {
        this['$store'].commit('showLoading');
        this.loadStatus = true;
        // 调用方法
        this['tcb'].callFunction({
            name: 'getCloud',
            data: {
                db: 'archive',
                skip: 0, // 条件限制，根据需要传参
                limit: 100,
            },
        })
            .then((res) => {
                const list = res.result.res.data;
                console.log(list);
                if (list.length) {
                    this.getSwitchData('archive', list[0].name);
                    this.navList = list;
                }
                this.loadStatus = false;
                this['$store'].commit('hideLoading');
            })
            .catch((err) => this.loadStatus = false);
    }

    // 获取内容
    public getSwitchData(key, value) {
        this.contStatus = true;
        this['tcb'].callFunction({
            name: 'getCloud',
            data: {
                db: 'blog',
                skip: 0, // 条件限制，根据需要传参
                limit: 20,
                where: {
                    key,
                    value,
                },
            },
        })
            .then((res) => {
                const list = res.result.res.data;
                console.log(list);
                // 空数组empty设为true
                this.empty = !list.length;
                this.navContainer = list;
                this.contStatus = false;
            })
            .catch((res) => {
                this.contStatus = false;
            });
    }

    /*
   * 点击文章
   * item 当前点击数据
   * index 当前点击索引
   * */
    public articleDetails(item, index) {
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
                this.navContainer[index].view += 1;
                console.log(res.result);
                this['$router'].push({
                    path: 'article-details',
                    query: {id: item._id},
                });
            });
    }

    public mounted() {
        this.getViewPortHeight();
        this.getTab();
        console.log(11111);
        console.log(42.84 + 51.61 + 62.14);
    }

    @Watch('selected')
    public getSelected(newVal, oldVal) {
        // console.log(newVal)
        if (newVal) {
            const nav = document.getElementById('nab');
            // console.log('this.screenWidth',this.screenWidth)
            const singleNavWidth = this.screenWidth / 4;
            nav.scrollLeft = (newVal - 1) * singleNavWidth - singleNavWidth / 4;
            this.getSwitchData('archive', this.navList[newVal].name);
        }
    }

    // 监听首次获取数据后执行动画
    @Watch('loadStatus')
    public getLoadStatus(newVal, oldVal) {
        console.log('newVal', newVal);
        if (newVal) {
            this.$nextTick(() => { // 在dom渲染完后,再执行动画
                const wow = new this['$wow'].WOW(
                    {
                        boxClass: 'wow',      // 默认属性名
                        animateClass: 'animated', // 默认触发的动画类(包含在animate css中)
                        offset: 0,          // 为所有添加wow的元素设置 data-wow-delay属性 的默认值
                        mobile: true,       // 是否在移动设备中开启动画
                        live: false,        // 持续监测页面中是否插入新的wow元素
                    },
                );
                wow.init();
            });
        }
    }

    // 监听内容部分获取数据后执行动画
    @Watch('contStatus')
    public getContStatus(newVal, oldVal) {
        console.log('newVal', newVal);
        if (newVal) {
            this.$nextTick(() => { // 在dom渲染完后,再执行动画
                const wow = new this['$wow'].WOW(
                    {
                        boxClass: 'wows',      // 默认属性名
                        animateClass: 'animated', // 默认触发的动画类(包含在animate css中)
                        offset: 0,          // 为所有添加wow的元素设置 data-wow-delay属性 的默认值
                        mobile: true,       // 是否在移动设备中开启动画
                        live: false,        // 持续监测页面中是否插入新的wow元素
                    },
                );
                wow.init();
            });
        }
    }
}
</script>

<style lang="less" scoped>
    .Index {
        position: relative;
        padding-top: 40px;
        .mint-tab-container {
            position: fixed;
            height: 100%;
            width: 100%;
            overflow-y: scroll;
        }
        .mint-navbar {
            overflow-x: scroll;
            .is-selected {
                margin-bottom: 0;
            }
            .naval-title {
                width: 93.75px;
                display: inline-block;
            }
        }
        .nav-box {
            width: 100%;
            background: #ccc;
            height: 40px;
            overflow-x: scroll;
            .nav-list {
                display: flex;
                height: 40px;
                > li {
                    padding: 0 20px;
                    height: 40px;
                    line-height: 40px;
                    background: #fff;
                    display: inline-block;
                    float: left;
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
        .not-data {
            height: calc(100vh - 157px);
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>
