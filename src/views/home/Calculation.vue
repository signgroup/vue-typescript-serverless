<template>
    <div class="Calculation">
        <mt-header fixed title="工具">
            <router-link to="/home" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="wow fadeInUp mint-cell">
            <div class="mint-cell-wrapper">
                <div class="mint-cell-title">
                    <i class="iconfont icon-titles text-orange"></i>
                    <span>公里油价</span>
                </div>
            </div>
            <div class="mint-cell-right"></div>
        </div>
        <div class="wow fadeInUp form-row">
            <mt-field label="油耗" placeholder="请输入油耗" type="number" :state="attritionError"
                      v-model="attrition"></mt-field>
            <mt-field label="油价" placeholder="请输入油价（元）" type="number" :state="priceError" v-model="price"></mt-field>
            <mt-field label="公里" placeholder="请输入公里数（km）" type="number" v-model="kilometre">
                <mt-button type="primary" size="small" @click="_countResult('price')">计算</mt-button>
            </mt-field>
            <mt-cell title="预算金额">
                {{money}}元
            </mt-cell>
            <mt-field label="金额" placeholder="请输入金额(元)" type="number" v-model="priceNum">
                <mt-button type="primary" size="small" @click="_countResult('kilometre')">计算</mt-button>
            </mt-field>
            <mt-cell title="预算公里数">
                {{kilometreNum}}km
            </mt-cell>
        </div>
        
        <div class="wow fadeInUp mint-cell">
            <div class="mint-cell-wrapper">
                <div class="mint-cell-title">
                    <i class="iconfont icon-titles text-orange"></i>
                    <span>大小写转换</span>
                </div>
            </div>
            <div class="mint-cell-right"></div>
        </div>
        <div class="wow fadeInUp form-row">
            
            <mt-field placeholder="请输入英文字母" type="text" v-model="toUpperCase">
                <mt-button type="primary" size="small" @click="_transform('toUpperCase')">转大写</mt-button>
            </mt-field>
            <mt-cell title="转换结果">
                {{toUpperCaseResult}}
            </mt-cell>
            <mt-field placeholder="请输入英文字母" type="text" v-model="toLowerCase">
                <mt-button type="primary" size="small" @click="_transform('toLowerCase')">转小写</mt-button>
            </mt-field>
            <mt-cell title="转换结果">
                {{toLowerCaseResult}}
            </mt-cell>
            <mt-field placeholder="请输入英文字母" type="text" v-model="caseReverse">
                <mt-button type="primary" size="small" @click="_strReverse">值取反</mt-button>
            </mt-field>
            <mt-cell title="转换结果">
                {{caseReverseResult}}
            </mt-cell>
        </div>
    </div>

</template>
<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';

    @Component

    export default class Calculation extends Vue {
        private money: number = 0;//预算金额
        private attrition: number = 7.6;//油耗
        private attritionError: string = '';//油耗非数字或非0开头正整数
        private price: number = 5.09;//油价
        private priceError: string = '';//油价非数字或非0开头正整数
        private kilometre: number = 1;//公里数
        private priceNum: number = 100;//预计金额
        private kilometreNum: number = 0;//预计公里数
        private toLowerCase: string = 'test';//转小写
        private toLowerCaseResult: string = '';//转小写结果
        private toUpperCase: string = 'TEST';//转大写
        private toUpperCaseResult: string = '';//转大写结果
        private caseReverse: string = 'teST';//值取反
        private caseReverseResult: string = '';//值取反结果

        //计算金额
        _countResult(state) {
            if (this.attritionError == 'error' || this.priceError == 'error') {
                this['$toast']({
                    message: '输入有误',
                    position: 'top',
                });
                return
            }
            //计算方法油耗×油价÷100（公里数）=一公里的油钱。
            let singlePrice = this.attrition * this.price / 100
            if (state == 'price') {
                //计算价格
                // 计算方法 每公里油钱*公里数
                console.log(singlePrice * this.kilometre);
                this.money = Number((singlePrice * this.kilometre).toFixed(2))
            } else if (state == 'attrition') {
                //计算公里数
                // 计算方法 总价格/每公里油钱
                console.log(typeof  Number((this.priceNum / singlePrice).toFixed(2)));
                this.kilometreNum = Number((this.priceNum / singlePrice).toFixed(2))
            }
        }

        //英文字符串取反转换
        _strReverse() {
            console.log(this.caseReverse.toUpperCase())//转换大写
            console.log(this.caseReverse.toLowerCase())//转换小写
            console.log(this.caseReverse.toLocaleUpperCase())//转换大写
            console.log(this.caseReverse.toLocaleLowerCase())//转换小写
            //item=> 每次正则匹配的结果
            //验证是否为大写字母(2种)：
            //1.把字母转换为大写后看是否和之前一样；如果一样说明原字母是大写，将原字母转换成大写即可。反之同理。
            //item.toUpperCase() === item
            //2.在ASCII表中找到大写字母的取值范围进行判断（65-90)。
            //item.charCodeAt() >= 65 && item.charCodeAt() <= 90
            //方法一
            let newStr1 = ""
            for (let item of this.caseReverse) {
                // console.log(item)
                newStr1 += item.toUpperCase() === item ? item.toLowerCase() : item.toUpperCase();
            }
            console.log('newStr1', newStr1)
            //方法二
            let newstr2 = this.caseReverse.replace(/[a-zA-Z]/g, item => {
                // console.log(item)
                return item.toUpperCase() === item ? item.toLowerCase() : item.toUpperCase();
            })
            console.log('newstr2', newstr2);
            //方法三
            //'AbC'.split('') 分割成字符串数组 ["A", "b", "C"]
            let newStr3 = this.caseReverse.split('').map(item => item === item.toUpperCase() ? item.toLowerCase() : item.toUpperCase()).join('')
            console.log('newStr3', newStr3)
            this.caseReverseResult = newStr3
        }

        //大小写转换
        _transform(name) {
            if (name === "toLowerCase") {
                this.toLowerCaseResult = this[name].toLowerCase()
            } else {
                this.toUpperCaseResult = this[name].toUpperCase()
            }
            // this[name]=name=='toLowerCase'?name.toUpperCase():name.toLowerCase()
        }

        static _watchReg(val) {
            let reg = /^([1-9]\d*|0)(\.\d*[1-9])?$/;
            return (!reg.exec(val) || val <= 0) ? 'error' : ''
        }

        mounted() {
            ['price', 'attrition'].map(item => this._countResult(item))
        }

        //油耗监听
        @Watch("attrition")
        attritionChange(val: any, oldVal: any): void {
            // console.log(val<=0)
            this.attritionError = Calculation._watchReg(val)
        }

        //油价监听
        @Watch("price")
        priceChange(val: any, oldVal: any): void {
            // console.log(val<=0)
            this.priceError = Calculation._watchReg(val)
        }
    }
</script>

<style lang="less" scoped>
    .Calculation {
        padding: 50px 10px;
        .form-row {
            margin: 10px auto;
        }
        
    }

</style>
