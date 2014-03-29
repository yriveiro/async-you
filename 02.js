/*jslint node: true*/

'use strict';

var async = require('async');
var http = require('http');

var url1 = process.argv[2];
var url2 = process.argv[3];

async.series({
	requestOne: function(done) {
		http.get(url1, function(res) {
			var body = '';

			res.on('data', function (chunk) {
				body += chunk.toString();
			});

			res.on('end', function(){
				done(null, body);
			});
		}).on('error', function(err) {
			done(err);
		});
	},
	'requestTwo': function(done) {
		http.get(url2, function(res) {
			var body = '';

			res.on('data', function (chunk) {
				body += chunk.toString();
			});

			res.on('end', function(){
				done(null, body);
			});
		}).on('error', function(err) {
			done(err);
		});
	}
}, function(err, results) {
	if (err) {
		return console.log(err);
	}

	console.log(results);
});