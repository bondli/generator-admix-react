/**
 * @ngdoc filter
 * @name <%= appname %>.store:<%= classedName %>
 * @function
 * @description
 * # <%= classedName %>
 * actions in the <%= appname %>.
 */
var <%= classedName %>Action = Reflux.createActions([
    'addItem',
    'editItem',
    'removeItem',
    'getItem',
    'getItems',
    'removeItems'
]);

module.exports = <%= classedName %>Action;
