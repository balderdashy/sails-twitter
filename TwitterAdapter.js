/*---------------------
	:: TwitterAdapter 
	-> adapter
---------------------*/

// var request = require('request');
var Twit = require('twit');

module.exports = {

	connections: {},
	
	registerConnection: function (connection, collections, cb) {
		this.connections[connection.identity] = {
			config: connection,
      collections: collections,
			client: new Twit({
				consumer_key: connection.consumerKey,
				consumer_secret: connection.consumerSecret,
				access_token: connection.accessToken,
				access_token_secret: connection.accessTokenSecret
			})
		};
		cb();
	},

	find: function (connectionName, collectionName, options, cb) {

		// for now, only use the "where" part of the criteria set
		var where = options.where || {};

		// TODO: be smarter
		

		switch (collectionName) {
			case 'location'	: return this.trendingPlaces(collectionName, where, afterwards);
			case 'trend'	: return this.trends(collectionName, where, afterwards);
			case 'tweet'	: return this.searchTweets(collectionName, where, afterwards);
			default: return afterwards('Unknown usage of find() with model ('+collectionName+') ');
		}

		function afterwards (err, results) {
			if (err) return cb(err);
			if (options.limit) return cb(null, _.first(results,options.limit));
			
			return cb(err,results);
		}
	},

	searchTweets: function (connectionName, collectionName, criteria, cb) {
		this.connections[collectionName].api.get('search/tweets', criteria, function (err, result) {
			if (err) return cb(err);
			if (!(result && result.statuses) ) return cb(result);
			cb(err, result.statuses);
		});
	},

	trends: function (connectionName, collectionName, criteria, cb) {
		this.connections[collectionName].api.get('trends/place', {
			id: criteria.id || 1
		}, function (err, result) {
			if (err) return cb(err);
			if (!(result[0] && result[0].trends) ) return cb(result);
			cb(err, result[0].trends);
		});
	},

	trendingPlaces: function (connectionName, collectionName, criteria, cb) {
		this.connections[collectionName].api.get('trends/closest', {
			lat: criteria.lat || 0,
			long: criteria.long || 0
		}, cb);
	}
};