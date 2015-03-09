var
CR = require('../index'),

results = Object.create(null);

exports.exec = function (key, command, options) {
  key = 'exec::'+ key;
  if (results[key]) {
    return results[key];
  } else {
    return results[key] = CR.exec(command, options);
  }
};
