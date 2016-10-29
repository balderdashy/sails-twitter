> ### Deprecated
> For exaplanation, see https://github.com/treelinehq/waterline-query-docs/issues/2.
>
> If you're interested in implementing Twitter authentication, or enabling other Twitter features, see http://node-machine.org/machinepack-twitter.  If you'd like to contribute, see https://github.com/irlnathan/machinepack-twitter/tree/master/machines.



![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png) 

# TwitterAdapter

This adapter provides access to the Twitter API via the Sails.js ORM.

To use, include in your "api/adapters" directory.

## Example

Here's some example usage:

```javascript
// api/models/Tweet.js
module.exports = {
  adapter: 'twitter',
};

// config/adapters.js, add:
twitter: {
    module: 'sails-twitter',
    consumerKey: 'nT9b8a1XJO0pqLjQ',
    consumerSecret: '7IeoQELu4isOkYKYvbV5rAbAHHU4GpIV2o8asiI',
    accessToken: '631994755-FKBfx8TusaXklpUmMXhtqp5PYJjcwVWQGaBBO',
    accessTokenSecret: 'OOz4leiljjaAUIOwlS8uipe62qZL9ThZ796MA9GbDF'
}
```

## About Sails.js and Waterline
http://SailsJs.com

Waterline is a new kind of storage and retrieval engine for Sails.js.  It provides a uniform API for accessing stuff from different kinds of databases, protocols, and 3rd party APIs.  That means you write the same code to get users, whether they live in mySQL, LDAP, MongoDB, or Facebook.
