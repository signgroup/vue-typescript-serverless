<template>
    <div class="Footer" v-if="isShowFooter">
        <mt-tabbar class="nav" v-model="selected">
            <mt-tab-item id="home" @click.native="jumpRouter('home')">
                <img slot="icon" v-show="!(selected==='home')" src="./../assets/img/tabbar/home.png">
                <img slot="icon" v-show="selected==='home'" src="./../assets/img/tabbar/home_cur.png">
                HOME
            </mt-tab-item>
            <mt-tab-item id="about" @click.native="jumpRouter('about')">
                <img slot="icon" v-show="!(selected==='about')" src="./../assets/img/tabbar/mine.png">
                <img slot="icon" v-show="selected==='about'" src="./../assets/img/tabbar/mine_cur.png">
                About
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import { Route } from "vue-router";

    @Component
    export default class Footer extends Vue {
        selected: string = "home"
        private isShowFooter: boolean = false;

        mounted() {
            this.routeChange(this['$route'],this['$route']);
        }

        jumpRouter(path) {
            if ( this['$route'].name == path) return;
            this['$router'].push({name: path});
        }

        @Watch("$route")
        routeChange(val: Route, oldVal: Route): void {
            console.log(val.name)
            let routeName:string=val.name
            if (
                routeName === "home" ||
                routeName === "about"
            ) {
                this.selected=routeName
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
    }
</style>
