"use strict";

function cam() {
  var constraintObj = {
    audio: true,
    video: {
      facingMode: "user",
      width: {
        min: 640,
        ideal: 1280,
        max: 1920
      },
      height: {
        min: 480,
        ideal: 720,
        max: 1080
      }
    }
  };
  navigator.mediaDevices.getUserMedia(constraintObj).then(function (mediaStreamObj) {
    //connect the media stream to the first video element
    var video = document.querySelector('video');

    if ("srcObject" in video) {
      video.srcObject = mediaStreamObj;
    } else {
      //old version
      video.src = window.URL.createObjectURL(mediaStreamObj);
    }

    video.onloadedmetadata = function (ev) {
      //show in the video element what is being captured by the webcam
      video.play();
    }; //add listeners for saving video/audio


    var start = document.getElementById('btnStart');
    var stop = document.getElementById('btnStop');
    var vidSave = document.getElementById('vid2');
    var mediaRecorder = new MediaRecorder(mediaStreamObj);
    var chunks = [];
    start.addEventListener('click', function (ev) {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
    });
    stop.addEventListener('click', function (ev) {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
    });

    mediaRecorder.ondataavailable = function (ev) {
      chunks.push(ev.data);
    };

    mediaRecorder.onstop = function (ev) {
      var blob = new Blob(chunks, {
        'type': 'video/mp4;'
      });
      chunks = [];
      var videoURL = window.URL.createObjectURL(blob);
      vidSave.src = videoURL;
    };
  })["catch"](function (err) {
    console.log(err.name, err.message);
  });
}