/**
 * @ngdoc filter
 * @name <%= appname %>.component:<%= compName %>
 * @function
 * @description
 * # <%= compName %>
 * component in the <%= appname %>.
 */
var Dialog = require('../../../bower_components/admix-ui-react/build/pcweb/dialog.js');
var Toast = require('../../../bower_components/admix-ui-react/build/pcweb/toast.js');
var Table = require('../../../bower_components/admix-ui-react/build/pcweb/table.js');
var Pagination = require('../../../bower_components/admix-ui-react/build/pcweb/pagination.js');

var Apimap = require('../common/apimap.js');
var Utils = require('../common/utils.js');

var <%= compName %> = React.createClass({

    /**
     * 组件初始化
     * @return {[type]} [description]
     */
    getInitialState : function () {
        return {
            code: 'loading',
            data: [],
            msg: '',
            pageNo : 1,
            total : 0,
            pageSize : 10,
            status : '',
            cityId : '',
            mallId : '',
            startTime : '',
            endTime : ''
        };
    },

    /**
     * 首次渲染之前干的事情
     * @return {[type]} [description]
     */
    componentWillMount : function () {
        //一进来就拉取一次数据
        this._getDataList();
    },

    /**
     * 父组件上状态改变，触发子组件状态改变
     * @param  {[type]} nextProps [description]
     * @return {[type]}           [description]
     */
    componentWillReceiveProps : function (nextProps) {
        if(nextProps.searchCondition != this.state.searchCondition){
            var newState = nextProps.searchCondition;
            newState.pageNo = 1;
            this.setState(newState);

            this._getDataList({
                pageNo : 1,
                pageSize: this.state.pageSize,
                status : newState.status,
                keyword : newState.keyword
            });
        }
    },

    /**
     * 获取数据
     * @return {[type]} [description]
     */
    _getDataList : function (queryData) {
        var me = this;

        if(queryData){
            this.setState(queryData);
        }
        else {
            queryData = {
                pageNo : this.state.pageNo,
                pageSize : this.state.pageSize
            };
        }

        //设置loading
        this.setState({
            code: 'loading',
            total: 0
        });

        window.xhr({
            url: Apimap.getHotPlanList,
            data: queryData
        }, function(sucRet){
            if(sucRet.errCode == 0){
                me.setState({
                    code: 'done',
                    data: sucRet.dataList || [],
                    total: sucRet.dataCount || 0
                });
            }
            else {
                me.setState({
                    code: 'error',
                    data: [],
                    msg: '获取列表失败：' + (sucRet.errMsg || '接口异常'),
                    total: 0
                });
            }
        },function(errRet){
            me.setState({
                code: 'error',
                data: [],
                msg: '获取列表失败：' + JSON.stringify(errRet),
                total: 0
            });
        });
    },

    /**
     * 分页去查询数据
     * @return {[type]} [description]
     */
    doSearchByPage : function (pageNo) {
        this._getDataList({
            pageNo: pageNo,
            pageSize : this.state.pageSize,
            status : this.state.status,
            cityId : this.state.cityId,
            mallId : this.state.mallId,
            startTime : this.state.startTime,
            endTime : this.state.endTime
        });
    },

    columns : [{
        title: '商场名称',
        dataIndex: 'mallName',
        key: 'mallName',
        width: 1
    }, {
        title: '排期时间',
        dataIndex: 'periodTime',
        key: 'periodTime',
        width: 1,
        render: function (record){
            return (
                <span>{Utils.formatDate(record.periodTime)}</span>
            );
        }
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 1,
        render: function (record){
            return (
                <span>{record.status == 1 ? '已发布' : '未发布'}</span>
            );
        }
    }, {
        title: '最后修改时间',
        dataIndex: 'gmtModified',
        key: 'gmtModified',
        width: 1,
        render: function (record){
            return (
                <span>{Utils.formatDate(record.gmtModified)}</span>
            );
        }
    }, {
        title: '操作人',
        dataIndex: 'sellerNick',
        key: 'sellerNick',
        width: 1
    }, {
        title: '操作',
        key: 'operation',
        width: 1,
        className: 'tl',
        render: function(record) {
            var actText = '发布';
            if(record.status == 1){
                actText = '下架';
            }
            return [
                {text: actText, type: 'click', fun: 'onSetStatus'},
                {text: '编辑', type: 'href', key: 'id', url: './hotplanedit.html?id=' + record.id},
                {text: '编辑商品', type: 'href', key: 'id', url: './hotitemlist.html?id=' + record.id}
            ];
        }
    }],

    /**
     * table组件功能hack
     * @param  {[type]} fun   [description]
     * @param  {[type]} param [description]
     * @return {[type]}       [description]
     */
    handleAction : function (fun, param) {
        this[fun] && this[fun](param);
    },

    _needActionItem : null,

    _actionNameMap : {
        1: '取消置顶',
        2: '置顶'
    },

    /**
     * 置顶or取消置顶
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    onSetStatus : function (item) {
        this._needActionItem = item;
        var tips = '你将置顶该权益，置顶后将在商场POI页面透出，确认置顶吗？';
        if(item.sticky == 1){
            tips = '你将取消置顶该权益，取消后将不会再商场POI页面透出，确认取消吗？';
        }
        this.setState({
            showBeforeAction : true,
            actionTips : tips
        });
    },

    /**
     * 执行活动状态修改
     * @return {[type]} [description]
     */
    onActionOk : function () {
        var me = this;
        var item  = this._needActionItem;

        window.xhr({
            url: Apimap.setInstantStatus,
            data: {
                id: item.id,
                sticky: item.sticky == 1 ? 2 : 1
            }
        }, function(sucRet){
            //完成需要重新拉取数据
            if(sucRet.errCode == 0){
                me.setState({
                    showBeforeAction : false
                });
                Toast.show('success', '操作成功，该权益已' + me._actionNameMap[item.sticky]);
                me._needActionItem = null;
                setTimeout(function(){
                    me._getDataList();
                },1000);
            }
            else {
                me.setState({
                    showBeforeAction : false
                });
                Toast.show('error', '操作失败：' + (sucRet.errMsg || '接口异常'));
            }
        }, function(errRet){
            me.setState({
                showBeforeAction : false
            });
            Toast.show('error', '操作失败：' + JSON.stringify(errRet));
        });
    },

    /**
     * 取消操作活动
     * @return {[type]} [description]
     */
    onActionCancel : function () {
        this._needActionItem = null;
        this.setState({
            showBeforeAction : false
        });
    },

    /**
     * 组件渲染
     * @return {[type]} [description]
     */
    render : function () {
        return (
            <div className="table-area">
                <Table columnsAlign="tl" columns={this.columns} dataStatus={this.state.code} dataList={this.state.data} dataMsg={this.state.msg} bordered={false} hover striped handleAction={this.handleAction} />
                <Pagination current={this.state.pageNo} total={this.state.total} pageSize={this.state.pageSize} onChange={this.doSearchByPage} />
                <Dialog type="confirm" show={this.state.showBeforeAction} title="温馨提示" desc={this.state.actionTips} onOk={this.onActionOk} onCancel={this.onActionCancel} />
            </div>
        )
    }

});

module.exports = <%= compName %>;
