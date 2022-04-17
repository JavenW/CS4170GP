// audio recorder
let recorder, audio_stream;

function startRecording( recordButton,stopButton,preview) {
    // button settings
    recordButton.disabled = true;
    recordButton.innerText = "Recording..."
    $("#recordButton").addClass("button-animate");

    $("#stopButton").removeClass("inactive");
    stopButton.disabled = false;


    if (!$("#audio-playback").hasClass("hidden")) {
        $(this).addClass("hidden")
    }




    navigator.mediaDevices.getUserMedia({audio: true})
        .then(function (stream) {
            audio_stream = stream;
            recorder = new MediaRecorder(stream);

            // when there is data, compile into object for preview src
            recorder.ondataavailable = function (e) {
                const url = URL.createObjectURL(e.data);
                preview.src = url;

                // set link href as blob url, replaced instantly if re-recorded

            };
            recorder.start();

            let timeout_status = setTimeout(function () {
                console.log("5 min timeout");
                stopRecording();
            }, 300000);
        });
}

function stopRecording( recordButton,stopButton) {
    recorder.stop();
    audio_stream.getAudioTracks()[0].stop();

    // buttons reset
    recordButton.disabled = false;
    recordButton.innerText = "Redo Recording"
    $("#recordButton").removeClass("button-animate");

    $("#stopButton").addClass("inactive");
    stopButton.disabled = true;

    $("#audio-playback").removeClass("hidden");

    $("#downloadContainer").removeClass("hidden");
}


$(document).ready(function () {

    const recordButton = document.getElementById("recordButton");
    const stopButton = document.getElementById("stopButton");
    const preview = document.getElementById("audio-playback");


    $(recordButton).click(function () {
        startRecording(recordButton,stopButton,preview);
    });
    $(stopButton).click(function () {
        stopRecording(recordButton,stopButton);
    });
    stopButton.disabled=true

});