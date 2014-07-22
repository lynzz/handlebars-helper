;(function(Handlebars, DateFormat) {
  var hasDefine = typeof define === 'function';
  var hasExports = typeof module !== 'undefined' && module.exports;
  if ( hasDefine ) {
    var Handlebars = require('handlebars');
    var DateFormat = require('./dateformat');
  }
  var helpers = {
    // 时间格式
    dateFormat: function(date, format) {
      if (!date) {
        return '';
      }
      format = format || 'MM-dd';
      var df = new DateFormat(format);

      return df.format(new Date(parseInt(date, 10)));
    },
    // 标题长度限制
    ellipsis: function(val, size) {
      if (!val) {
        return '';
      } else if (!size) {
        return val;
      } else {
        var len = val.length;
        val = len <= size ? val : val.slice(0, size - 1) + '&hellip;';

        return val;
      }
    }
  };

  if (hasExports) {
    module.exports = helpers;
  } else {
    for (helper in helpers) {
      Handlebars.registerHelper(helper , helpers[helper]);
    }
  }
})(typeof Handlebars !== 'undefined' ? Handlebars:undefined, typeof DateFormat !== 'undefined' ? DateFormat : undefined);
