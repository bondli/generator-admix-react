/**
 * @ngdoc filter
 * @name <%= appname %>.component:header
 * @function
 * @description
 * # header
 * component in the <%= appname %>.
 */
var Breadcrumb = require('../../../bower_components/admix-ui-react/build/pcweb/breadcrumb.js');
var Header = React.createClass({

    getInitialState : function () {
        return {
            sidebarClose : false,
            userLogined : window.systemData && window.systemData.userId ? true : false
        };
    },

    /**
     * 展开或者收拢左侧
     * @return {[type]} [description]
     */
    toggleSidebar : function () {
        this.setState({
            sidebarClose : !this.state.sidebarClose
        });

        this.props.onStateChange && this.props.onStateChange(!this.state.sidebarClose);
    },

    /**
     * 退出登录
     * @return {[type]} [description]
     */
    logout : function () {
        var protocol = window.location.protocol,
            isDaily = (window.location.href.indexOf('taobao.net') === -1) ? false : true,
            urlPre = isDaily ? protocol + '//login.daily.taobao.net/' : protocol + '//login.taobao.com/',
            loginPre = urlPre + 'member/',
            loginFrom = 'from=opopen',
            redirectURL = 'redirectURL=' + encodeURIComponent(window.location.href);

        window.location.href = loginPre + 'logout.jhtml?' + loginFrom + '&' + redirectURL;;
    },

    render : function () {
        var sidebarClassName = this.state.sidebarClose ? 'sidebarClose' : '';

        var headerRight = null;
        if(this.state.userLogined){
            var userInfo = window.systemData;
            headerRight = (
                <div className="header-right">
                    <span>
                        <img className="userAvatar" src={userInfo.avatarUrl} />
                        <em>{userInfo.nick}</em>
                    </span>
                    <span>
                        <i className="icon modifyPwd"></i>
                        <a href="https://110.taobao.com/account/product_validate.htm?type=password">修改密码</a>
                    </span>
                    <span>
                        <i className="icon loginOut"></i>
                        <a href="javascript:;" onClick={this.logout}>退出</a>
                    </span>
                </div>
            )
        }
        else {
            headerRight = (
                <div className="header-right"><a href="">用户登录</a></div>
            )
        }
        return (
            <header id="header">
                <h1 className={'header-logo ' + sidebarClassName}>
                    <i className="icon icon-logo"></i>
                    <div>喵街<s></s>商家端</div>
                </h1>

                <div className="header-menuctrl">
                    <a href="javascript:;" className={'icon icon-menu ' + sidebarClassName} onClick={this.toggleSidebar}></a>
                    <Breadcrumb separator="/" items={this.props.breadcrumb} />
                </div>
                {headerRight}
            </header>
        )
    }

});

module.exports = Header;
