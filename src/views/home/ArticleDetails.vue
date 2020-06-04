<template>
    <div class="ArticleDetails container-box">
        <mt-header fixed title="详情">
            <router-link to="/home" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="container" v-html="article.content"></div>
    </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component

export default class ArticleDetails extends Vue {
    private article: object = {};//文章详情

    public mounted() {
        const id: string = this['$route'].query.id;
        this.getDetails(id);
    }

    // 根据id获取详情
    public getDetails(id) {
        this['tcb'].callFunction({
            name: 'getCloud',
            data: {
                db: 'blog',
                doc: id,
            },
        })
            .then((res) => {
                console.log(res.result.res.data);
                this.article = res.result.res.data;
            })
            .catch((res) => {

            });
    }
}
</script>
<style lang="less" scoped>
    .ArticleDetails {
        height: 100vh;
        overflow-y: scroll;
        img {
            width: 100% ;
        }
        .container {
            padding: 0 15px;
        }
    }
</style>
