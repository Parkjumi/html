
var assert = require('assert');
var control = require('form-control');
var controls = require('..');
var form = document.getElementById('form');

describe('controls(root)', function () {
  after(function () {
    form.parentNode.removeChild(form);
  });

  it('should return the expected number of elements', function () {
    var els = controls(form);
    assert.strictEqual(els.length, 6);
  });

  it('should return the elements in the proper order', function () {
    var els = controls(form);

    assert.strictEqual(els[0], control(form, 'username'));
    assert.strictEqual(els[1], control(form, 'password'));
    assert.strictEqual(els[2], control(form, 'group1'));
    assert.strictEqual(els[3], control(form, 'input1'));
    assert.strictEqual(els[4], control(form, 'input2'));
    assert.strictEqual(els[5], control(form, 'input3'));
  });

  it('should work with a <fieldset>', function () {
    var fieldset = control(form, 'group1');
    var els = controls(fieldset);

    assert.strictEqual(els.length, 3);
    assert.strictEqual(els[0], control(fieldset, 'input1'));
    assert.strictEqual(els[1], control(fieldset, 'input2'));
    assert.strictEqual(els[2], control(fieldset, 'input3'));
  });

  it('should work with an arbitrary element', function () {
    var div = document.getElementById('test');
    var els = controls(div);

    assert.strictEqual(els.length, 2);
    assert.strictEqual(els[0], control(div, 'input2'));
    assert.strictEqual(els[1], control(div, 'input3'));
  });

  it('should throw when no root element is present', function () {
    assert.throws(function () {
      controls(null);
    });
  });
});
