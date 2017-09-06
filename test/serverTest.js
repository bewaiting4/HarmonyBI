//set a reference to the request module
var request = require('request'),
    //stubs
    postData = {},
    postConfig = {},
    postSuccessHandler = null;

//create an object to send as POST data
postData = {
    date_from: '2016-11-15 08:55:51',
    date_to: '2016-11-15 22:35:51',
    suspects: '[{\"number\":\"15199289734\",\"type\":1}]'
};

//the config for our HTTP POST request
postConfig = {
    url: 'http://localhost:3000/api/viz',
    form: postData
};

//the HTTP POST request success handler
postSuccessHandler = function (err, httpResponse, body) {
    //look for this message in your JS console:
    console.log('JSON response from the server: ' + body);
};

//make the POST request
request.post(postConfig, postSuccessHandler);
