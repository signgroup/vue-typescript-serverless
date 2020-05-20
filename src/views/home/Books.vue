<template>
    <div class="Books">
        <mt-header fixed title="书籍">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.back(-1)">返回</mt-button>
            </router-link>
        </mt-header>
        <section>
            <ul class="book-list">
                <li v-for="item in bookData" :key="item._id" @click="_openBook(item)">
                    <figure>
                        <img class="book-img" v-lazy.container="item.image" alt=""/>
                    </figure>
                    <p class="ellipsis-2 book-name">{{item.name}}</p>
                </li>
            </ul>
        </section>
    </div>

</template>
<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';

@Component

export default class Books extends Vue {
    private loadStatus: boolean = false; // loading状态
    private bookData: object = [];
    private currentPage: number = 0;
    private pageCount: number = 0;

    public getBooks() {
        this['$store'].commit('showLoading');
        // console.log(str)
        const _this = this;
        this['tcb'].callFunction({
            name: 'getCloud',
            data: {
                db: 'books',
                skip: 0, // 条件限制，根据需要传参
                limit: 20,
            },
        })
            .then((res: any) => {
                const list = res.result.res.data;
                console.log(list);
                _this.bookData = list;
                _this.loadStatus = true;
                _this['$store'].commit('hideLoading');
            })
            .catch((res) => {
                console.log(res);
            });
    }

    public _openBook(data) {
        // this['$router'].push({name: 'pdf',query:{data:JSON.stringify(data)}});
        window.open(data.url);
    }

    public mounted() {
        this.getBooks();
        /* this['$store'].commit('showLoading')
         setTimeout(()=>{
             this['$store'].commit('hideLoading')
             this.loadStatus=true
         },300)*/
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
}
</script>

<style lang="less" scoped>
    .Books {
        padding: 50px 10px;
        position: relative;
        .book-list {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            > li {
                /*border: 1px solid red;*/
                width: calc(50% - 5px);
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-direction: column;
                &:nth-child(2n-1) {
                    margin-right: 5px;
                }
                &:nth-child(2n) {
                    margin-left: 5px;
                }
                figure {
                    height: 200px;
                    width: 135px;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    //背景实现cover center
                    .book-img {
                        max-width: 100%;
                        height: 200px;
                    }
                }
                .book-name {
                    margin-top: 5px;
                    height: 32px;
                    padding: 0 5px;
                }
                @media screen and (max-width: 320px) {
                    .book-name {
                        height: 38px;
                    }
                }
            }
        }
    }

</style>
