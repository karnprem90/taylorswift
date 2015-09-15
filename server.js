var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var path = require('path');

app.get('/scrape', function(req, res){
	// Let's scrape Anchorman 2
	url = 'http://taylorswift.com/events';
	var getscrapData;

request(url, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var parsedResults = [];
    $('tr').each(function(i, element){
      // Select the previous element
      var date = $(this).children('td.date').children('a').children('span').text().replace(/(\t\n|\n|\t)/gm,"");
      var tour = $(this).children('td.tour').children('a').children('span').text().replace(/(\t\n|\n|\t)/gm,"");
      var location = $(this).children('td.location').children('a').children('span').text().trim();
      var tickets = $(this).children('td.tickets').children('a').attr('href').trim();
      var metadata = {
      	date: date,
        tour:tour,
        location:location,
        tickets: tickets
      };
      // Push meta-data into parsedResults array
      parsedResults.push(metadata);
    });
   
    res.json(parsedResults);
  }
})
})
app.get('*', function(req, res) {
  console.log(req.url);
    res.sendFile(path.join(__dirname + '/public'+req.url));
});
app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app; 	