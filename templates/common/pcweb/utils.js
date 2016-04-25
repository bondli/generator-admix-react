/**
 * @ngdoc filter
 * @name <%= appname %>.component:utils
 * @function
 * @description
 * # utils
 * component in the <%= appname %>.
 */
var Utils = {
    /**
     * 获取URL参数
     * @param  {String} name 参数名
     * @return {String} 参数值
     */
    getUrlParam : function (name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = decodeURIComponent(window.location.search.substr(1)).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    },

    /**
     * 去掉前后空格
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    trim : function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },

    /**
     * 首字母大写
     * @param  {String} word 传入的单词
     * @return {String}      [description]
     */
    ucwords : function (word) {
        return word.substring(0,1).toUpperCase() + word.substring(1);
    },

    /**
     * 格式化时间
     * @param  {[type]} date [description]
     * @return {[type]}      [description]
     */
    formatDate : function (date) {
        if(typeof date === 'string'){
            date = this.strToDate(date);
        }
        if(typeof date === 'number'){
            date = new Date(date);
        }
        var year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate();

        if(month < 10){
            month = '0' + month;
        }
        if(day < 10){
            day = '0' + day;
        }
        return year + '-' + month + '-' + day;
    },

    /**
     * 字符串格式转时间
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    strToDate : function (str) {
        var newStr = str.replace(/-/g,'/');
        return new Date(newStr);
    },

    /**
     * 数字格式化显示
     * @param  {[type]} s [数字]
     * @param  {[type]} n [保留小数点后n位]
     * @return {[type]}   [1234.567 => 1,234.56]
     */
    fmoney : function (s, n) {
        n = n >= 0 && n <= 20 ? n : 2;
        s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';

        var l = s.split('.')[0].split('').reverse(), r = s.split(".")[1],
            t = "";

        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
        }
        if(n == 0){
            return t.split('').reverse().join('');
        }
        return t.split('').reverse().join('') + '.' + r;
    },

    /**
     * 元转分
     * @param  {[type]} num [description]
     * @return {[type]}     [description]
     */
    yuanToFen : function (num) {
        var m = 0, s1 = num.toString(), s2 = (100).toString();
        try { m += s1.split(".")[1].length } catch (e) { }
        try { m += s2.split(".")[1].length } catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },

    /**
     * 分转元
     * @param  {[type]} num [description]
     * @return {[type]}     [description]
     */
    fenToYuan : function (num) {
        var t1 = 0, t2 = 0, r1, r2;
        try { t1 = num.toString().split(".")[1].length } catch (e) { }
        try { t2 = (100).toString().split(".")[1].length } catch (e) { }
        with (Math) {
            r1 = Number(num.toString().replace(".", ""));
            r2 = Number((100).toString().replace(".", ""));
            return (r1 / r2) * pow(10, t2 - t1);
        }
    }
};

module.exports = Utils;
