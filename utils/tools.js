/**
 * Product API
 * ------------
 * tools.js - This file contains some useful helper functions
 */

'use strict';

module.exports = {

    // this function will form sets of mongoose query from another mongose query input (and filter undefined value)
    // input: operator: $or, array: [ {$or: {'a':'b'}}, {$or: {'b': 'c'}} , undefined]
    // output: {$and: [ {$or: {'a':'b'}}, {$or: {'b': 'c'}} ]}
    aggregateQuery: function(operator, array){
        if (array instanceof Array){
            if (array.length == 0) return undefined;

            var result = {};
            result[operator] = array;

            return result;
        }

        return undefined;
    }
}