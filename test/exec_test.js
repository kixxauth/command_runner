var
TEST_LIB = require('./lib');

module.exports = {

  "with missing command": {

    setUp: function (done) {
      var self = this;
      self.child = TEST_LIB.exec("with missing command", 'foobarbaz');
      self.child.then(function (res) {
        Object.keys(res).forEach(function (key) {
          self[key] = res[key];
        });
        return done();
      });
      return;
    },

    "it has an error exitCode": function (test) {
      test.ok(this.exitCode);
      test.notEqual(parseInt(this.exitCode, 10), 0);
      return test.done();
    },

    "it has an errorMessage": function (test) {
      test.ok(this.errorMessage);
      test.equal(typeof this.errorMessage, 'string');
      return test.done();
    },

    "exitSignal is null": function (test) {
      test.strictEqual(this.exitSignal, null);
      return test.done();
    },

    "stdout exists": function (test) {
      test.equal(typeof this.stdout, 'string');
      return test.done();
    },

    "stderr exists": function (test) {
      test.equal(typeof this.stderr, 'string');
      test.ok(this.stderr.length > 0);
      return test.done();
    }
  },

  "with error command": {

    setUp: function (done) {
      var self = this;
      self.child = TEST_LIB.exec("with error command", 'grep');
      self.child.then(function (res) {
        Object.keys(res).forEach(function (key) {
          self[key] = res[key];
        });
        return done();
      });
      return;
    },

    "it has an error exitCode": function (test) {
      test.ok(this.exitCode);
      test.notEqual(parseInt(this.exitCode, 10), 0);
      return test.done();
    },

    "it has an errorMessage": function (test) {
      test.ok(this.errorMessage);
      test.equal(typeof this.errorMessage, 'string');
      return test.done();
    },

    "exitSignal is null": function (test) {
      test.strictEqual(this.exitSignal, null);
      return test.done();
    },

    "stdout exists": function (test) {
      test.equal(typeof this.stdout, 'string');
      return test.done();
    },

    "stderr exists": function (test) {
      test.equal(typeof this.stderr, 'string');
      test.ok(this.stderr.length > 0);
      return test.done();
    }
  },

  "with simple command": {

    setUp: function (done) {
      var self = this;
      self.child = TEST_LIB.exec("with simple command", 'ls -al');
      self.child.then(function (res) {
        Object.keys(res).forEach(function (key) {
          self[key] = res[key];
        });
        return done();
      });
      return;
    },

    "it has a success exitCode": function (test) {
      test.strictEqual(this.exitCode, 0);
      return test.done();
    },

    "it does not have an errorMessage": function (test) {
      test.ok(!this.errorMessage);
      return test.done();
    },

    "exitSignal is undefined": function (test) {
      test.strictEqual(typeof this.exitSignal, 'undefined');
      return test.done();
    },

    "stdout exists": function (test) {
      test.equal(typeof this.stdout, 'string');
      test.ok(this.stdout.length > 0);
      return test.done();
    },

    "stderr exists": function (test) {
      test.equal(typeof this.stderr, 'string');
      return test.done();
    }
  }
};
