window.addEventListener('DOMContentLoaded', function () {

	'use strict';

	let tab = document.querySelectorAll('.info-header-tab'),
		info = document.querySelector('.info-header'),
		tabContent = document.querySelectorAll('.info-tabcontent');

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}

	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', function (event) {
		let target = event.target;
		if (target && target.classList.contains('info-header-tab')) {
			for (let i = 0; i < tabContent.length; i++) {
				if (target == tab[i]) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}
	});

	/* Создание таймера */

	let deadline = "2019-12-19";

	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60)));

		return {
			'total': t,
			'seconds': seconds,
			'minutes': minutes,
			'hours': hours
		};
	}

	function setClock(id, endtime) {
		let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds'),
			timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			let t = getTimeRemaining(endtime);

			function checkTime(elem) {
				if (elem < 10) {
					return '0' + elem;
				} else {
					return elem;
				}
			}

			hours.textContent = checkTime(t.hours);
			minutes.textContent = checkTime(t.minutes);
			seconds.textContent = checkTime(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
				hours.textContent = '00';
				minutes.textContent = '00';
				seconds.textContent = '00';
			}
		}

	}

	setClock('timer', deadline);

	/* Конец таймера */

	/* Modal */

	let more = document.querySelector('.more'),
		overlay = document.querySelector('.overlay'),
		close = document.querySelector('.popup-close'),
		descriptionBtn = document.querySelectorAll('.description-btn');

	more.addEventListener('click', function () {
		overlay.style.display = 'block';
		this.classList.add('more-splash');
		document.body.style.overflow = 'hidden';
	});

	close.addEventListener('click', function () {
		overlay.style.display = 'none';
		more.classList.remove('more-splash');
		document.body.style.overflow = '';
	});

	descriptionBtn.forEach(function (item) {
		item.addEventListener('click', function () {
			overlay.style.display = 'block';
			this.classList.add('more-splash');
			document.body.style.overflow = 'hidden';
		});
	});

	/* End Modal */

	/* Form */

	let message = {
		loading: "Загрузка...",
		success: "Спасибо! Скоро мы с вами свяжемся!",
		failure: "Что-то пошло не так"
	};

	let formModal = document.querySelector('.main-form'),
		formContact = document.querySelector('#form'),
		statusMessage = document.createElement('div');

	statusMessage.classList.add('status');

	sendForm(formModal);
	sendForm(formContact);

	//Скрипт отправки данных
	function sendForm(elem) {

		elem.addEventListener('submit', function(e){
			e.preventDefault();
			elem.appendChild(statusMessage);

			//создание формы в JSON формате
			let formData = new FormData(elem),
				obj = {};
			formData.forEach(function (value, key) {
				obj[key] = value;
			});
			let json = JSON.stringify(obj);

			// реализация запроса
			function postData(data){

				return new Promise(function (resolve, reject) {
					let request = new XMLHttpRequest();
		
					request.open('POST', 'server.php');
					/* request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); Формат PHP */
					request.setRequestHeader('Content-type', 'application/json; charset = utf-8'); // Формаm JSON
		
					request.onreadystatechange = function () {
						if (request.readyState < 4) {
							resolve();
						} else if (request.readyState === 4 && request.status == 200) {
							resolve();
						} else {
							reject();
						}
					};
		
					request.send(data);
				});
			}

			function clearInput() {
				for (let i = 0; i < elem.querySelectorAll('input').length; i++) {
					elem[i].value = '';
				}
			}

			postData(json)
				.then(() => statusMessage.innerHTML = message.loading)
				.then(() => statusMessage.innerHTML = message.success)
				.catch(() => statusMessage.innerHTML = message.failure)
				.then(() => setInterval(() => statusMessage.innerHTML = '', 7000))
				.then(clearInput());
		});
	}
	/* Конец Form */

	/* Slider */

	let slideIndex = 1,
		sliders = document.querySelectorAll('.slider-item'),
		prev = document.querySelector('.prev'),
		next = document.querySelector('.next'),
		dotWrap = document.querySelector('.slider-dots'),
		dots = document.querySelectorAll('.dot');

	showSlider(slideIndex);

	function showSlider(n){

		if (n < 1){
			slideIndex = sliders.length; 
		}
		if (n > sliders.length){
			slideIndex = 1;
		}

		sliders.forEach((item) => item.style.display = 'none');
		dots.forEach((item) => item.classList.remove('dot-active'));

		sliders[slideIndex-1].style.display = 'block';
		dots[slideIndex-1].classList.add('dot-active');
	}

	function plusSlider(n){
		showSlider(slideIndex += n);
	}

	function currentSlider(n){
		showSlider(slideIndex = n);
	} 

	prev.addEventListener('click', function(){
		plusSlider(-1);
	});
	next.addEventListener('click', function(){
		plusSlider(1);
	});

	dotWrap.addEventListener('click', function(event){
		for (let i = 0; i < dots.length + 1; i++){
			if (event.target.classList.contains('dot') && event.target == dots[i - 1]){
				currentSlider(i);
			}
		}
	});

	/* конец Slider */

	/* Calculator */
	let persons = document.querySelectorAll('.counter-block-input')[0],
		restDays = document.querySelectorAll('.counter-block-input')[1],
		place = document.getElementById('select'),
		totalValue = document.getElementById('total'),
		personsSum = 0,
		daysSum = 0,
		total = 0;

	totalValue.innerHTML = 0;

	persons.addEventListener('input', function(){

		personsSum = +this.value;
		total = (personsSum + daysSum) * 4000 * place.options[place.selectedIndex].value;

		if(this.value == "" || restDays.value == ""){
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total;
		}
	
	});

	restDays.addEventListener('input', function(){
		
		daysSum = +this.value;
		total = (personsSum + daysSum) * 4000 * place.options[place.selectedIndex].value;

		if(this.value == "" || persons.value == ""){
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total;
		}
	
	});

	place.addEventListener('change', function(){

		if(persons.value == "" || restDays == ""){
			totalValue.innerHTML = 0;
		} else {
			let a = total;
			totalValue.innerHTML = a * this.options[this.selectedIndex].value;
		}

	});

	/* конец Calculator */

	
});