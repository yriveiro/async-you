/*jslint node: true*/

'use strict';

var async = require('async');
var http = require('http');
var hostname = process.argv[2];
var port = process.argv[3];
var url = 'http://' +  hostname + ':' + port;

async.series([
	function(done) {
		async.times(5, function(iteration, next) {
			var options = {
				hostname: hostname,
				port: port,
				path: '/users/create',
				method: 'POST'
			};

			var req = http.request(options, function(res) {
				res.setEncoding('utf8');
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

			req.write(JSON.stringify({user_id : iteration + 1}));
			req.end();
		},
		function(err, results) {
			if (err) {
				return console.log(err);
			}

			done(null, 'saved');
		});
	},
	function(done) {
		http.get(url, function(res) {
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
	}],
	function(err, results) {
		if (err) {
			return console.log(err);
		}

		console.log(results);
	}
);