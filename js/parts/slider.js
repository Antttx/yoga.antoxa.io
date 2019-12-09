function slider() {
     let slideIndex = 1,
          sliders = document.querySelectorAll('.slider-item'),
          prev = document.querySelector('.prev'),
          next = document.querySelector('.next'),
          dotWrap = document.querySelector('.slider-dots'),
          dots = document.querySelectorAll('.dot');

     showSlider(slideIndex);

     function showSlider(n) {

          if (n < 1) {
               slideIndex = sliders.length;
          }
          if (n > sliders.length) {
               slideIndex = 1;
          }

          sliders.forEach((item) => item.style.display = 'none');
          dots.forEach((item) => item.classList.remove('dot-active'));

          sliders[slideIndex - 1].style.display = 'block';
          dots[slideIndex - 1].classList.add('dot-active');
     }

     function plusSlider(n) {
          showSlider(slideIndex += n);
     }

     function currentSlider(n) {
          showSlider(slideIndex = n);
     }

     prev.addEventListener('click', function () {
          plusSlider(-1);
     });
     next.addEventListener('click', function () {
          plusSlider(1);
     });

     dotWrap.addEventListener('click', function (event) {
          for (let i = 0; i < dots.length + 1; i++) {
               if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                    currentSlider(i);
               }
          }
     });

}

module.exports = slider;