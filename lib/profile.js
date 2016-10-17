/**
 * Parse profile.
 *
 * @param {object|string} json
 * @return {object}
 * @access public
 */
exports.parse = function(json) {
  if ('string' == typeof json) {
    json = JSON.parse(json);
  }

  var profile = {};
  profile.id = json.id;
  profile.username = json.username;
  profile.displayName = json.firstname + ' ' +  json.lastname;
  profile.firstname = json.firstname;
  profile.lastname = json.lastname;
  profile.email = json.email;
  profile.emails = [json.email];
  profile.avatar = json.avatar;
  profile.roles = json.roles || [];

  return profile;
};
