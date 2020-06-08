<template>
    <div class="Essays">
        <mt-header fixed title="随笔">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.back(-1)">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="gradual-blue" :style="{ opacity:opacity }"></div>
        <div class="container">
            <div class="section-top">
                <!--style="filter:blur({{opacity*12}}rpx)"-->
                <img src="https://s2.ax1x.com/2019/07/19/ZxrOw8.png" class="img-top"/>
                <div class="user-info">
                    <p class="nick-name wow slideInRight" data-wow-delay="1s'">{{userInfo.nickName}}</p>
                    <img v-lazy="userInfo.avatarUrl" class="avatar wow slideInRight" data-wow-delay=".3s"/>
                    <!--bounceInRight-->
                </div>
            </div>
            <div class="wow bounceInRight ">
                <p class="signature-text" >不用海誓山盟,不要海枯石烂,只求健健康康、度过此生</p>
            </div>
            <div class="time-body">
                <ul class="essays-list"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    :infinite-scroll-immediate-check="essayList"
                    infinite-scroll-distance="10">
                    <li v-for="(item,index) in essayList" class="wow fadeInUp">
                        <div class="time ">{{item.date}}</div>
                        <div class="time-item ">
                            <div class="essay-content">
                                <p :class="['t-text',index!=overflow?'ellipsis-3':'']" @click="bindOverflow(index)">
                                    {{item.content}}{{item.overflow}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <!--显示加载中-->
                <div class="loading" v-if="!noMore">
                    <mt-spinner :type="3"></mt-spinner>
                    <span class="loading-more-txt">加载中...</span>
                </div>
                <div class="no-more" v-else>没有更多了~</div>
            
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import utils from './../../assets/js/utils'
    import {Component, Vue, Watch} from 'vue-property-decorator';

    @Component

    export default class Essays extends Vue {
        public userInfo: object = {
            avatarUrl: 'https://preview.cloud.189.cn/image/imageAction?param=356015D2573D285ADFB4968E41D9F55965A23130C7FECD548A18131029596F00BD46BB94500212AB4C8957E7D0E9AEE53E223A2B1D3571A589751EC811F878D5421EF508FF53292174731D2C8403CAB58C72F73DECA11A73F488E650', //默认头像
            nickName: '初见博客'
        };
        private essayList = [];//随笔数据列表
        private overflow: number = -1;//溢出隐藏索引
        private skip: number = 0;//数据从0开始
        private limit: number = 252;//每页显示的条数
        private loading: boolean = false;
        public opacity: number = 0;//导航背景透明度
        private firstLoading: boolean = true;//首次加载loading
        private loadStatus: boolean = false;
        private noMore: boolean = false;//加载完毕

        //滚动监听
        handleScroll() {
            //透明度=滚动高度/指定高度
            this.opacity = window.scrollY / 330
        }

        loadMore() {
            //加载中设置为true，防止多次执行
            this.loading = true;
            //首次获取数据，全局loading打开
            if (this.firstLoading) {
                this['$store'].commit('showLoading')
            }
            this.getEssayList(this.skip, this.limit)

        }

        //隐藏显示
        bindOverflow(index) {
            this.overflow == index ? this.overflow = -1 : this.overflow = index
        }

        // 获取数据
        getEssayList(skip:number, limit:number) {
            console.log(skip)
            let _this = this
            return new Promise(resolve => {
                window['tcb'].callFunction({
                    name: 'getCloud',
                    data: {
                        db: "essay",
                        skip: skip, //条件限制，根据需要传参
                        limit: limit,
                        lte: 'date',
                        orderBy: {
                            key: 'date',
                            value: 'desc'
                        }
                    }
                })
                    .then(res => {
                        let list = res.result.res.data
                        if (list.length == this.limit) {
                            _this.skip = _this.skip + this.limit
                            //有数据继续加载
                            _this.loading = false
                        } else {
                            //loadMore 进入不可继续拉动
                            _this.loading = true
                            //不足加载条数的时候=数据加载完毕
                            _this.noMore = true
                        }
                        //首次加载处理
                        if (_this.firstLoading) {
                            //首次加载设为false=已经不是第一次加载了
                            _this.firstLoading = false
                            //首次数据加载完毕进入监听，执行wow动画
                            _this.loadStatus = true
                            //首次加载完毕关闭全局loading
                            _this['$store'].commit('hideLoading')
                        }
                        list.forEach(function (value, index) {
                            list[index].date = utils.getDateDiff(new Date(value.date))
                        })
                        /* for (let i = 0; i < list.length; i++) {
                             _this.essayList.push(list[i])
                         }*/
                        //这样写免去for循环push
                        if (_this.essayList.length) {
                            _this.essayList = _this.essayList.concat(list)
                        } else {
                            _this.essayList = list
                        }
                        console.log(_this.essayList)
                        return resolve(list)
                    })
                    .catch(err => {
                        console.log(err)
                        // this.getAnimation()

                    })
            })
        }

        // 时间转换
        static getDateDiff(e): string {
            //将字符串转换成时间格式
            let timePublish = new Date(e);
            let getMonth = timePublish.getMonth() + 1
            let getDate = timePublish.getDate()
            let timeNow: any = new Date();
            let minute: number = 1000 * 60;
            let hour: number = minute * 60;
            let day: number = hour * 24;
            let month: number = day * 30;
            let diffValue = <any>timeNow - <any>timePublish;
            let diffMonth = diffValue / month;
            //以下强转number类型，string与int类型比较报错
            let diffWeek: number = Number((diffValue / (7 * day)).toPrecision(1));
            let diffDay: number = Number((diffValue / day).toPrecision(1));
            let diffHour: number = Number((diffValue / hour).toPrecision(1));
            let diffMinute: number = Number((diffValue / minute).toPrecision(1));
            // console.log(diffMonth);
            let result: string = ""
            if (diffValue < 0) {
                //      alert("错误时间");
            }
            //  else if (diffMonth > 3) {
            //      result = timePublish.getFullYear() + "-";
            //      result += timePublish.getMonth() + "-";
            //      result += timePublish.getDate();
            ////      alert(result);
            //  }//超过三天显示具体时间
            else if (diffMonth > 1) {
                result = getMonth + "月" + getDate;
            }
            else if (diffWeek > 1) {
                result = diffWeek + "周前";
            }
            else if (diffDay > 1) {
                result = diffDay + "天前";
            }
            else if (diffHour > 1) {
                result = diffHour + "时前";
            }
            else if (diffMinute > 1) {
                result = diffMinute + "分前";
            }
            else {
                result = "刚发布";
            }
            return result;
        }

        mounted() {
            //添加滚动监听
            window.addEventListener("scroll", this.handleScroll);
        }

        //监听首次获取数据后执行动画
        @Watch('loadStatus')
        getLoadStatus(newVal, oldVal) {
            console.log(newVal)
            if (newVal) {
                this.$nextTick(() => { // 在dom渲染完后,再执行动画
                    let wow = new this['$wow'].WOW(
                        {
                            boxClass: 'wow',      // 默认属性名
                            animateClass: 'animated', // 默认触发的动画类(包含在animate css中)
                            offset: 0,          // 为所有添加wow的元素设置 data-wow-delay属性 的默认值
                            mobile: true,       // 是否在移动设备中开启动画
                            live: false,        // 持续监测页面中是否插入新的wow元素
                        }
                    );
                    wow.init();
                })
            }
        }

    }

</script>
<style lang="less" scoped>
    .Essays {
        .mint-header {
            background: transparent;
            z-index: 2;
        }
        .gradual-blue {
            position: fixed;
            padding: 20px;
            background: linear-gradient(45deg, #0081ff, #1cbbb4);
            width: 100%;
            z-index: 1;
        }
        .container {
            .section-top {
                position: relative;
                height: 383px;
                .user-info {
                    width: 100%;
                    height: 70px;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    position: absolute;
                    bottom: 0;
                    .avatar {
                        width: 70px;
                        height: 70px;
                        background: #fff;
                        border-radius: 5px;
                        margin-right: 15px;
                    }
                    .nick-name {
                        height: 70px;
                        line-height: 70px;
                        /*color: #fff;*/
                        font-size: 18px;
                        padding-right: 15px;
                        text-align: left;
                        text-indent: 30px;
                        font-weight: bolder;
                        position: relative;
                        /*background-image: -webkit-linear-gradient(bottom, black, #ffffff, white);*/
                        background: linear-gradient(to right, black, #f00, #00ff2a);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        color: transparent;
                    }
                }
            }
            .signature-text {
                background-image: -webkit-linear-gradient(left, #cddc39, #ff9800 25%, #cddc39 50%, #ff9800 75%, #cddc39);
                -webkit-text-fill-color: transparent;
                -webkit-background-clip: text;
                -webkit-background-size: 200% 100%;
                background-size: 200% 100%;
                -webkit-animation: masked-animation 2s infinite linear;
                animation: masked-animation 2s infinite linear;
                text-align: right;
                margin: 10px 15px 0 0;
            }
            @keyframes masked-animation {
                0% {
                    background-position: 0 0;
                }
                100% {
                    background-position: -100% 0;
                }
            }
            .time-body {
                margin-top: 30px;
                .essays-list {
                    padding: 0 15px;
                    
                    li {
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-start;
                        margin-bottom: 10px;
                        .time {
                            width: 54px;
                            padding-top: 3px;
                        }
                        .time-item {
                            width: 100%;
                            .t-text {
                                box-shadow: 0px 0px 10px rgba(0, 0, 0, .1);
                                padding: 2px;
                            }
                        }
                    }
                }
            }
            .img-top {
                width: 100%;
                height: 350px;
                /*-webkit-filter: blur(10px); !* Chrome, Opera *!
                -moz-filter: blur(10px);
                -ms-filter: blur(10px);
                filter: blur(10px);*/
            }
            .loading {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                .loading-more-txt {
                    margin-left: 10px;
                }
            }
            .no-more {
                text-align: center;
                padding: 10px;
            }
        }
    }
</style>
