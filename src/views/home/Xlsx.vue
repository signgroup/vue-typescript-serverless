<template>
    <div class="Xlsx container-box">
        <mt-header fixed title="表格转json数据">
            <router-link to="/home" slot="left">
                <mt-button icon="back" @click="$router.back(-1)">返回</mt-button>
            </router-link>
        </mt-header>
        <section class="xlsx-content">
            <mt-cell title="数组格式">
                <mt-switch v-model="isArray"></mt-switch>
            </mt-cell>
            <mt-cell title="去除逗号">
                <mt-switch v-model="comma" :disabled="isArray"></mt-switch>
            </mt-cell>
            <mt-cell title="换行">
                <mt-field placeholder="每隔几条换行" type="number" v-model="wrap"></mt-field>
            </mt-cell>
            <mt-cell title="xlsx文件">
                <vue-xlsx-table @on-select-file="_handleSelectedFile">
                    <span class="btn-text">上传</span>
                </vue-xlsx-table>
            </mt-cell>
            <mt-cell title="转换结果"></mt-cell>
            <mt-field placeholder="转换后结果" type="textarea" rows="8" v-model="result"></mt-field>
            <div class="btn-group">
                <mt-button type="default" size="large" @click="_handelCopy">复制</mt-button>
                <mt-button type="primary" size="large" @click="_popupVisibleShow">下载</mt-button>
            </div>
        </section>
        <!--下载弹框-->
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" style="width:100%" closeOnClickModal="true"
                  position="bottom">
            <mt-picker :slots="slots" @change="_onValuesChange" style="width:100%" showToolbar>
                <div class="picker-toolbar">
                    <div @click="popupVisible = !popupVisible">取消</div>
                    <span>文件大小{{fileSize}}</span>
                    <div @click="_downloadFile">确定</div>
                </div>
            </mt-picker>
        </mt-popup>
    </div>
</template>

<script lang="ts">
    import utils from './../../assets/js/utils'
    import {Component, Vue, Watch} from 'vue-property-decorator';

    @Component

    export default class Xlsx extends Vue {
        private loadStatus: boolean = false; // loading状态
        private isArray: boolean = false; // 数组格式
        private comma: boolean = true; // 去除逗号
        private wrap: number = 1; // 换行
        private fileSize: string = ''; // 文件大小
        private result: string = ''; // 转换结果
        private fileType: string = ''; //文件类型
        private saveLink: object = null; //要保存的文件
        private showToolbar: boolean = true; //显示弹框自定义title
        // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
        private popupVisible: boolean = false;
        //picker 数据
        private slots: object = [{
            values: ['.txt', '.json', '.js'],
        }];

        //选择文件
        _handleSelectedFile(convertedData: any) {
            //去除","和"[]"
            const handelData = (data, wrap, comma) => {
                // console.log(data)
                let resStr = ``;
                for (let i = 1; i <= data.length; i++) {
                    resStr += JSON.stringify(data[i - 1])
                    !comma ? resStr += "," : null
                    i % wrap == 0 ? resStr += `\n` : null
                }
                console.log(resStr)
                // JSON.stringify(data).replace(/},/g, '}').replace(/\[|]/g, "")
                this.result = resStr
            }
            let data = convertedData.body
            if (this.isArray) {
                this.result = JSON.stringify(data)
            } else {
                handelData(data, this.wrap, this.comma)
            }
        }

        // 复制到剪切板
        _handelCopy(): boolean {
            // 复制到剪切板
            let _this = this
            const save = function (e: any) {
                e.clipboardData.setData('text/plain', _this.result); // clipboardData对象
                e.preventDefault(); // 阻止默认行为
            };
            document.addEventListener('copy', save);
            this['$toast']({
                message: '复制成功',
                position: 'middle',
            });
            return document.execCommand('copy'); // 使文档处于可编辑状态，否则无效
        }

        //选择文件类型
        _onValuesChange(picker: object, values: object) {
            this.fileType = values[0];
            console.log(values[0])
        }

        //下载文件
        _downloadFile(): void {
            const fake_click = (obj) => {
                let ev = document.createEvent("MouseEvents");
                ev.initMouseEvent(
                    "click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
                );
                obj.dispatchEvent(ev);
            }
            fake_click(this.saveLink);
            this.popupVisible = false
        }

        //点击下载弹出底部选择，文件大小预处理
        _popupVisibleShow(): void {
            this.popupVisible = true
            let urlObject: any = window['URL'] || window['webkitURL'] || window;
            console.log('urlObject', urlObject)
            let downloadData = new Blob([this.result]);
            console.log('downloadData', downloadData)
            this.fileSize = utils.bytesToSize(downloadData.size)
            console.log(this.fileSize)
            this.saveLink = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
            this.saveLink['href'] = urlObject.createObjectURL(downloadData);
            this.saveLink['download'] = new Date().getTime() + this.fileType;
        }

        mounted() {
            // console.log(Xlsx.bytesToSize(142835))
        }

        @Watch('isArray')
        getIsArray(newVal: boolean, oldVal: boolean) {
            console.log('newVal', newVal);
            if (newVal) {
                this.comma = false
            }
        }
    }
</script>
<style lang="less" scoped>
    .Xlsx {
        position: relative;
        padding-bottom: 0;
        .xlsx-content {
            padding-top: 10px;
            .btn-text {
                margin-left: 5px;
            }
        }
        .btn-group {
            margin-top: 20px;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            button:first-child {
                margin-right: 10px;
            }
        }
        .picker-toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            color: #FF6600;
        }
        
    }
</style>
