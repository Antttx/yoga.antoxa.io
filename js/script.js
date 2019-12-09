require('es6-promise').polyfill();
require('formdata-polyfill');
require('nodelist-foreach-polyfill');


window.addEventListener('DOMContentLoaded', function () {

	'use strict';

	let tabs = require('./parts/tabs'),
		timer = require('./parts/timer'),
		modal = require('./parts/modal'),
		form = require('./parts/form'),
		slider = require('./parts/slider'),
		calc = require('./parts/calc');

	tabs();
	timer();
	modal();
	form();
	slider();
	calc();

});