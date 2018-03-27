/**
 * Created by hui on 2017/4/3.
 */
import { Indicator } from 'mint-ui';
export default function utils() {
    var utils = {};
    utils.cs = 1;
    /**
     * 解决跨域问题
     * header('Access-Control-Allow-Origin:*');
     * JOSNP:
     *
     * [ajax description]
     * @param  object obj
     {
     type:"post|get",
     url:"http://example.com",
     async:"true",
     dataType:"HTML|text|XML|JSON|JSONP",
     data:{},
     beforeSend:function(xmlhttp){},
     success:functuon(data){},
     error:function(err){}
     }
     * @return {[type]}     [description]
     */
    utils.ajax = function(obj) {
            var xmlhttp, type, url, async, dataType, data;
            if (typeof(obj) != 'object') return false;

            type = obj.type == undefined ? 'POST' : obj.type.toUpperCase();
            url = obj.url == undefined ? window.location.href : obj.url;
            async = obj.async == undefined ? true : obj.type;
            dataType = obj.dataType == undefined ? 'HTML' : obj.dataType.toUpperCase();
            data = obj.data == undefined ? {} : obj.data;


            var formatParams = function() {
                if (typeof(data) == "object") {
                    var str = "";
                    for (var pro in data) {
                        str += pro + "=" + data[pro] + "&";
                    }
                    data = str.substr(0, str.length - 1);
                }
                if (type == 'GET' || dataType == 'JSONP') {
                    if (url.lastIndexOf('?') == -1) {
                        url += '?' + data;
                    } else {
                        url += '&' + data;
                    }
                }
            }
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            } else {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }


            if (dataType == 'JSONP') {
                if (typeof(obj.beforeSend) == 'function') obj.beforeSend(xmlhttp);
                var callbackName = ('jsonp_' + Math.random()).replace(".", "");
                var oHead = document.getElementsByTagName('head')[0];
                data.callback = callbackName;
                var ele = document.createElement('script');
                ele.type = "text/javascript";
                ele.onerror = function() {
                    //console.log('请求失败');
                    obj.error && obj.error("请求失败");
                };

                oHead.appendChild(ele);
                window[callbackName] = function(json) {
                    oHead.removeChild(ele);
                    window[callbackName] = null;
                    obj.success && obj.success(json);
                };
                formatParams();
                ele.src = url;


                return;
            } else {
                formatParams();
                xmlhttp.open(type, url, async);
                xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
                if (typeof(obj.beforeSend) == 'function') obj.beforeSend(xmlhttp);
                xmlhttp.send(data);
                xmlhttp.onreadystatechange = function() {

                    if (xmlhttp.status != 200) {
                        //console.log(xmlhttp.status + '错误');
                        //obj.error && obj.error(xmlhttp.status + '错误');
                        return;
                    }

                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                        if (dataType == 'JSON') {
                            try {
                                res = JSON.parse(xmlhttp.responseText);
                            } catch (e) {
                                //console.log('返回的json格式不正确');
                                //obj.error('返回的json格式不正确');
                            }

                        } else if (dataType == 'XML') {
                            res = xmlhttp.responseXML;
                        } else {
                            res = xmlhttp.responseText;
                        }

                        obj.success && obj.success(res);

                    }
                }
            }
        }
        /**ajax调用**/
        // utils.sendOPtion = function(url, data_json, ajax_type, async_type, callback) {
        //     if (!async_type) {
        //         async = true;
        //     }
        //     if (url.indexOf(com.hosturl) == 0) {
        //         com.ajaxdatatype = com.hosturl_ajaxdatatype;
        //     } else if (url.indexOf(com.loginhosturl) == 0) {
        //         com.ajaxdatatype = com.loginhosturldatatype;
        //     }

    //     utils.ajax({
    //         type: ajax_type,
    //         url: url,
    //         async: async_type,
    //         dataType: com.ajaxdatatype,
    //         data: data_json,
    //         beforeSend: function(xmlhttp) {
    //             //xmlhttp.setRequestHeader("test", "application/x-www-form-urlencoded");
    //         },
    //         success: function(res) {
    //             callback(res);
    //         },
    //     });
    // }

    
    utils.sendOPtion = function(vue_this, url, data_json, ajax_type, async_type, callback, jiafu_flag) {
        Indicator.open({ "spinnerType": "fading-circle" });

        var ajaxdatatype_temp = '';
        var token_temp = '';
//  	var token_temp = 'eyJhbGciOiJIUzI1NiJ9.eyJ1dHV0dXQiOiI3MjUjMTA3NCM0NSJ9.1iVjuwMm34f7_YIS82rdsUuDvEy1tkzDvpn7vOUntMQ';
        var token_temp_Cookie = utils.getCookie("employeeToken"); //获取 token
        if (token_temp_Cookie && token_temp_Cookie != "") {
            token_temp = token_temp_Cookie;
        }
        

        
        if (!async_type) {
            async = true;
        }
        if (jiafu_flag) {
            if (ajax_type == 'post' || ajax_type == "POST") {
                vue_this.$http.post(url, data_json, {
                    emulateJSON: true,
                    headers: { "token": token_temp }
                }).then((response) => {
                    callback(response.body);
                    Indicator.close();
                }).catch(function(response) {
                    console.log('post ajax请求出错了!');
                    console.log(response);
                    Indicator.close();
                });
            } else if (ajax_type == 'get' || ajax_type == "GET") {
                vue_this.$http.get(url, {
                    params: data_json,
                    emulateJSON: true,
                    headers: { "token": token_temp }
                }).then((response) => {

                    callback(response.body);
                    Indicator.close();
                }).catch(function(response) {
                    console.log('get ajax请求出错了!');
                    console.log(response);
                    Indicator.close();
                });
            }

        } else {
            if (url.indexOf(com.hosturl) == 0) {
                ajaxdatatype_temp = com.hosturl_ajaxdatatype;
            } else if (url.indexOf(com.loginhosturl) == 0) {
                ajaxdatatype_temp = com.loginhosturldatatype;
            } else {
                ajaxdatatype_temp = com.ajaxdatatype;
            }
            //console.log(ajaxdatatype_temp);
            if (ajaxdatatype_temp == 'JSON' || ajaxdatatype_temp == 'json') {
                vue_this.$http.post(url, data_json, {
                    method: "POST",
                    emulateJSON: true,
                    xhr: { withCredentials: true }
                }).then((response) => {
                    callback(response.body);
                    Indicator.close();
                }).catch(function(response) {
                    console.log('post ajax请求出错了!');
                    console.log(response);
                    Indicator.close();
                });

            } else if (ajaxdatatype_temp == 'JSONP' || ajaxdatatype_temp == 'jsonp') {
                vue_this.$http.jsonp(url, {
                    params: data_json
                }, {
                    headers: {"token": token_temp},
                    method: ajax_type,
                    emulateJSON: true,
                    xhr: { withCredentials: true }
                }).then((response) => {
                    callback(response.body);
                    Indicator.close();

                }).catch(function(response) {
                    console.log('jsonp ajax请求出错了!');
                    console.log(response);
                    Indicator.close();
                });

            }
        }


    }
    utils.getCookie = function(Name) {
        var search = Name + "=";
        if (document.cookie.length > 0) {
            var offset = document.cookie.indexOf(search);
            var end = 0;
            if (offset > -1) {
                offset += search.length;
                end = document.cookie.indexOf(";", offset)
                if (end == -1) {
                    end = document.cookie.length;
                }
                return unescape(document.cookie.substring(offset, end));
            } else {
                return "";
            }
        }
    }
    return utils;
}
