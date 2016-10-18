/**
 * Module dependencies.
 */
var util               = require('util'),
    OAuth2Strategy     = require('passport-oauth2'),
    InternalOAuthError = require('passport-oauth2').InternalOAuthError,
    Profile            = require('./profile');

/**
`Strategy` constructor.

The SheKnows authentication strategy authenticates requests by delegating
to SheKnows Connect using the OAuth 2.0 protocol.

Applications must supply a `verify` callback which accepts an `accessToken`,
`refreshToken` and service-specific `profile`, and then calls the `done`
callback supplying a `user`, which should be set to `false` if the
credentials are not valid.  If an exception occured, `err` should be set.

Options:

  - `clientID`      your SheKnows application's Client ID
  - `clientSecret`  your SheKnows application's Client Secret
  - `callbackURL`   URL to which SheKnows will redirect the user after granting authorization

Examples:

    passport.use(new SheKnowsStrategy({
        clientID: '123-456-789',
        clientSecret: 'shhh-its-a-secret'
        callbackURL: 'https://www.example.net/auth/sheknows/callback'
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate(..., function (err, user) {
          done(err, user);
        });
      }
    ));

@class Strategy
@param {Object} options
@param {Function} verify
@api public
**/
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'http://connect.sheknows.com/authorize';
  options.tokenURL = options.tokenURL || 'http://connect.sheknows.com/token';
  options.scopeSeparator = options.scopeSeparator || ',';


  OAuth2Strategy.call(this, options, verify);
  this.name = 'sheknows';
  this._profileURL = options.profileURL || 'https://connect.sheknows.com/me.json';
  this._clientSecret = options.clientSecret;
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


/**
 * Retrieve user profile from SheKnows Connect.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `sheknows`
 *   - `id`               the user's SheKnows Connect ID
 *   - `username`         the user's SheKnows Connect username
 *   - `displayName`      the user's full name
 *   - `firstname`        the user's first name
 *   - `lastname`         the user's last name
 *   - `email`            the user's email
 *   - `emails`           the user's email addresses as an array
 *   - `avatar`           the user's connect avatar
 *   - `roles`            the user's roles
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function (accessToken, done) {
  this._oauth2.get(this._profileURL, accessToken, function (err, body, res) {
    if (err) {
      return done(new InternalOAuthError('failed to fetch user profile', err));
    }

    try {
      json = JSON.parse(body);
    } catch (ex) {
      return done(new Error('Failed to parse user profile'));
    }

    var profile = Profile.parse(json);
    profile.provider = 'sheknows';
    profile._raw = body;
    profile._json = json;

    done(null, profile);
  });
};

// expose constructor.
module.exports = Strategy;
