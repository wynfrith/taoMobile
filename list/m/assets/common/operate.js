/**
 * 转换对象为url参数
 * @param obj
 * @param key
 * @param encode
 * @returns {string}
 */
function urlEncode(obj, key, encode) {
    if(obj==null) return '';
    var paramStr = '';
    var t = typeof (obj);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode==null||encode) ? obj : obj);
    } else {
        for (var i in obj) {
            var k = key == null ? i : key + (obj instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += urlEncode(obj[i], k, encode);
        }
    }
    return paramStr;
};

/**
 * 转换url参数为js对象
 * @param search 搜索字符串
 * @param obj [可选] 要保存的对象容器
 * @returns {{该对象}}
 */
function urlToObj(search,obj){
  reg = new RegExp( "([^?=&]+)(=([^&]*))?", "g" );
  search && search.replace(reg,function( $0, $1, $2, $3 ){
    obj[ $1 ] = decodeURIComponent($3);
  });
  return obj;
}
