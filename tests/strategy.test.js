var expect = require('chai').expect;
var mocha = require('mocha');
var SheknowsStrategy = require('../lib/strategy');

describe('sheknows-passport strategy', function () {
    describe('constructed', function () {
        var subject = new SheknowsStrategy({
            clientID: 'ABC123',
            clientSecret: 'keepitsecretkeepitsafe'
        }, function () {});

        it('should be named sheknows', function () {
            expect(subject.name).to.eql('sheknows');
        });
    });

    describe('constructed with undefined options', function () {
        it('show throw an error', function () {
            expect(function () {
                var strategy = new SheknowsStrategy(undefined, function () {});
            }).to.throw(Error);
        });
    });
});
