<template>
    <div id="app" class="bg">
        <!--<input type="text" v-model="age">
        <button @click="addCount">点击count值增加</button>-->
        <router-view class="drag" />
        <MyFooter/>
        <Loading v-if="isLoading"></Loading>
    </div>
</template>
<script>

    import {mapState} from 'vuex'
    import Loading from '@/components/Loading.vue'
    import MyFooter from '@/components/Footer.vue'
    export default {
        name: 'App',
        data(){
            return {
            
            }
        },
        components:{
            MyFooter,
            Loading
        },
        computed:{
            ...mapState([
                'isLoading'
            ])
        },
      mounted(){
      }
    }
</script>
<!--<script lang="ts">
    import Vue from "vue";
    import { Component, Prop, Watch, Emit } from "vue-property-decorator";

    @Component
    export default class FirstPage extends Vue {
        // props
        @Prop([String, Boolean]) private propMessage;
        @Prop(Number) private propA!: number;
        @Prop({ default: 'default value' }) private propB!: string;
        // 初始化 data
        private msg: number = 123;
        private helloMsg = "Hello, " + this.propMessage;
        private emitMsg: string  = "This is emitMsg";

        // watch
        @Watch('msg')
        public onChildChanged(val: number, oldVal: number) {
            if (val > 6) {
                console.log('msg is changed');
            }
        }

        // computed
        get computedMsg() {
            return "computed " + this.msg;
        }

        // 生命周期钩子
        public beforeCreate() {
            console.log('beforeCreate');
        }

        public created() {
            this.sayMsg();
        }

        public beforeMount() {
            console.log('beforeMount');
        }

        public mounted() {
            this.greet();
        }

        public beforeUpdate() {
            console.log('beforeUpdate');
        }

        public updated() {
            console.log('updated');
        }

        public beforeDestroy() {
            console.log('beforeDestroy');
        }

        public destroyed() {
            console.log('destroyed');
        }

        // methods
        public sayMsg() {
            console.log('created');
        }

        public showEmit() {
            this.greetEmit(this.emitMsg);
        }

        @Emit()
        public greetEmit(msg: string) {
            console.log('emit');
        }

        public greet() {
            console.log("mounted - greeting: " + this.msg);
        }
    }
</script>-->
<style lang="less" >
    @import './assets/less/common';
    #nprogress .bar {
        background: #daa3fd !important; //自定义颜色
    }
    #app {
    }
    .bg::before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        filter: blur(10px);
        background: -webkit-linear-gradient(-45deg, #fbbdaa, #fb86b3, #71d1f3, #d9dffb, #c5fbef, #e1fbc5, #fae6ff, #efff95, #daa3fd, #ff8c81, #ffb3be, #c5fbe2);
        background: -o-linear-gradient(-45deg, #fbbdaa, #fb86b3, #71d1f3, #d9dffb, #c5fbef, #e1fbc5, #fae6ff, #efff95, #daa3fd, #ff8c81, #ffb3be, #c5fbe2);
        background: -ms-linear-gradient(-45deg, #fbbdaa, #fb86b3, #71d1f3, #d9dffb, #c5fbef, #e1fbc5, #fae6ff, #efff95, #daa3fd, #ff8c81, #ffb3be, #c5fbe2);
        background: linear-gradient(-45deg, #fbbdaa, #fb86b3, #71d1f3, #d9dffb, #c5fbef, #e1fbc5, #fae6ff, #efff95, #daa3fd, #ff8c81, #ffb3be, #c5fbe2);
        background-size: 200% 400%;
        animation: gradientBG 20s ease infinite;
    }
    
    @keyframes gradientBG {
        0% {
            background-position: 0 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0 50%;
        }
    }
   
</style>
