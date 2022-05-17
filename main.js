status = "";
object_name = "";
objectDetector = "";

function setup(){
    canvas = createCanvas(380,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,300);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Model Loaded!";
    object_name = document.getElementById("input").value;
}

function modelLoaded(){
    console.log("Model Has Loaded Successfully!");
    status = true;
}

function draw(){
    image(video,0,0,380,300);
}