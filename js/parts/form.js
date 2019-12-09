function form(){
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
}

module.exports = form;