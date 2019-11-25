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
			seconds = Math.floor((t/1000) % 60),
			minutes = Math.floor((t/1000/60) % 60),
			hours = Math.floor((t/(1000*60*60)));

		return {
			'total' : t,
			'seconds' : seconds,
			'minutes' : minutes,
			'hours' : hours
		};
	}

	function setClock(id, endtime){
		let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds'),
			timeInterval = setInterval(updateClock, 1000);

		function updateClock(){
			let t = getTimeRemaining(endtime);

			function checkTime(elem){
				if(elem < 10){
					return '0' + elem; 
				} else {
					return elem;
				}
			}

			hours.textContent = checkTime(t.hours);
			minutes.textContent = checkTime(t.minutes);
			seconds.textContent = checkTime(t.seconds);

			if(t.total <= 0){
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

	more.addEventListener('click', function(){
		overlay.style.display = 'block';
		this.classList.add('more-splash');
		document.body.style.overflow = 'hidden';
	});

	close.addEventListener('click', function(){
		overlay.style.display = 'none';
		more.classList.remove('more-splash');
		document.body.style.overflow = '';
	});

	descriptionBtn.forEach(function(item){
		item.addEventListener('click', function(){
			overlay.style.display = 'block';
			this.classList.add('more-splash');
			document.body.style.overflow = 'hidden';
		});
	});

	/* End Modal */

	/* Form */

	// Modal Form
	let message = {
		loading : "Загрузка...",
		success : "Спасибо! Скоро мы с вами свяжемся!",
		failure : "Что-то пошло не так"
	};

	let formModal = document.querySelector('.main-form'),
		modalInput = formModal.querySelectorAll('input'),
		statusMessage = document.createElement('div');

	statusMessage.classList.add('status');

	formModal.addEventListener('submit', function(){
		event.preventDefault();

		formSend(formModal, statusMessage);

		for (let i = 0; i < modalInput.length; i++){
			modalInput[i].value = '';
		}

		let close = document.querySelector('.popup-close');
		close.addEventListener('click', function(){
			formModal.removeChild(statusMessage);
		});
	});

	//Контактная форма

	let formContact = document.querySelector('#form'),
		contactInput = formContact.querySelectorAll('input');

	formContact.addEventListener('submit', function(){
		event.preventDefault();

		formSend(formContact, statusMessage);

		for (let i = 0; i < contactInput.length; i++){
			contactInput[i].value = '';
		}
	});

	//Скрипт отправки данных
	function formSend(f, statusM){

		f.appendChild(statusM);

		let request = new XMLHttpRequest();
		request.open('POST', 'server.php');
		/* request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); Формат PHP */
		request.setRequestHeader('Content-type', 'application/json; charset = utf-8'); // Формаm JSON

		let formData = new FormData(f);
		/* request.send(formData);  Формат PHP */

		// для JSON формата
		let obj = {};
		formData.forEach(function(value, key){
			obj[key] = value;
		});
		let json = JSON.stringify(obj);

		request.send(json);

		request.addEventListener('readystatechange', function(){
			if(request.readyState < 4){
				statusM.innerHTML = message.loading;
			} else if(request.readyState === 4 && request.status == 200){
				statusM.innerHTML = message.success;
			} else {
				statusM.innerHTML = message.failure;
			}
		});
	}

	/* Конец Form */

	

});