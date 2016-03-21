/**
 * @ngdoc filter
 * @name <%= appname %>.mod:apimap
 * @function
 * @description
 * # apimap
 * Mod in the <%= appname %>.
 */
var Apimap = {
    listApi : {
        api  : 'mtop.citylife.eticket.list.get',
        v    : '1.0',
        ecode: '1',
        data : {}
    },
    detailApi : {
        api  : 'mtop.citylife.eticket.detail.get',
        v    : '1.0',
        ecode: '0', //如果mtop上配置的签名是simple,这里需要改成'0';
        data : {}
    },
    deleteApi : {
        api  : 'mtop.citylife.eticket.single.del',
        v    : '1.0',
        ecode: '1',
        data : {}
    },
    updateApi : {
        api  : 'mtop.citylife.eticket.detail.update',
        v    : '1.0',
        ecode: '1',
        data : {}
    }
};

module.exports = Apimap;