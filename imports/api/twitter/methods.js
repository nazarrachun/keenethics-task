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
        'T0AIn3uFspC4Dt37L7vvgFTIg',
        'X3DaFkUZHOuNM52Sw5esGhWE9Rth6xyTolAj3IotwGdC2VlRns',
        '1.0A',
        null,
        'HMAC-SHA1'
      );
      const request = Meteor.wrapAsync(oauth.get, oauth);

      try {
        const response = request(
          `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${userName}`,
          '902153317215817728-9vfRVQjnGgw8a7mk2ms2dnKV7SrnuN0',
          '0UN4A9j78gIx5X5Y1BR2hyvwdQkTpQXgQK31l1t8cISJg'
        );
        return JSON.parse(response);
      } catch (e) {
        throw new Meteor.Error('Error occured');
      }
    }
  }
});
