var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start()
{
    document.getElementById("textbox").innerHTML = "";
    recognition.start()
}

recognition.onresult = function(event)

{
    console.log(event);
    var Content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = Content;
    console.log(Content);
    if (Content == "take my selfie")
    {
        console.log("Taking Selfie...");
        speak();
    }
}

function speak() {
    var synth = window.speechSynthesis;
    var camera = document.getElementById("camera");
    
    speak_data = "...Taking Your Selfie in 5 Seconds...";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    utterThis.onend = function() {
      Webcam.attach(camera);
      setTimeout(function() {
        take_snapshot();
        save();
        speak_data = "...Taking Another Selfie in 10 Seconds...";
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
        utterThis.onend = function() {
          setTimeout(function() {
            take_snapshot();
            save();
            speak_data = "...Taking One More Selfie in 15 Seconds...";
            var utterThis = new SpeechSynthesisUtterance(speak_data);
            synth.speak(utterThis);
            utterThis.onend = function() {
              setTimeout(function() {
                take_snapshot();
                save();
              }, 15000);
            };
          }, 10000);
        };
      }, 5000);
    };
  }
  

camera = document.getElementById("camera");
Webcam.set({
    width: 360,
    height: 270,
    image_format: 'png',
    png_quality: 90
}); 

var selfieCounter = 1; // Keep track of the current selfie number

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("selfie_image_" + selfieCounter).src = data_uri; // Set the source of the image element with a unique id
    });
}

function save()
{
    link = document.getElementById("link");
    image = document.getElementById("selfie_image_" + selfieCounter).src;
    link.href = image;
    link.click();
    selfieCounter++; // Increment the selfie counter
}
