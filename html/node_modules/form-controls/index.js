
var toArray = require('to-array');

var bruteForce = [
  'button',
  'fieldset',
  'input',
  'keygen',
  'object',
  'output',
  'select',
  'textarea'
].join(',');


/**
 * Retrieves a list of valid controls from a given root element.
 *
 * If the `root` element is not either a `<form>` or `<fieldset>`, or does not
 * expose a `HTMLFormControlCollection` interface, then a "brute-force" search
 * retrieves the valid "listed controls" is used.
 *
 * @see http://www.w3.org/TR/html5/forms.html#category-listed
 * @param  {HTMLElement} root  The root element to search.
 * @return {Array}
 */
module.exports = function (root) {
  if (!isElement(root)) {
    throw new TypeError('a root element is required');
  }

  return toArray(root.elements || root.querySelectorAll(bruteForce));
};

/**
 * Helper for determining if a value is an HTML element.
 *
 * @param {HTMLElement} el  The value to check.
 * @return {Boolean}
 */
function isElement(el) {
  if (!el) return false;
  return el.nodeType === 1;
}
