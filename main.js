Webcam.set({
    height:300,
    width:300,
    img_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_img" src ='+ data_uri +'>';
    });
}
console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/OuUSS5tge/model.json',model_loaded);
function model_loaded(){
    console.log("model loaded");
}

function check(){
    img = document.getElementById("captured_img");
    classifier.classify(img,got_result);
}

function got_result(error,results){
    if(error){
        console.error(error);

    } else {
        console.log(results);
        document.getElementById("object_name").innerHTML = results[0].label;
        document.getElementById("object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}