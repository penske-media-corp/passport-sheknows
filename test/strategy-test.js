var vows = require('vows');
var assert = require('assert');
var util = require('util');
var SheKnowsStrategy = require('../lib/strategy');


vows.describe('SheKnowsStrategy').addBatch({

  'strategy': {
    topic: function () {
      return new SheKnowsStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function () {});
    },

    'should be named sheknows': function (strategy) {
      assert.equal(strategy.name, 'sheknows');
    },
  },

  'strategy when loading user profile': {
    topic: function () {
      var strategy = new SheKnowsStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function () {});

      // mock
      strategy._oauth2.get = function (url, accessToken, callback) {
        var body = '{ "username": "sally", "id": 1, "name": "sally girl", "email": "sally@sheknows.com" }';

        callback(null, body, undefined);
      }

      return strategy;
    },

    'when told to load user profile': {
      topic: function (strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }

        process.nextTick(function () {
          strategy.userProfile('access-token', done);
        });
      },

      'should not error': function (err, req) {
        assert.isNull(err);
      },
      'should load profile': function (err, profile) {
        assert.equal(profile.provider, 'sheknows');
        assert.equal(profile.id, '1');
        assert.equal(profile.username, 'sally');
        assert.equal(profile.displayName, 'sally girl');
        assert.lengthOf(profile.emails, 1);
        assert.equal(profile.emails[0].value, 'sally@sheknows.com');
      },
      'should set raw property': function (err, profile) {
        assert.isString(profile._raw);
      },
      'should set json property': function (err, profile) {
        assert.isObject(profile._json);
      },
    },
  },

  'strategy when loading user profile and encountering an error': {
    topic: function () {
      var strategy = new SheKnowsStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function () {});

      // mock
      strategy._oauth2.get = function (url, accessToken, callback) {
        callback(new Error('something-went-wrong'));
      }

      return strategy;
    },

    'when told to load user profile': {
      topic: function (strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }

        process.nextTick(function () {
          strategy.userProfile('access-token', done);
        });
      },

      'should error': function (err, req) {
        assert.isNotNull(err);
      },
      'should wrap error in InternalOAuthError': function (err, req) {
        assert.equal(err.constructor.name, 'InternalOAuthError');
      },
      'should not load profile': function (err, profile) {
        assert.isUndefined(profile);
      },
    },
  },

}).export(module);
