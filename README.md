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
  consumer_key: 'asdfasdgasgasgas',
  consumer_secret: '34234623yrhgewh',
  access_token: 'adsga4hahah',
  access_token_secret: '5hw45hfhs'
};
```

## About Sails.js and Waterline
http://SailsJs.com

Waterline is a new kind of storage and retrieval engine for Sails.js.  It provides a uniform API for accessing stuff from different kinds of databases, protocols, and 3rd party APIs.  That means you write the same code to get users, whether they live in mySQL, LDAP, MongoDB, or Facebook.
