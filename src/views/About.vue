<template>
    <div class="about container-box">
        <mt-header  class="wow fadeInUp" fixed title="About"></mt-header>
        <h1  class="wow fadeInUp" >This is an about page</h1>
    </div>
</template>

<script lang="ts">
import {Component, Vue , Watch } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
    private loadStatus: boolean = false;
    public mounted() {
        this['$store'].commit('showLoading');

        setTimeout(() => {
            this['$store'].commit('hideLoading');
            this.loadStatus = true;
        }, 300);
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
