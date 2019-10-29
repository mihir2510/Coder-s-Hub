const request = require('request-promise');
var token1 = {"token":"b2ac688e-a8f2-476f-bf1b-7bfdbb3a2840"}
var token2 = {"token":"67c98fd4-09ac-4af6-832b-25aa1be6ee86"}
var token3 = {"token":"1f06d2a5-e809-4269-90c0-71b2353a6ddd"}

var arr = [token1, token2, token3]


const functionWithPromise = async item => { //a function that returns a promise
    return await request({
      method: 'GET',
      uri: `https://api.judge0.com/submissions/${item['token']}?base64_encoded=false`,
      json: true
    });
}

const getData = async (array) => {
  return await Promise.all(array.map(item => functionWithPromise(item)))
}

getData(arr).then(data => {
  console.log('async stuff',data);
});


var syncRequest = require('sync-request');
const requestmap = function(item) {
    let res = syncRequest('GET',
    `https://api.judge0.com/submissions/${item['token']}?base64_encoded=false`
    );
    return JSON.parse(res.getBody('utf8'));
}

var newarr = arr.map((item) => requestmap(item))
console.log('sync stuff',newarr);
