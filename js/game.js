var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeLeft = new Image();
var pipeRight = new Image();
var bu = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeLeft.src = "img/pipeLeft.png";
pipeRight.src = "img/pipeRight.png";
bu.src = "img/bu.png";

// Звуки-пуки
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 225;

// Кнопка фор птичка
document.addEventListener("keydown", moveRect);


function moveUp() {
  yPos -= 25;
  fly.play();
}


function moveRect(e){

    switch(e.keyCode){

        case 37:  // если нажата клавиша влево
            if (xPos < 25) {
              xPos = 0;
            } else {
              xPos -= 25;
            }

            fly.play();
            break;
        case 38:   // если нажата клавиша вверх
            if (yPos < 25) {
              yPos = 0;
            } else {
              yPos -= 25;
            }

            fly.play();
            break;
        case 39:   // если нажата клавиша вправо
            if (xPos > 450) {
              xPos = 480;
            } else {
              xPos += 25;
            }
           fly.play();
            break;
        case 40:   // если нажата клавиша вниз
            if (yPos > 900) {
              yPos = 910;
            } else {
              yPos +=25
              }

            fly.play();
            break;
    }
}


//BLOKU
var pipe = [];

pipe[0] = {
  x : 0,
  y : 0
}

//var bug = [];

//bug[0] = {
//  x : 0,
//  y : 0
//}

var score = 0;

// Попа птички
var xPos = 240;
var yPos = 850;
//var grav = 1.5;


function draw() {
  ctx.drawImage(bg, 0, 0);

  //for(var i = 0; i < pipe.length; i++)

  var i = 0;
  while (i < pipe.length)
  {
    ctx.drawImage(pipeLeft, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeRight, pipe[i].x + pipeLeft.width + gap, pipe[i].y);

    //ctx.drawImage(bu, bug[i].x, bug[i].y);

    pipe[i].y++;

    //bug[i].y++;

    if(pipe[i].y == 450) {
      pipe.push({
        x : Math.floor(Math.random() * pipeLeft.width) - pipeLeft.width,
        y : 0,
      });
    }

    //if(bug[i].y ==450){
      //bug.push({
    //    x : xPos,
  //      y : yPos,
//
    //  });
  //  }

   if(yPos <= pipe[i].y + pipeLeft.height
      && yPos + bird.height >= pipe[i].y
      && !(xPos > pipe[i].x + pipeLeft.width
      && xPos + bird.width < pipe[i].x + pipeLeft.width + gap)) {
          location.reload(); // Пере
    }

  //  if(xPos + bird.width >= pipe[i].x
    //  && xPos <= pipe[i].x  + pipeUp.width
      //&& (yPos <= pipe[i].y + pipeUp.height
        //|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height  ) {
          //location.reload(); // Перезагрузка страницы
      //}

   if(pipe[i].x == 5) {
      score++;
      score_audio.play();
    }
    i += 1;
  }

  //ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);

  //yPos += grav;

//  ctx.fillStyle = "#008000";
//  ctx.font = "50px Verdana";
//  ctx.fillText("Счёт: " + score, 10, 470);

  requestAnimationFrame(draw);

}
pipeLeft.onload = draw;
