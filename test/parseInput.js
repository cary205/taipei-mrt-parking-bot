var assert = require('assert');
const parsekInput = require("../src/parseInput.js");

describe('#parsekInput', function() {
    it('parsing valid input', function() {
        assert.deepEqual(parsekInput("淡水機車"), ["R28", "機車"]);
    });
    
    it('parsing invalid input', function() {
        assert.deepEqual(parsekInput("淡水"), ["", ""]);
    });
});