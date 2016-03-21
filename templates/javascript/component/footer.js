/**
 * @ngdoc filter
 * @name <%= appname %>.component:footer
 * @function
 * @description
 * # footer
 * component in the <%= appname %>.
 */
var Footer = React.createClass({

    getInitialState : function () {
        return {sidebarClose: false};
    },

    /**
     * 父组件上状态改变，触发子组件状态改变
     * @param  {[type]} nextProps [description]
     * @return {[type]}           [description]
     */
    componentWillReceiveProps : function (nextProps) {
        if(nextProps.sidebarClose != this.state.sidebarClose){
            this.setState({
                sidebarClose : nextProps.sidebarClose
            });
        }
    },

    render : function () {
        return (
            <footer id="footer" className={this.state.sidebarClose ? 'sidebarClose' : ''}>
                <span>2016 喵街智能科技有限公司 版权所有</span>
                <span className="pl20">喵街服务电话：0571-88158155</span>
                <span className="pl20">服务时间：每天10：00 - 22：00</span>
            </footer>
        )
    }

});

module.exports = Footer;
