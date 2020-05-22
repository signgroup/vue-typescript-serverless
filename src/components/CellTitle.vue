<template>
    <div class="CellTitle">
        <div class="mint-cell">
            <div class="mint-cell-wrapper">
                <div class="mint-cell-title">
                    <i v-if="icon.show" class="iconfont icon-titles text-orange" :style="{'color':icon.color}"></i>
                    <span>{{name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="tsx" type="text/tsx">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class About extends Vue {
        /*
        * ?:表示该属性或参数为可选项 typescript会提示可能为undefined
        * !:表示强制解析 排除null、undefined
        * */
        // 接受父组件的值
        @Prop({
            type: String, // 父组件传递给子组件的数据类型
            required: false, // 是否必填 放宽使用不报错
            default: '' // 默认值， 如果传入的是 Object，则要 default: ()=>({}) 参数为函数
        }) name !: string;
        // 左边icon
        @Prop({
            type: Object, // 父组件传递给子组件的数据类型
            required: false, // 是否必填
            default: () => ({show: true, color: '#f37b1d'}) // 默认值， 如果传入的是 Object，则要 default: ()=>({}) 参数为函数
        }) icon !: Object;

        created() {
        }
    }
</script>
<style lang="less" scoped>
</style>
<!--
 #### 使用案例
```javascript
import CellTitle from "@/components/CellTitle.vue";
@Component({
	components:{
		CellTitle
	}
})
```
1.name可选参数 默认''
2.icon可选参数 默认{show: true, color: '#f37b1d'} 状态显示 颜色.text-orange的值
```html
<cell-title class="wow fadeInUp" name="名字" :icon="{show:true,color:'#ccc'}"></cell-title>
```
-->
