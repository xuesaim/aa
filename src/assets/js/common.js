/**
 *   对Date的扩展，将 Date 转化为指定格式的String
 *   月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *   例子：
 *   (new Date()).Format('yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
 *   (new Date()).Format('yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
 */
const fmtDate = (date, fmt) => { // author: meizz
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
};
// 判断是否为空
const isEmpty = (value) => {
  return (value === null || value === undefined);
};
// 判断是否不为空
const isNotEmpty = (value) => {
  return (value !== null && value !== undefined);
};
// 判断是否有空格
const isContainSpace = (value) => {
  return (String(value).indexOf(' ') > -1);
};
// 判断是否空对象
const isOwnEmpty = (obj) => {
  for (var name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false;
    }
  }
  return true;
};
// 获取对象在数组下的下标
const getIndexWithArr = function (_arr, _obj) {
  var len = _arr.length;
  for (var i = 0; i < len; i++) {
    if (_arr[i] == _obj) {
      return parseInt(i);
    }
  }
  return -1;
};
// 获取删除数组指定对象后的数组
const getRemoveObjWithArr = function (_arr, _obj) {
  var length = _arr.length;
  for (var i = 0; i < length; i++) {
    if (_arr[i] == _obj) {
      if (i == 0) {
        _arr.shift(); //删除并返回数组的第一个元素
        return _arr;
      } else if (i == length - 1) {
        _arr.pop(); //删除并返回数组的最后一个元素
        return _arr;
      } else {
        _arr.splice(i, 1); //删除下标为i的元素
        return _arr;
      }
    }
  }
};




exports.fmtDate = fmtDate;
exports.isEmpty = isEmpty;
exports.isNotEmpty = isNotEmpty;
exports.isContainSpace = isContainSpace;
exports.isOwnEmpty = isOwnEmpty;
exports.getIndexWithArr = getIndexWithArr;
exports.getRemoveObjWithArr = getRemoveObjWithArr;
 