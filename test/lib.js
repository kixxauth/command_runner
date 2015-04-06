var
CR = require('../index'),

results = Object.create(null);

exports.exec = function (key) {
  var
  args = Array.prototype.slice.call(arguments, 1);
  key = 'exec::'+ key;
  if (results[key]) {
    return results[key];
  } else {
    return results[key] = CR.exec.apply(null, args);
  }
};


exports.spawn = function (key) {
  var
  args = Array.prototype.slice.call(arguments, 1);
  key = 'spawn::'+ key;
  if (results[key]) {
    return results[key];
  } else {
    return results[key] = CR.spawn.apply(null, args);
  }
};
