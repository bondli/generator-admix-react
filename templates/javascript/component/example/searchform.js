/**
 * @ngdoc filter
 * @name <%= appname %>.component:<%= compName %>
 * @function
 * @description
 * # <%= compName %>
 * component in the <%= appname %>.
 */
var Selectbox = require('../../../bower_components/admix-ui-react/build/pcweb/selectbox.js');
var DateRangePicker = require('../../../bower_components/admix-ui-react/build/pcweb/daterangepicker.js');
var Button = require('../../../bower_components/admix-ui-react/build/pcweb/button.js');

var Apimap = require('../common/apimap.js');
var Utils = require('../common/utils.js');

var <%= compName %> = React.createClass({

    /**
     * 组件初始化
     * @return {[type]} [description]
     */
    getInitialState : function () {
        return {
            cityItems: [],
            mallItems: [],
            cityId: null,
            mallId: null
        };
    },

    /**
     * 首次渲染之前干的事情
     * @return {[type]} [description]
     */
    componentWillMount : function () {
        this._getCityList();
    },

    /**
     * 获取城市列表
     * @return {[type]} [description]
     */
    _getCityList : function () {
        var me = this;

        window.xhr({
            url: Apimap.getCityList
        }, function(sucRet){
            if(sucRet.errCode == 0){
                var items = [];
                for(var i in sucRet.dataList){
                    items.push({
                        value: sucRet.dataList[i].id,
                        label: sucRet.dataList[i].name
                    });
                }
                me.setState({
                    cityItems: items
                });
            }
        },function(errRet){
        });
    },

    /**
     * 获取商场列表
     * @return {[type]} [description]
     */
    _getMallList : function (cityId) {
        var me = this;

        window.xhr({
            url: Apimap.getMallList,
            data: {cityId: cityId}
        }, function(sucRet){
            if(sucRet.errCode == 0){
                var items = [];
                for(var i in sucRet.dataList){
                    items.push({
                        value: sucRet.dataList[i].id,
                        label: sucRet.dataList[i].name
                    });
                }
                me.setState({
                    mallItems: items
                });
            }
        },function(errRet){
        });
    },

    defaultValue : [
        new Date(new Date().getTime() - 7*3600*24*1000),
        new Date()
    ],

    statusItems : [ //状态
        {value: 0, label: '未发布'},
        {value: 1, label: '已发布'}
    ],

    _data : {
        startTime: Utils.formatDate(new Date(new Date().getTime() - 7*3600*24*1000)),
        endTime: Utils.formatDate(new Date()),
        cityId: 0,
        mallId: 0,
        status: 0
    },

    onSelectCity : function (v) {
        this._data.cityId = v;
        //todo::获取mallList
        if(v){
            this._getMallList(v);
        }
        else {
            this.setState({
                mallItems: []
            });
        }
    },

    onSelectMall : function (v) {
        this._data.mallId = v;
    },

    onSelectStatus : function (v) {
        this._data.status = v;
    },

    onDateChange : function (v) {
        this._data.startTime = v[0];
        this._data.endTime = v[1];
    },

    goSearch : function () {
        this.props.onSearch && this.props.onSearch(this._data);
    },

    /**
     * 组件渲染
     * @return {[type]} [description]
     */
    render : function () {
        return (
            <div className="search-area form-inline">
                <div className="form-group">
                    <label className="label">城市：</label>
                    <Selectbox placeholder="全部" width="80px" defaultValue={this.state.cityId} items={this.state.cityItems} onChange={this.onSelectCity} />
                </div>
                <div className="form-group">
                    <label className="label">商场：</label>
                    <Selectbox placeholder="全部" width="120px" defaultValue={this.state.mallId} needNull={false} items={this.state.mallItems} onChange={this.onSelectMall} />
                </div>
                <div className="form-group">
                    <label className="label">发布状态：</label>
                    <Selectbox placeholder="全部" width="80px" items={this.statusItems} onChange={this.onSelectStatus} />
                </div>
                <div className="form-group">
                    <label className="label">排期时间：</label>
                    <DateRangePicker defaultValue={this.defaultValue} onChange={this.onDateChange} />
                    <Button type="default" text="查询" onClick={this.goSearch} />
                </div>

                <a className="btn btn-primary new" href="hotplanedit.html">新建限时抢排期</a>
            </div>
        )
    }

});

module.exports = <%= compName %>;
