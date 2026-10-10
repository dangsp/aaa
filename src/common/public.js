import Vue from "vue";

// export const baseURL = process.env.API_ROOT;
Vue.prototype.$baseURL = process.env.API_ROOT;

//存cookies函数
Vue.prototype.$setCookie = (name, value) => {
  var Days = 30; //此 cookie 将被保存 30 天
  var exp = new Date(); //new Date("December 31, 9998");
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie =
    name + "=" + escape(value) + ";expires=" + exp.toGMTString();
};

//s20是代表20秒
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30
Vue.prototype.$getsec = str => {
  var str1 = str.substring(1, str.length) * 1;
  var str2 = str.substring(0, 1);
  if (str2 == "s") {
    return str1 * 1000;
  } else if (str2 == "h") {
    return str1 * 60 * 60 * 1000;
  } else if (str2 == "d") {
    return str1 * 24 * 60 * 60 * 1000;
  } else {
    return -1;
  }
};
//存cookies函数
//setCookie("name","hayden","s20");
Vue.prototype.$setCookie = (name, value, time) => {
  var strsec = this.$getsec(time); //cookie过期时间
  var exp = new Date(); //new Date("December 31, 9998");
  exp.setTime(exp.getTime() + strsec * 1);
  document.cookie =
    name + "=" + escape(value) + ";expires=" + exp.toGMTString();
};

//取cookies函数
Vue.prototype.$getCookie = name => {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]);
  return null;
};
//转换百分数保留两位小数
Vue.prototype.$toPercent = point => {
  var str = Number(point * 100).toFixed(2);
  str += "%";
  return str;
};
//只限v-model.trim.number="amt",添加@input="xiaoshu($event)" ,xiaoshu(event) {this.$xiaoshu(event.currentTarget,this);}
//保留两位小数
Vue.prototype.$xiaoshu = (obj, _this) => {
  obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
  obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
  obj.value = obj.value
    .replace(".", "$#$")
    .replace(/\./g, "")
    .replace("$#$", ".");
  obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
  if (obj.value.indexOf(".") < 0 && obj.value != "") {
    //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    obj.value = parseFloat(obj.value);
  }
  _this.amt = obj.value;
};

//只能为正整数
Vue.prototype.$zhengshu = (obj, _this) => {
  if (obj.value.substr(0) == "0") {
    obj.value = obj.value.replace(/[^1-9]/g, "");
  }
  obj.value = obj.value.replace(/\D/g, "");
  _this.amt = obj.value;
};
// 非中文
Vue.prototype.$letterNumber = (obj, type, _this) => {
  var reg = /^[^\u4e00-\u9fa5]+$/;
  if (!reg.test(obj.value.substr(0))) {
    if (type == "address") {
      _this.address = "";
    }
  }
};
//复制
Vue.prototype.$copy = (obj, _this) => {
  var input = document.createElement("input");
  input.value = obj;
  document.body.appendChild(input);
  input.select();
  input.setSelectionRange(0, input.value.length), document.execCommand("Copy");
  document.body.removeChild(input);

  this.$toast(this.$t('success'));
};

//刷新当前页面
Vue.prototype.$refresh = _this => {
  _this.$router.replace({
    path: "/refresh",
    query: {
      t: Date.now()
    }
  });
};

//验证手机号码
Vue.prototype.$isPoneAvailable = (phone) => {
  var reg = /^1[3456789]\d{9}$/;
  if (!reg.test(phone)) {
    return false;
  } else {
    return phone;
  }
};

//验证手机号码
Vue.prototype.$isEmail = (email) => {
  var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (!reg.test(email)) {
    return false;
  } else {
    return email;
  }
};

//验证手机号码
Vue.prototype.$isIdno = (idno) => {
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!reg.test(idno)) {
    return false;
  } else {
    return idno;
  }
};

//验证手机号码
Vue.prototype.$isChinese = (uname) => {
  var reg = /[^\u4E00-\u9FA5]/g;
  if (!reg.test(uname)) {
    return false;
  } else {
    return uname;
  }
};
