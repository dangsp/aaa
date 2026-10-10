(function () {
  var Model = {
    //加法
    plus: function (n, m) {
      n = typeof n == "string" ? n : this.numToString(n);
      m = typeof m == "string" ? m : this.numToString(m);
      var F = n.indexOf(".") != -1 ? this.handleNum(n) : [n, 0, 0],
        S = m.indexOf(".") != -1 ? this.handleNum(m) : [m, 0, 0],
        l1 = F[2],
        l2 = S[2],
        L = l1 > l2 ? l1 : l2,
        T = Math.pow(10, L);
      return (
        (F[0] * T +
          (F[1] * T) / Math.pow(10, l1) +
          S[0] * T +
          (S[1] * T) / Math.pow(10, l2)) /
        T
      );
    },
    //减法
    minus: function (n, m) {
      n = typeof n == "string" ? n : this.numToString(n);
      m = typeof m == "string" ? m : this.numToString(m);
      var F = n.indexOf(".") != -1 ? this.handleNum(n) : [n, 0, 0],
        S = m.indexOf(".") != -1 ? this.handleNum(m) : [m, 0, 0],
        l1 = F[2],
        l2 = S[2],
        L = l1 > l2 ? l1 : l2,
        T = Math.pow(10, L);
      return (
        (F[0] * T +
          (F[1] * T) / Math.pow(10, l1) -
          S[0] * T -
          (S[1] * T) / Math.pow(10, l2)) /
        T
      );
    },
    //乘法
    multiply: function (n, m) {
      n = typeof n == "string" ? n : this.numToString(n);
      m = typeof m == "string" ? m : this.numToString(m);
      var F = n.indexOf(".") != -1 ? this.handleNum(n) : [n, 0, 0],
        S = m.indexOf(".") != -1 ? this.handleNum(m) : [m, 0, 0],
        l1 = F[2],
        l2 = S[2],
        L = l1 > l2 ? l1 : l2,
        T = Math.pow(10, L);
      return (
        ((F[0] * T + (F[1] * T) / Math.pow(10, l1)) *
          (S[0] * T + (S[1] * T) / Math.pow(10, l2))) /
        T /
        T
      );
    },
    //除法
    division: function (n, m) {
      n = typeof n == "string" ? n : this.numToString(n);
      m = typeof m == "string" ? m : this.numToString(m);
      var F = n.indexOf(".") != -1 ? this.handleNum(n) : [n, 0, 0],
        S = m.indexOf(".") != -1 ? this.handleNum(m) : [m, 0, 0],
        l1 = F[2],
        l2 = S[2],
        L = l1 > l2 ? l1 : l2,
        T = Math.pow(10, L);
      return (
        (F[0] * T + (F[1] * T) / Math.pow(10, l1)) /
        (S[0] * T + (S[1] * T) / Math.pow(10, l2))
      );
    },
    //保留2位小数
    toFixed2: function (point) {
      var str = Number(point).toFixed(2);
      return str;
    },
    //数字转换字符
    numToString: function (tempArray) {
      if (Object.prototype.toString.call(tempArray) == "[object Array]") {
        var temp = tempArray.slice();
        for (var i, l = temp.length; i < l; i++) {
          temp[i] = typeof temp[i] == "number" ? temp[i].toString() : temp[i];
        }
        return temp;
      }
      if (typeof tempArray == "number") {
        return tempArray.toString();
      }
      return [];
    },
    handleNum: function (n) {
      n = typeof n !== "string" ? n + "" : n;
      var temp = n.split(".");
      temp.push(temp[1].length);
      return temp;
    }
  };
  //全局对象
  var Global = (function () {
    return this || (0, eval)("this");
  })();
  //全局命名空间（下划线+首字母大写）
  var ModelName = "_arithmetic";

  //CMD模块引用
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Model;
  }

  //AMD模块引用
  if (typeof define === "function" && define.amd) {
    define(function () {
      return Model;
    });
  }

  //注册到VUE
  if (typeof Vue == "function") {
    Vue.prototype[ModelName] = Model;
  }
  //注册到全局
  Global[ModelName] = Model;
})();
