status = "";
objects = [];

function setup(){
    canvas = createCanvas(380,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,300);
    video.hide();
}

function modelLoaded(){
    console.log("Model Has Loaded Successfully!");
    status = true;
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Model Loaded!";
    object_name = document.getElementById("input").value;
    console.log(object_name);
    
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video,0,0,380,300);
    if(status != ""){
        objectDetector.detect(video,gotResults);
        for(i = 0; i < objects.length; i++){
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height    );

            if(objects[i].label == object_name){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("object_status").innerHTML = "Object Found!";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "found");
                synth.speak(utterThis);
            } else {
                document.getElementById('object_status').innerHTML = "Object Not Found";
            }
        }
    }
}
