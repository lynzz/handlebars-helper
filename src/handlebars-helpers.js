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
      var df = new DateFormat(format);
      return df.format(new Date(date));
    },
    // 标题长度限制
    titleLimit: function(title, limit) {
      var len = title.length;

      if (len <= limit) {
        return title
      } else {
        return title.slice(0, limit - 1) + '...';
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
