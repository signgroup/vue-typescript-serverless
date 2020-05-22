/*
* 字节单位换算
* 使用方法
* utils.bytesToSize(1024)
* */
const bytesToSize=(bytes:number)=> {
    console.log(bytes)
    if (bytes === 0) return '0B';
    let k = 1024,
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    let result = (bytes / Math.pow(k, i)).toFixed(2)
    //电脑显示最小以kb开始的文件 Math.ceil(Number(result))
    //手机正常显示保留两位的文件大小 result+ ' ' + sizes[i]
    return result + ' ' + sizes[i];
}
/*
* 时间转换
* 使用方法
* utils.getDateDiff(new Date())
* */
const getDateDiff=(date:Date):string=> {
    //严格判断是否日期格式，这里放宽
    // console.log( date instanceof Date) //true
    //将字符串转换成时间格式
    let timePublish = new Date(date);
    let getMonth = timePublish.getMonth() + 1
    let getDate = timePublish.getDate()
    let timeNow: any = new Date();
    let minute: number = 1000 * 60;
    let hour: number = minute * 60;
    let day: number = hour * 24;
    let month: number = day * 30;
    let diffValue = <any>timeNow - <any>timePublish;
    let diffMonth = diffValue / month;
    //以下强转number类型，string与int类型比较报错
    let diffWeek: number = Number((diffValue / (7 * day)).toPrecision(1));
    let diffDay: number = Number((diffValue / day).toPrecision(1));
    let diffHour: number = Number((diffValue / hour).toPrecision(1));
    let diffMinute: number = Number((diffValue / minute).toPrecision(1));
    // console.log(diffMonth);
    let result: string = ""
    if (diffValue < 0) {
        //      alert("错误时间");
    }
    //  else if (diffMonth > 3) {
    //      result = timePublish.getFullYear() + "-";
    //      result += timePublish.getMonth() + "-";
    //      result += timePublish.getDate();
    ////      alert(result);
    //  }//超过三天显示具体时间
    else if (diffMonth > 1) {
        result = getMonth + "月" + getDate;
    }
    else if (diffWeek > 1) {
        result = diffWeek + "周前";
    }
    else if (diffDay > 1) {
        result = diffDay + "天前";
    }
    else if (diffHour > 1) {
        result = diffHour + "时前";
    }
    else if (diffMinute > 1) {
        result = diffMinute + "分前";
    }
    else {
        result = "刚发布";
    }
    return result;
}
export default {
    bytesToSize,
    getDateDiff
}
