
var assert = require('assert');
var cases = require('./cases');
var domify = require('domify');
var each = require('for-each');
var submittable = require('..');

describe('submittable', function () {
  each(cases, function (x) {
    var html = x[0];
    var assertion = x[1];
    var element = domify(html);
    var expected = x[2];

    describe(html, function () {
      it(assertion, function () {
        assert.strictEqual(submittable(element), expected);
      });
    });
  });
});
