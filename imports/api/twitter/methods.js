import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const getUserTimeline = new ValidatedMethod({
  name: 'get.user.timeline',
  validate: new SimpleSchema({
    userName: { type: String }
  }).validator(),
  run({ userName }) {
    if (Meteor.isServer) {
      const OAuth = require('oauth');
      const oauth = new OAuth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        'sZv82NnXEfdT1Egd8EBAA0McA',
        'GslTJZA3n0QRb64qhLAGdatpMwhTrdwNNtKXIr0OcDeULzl475',
        '1.0A',
        null,
        'HMAC-SHA1'
      );
      const request = Meteor.wrapAsync(oauth.get, oauth);

      try {
        const response = request(
          `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${userName}`,
          '960915317521354752-5InLoh1ZdjV6B8AjqRpa4PLQ5yodcb0',
          'tRDtku3ZFZ8IlqnYqCalliWRfYPv3AEcmOX7e68rwnG86'
        );
        return JSON.parse(response);
      } catch (e) {
        throw new Meteor.Error('Error occured');
      }
    }
  }
});
