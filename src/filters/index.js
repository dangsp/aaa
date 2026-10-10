import moment from 'moment'

const dateFmt = (value, format = "YYYY-MM-DD hh:mm:ss") => {
  let time = moment(value * 1000).add(-2, 'days').format(format);
  return time;
};
const formatDate = (value) => {
  if (value == undefined) {
    return;
  }
  // let date = new Date(value * 1000);
  let date = new Date(value);
  //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? ('0' + MM) : MM; //月补0
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d; //天补0
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h; //小时补0
  let m = date.getMinutes();
  m = m < 10 ? ('0' + m) : m; //分钟补0
  let s = date.getSeconds();
  s = s < 10 ? ('0' + s) : s; //秒补0
  // return y + '-' + MM + '-' + d; //年月日
  return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s; //年月日时分秒
}
//将金额格式每隔3位用.区分
const format_number = (n = 0) => {
  var b = parseInt(n).toString();
  var len = b.length;
  if (len <= 3) {
    return b;
  }
  var r = len % 3;
  return r > 0 ? b.slice(0, r) + "." + b.slice(r, len).match(/\d{3}/g).join(".") : b.slice(r, len).match(/\d{3}/g).join(".");
}
export {
  dateFmt,
  format_number,
  formatDate,
}
