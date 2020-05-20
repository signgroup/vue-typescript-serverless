<template>
    <div class="pdf">
        <mt-header fixed :title="title">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.back(-1)">返回</mt-button>
            </router-link>
        </mt-header>
        <pdf
        v-for="i in numPages"
        :key="i"
        :src="pdfUrl"
        :page="i">
        </pdf>
    </div>
</template>
<script lang="ts">
import pdf from 'vue-pdf';
import {Component, Vue, Watch} from 'vue-property-decorator';

@Component({
    components: {
        pdf,
    },
})

export default class Books extends Vue {
    private loadStatus: boolean = false; // loading状态
    private pdfUrl: string = ''; // pdf路径
    private numPages: number = 1; // pdf分页
    private title: string = ''; // 标题

    public pdfTask(pdfUrl) {
        this['$store'].commit('showLoading');
        const _this = this;
        const loadingTask = pdf.createLoadingTask(pdfUrl);
        console.log('loadingTask', loadingTask);
        loadingTask.then((pdf) => {
            console.log('pdf', pdf);
            _this.pdfUrl = loadingTask;
            _this.numPages = pdf.numPages;
            _this['$store'].commit('hideLoading');
        }).catch((err) => {
            console.error('pdf加载失败');
            _this['$store'].commit('hideLoading');
        });
    }

    public mounted() {
        const data = JSON.parse(this['$route'].query.data);
        console.log(data);
        this.title = data.name;
        this.pdfTask(data.url);
        // this.pdfTask('https://dakaname.oss-cn-hangzhou.aliyuncs.com/file/2018-12-28/1546003237411.pdf')
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
