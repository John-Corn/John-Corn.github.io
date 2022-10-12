//First, we declare the canvas object here and make it a variable. Then we give it a width and height value of 1280x720px
const canvas = document.getElementById("canvas");
canvas.width = 1280;
canvas.height = 720;

//Then we declare the download button and make it a variable.
const btnDownload = document.querySelector("#btnDownload");

//Now we make some variable for the starting background color.
//Make variable context and equal it to canvas 2d
//Fill context with the starting background color
//And make context fill something inside the background depending on where the cursor is placed on the canvas.
let start_background_color ="white";
let context = canvas.getContext("2d");
context.fillStyle = start_background_color;
context.fillRect(0, 0, canvas.width, canvas.height);

//Now we let the default drawing color be black. The brush size is 2 pixels and the ability to draw is false.
let draw_color = "black";
let draw_width = "2";
let is_drawing = false;

//Now we make an empty array and index with value -1
//These variables are essential to saving drawing strokes to the array and when wanting to undo the steps the index always removes one stroke from the array.
let restore_array = [];
let index = -1;

//Now the HTML elements for the 4 primary colors had a function called change_color(this) so now we declare that
//function and when the users click on the 4 colors their default black draw_color changes to the change_color of the element.
function change_color(element){
    draw_color = element.style.background;
}

//We addEventListeners to the canvas object now and put the start, draw and stop functions inside it.
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);


//We addEventListener click function to btnDownload button object that has been declared on HTML
btnDownload.addEventListener("click", function() {
    //IE/Edge Support (PNG Only)
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(), "canvas-image.png");
    } /*Every Other Browser*/ else {
        const a = document.createElement("a");
        //variable a declare to document createElement “a”
        //document.body append to child (a)
        //give a url to canvas
        //a download to give name to file “canvas-image.png”
        //a.click()
        //document.body remove child a
        document.body.appendChild(a);
        a.href = canvas.toDataURL();
        a.download = "canvas-image.png";
        a.click();
        document.body.removeChild(a);
    }
})

//Is_drawing is now true
//context begins path();
//context moves in the canvas in x and y space where the cursor is at that moment
//Then we prevent the default
function start(event){
    is_drawing = true;
    context.beginPath();
    context.moveTo(event.offsetX,
                    event.offsetY);
    event.preventDefault();
}

//if  is_drawing is true then the drawing will begin
//context lineto the x and y position where ever the cursor moves.
//context strokestyle equals the color
//context linewidth equals the width
//context linecap and linejoin equal round so the brush is a sphere and not a rectangle
//context stroke();
//If is_drawing is false then prevent default
function draw(event) {
    if(is_drawing){
        context.lineTo(event.offsetX,
                        event.offsetY);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    }
    event.preventDefault();
}

//if is drawing is true
//and context closepath();
//drawing is false
//prevent default
//if mouseout of canvas restore_array adds one index up on each done line stroke to the canvas, undo is possible.
function stop(event){
    if(is_drawing){
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
    event.preventDefault();

    if(event.type != 'mouseout'){
        restore_array.push(context.getImageData(0,0, canvas.width, canvas.height));
        index += 1;
    }
}

//Clear canvas function
//context fill the the canvas with default starting background color
//context clear rect to default and fill rect to default
//Restore whole array to empty and reset index back to -1
function clear_canvas(){
    context.fillStyle = start_background_color;
    context.clearRect(0,0, canvas.width, canvas.height)
    context.fillRect(0,0, canvas.width, canvas.height)

    restore_array = [];
    index = -1;
}

//Undo last function
//if index valua is below zero then just call clear canvas function
//else remove -= 1 index from index and pop one out of restore array object
//context visually remove the line from canvas
function undo_last(){
    if(index <= 0) {
        clear_canvas();
    }else{
        index -= 1;
        restore_array.pop();
        context.putImageData(restore_array[index], 0, 0);
    }
}



