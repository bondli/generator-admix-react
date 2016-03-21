/**
 * @ngdoc filter
 * @name <%= appname %>.component:apimap
 * @function
 * @description
 * # apimap
 * component in the <%= appname %>.
 */
var Apimap = {
    'getUserList' : 'abc.do'
};

if(window.location.hostname != 'localhost'){ //非本地开发
    Apimap = {
        'getUserList' : '/data/abc.do'
    };
}

module.exports = Apimap;
