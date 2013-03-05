/*---------------------
	:: TwitterAdapter 
	-> adapter
---------------------*/

// var request = require('request');
var Twit = require('twit');

module.exports = {

	connections: {},
	
	registerCollection: function (collection, cb) {
		this.connections[collection.identity] = {
			api: new Twit({
				consumer_key: collection.consumerKey,
				consumer_secret: collection.consumerSecret,
				access_token: collection.accessToken,
				access_token_secret: collection.accessTokenSecret
			})
		};
		cb();
	},

	find: function (collectionName, options, cb) {

		// for now, only use the "where" part of the criteria set
		var criteria = options.where || {};

		switch (collectionName) {
			case 'location'	: return this.trendingPlaces(collectionName, criteria, afterwards);
			case 'trend'	: return this.trends(collectionName, criteria, afterwards);
			case 'tweet'	: return this.searchTweets(collectionName, criteria, afterwards);
			default: return afterwards('Unknown usage of find() with model ('+collectionName+') ');
		}

		function afterwards (err, results) {
			if (err) return cb(err);
			if (options.limit) return cb(null, _.first(results,options.limit));
			
			return cb(err,results);
		}
	},

	searchTweets: function (collectionName, criteria, cb) {
		this.connections[collectionName].api.get('search/tweets', criteria, function (err, result) {
			if (err) return cb(err);
			if (!(result && result.statuses) ) return cb(result);
			cb(err, result.statuses);
		});
	},

	trends: function (collectionName, criteria, cb) {
		this.connections[collectionName].api.get('trends/place', {
			id: criteria.id || 1
		}, function (err, result) {
			if (err) return cb(err);
			if (!(result[0] && result[0].trends) ) return cb(result);
			cb(err, result[0].trends);
		});
	},

	trendingPlaces: function (collectionName, criteria, cb) {
		this.connections[collectionName].api.get('trends/closest', {
			lat: criteria.lat || 0,
			long: criteria.long || 0
		}, cb);
	}
};