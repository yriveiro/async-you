/*jslint node: true*/

'use strict';

var async = require('async');
var http = require('http');

var url = process.argv[2];

async.reduce(['one', 'two', 'three'], 0, function(memo, item, done) {
		http.get(url + '?number=' + item, function(res) {
			var body = '';

			res.on('data', function (chunk) {
				body += chunk.toString();
			});

			res.on('end', function(){
				memo += Number(body);

				done(null, memo);
			});
		}).on('error', function(err) {
			done(err);
		});
	}, function(err, result) {
	if (err) {
		return console.log(err);
	}

	console.log(result);
});