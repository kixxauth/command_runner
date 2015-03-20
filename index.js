// Start by requiring IOU to shim up the Promise constructor.

var
PROC    = require('child_process'),
Promise = require('iou').Promise;


exports.exec = function exec(command, options) {
  options = options || Object.create(null);
  var promise, child;
  promise = new Promise(function (resolve) {
    child = PROC.exec(command, function (err, stdout, stderr) {
      res = Object.create(null);
      Object.defineProperties(res, {
        stdout: {
          enumerable: true,
          value: stdout
        },
        stderr: {
          enumerable: true,
          value: stderr
        }
      });
      if (err) {
        Object.defineProperties(res, {
          errorMessage: {
            enumerable: true,
            value: err.message
          },
          exitCode: {
            enumerable: true,
            value: err.code
          },
          exitSignal: {
            enumerable: true,
            value: err.signal
          }
        });
      }
      return resolve(res);
    });
  });
  return promise;
};
