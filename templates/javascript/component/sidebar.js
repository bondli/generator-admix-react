/**
 * @ngdoc filter
 * @name sellercenter_content.component:sidebar
 * @function
 * @description
 * # sidebar
 * component in the sellercenter_content.
 */
var Sidebar = React.createClass({

    getInitialState : function () {
        return {
            sidebarClose: false,
            menuData: window.menuData || []
        };
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

    /**
     * 菜单收拢和展开
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    switchMemu : function (item, event) {
        event.preventDefault();
        event.stopPropagation();
        var menuData = this.state.menuData;
        var tmp = [];
        for(var i in menuData){
            var tmpItem = menuData[i];
            if(tmpItem.isCurrent == true){
                tmpItem.isCurrent = false;
            }
            if(tmpItem == item){
                tmpItem.isCurrent = true;
            }
            tmp.push(tmpItem);
        }
        this.setState({
            menuData: tmp
        });
    },

    render : function () {
        var menuData = this.state.menuData;
        var menus = [];
        //var me = this;
        var curFile = (window.location.pathname).substring((window.location.pathname).lastIndexOf('/')+1).replace('.html', '');

        for(var i in menuData){
            var item = menuData[i];
            if(item.url && item.url.length){
                var dt = (
                    <dt className={item.isCurrent==true ? 'active' : ''}>
                        <a href={item.url}>
                            <i className={'icon icon-nav ' + item.iconCls}></i>
                            <em className="nav-name">{item.title}</em>
                            <i className="icon icon-cret" onClick={this.switchMemu.bind(null,item)}></i>
                        </a>
                    </dt>
                );
            }
            else {
                var dt = (
                    <dt className={item.isCurrent==true ? 'active' : ''}>
                        <span onClick={this.switchMemu.bind(null,item)} style={{cursor:'pointer'}}>
                            <i className={'icon icon-nav ' + item.iconCls}></i>
                            <em className="nav-name">{item.title}</em>
                            <i className="icon icon-cret" onClick={this.switchMemu.bind(null,item)}></i>
                        </span>
                    </dt>
                );
            }

            menus.push(
                <dl key={item.title}>
                    {dt}
                    <dd className={item.isCurrent==true ? 'show' : ''}>
                        <a className="item-main-nav" href={item.url ? item.url : 'javascript:;'}>{item.title}</a>
                        {
                            item.subList && item.subList.map(function(sub){
                                return (
                                    <a key={sub.title} href={sub.url} className={sub.url.indexOf(curFile)>-1 ? 'active' : ''}>{sub.title}</a>
                                )
                            })
                        }
                    </dd>
                </dl>
            );
        }

        return (
            <div id="side" className={this.state.sidebarClose ? 'sidebarClose' : ''}>
                <div className="side-nav">
                    {menus}
                </div>
            </div>
        )
    }

});

module.exports = Sidebar;
