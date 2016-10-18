var expect = require('chai').expect;
var mocha = require('mocha');
var SheknowsPassport = require('../lib');
var package = require('../package.json');

describe('sheknows-passport module', function () {
    var subject;
    before(function () {
        subject = SheknowsPassport;
    });
    describe('version', function () {
        it('should have a version', function () {
            expect(subject.version).to.be.a('string');
        });
        it('should match the version of the package.json', function () {
            expect(subject.version).to.eql(package.version);
        });
    });

    describe('strategy', function () {
        it('should export a passport strategy', function () {
            expect(subject).to.have.ownProperty('Strategy');
        });

        it('should be a function', function () {
            expect(subject.Strategy).to.be.a('function');
        });
    });

});
