# Passport-SheKnows

[Passport](http://passportjs.org/) strategy for authenticating with
[SheKnows Connect](https://connect.sheknows.com/) using the OAuth 2.0 API.

This module lets you authenticate using SheKnows in your Node.js applications.
By plugging into Passport, SheKnows authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-sheknows

## Usage

#### Configure Strategy

The SheKnows authentication strategy authenticates users using a SheKnows account
and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which accepts
these credentials and calls `done` providing a user, as well as `options`
specifying a client ID, client secret, and callback URL.

    passport.use(new SheKnowsStrategy({
        clientID: SHEKNOWS_CLIENT_ID,
        clientSecret: SHEKNOWS_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/sheknows/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ SheKnowsId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'sheknows'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/sheknows',
      passport.authenticate('sheknows'));

    app.get('/auth/sheknows/callback',
      passport.authenticate('sheknows', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Tests

    $ npm install --dev
    $ make test

[![Build Status](https://secure.travis-ci.org/sheknows/passport-sheknows.png)](http://travis-ci.org/sheknows/passport-sheknows)

## Credits

Many thanks to the [Passport-GitHub](https://github.com/jaredhanson/passport-github) module
for providing an excellent Passport plugin for [GitHub](https://github.com).

## License

[The MIT License](http://sheknows.mit-license.org/)

Copyright (c) 2013 SheKnows, LLC <[http://www.sheknows.com](http://www.sheknows.com)>
