Command Runner
==============

Node.js module for running system commands and returning a Promise.

[![NPM](https://nodei.co/npm/command_runner.png)](https://nodei.co/npm/command_runner/)

## Summary
command_runner simply adds some Promise wrappers around the standard Node.js .exec() and .spawn() functions in the [child_process module](https://nodejs.org/api/child_process.html). The API is basically unchanged, but there are some changes in the implementation:

### .exec()
__Example:__

    var CR = require('command_runner');
    CR.exec('ls -al').then(function (res) {
        console.log('exitCode: %i', res.exitCode); // 0
        console.log('exitSignal: %s', res.exitSignal); // null
        console.log('stdout: %s', res.stdout); // dir listing ....
        console.log('stderr: %s', res.stderr); // empty string
        console.log('errorMessage: %s', res.errorMessage); // undefined
    });

command_runner.exec() is basically unchanged from the underlying child_process.exec() function. It always sets the exitCode and exitSignal, even if there is no error (to 0 and null, respectively).

### .spawn()
__Example:__
Running the same command above, in a different way. The difference is that a shell is not invoked in this case.

    var CR = require('command_runner');
    CR.spawn('ls', ['a', 'l']).then(function (res) {
        console.log('exitCode: %i', res.exitCode); // 0
        console.log('exitSignal: %s', res.exitSignal); // null
        console.log('stdout: %s', res.stdout); // dir listing ....
        console.log('stderr: %s', res.stderr); // empty string
        console.log('errorMessage: %s', res.errorMessage); // undefined
    });

Unlike the native Node.js child_process.spawn(), command_runner.spawn() buffers stdout and stderr streams, and then resolves the promise with the results after the 'close' event is fired from the child process.


Copyright and License
---------------------
Copyright: (c) 2015 by Kris Walker <kris@kixx.name> (http://www.kixx.name/)

Unless otherwise indicated, all source code is licensed under the MIT license. See MIT-LICENSE for details.
