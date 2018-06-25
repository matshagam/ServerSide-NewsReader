'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pruneEmpty = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pruneEmpty(obj) {
  return function prune(current) {
    _lodash2.default.forOwn(current, function (value, key) {
      if (_lodash2.default.isUndefined(value) || _lodash2.default.isNull(value) || _lodash2.default.isNaN(value) || _lodash2.default.isEmpty(value) || _lodash2.default.isString(value) && _lodash2.default.isEmpty(value) || _lodash2.default.isObject(value) && _lodash2.default.isEmpty(prune(value))) {
        delete current[key];
      }
    });
    // remove any leftover undefined values from the delete
    // operation on an array
    if (_lodash2.default.isArray(current)) _lodash2.default.pull(current, undefined);

    return current;
  }(_lodash2.default.cloneDeep(obj));
  // Do not modify the original object, create a clone instead
}

exports.pruneEmpty = pruneEmpty;