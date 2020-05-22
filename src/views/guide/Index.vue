<template>
    <div class="Guide ">
        <section class="wow bounceInDown  main-box">
            <div class="main">
                <div class="avatar wow bounceInDown " data-wow-duration=".8s" data-wow-delay=".5s"
                     data-wow-offset="400">
                    <img class=" wow pulse " data-wow-duration="2s" data-wow-delay=".3s" data-wow-iteration="2"
                         v-lazy="logoUrl" alt="100">
                </div>
                <div class="main-content">
                    <p class=" wow slideInDown text-center " data-wow-duration="1.5s" data-wow-delay=".3s">
                        初见博客
                    </p>
                    <p class=" wow slideInDown text-center " data-wow-duration="2s" data-wow-delay=".3s">
                        <span>万物皆有开始</span>
                        <br>
                        <span>所有代码皆以“Hello World”开始</span>
                    </p>
                    <p class="wow slideInDown h-line" data-wow-duration="2.6s" data-wow-delay=".3s"></p>
                    <p class=" wow slideInDown text-center bottom-box" data-wow-duration="2.9s" data-wow-delay=".3s">
                        <a href="#/home" class="button">点击进入</a>
                    </p>
                    
                    <div class=" wow slideInDown text-center copyright-text">
		        <span>Copyright © 2017 <a href="http://13s.top/">初见博客</a>
                            <br>
                         <a href="http://beian.miit.gov.cn/" target="_blank">豫ICP备17032559号-1</a> </span>
                    </div>
                </div>
            
            </div>
        </section>
    </div>

</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Guide extends Vue {
        public logoUrl: string = 'http://13s.top/logo.png';

        public mounted() {
            new this['$wow'].WOW().init();
        }
    }
</script>
<style lang="less" scoped>
    .Guide {
        width: 100%;
        height: 100%;
        z-index: 9999;
        overflow: hidden;
        display: flex;
        margin: 0 auto;
        .main-box {
            position: absolute;
            bottom: 20px;
            left: 20px;
            width: calc(100% - 40px);
            background: #fff;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            height: 70vh;
            color: #313f47;
            .main {
                .text-center {
                    text-align: center;
                }
                .avatar {
                    position: relative;
                    display: block;
                    background: #fff;
                    -webkit-border-radius: 5px;
                    -moz-border-radius: 5px;
                    border-radius: 5px;
                    &:after {
                        content: '';
                        display: block;
                        position: absolute;
                        top: 50%;
                        left: 20px;
                        width: calc(100% - 40px);
                        height: 1px;
                        background: #c8cccf;
                        z-index: 99;
                    }
                    img {
                        display: block;
                        margin: 0 auto;
                        width: 100px;
                        height: 100px;
                        border-radius: 100%;
                        box-shadow: 0 0 0 1.5em #fff;
                        z-index: 100;
                        background: #fff;
                        position: relative;
                        
                    }
                    img[lazy = 'loading'] {
                        width: 100px;
                        height: 100px;
                        background-color: #e5e4e4 !important;
                    }
                }
                .bottom-box {
                    position: relative;
                    .button {
                        -webkit-border-radius: 5px;
                        -moz-border-radius: 5px;
                        border-radius: 5px;
                        padding: 5px 20px;
                        border: solid 1px #c8cccf;
                        color: #313f47;
                        text-decoration: none;
                        width: 100%;
                    }
                    
                }
                
                .main-content {
                    margin-top: 50px;
                    padding: 20px;
                    > p {
                        margin-bottom: 30px;
                    }
                    .h-line {
                        background: rgba(218, 218, 218, 0.7);
                        display: block;
                        width: 100%;
                        font-size: 14px;
                        color: #555;
                        border-radius: 4px;
                        position: relative;
                        height: 1px;
                        transform: scaleY(0.5);
                        transform-origin: center top;
                    }
                    .copyright-text {
                        a {
                            color: #313f47;
                        }
                    }
                }
            }
            
        }
    }
</style>
