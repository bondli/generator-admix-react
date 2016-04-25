/**
 * @ngdoc filter
 * @name <%= appname %>.component:<%= compName %>
 * @function
 * @description
 * # <%= compName %>
 * component in the <%= appname %>.
 */
var Apimap = require('../common/apimap.js');

var TipsPanel = require('../../../bower_components/admix-ui-react/build/pcweb/tips-panel.js');

var <%= compName %> = React.createClass({

    /**
     * 组件初始化
     * @return {[type]} [description]
     */
    getInitialState : function () {
        return {code: 'loading', data: [], 'msg': ''};
    },

    /**
     * 首次渲染之前干的事情
     * @return {[type]} [description]
     */
    componentWillMount : function () {
        this._getDataInfo();
    },

    _getDataInfo : function () {
        var me = this;

        //设置loading
        this.setState({
            code: 'loading'
        });

        window.xhr({
            url: Apimap.getRightDetail,
            data: {id: this.props.itemId}
        }, function(sucRet){
            if(sucRet.errCode == 0){
                me.setState({
                    code: 'done',
                    data: sucRet.dataInfo
                });
            }
            else {
                me.setState({
                    code: 'error',
                    data: {},
                    msg: '获取权益信息失败：' + (sucRet.errMsg || '接口异常')
                });
            }
        },function(errRet){
            me.setState({
                code: 'error',
                data: {},
                msg: '获取权益信息失败：' + JSON.stringify(errRet)
            });
        });
    },

    gotoList : function () {
        window.location.href = './rightlist.html';
    },

    gotoEdit : function (snapshotId, bizType) {
        window.location.href = '../right.html#/coupondetail/' + snapshotId + '/' + bizType;
    },

    /**
     * 组件渲染
     * @return {[type]} [description]
     */
    render : function () {
        var dataInfo = this.state.data;
        return (
            <div className="page">
                <div className="error-container" style={{display: this.state.code == 'error' ? 'block' : 'none'}}>
                    <TipsPanel
                        type="error"
                        title="温馨提示："
                        desc={this.state.msg + '，请稍后访问或者尝试刷新来解决。'}
                        size="large" closeable={false}
                    />
                </div>
                <div className="edit-form" style={{display: this.state.code == 'done' ? 'block' : 'none'}}>
                    <div className="form-group clearfix">
                        <label className="label mr10">
                            券名称
                        </label>
                        <div className="info">{dataInfo.name}</div>
                    </div>
                    <div className="form-group clearfix">
                        <label className="label mr10">
                            适用商户
                        </label>
                        <div className="info">{dataInfo.stores}</div>
                    </div>
                    <div className="form-group clearfix">
                        <label className="label mr10">
                            券类型
                        </label>
                        <div className="info">{dataInfo.displayDiscountType}</div>
                    </div>
                    <div className="form-group clearfix">
                        <label className="label mr10">
                            售卖时间
                        </label>
                        <div className="info">{dataInfo.startTime} ~ {dataInfo.endTime}</div>
                    </div>
                    <div className="form-group clearfix">
                        <label className="label mr10">
                            有效期
                        </label>
                        <div className="info">{dataInfo.initialField}</div>
                    </div>
                    <div className="form-group clearfix" style={{display: dataInfo.bgUrl && dataInfo.bgUrl.length ? 'inline-block' : 'none'}}>
                        <label className="label mr10">
                            背景图
                        </label>
                        <div className="info"><img src={dataInfo.bgUrl} width="160" height="100" /></div>
                    </div>
                    <div className="form-group submit-container clearfix">
                        <a className="btn btn-default" target="_blank" href={'../right.html#/coupondetail/'+dataInfo.snapshotId+'/'+dataInfo.bizType}>修改</a>
                        <button className="btn btn-default" onClick={this.gotoList}>返回</button>
                    </div>
                </div>
            </div>
        )
    }

});

module.exports = <%= compName %>;
