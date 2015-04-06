// Start by requiring IOU to shim up the Promise constructor.

var
PROC    = require('child_process'),
Promise = require('iou').Promise;


exports.exec = function exec(command) {
  var promise;
  promise = new Promise(function (resolve) {
    PROC.exec(command, function (err, stdout, stderr) {
      var
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


exports.spawn = function spawn(command, args, options) {
  if (Array.isArray(args)) {
    args = args.slice(0);
  } else {
    options = args || Object.create(null);
    args = [];
  }

  var
  promise = new Promise(function (resolve, reject) {
    var
    child,
    stdout = '',
    stderr = '',
    res = Object.create(null);

    child = PROC.spawn(command, args, options);
    child.on('error', reject);
    child.on('exit', function (code, signal) {
      Object.defineProperties(res, {
        exitCode: {
          enumerable: true,
          value: code
        },
        exitSignal: {
          enumerable: true,
          value: signal || null
        }
      });
    });
    child.on('close', function(code) {
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
      return resolve(res);
    });
    child.stdout.on('data', function (chunk) {
      stdout += chunk;
    });
    child.stderr.on('data', function (chunk) {
      stderr += chunk;
    });
  });
  return promise;
};
