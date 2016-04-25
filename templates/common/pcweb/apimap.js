/**
 * @ngdoc filter
 * @name <%= appname %>.component:apimap
 * @function
 * @description
 * # apimap
 * component in the <%= appname %>.
 */
var Apimap = {
    'getUserList' : 'data/getUserList.json'
};

if(window.location.hostname != 'localhost'){ //非本地开发
    var protocol = window.location.protocol,
        curHost = window.location.hostname,
        port = window.location.port,
        apiUrlPre = protocol + '//' + curHost + '/html/xxx/api.do';

    if(port.length){ //本地node端开发
        apiUrlPre = protocol + '//' + curHost + ':' + port + '/html/xxx/api.do';
    }

    Apimap = {
        'getUserList' : apiUrlPre + '?action=getUserList',
    };

}

module.exports = Apimap;
