/**
 * @jsdoc function
 * @name <%= appname %>.page:<%= pageName %>
 * @description
 * # <%= classedName %>
 * page of the <%= appname %>
 * `<<%= classedName %>App/>` main file
 */
var Header = require('../common/header.js');
var Footer = require('../common/footer.js');
var Sidebar = require('../common/sidebar.js');

var <%= classedName %>App = React.createClass({

    getDefaultProps : function () {
        return {
            breadcrumb : [ //面包屑配置
                {'text': '首页'}, {'text': '我的页面'}
            ]
        };
    },

    getInitialState : function () {
        return {sidebarClose: false};
    },

    /**
     * 首次渲染之前干的事情
     * @return {[type]} [description]
     */
    componentWillMount : function () {

    },

    /**
     * 设置sidebar状态
     * @param {[type]} sdClosed [description]
     */
    setStateChange : function (sdClosed){
        this.setState({
            sidebarClose : sdClosed
        });
    },

    /**
     * 组件渲染
     * @return {[type]} [description]
     */
    render : function () {
        return (
            <div className="container-fluid">
                <Header onStateChange={this.setStateChange} breadcrumb={this.props.breadcrumb} />
                <div className="container-con">
                    <Sidebar sidebarClose={this.state.sidebarClose} />
                    <div id="main" className={this.state.sidebarClose ? 'sidebarClose' : ''}></div>
                </div>
                <Footer sidebarClose={this.state.sidebarClose} />
            </div>
        )
    }

});

module.exports = <%= classedName %>App;
