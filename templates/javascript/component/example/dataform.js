/**
 * @ngdoc filter
 * @name <%= appname %>.component:<%= compName %>
 * @function
 * @description
 * # <%= compName %>
 * component in the <%= appname %>.
 */
var Apimap = require('../common/apimap.js');
var Utils = require('../common/utils.js');

var Toast = require('../../../bower_components/admix-ui-react/build/pcweb/toast.js');
var Button = require('../../../bower_components/admix-ui-react/build/pcweb/button.js');
var Input = require('../../../bower_components/admix-ui-react/build/pcweb/input.js');
var Datepicker = require('../../../bower_components/admix-ui-react/build/pcweb/datepicker.js');
var UploadImage = require('../../../bower_components/admix-ui-react/build/pcweb/upload-image.js');

var <%= compName %> = React.createClass({

    /**
     * 组件初始化
     * @return {[type]} [description]
     */
    getInitialState : function () {
        return {
            code: 'loading',
            data: [],
            btnLoading: false
        };
    },

    /**
     * 规则配置数据
     * @type {Object}
     */
    config : {
        formValid : {
            title: {
                formValid: false,
                invalidMsg: '卡名称不能为空'
            },
            price: {
                formValid: false,
                invalidMsg: '卡面值不能为空'
            },
            totalQuantity: {
                formValid: false,
                invalidMsg: '发行量不能为空'
            },
            validDate: {
                formValid: false,
                invalidMsg: '有效期不能为空'
            }
        },
        minDate : new Date(new Date().getTime() - 86400*1000),
        uploadUrl : Apimap.uploadImage
    },

    /**
     * 卡名称的验证规则
     * @type {Array}
     */
    rulesNameArr : [
        {rule: 'minlength', value: 2, msg: '卡名称长度小于2个字符'},
        {rule: 'maxlength', value: 20, msg: '卡名称长度超过20个字符'}
    ],

    /**
     * 卡数量的验证规则
     * @type {Array}
     */
    rulesNumArr : [
        {rule: 'integer', msg: '你输入的发行量不是正整数'},
        {rule: 'min', value: 1, msg: '发行量不能小于1'},
        {rule: 'max', value: 100000, msg: '发行量不能大于100000'}
    ],

    /**
     * 卡面值
     * @type {Array}
     */
    rulesPriceArr : [
        {rule: 'integer', msg: '你输入的卡面值不是正整数'},
        {rule: 'min', value: 1, msg: '卡面值不能小于1'},
        {rule: 'max', value: 100000, msg: '卡面值不能大于100000'}
    ],

    /**
     * 有效期验证规则
     * @type {Array}
     */
    rulesDaysArr : [
        {rule: 'integer', msg: '你输入的有效期不是正整数'},
        {rule: 'min', value: 1, msg: '有效期不能小于1'},
        {rule: 'max', value: 300, msg: '有效期不能大于300'}
    ],

    /**
     * 需要提交给后端的数据
     * @type {Object}
     */
    formData : {
        title : '',                             //卡名称
        background : '',                        //卡logo
        totalQuantity : 0,                      //发行量
        price : 0,                              //卡档价格
        validDate : 0,                          //有效期天数
        startTime : Utils.formatDate(new Date())//开始售卖时间
    },

    /**
     * 点击提交表单
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    saveData : function (e) {
        var formValid = this.config.formValid;
        for(var i in formValid){
            if(formValid[i].formValid === false){
                this.setState({
                    btnLoading: false
                });
                Toast.show('error', formValid[i].invalidMsg);
                return;
            }
        }
        /*/对数据做检查，防止表单验证组件检查不完整
        if(this.formData.background == ''){
            this.setState({
                toastShow: true,
                toastType: 'error',
                toastMsg: '卡Logo还没有上传'
            });
            return;
        }*/

        //提交数据到后台
        var me = this;

        window.xhr({
            url: Apimap.addCard,
            type: 'get', //线上需要改成post
            data: me.formData
        }, function(sucRet){
            if(sucRet.errCode == 0){
                me.setState({
                    btnLoading: true
                });
                Toast.show('success', '创建卡成功，3秒后跳转到卡列表页面');
                setTimeout(function(){
                    me.gotoList();
                }, 3000);
            }
            else {
                me.setState({
                    btnLoading: false
                });
                Toast.show('error', '创建卡失败：' + (sucRet.errMsg || '接口异常'));
            }
        },function(errRet){
            me.setState({
                btnLoading: false
            });
            Toast.show('error', '创建卡失败：' + JSON.stringify(errRet));
        });
    },

    /**
     * 点击返回到列表页面
     * @return {[type]} [description]
     */
    gotoList : function () {
        window.location.href = './cardlist.html';
    },

    /**
     * 图片上传成功的回调
     * @param  {[type]} picUrl [description]
     * @return {[type]}        [description]
     */
    onImageSuccess : function (picUrl) {
        this.formData.background = picUrl;
    },

    /**
     * 图片上传失败的回调
     * @param  {[type]} msg [description]
     * @return {[type]}     [description]
     */
    onImageError : function (msg) {
        Toast.show('error', msg);
    },

    /**
     * 获取和设置售卖日期
     */
    setDate : function (date) {
        this.formData.startTime = date;
    },

    /**
     * 输入框的回调处理
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    handleChange : function (obj) {
        this.formData[obj.name] = obj.value;
        this.config.formValid[obj.name].formValid = obj.isValid;
        this.config.formValid[obj.name].invalidMsg = obj.msg;
    },

    /**
     * 组件渲染
     * @return {[type]} [description]
     */
    render : function () {
        return (
            <div className="edit-form">
                <Input
                    name="title"
                    type="input"
                    label="卡名称"
                    width="300px"
                    required={true}
                    placeholder="必填，2~20个字符"
                    rules={this.rulesNameArr}
                    onChange={this.handleChange} />

                <div className="form-group clearfix">
                    <label className="label mr10">
                        卡Logo
                    </label>
                    <UploadImage
                        width="160px"
                        height="100px"
                        size={200}
                        uploadUrl={this.config.uploadUrl}
                        onSuccess={this.onImageSuccess}
                        onError={this.onImageError}  />
                </div>

                <Input
                    name="price"
                    type="input"
                    label="卡面值"
                    width="300px"
                    required={true}
                    placeholder="建议填写500,1000,1500等,1~100000之间"
                    rules={this.rulesPriceArr}
                    onChange={this.handleChange} />

                <Input
                    name="totalQuantity"
                    type="input"
                    label="发行量"
                    width="300px"
                    required={true}
                    placeholder="请填写正整数，1~100000"
                    rules={this.rulesNumArr}
                    onChange={this.handleChange} />

                <div className="form-group clearfix">
                    <label className="label mr10">
                        <strong className="require">*</strong>售卖时间
                    </label>
                    <Datepicker onChange={this.setDate} disabled={false} minDate={this.config.minDate} />
                </div>

                <Input
                    name="validDate"
                    type="input"
                    label="有效期"
                    paddText="天"
                    width="150px"
                    required={true}
                    placeholder="填写正整数，1~300"
                    rules={this.rulesDaysArr}
                    onChange={this.handleChange} />

                <div className="form-group submit-container clearfix pl10">
                    <Button type="primary" needLoading={true} loading={this.state.btnLoading} text="提交" onClick={this.saveData} />
                    <Button type="default" text="返回" onClick={this.gotoList} />
                </div>
            </div>
        )
    }

});

module.exports = <%= compName %>;
