/*jslint node: true*/

'use strict';

var async = require('async');
var fs = require('fs');
var http = require('http');

async.waterfall([
	function(next) {
		fs.readFile(process.argv[2], function(err, data) {
			if (err) {
				throw next(err);
			}

			next(null, data.toString());
		});
	},
	function(url, next) {
		http.get(url, function(res) {
			var body = '';

			res.on('data', function (chunk) {
				body += chunk.toString();
			});

			res.on('end', function(){
				next(null, body);
			});
		}).on('error', function(err) {
			next(err);
		});
	}
], function(err, result) {
	if (err) {
		return console.log(err);
	}

	console.log(result);
});