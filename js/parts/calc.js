function calc() {
     let persons = document.querySelectorAll('.counter-block-input')[0],
          restDays = document.querySelectorAll('.counter-block-input')[1],
          place = document.getElementById('select'),
          totalValue = document.getElementById('total'),
          personsSum = 0,
          daysSum = 0,
          total = 0;

     totalValue.innerHTML = 0;

     persons.addEventListener('input', function () {
          personsSum = +this.value;
          total = (personsSum + daysSum) * 4000 * place.options[place.selectedIndex].value;

          if (this.value == "" || restDays.value == "") {
               totalValue.innerHTML = 0;
          } else {
               totalValue.innerHTML = total;
          }
     });

     restDays.addEventListener('input', function () {
          daysSum = +this.value;
          total = (personsSum + daysSum) * 4000 * place.options[place.selectedIndex].value;

          if (this.value == "" || persons.value == "") {
               totalValue.innerHTML = 0;
          } else {
               totalValue.innerHTML = total;
          }
     });

     place.addEventListener('change', function () {
          if (persons.value == "" || restDays == "") {
               totalValue.innerHTML = 0;
          } else {
               let a = total;
               totalValue.innerHTML = a * this.options[this.selectedIndex].value;
          }
     });
}

module.exports = calc;