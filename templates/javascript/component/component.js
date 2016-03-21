/**
 * @ngdoc filter
 * @name <%= appname %>.component:<%= compName %>
 * @function
 * @description
 * # <%= compName %>
 * component in the <%= appname %>.
 */
var <%= compName %> = React.createClass({

    /**
     * 组件初始化
     * @return {[type]} [description]
     */
    getInitialState : function () {
        return {code: 'loading', data: []};
    },

    /**
     * 首次渲染之前干的事情
     * @return {[type]} [description]
     */
    componentWillMount : function () {

    },

    /**
     * 状态发生变化
     * @param  {[type]} response [description]
     * @return {[type]}          [description]
     */
    onStatusChange : function (response) {
        this.setState({code: response.code, data: response.data});
    },

    /**
     * 组件装置完毕
     * @return {[type]} [description]
     */
    componentDidMount : function () {
        //YourAction.getItems();
        //this.unsubscribe = YourStore.listen(this.onStatusChange);
    },

    /**
     * 组件卸载
     * @return {[type]} [description]
     */
    componentWillUnmount : function () {
        //this.unsubscribe();
    },

    /**
     * 组件渲染
     * @return {[type]} [description]
     */
    render : function () {
        return (
            <p>hi,your commponents is running!</p>
        )
    }

});

module.exports = <%= compName %>;
