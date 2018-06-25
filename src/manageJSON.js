import _ from 'lodash';

function pruneEmpty(obj) {
  return (function prune(current) {
    _.forOwn(current, function(value, key) {
      if (
        _.isUndefined(value) ||
        _.isNull(value) ||
        _.isNaN(value) ||
        _.isEmpty(value) ||
        (_.isString(value) && _.isEmpty(value)) ||
        (_.isObject(value) && _.isEmpty(prune(value)))
      ) {
        delete current[key];
      }
    });
    // remove any leftover undefined values from the delete
    // operation on an array
    if (_.isArray(current)) _.pull(current, undefined);

    return current;
  })(_.cloneDeep(obj));
  // Do not modify the original object, create a clone instead
}

export { pruneEmpty };
