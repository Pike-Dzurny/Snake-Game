// init canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Snake attribute vars
var starting_x = 60;
var starting_y = 60;
var snake_head = [starting_x, starting_y, "#ffffff"];
var snake_body = [];
var snake_speed = 30;
var snake_size = 20;
var snake_length = 3;
var snake_parts;

// Movement var
var snake_time_scale = 80; // default 80
var game_loop;

// Food vars
var food_x = 0;
var food_y = 0;
var score = 0;
var create_new_food = true;

// Sound vars
// var sound_game_over_beep = new Audio("gm_over.wav");
// var sound_food_eat_beep = new Audio("gm_eat.wav");

// Key vars
var up_pressed = false; // w = 87     up arrow = 38
var left_pressed = false; // a = 65    left arrow = 37 +
var down_pressed = false; // s = 83   down arrow = 40
var right_pressed = false; // d = 68  right arrow = 39+
var escape_pressed = true; // esc = 27

document.addEventListener("keydown",keyDownHandler,false);



// done defining vars


function keyDownHandler(e){
   if((e.keyCode==39 || e.keyCode==68) && left_pressed == false){ // right arrow / d

       right_pressed = true;
       up_pressed = false;
       down_pressed = false;
       left_pressed = false;
       escape_pressed = false;
   }
   else if((e.keyCode==37 || e.keyCode==65) && right_pressed == false){ // left arrow / a

       left_pressed = true;
       right_pressed = false;
       up_pressed = false;
       down_pressed = false;
       escape_pressed = false;
   }
   else if((e.keyCode==38 || e.keyCode==87) && up_pressed == false){ // down arrow / s

       down_pressed = true;
       left_pressed = false;
       right_pressed = false;
       up_pressed = false;
       escape_pressed = false;
   }
   else if((e.keyCode==40 || e.keyCode==83) && down_pressed == false) { // up arrow / w

       up_pressed = true;
       down_pressed = false;
       left_pressed = false;
       right_pressed = false;
       escape_pressed = false;
   }
   else if(e.keyCode==27){ // esc

           escape_pressed = true;
           up_pressed = false;
           down_pressed = false;
           left_pressed = false;
           right_pressed = false;
   }
   }

function game_over_notification(){
     clearInterval(game_loop);
     document.getElementById("score").innerHTML = "Score: " + String(score);
     document.getElementById("game_over").style.display = "inline";
 }

 function snake_at_food() {
     if((snake_head[0] == food_x)&&(snake_head[1] == food_y)){
         snake_length += 4;
	 score += 1;
         create_new_food = true;
     }
 }


 function snake_draw(){
     for(var i = snake_body.length - 1; i >= 0; i--) {
         ctx.beginPath();
         ctx.rect(snake_body[i][0], snake_body[i][1], snake_size, snake_size);
         ctx.fillStyle = "#ffffff";
         ctx.fill();
         ctx.closePath();
     }

     snake_at_food()
 }

 function valid_pos(cord){
     var x = cord[0];
     var y = cord[1];
     if(x > (ctx.canvas.width - snake_size) || x <= (0 - snake_size) || y > (ctx.canvas.height - snake_size) || y <= 0 - snake_size){
         return false;
     }
     return true;
 }
 function  snake_calculate_pos(){
     var x = snake_head[0];
     var y = snake_head[1];
     if(right_pressed){
         snake_head = [(x + snake_speed), y];
     } else if(left_pressed){
         snake_head = [(x - snake_speed), y];
     } else if(up_pressed){
         snake_head = [x, (y + snake_speed)];
     } else if(down_pressed){
         snake_head = [x, (y - snake_speed)];
     }
     snake_body.push(snake_head);
     while(snake_body.length > snake_length){
         snake_body.shift();
     }
 }
 function create_food(){
     food_x = Math.floor((Math.random() * (ctx.canvas.width - snake_size)) + 1);
     food_x = (Math.round(food_x / 30) * 30);
     food_y = Math.floor((Math.random() * (ctx.canvas.height - snake_size)) + 1);
     food_y = (Math.round(food_y / 30) * 30);
     if(snake_body.indexOf(food_x) == -1 || snake_body.indexOf(food_y) == -1){

	food_x = Math.floor((Math.random() * (ctx.canvas.width - snake_size)) + 1);
     	food_x = (Math.round(food_x / 30) * 30);

     	food_y = Math.floor((Math.random() * (ctx.canvas.height - snake_size)) + 1);
     	food_y = (Math.round(food_y / 30) * 30);
       } 


 }

 function food_draw(ate){
     if(ate == true){
         var foods_cords = create_food();
     }
     ctx.beginPath();
     ctx.rect(food_x, food_y, snake_size, snake_size);
     ctx.fillStyle = "#0065ff";
     ctx.fill();
     ctx.closePath();

 }
 function snake_head_touching_body(){
     for(var i = 0; i < snake_body.length; i++){
         var snake_square = snake_body[i];
         var snake_square_x = snake_square[0];
         var snake_square_y = snake_square[1];
         if ((snake_square_x == snake_head[0]) && (snake_square_y == snake_head[1]) && (snake_body.length != (i + 1))){
             game_over_notification()

             }
         }
     }



 function draw(){
     // This code is for resizing the window
     var ctx = canvas.getContext("2d");
     ctx.canvas.width  = (window.innerWidth);
     ctx.canvas.height = (window.innerHeight);
     // end block


     snake_draw();


     food_draw(create_new_food);
     snake_calculate_pos();
     if (create_new_food == true) {

         create_new_food = false;
     }

     if(escape_pressed == false) {
         snake_head_touching_body();
     }

     if (valid_pos(snake_head) == false) {
         game_over_notification();
     }

 }
 function restart(){
    starting_x = 60;
    starting_y = 60;
    snake_head = [starting_x, starting_y, "#ffffff"];
    snake_body = [];
    snake_speed = 30;
    snake_size = 20;
    snake_length = 3;
    escape_pressed = true;
    right_pressed = true;
    clearInterval(game_loop);
    document.getElementById("game_over").style.display = "none";
    game_loop = setInterval(draw, snake_time_scale);
    score = 0;
    food_x = Math.floor((Math.random() * (ctx.canvas.width - snake_size)) + 1);
    food_x = (Math.round(food_x / 30) * 30);
    food_y = Math.floor((Math.random() * (ctx.canvas.height - snake_size)) + 1);
    food_y = (Math.round(food_y / 30) * 30); 
}

 game_loop = setInterval(draw, snake_time_scale);
