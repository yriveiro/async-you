/*jslint node: true*/

'use strict';

var async = require('async');
var http = require('http');
var url = process.argv[2];
var word = '';
var count = 1;

var get = function(done) {
	http.get(url, function(res) {
		var body = '';

		res.on('data', function (chunk) {
			body += chunk.toString();
			count++;
		});

		res.on('end', function(){
			word = body;
			done(null);
		});
	}).on('error', function(err) {
		if (err) {
			console.log(err);
		}
	});
};

async.whilst(
	function () {
		return word != 'meerkat';
	},
	function (done) {
		get(done);
	},
	function (err) {
		if (err) {
			console.log(err);
		}

		console.log(count);
	}
);