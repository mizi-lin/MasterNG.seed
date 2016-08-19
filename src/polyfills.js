"use strict";
require('core-js/es6/array');
require('core-js/es6/map');
require('core-js/es6/set');
require('core-js/es6/string');
require('core-js/es6/symbol');
require('core-js/es7/reflect');
require('core-js/fn/array/includes');
require('core-js/fn/object/assign');
require('zone.js/dist/zone');
if (process.env.NODE_ENV === 'development') {
    Error.stackTraceLimit = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
//# sourceMappingURL=polyfills.js.map