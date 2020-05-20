<template>
    <div class="Footer" v-if="isShowFooter">
        <mt-tabbar class="nav" v-model="selected">
            <mt-tab-item id="home" @click.native="jumpRouter('home')">
                <img slot="icon" v-show="!(selected==='home')" src="./../assets/img/tabbar/home.png">
                <img slot="icon" v-show="selected==='home'" src="./../assets/img/tabbar/home_cur.png">
                首页
            </mt-tab-item>
            <mt-tab-item id="classification" @click.native="jumpRouter('classification')">
                <img slot="icon" v-show="!(selected==='classification')"
                     src="./../assets/img/tabbar/classification.png">
                <img slot="icon" v-show="selected==='classification'"
                     src="./../assets/img/tabbar/classification_cur.png">
                分类
            </mt-tab-item>
            <mt-tab-item id="about" @click.native="jumpRouter('about')">
                <img slot="icon" v-show="!(selected==='about')" src="./../assets/img/tabbar/mine.png">
                <img slot="icon" v-show="selected==='about'" src="./../assets/img/tabbar/mine_cur.png">
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {Route} from 'vue-router';

    @Component
    export default class Footer extends Vue {
        public selected: string = 'home';
        private isShowFooter: boolean = false;

        mounted() {
            this.routeChange(this['$route'], this['$route']);
        }

        jumpRouter(path) {
            if (this['$router'].name == path) return;
            this['$router'].push({name: path});
        }

        @Watch('$route')
        routeChange(val: Route, oldVal: Route): void {
            console.log(val.name);
            const routeName: string = val.name;
            if (
                routeName === 'home' ||
                routeName === 'classification' ||
                routeName === 'about'
            ) {
                this.selected = routeName;
                this.isShowFooter = true;
            } else {
                this.isShowFooter = false;
            }
        }
    }
</script>

<style lang="less" scoped>
    .Footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 20;
        height: 58px;
        .mint-tabbar {
            .is-selected {
                background: none;
            }
        }
    }
</style>
