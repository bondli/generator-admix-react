/**
 * @ngdoc filter
 * @name <%= appname %>.store:<%= classedName %>
 * @function
 * @description
 * # <%= classedName %>
 * stores in the <%= appname %>.
 */
var Apimap = require('../components/common/apimap.js');
var <%= classedName %>Action = require('../actions/<%= name %>.js');

var _items = [];

var <%= classedName %>Store = Reflux.createStore({

    _items : [],

    listenables : [<%= classedName %>Action],

    /**
     * 添加单条记录
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    onAddItem : function (item) {
        this._items.push(_item);
        this.trigger({
            code : 'done',
            data : this._items
        });
    },

    /**
     * 编辑单条记录
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    onEditItem : function (item) {
        var items = this._items;
        for(var i = 0; i < items.length; i++){
            if(items[i].id === item._id){
                //items[i].text = item.text;
                this.trigger({
                    code : 'done',
                    data : items
                });
                break;
            }
        }
    },

    /**
     * 删除单条记录
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    onRemoveItem : function (id) {
        var items = this._items;
        var outItems = [];
        for(var i = 0; i < items.length; i++){
            if(items[i].id !== id){
                outItems.push(items[i]);
            }
        }
        this._items = outItems;
        this.trigger({
            code: 'done',
            data: this._items
        });
    },

    /**
     * 获取单条记录
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    onGetItem : function (id) {
        var items = this._items;
        for(var i = 0; i < items.length; i++){
            if(items[i].id === id){
                this.trigger({
                    code: 'done',
                    data: items[i]
                });
            }
        }
    },

    /**
     * 获取所有记录
     * @return {[type]} [description]
     */
    onGetItems : function () {
        var me = this;

        //模拟ajax请求数据
        me.trigger({
            code: 'loading',
            data: []
        });
        setTimeout(function(){
            me._items = [{id:1, name:'asdasdasd'}];
            me.trigger({
                code: 'done',
                data: me._items
            });
        },1000);
    },

    /**
     * 删除所有记录
     * @return {[type]} [description]
     */
    onRemoveItems : function () {
        this._items = [];
        this.trigger({
            code: 'done',
            data: []
        });
    }

});

module.exports = <%= classedName %>Store;
