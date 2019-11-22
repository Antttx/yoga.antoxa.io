class Options{
     constructor(height, width, bg, fontSize, textAlign){
          this.height = height;
          this.width = width;
          this.bg = bg;
          this.fontSize = fontSize;
          this.textAlign = textAlign;
     }
     createDiv(){
          let example = document.querySelector('.example'),
               div = document.createElement('div');
          div.classList.add('item');
          div.textContent = `Это новый div c высотой ${this.height} px, шириной ${this.width} px, задний фон ${this.bg}, размером текста ${this.fontSize} и центорвка текста ${this.textAlign}`;
          div.style.height = this.height + 'px';
          div.style.width = this.width + 'px';
          div.style.backgroundColor = this.bg;
          div.style.fontSize = this.fontSize + 'px';
          div.style.textAlign = this.textAlign;

          example.appendChild(div);
     }
}

let obj = new Options(400,350,'#cf6a87',15,'center');

obj.createDiv();