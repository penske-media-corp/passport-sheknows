var expect = require('chai').expect;
var mocha = require('mocha');
var SheknowsStrategy = require('../lib/strategy');

describe('sheknows-passport user profile', function () {
    describe('fetched from the default endpoint', function () {
        var strategy = new SheknowsStrategy({
            clientID: 'ABC123',
            clientSecret: 'secret'
          }, function() {});
      
        strategy._oauth2.get = function(url, accessToken, callback) {
            if (url != 'https://atlas-sso.pmc.com/api/me') {
                return callback(new Error('incorrect url argument'));
            }
            
            if (accessToken != 'token') {
                return callback(new Error('incorrect token argument'));
            }

            var body = '{"providers":["twitter"],"avatar":"http://cdn.skim.gs/image/upload/v1476309514/avatars/blue_solidbkrnd_rev_uflgox.png","id":123,"firstname":"Test","lastname":"User","username":"test.user","email":"test.user@example.com","roles":["ROLE_USER"]}';

            callback(null, body, undefined);
        };
        
        
        var profile;

        before(function(done) {
          strategy.userProfile('token', function(err, p) {
            if (err) { return done(err); }
            profile = p;
            done();
          });
        });

        it('should parse profile', function () {
            expect(profile.provider).to.eql('sheknows');
            expect(profile.id).to.eql(123);
            expect(profile.displayName).to.eql('Test User');
            expect(profile.firstname).to.eql('Test');
            expect(profile.lastname).to.eql('User');
            expect(profile.email).to.eql('test.user@example.com');
            expect(profile.emails).to.eql(['test.user@example.com']);
            expect(profile.roles).to.eql(['ROLE_USER']);
        });

        it('should set a raw property', function () {
            expect(profile._raw).to.be.a('string');
        });

        it('should set a json property', function () {
            expect(profile._json).to.be.an('object');
        });
    });
});
