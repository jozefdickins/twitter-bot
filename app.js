var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

//set up search parameters
var params = {
  q: '#nodejs';
  count: 10,
  result_type: 'recent',
  lang: 'en'
}

//Initiate your search using the above parameters
T.get('search/tweets', params, function(err, data, response) {
  //return error
  if(err) {
    return err;
  }

  for(let i = 0; i < data.statuses.length; i++) {
    let id = {id: data.statuses[i].id_str }
    T.post('favorites/create', id, function(err, res) {
      if (err) {
        console.log(err);
      }

      else {
        let username = res.user.screen_name;
        let tweetId = res.id_str;
        console.log('Favorited: ',
      `https://twitter.com/${username}/status/${tweetId}`);
      }
    });
  }



});
