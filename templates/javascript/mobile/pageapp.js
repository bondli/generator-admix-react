/**
 * @jsdoc function
 * @name <%= appname %>.page:<%= pageName %>
 * @description
 * # <%= classedName %>
 * page of the <%= appname %>
 * `<<%= classedName %>App/>` main file
 */
var Apimap = require('../common/apimap.js');

var <%= classedName %>App = React.createClass({

    getInitialState : function () {
        return {id: null};
    },

    render : function () {
        return (
            <div className="container">
                <h1>hello code‘s dog</h1>
                <p>coding enjoy!</p>
            </div>
        )
    }
});

module.exports = <%= classedName %>App;
