video = "";
status = "";

function preload()
{
    video= createVideo("video.mp4");
    video.hide();
}

function setup()
{
    canvas = createCanvas(600, 350)
    canvas.center();
}

function start()
{
    od = ml5.objectDetector('cocossd',ModelLoaded);
    document.getElementById("status").innerHTML = "STATUS : OBJECT ARE BEING DETECTED!";
}

function ModelLoaded()
{
    console.log("MODEL IS LOADED!");
    status = true;
    video.volume(1);
    video.speed(2);
    video.loop(1);
}

function draw()
{
    image(video,0, 0, 600, 350);
    od.detect(video,gotResults);
    var a = 0;
    while(a < results.length)
    {
        document.getElementById("status").innerHTML = "STATUS : OBJECTS ARE SUCCESFULLY DETECTED";
        document.getElementById("numberofobj").innerHTML = "NUMBER OF OBJECTS DETECTED ARE "+results.length;
        
        fill("#ff0000");
        percent = floor(results[a].confidence);
        text(results[a].label+" "+percent+"%",results[a].x +20 ,results[a].y +20);
        rect(results[a].x,results[a].y,results[a].width,results[a].height);
        a++;
    }
}

function gotResults(error,results)
{
    if(error){
        console.error(error);
    } 
    console.log(results);
}