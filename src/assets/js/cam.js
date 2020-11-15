var data, sec, index, video, player;

function cam(datas, secs, indexes) {
    data = datas;
    sec = secs;
    index = indexes;
    video = "video" + (sec + 1) + "_" + (index + 1);
    document.getElementById(video).style.display = "block";
    window.requestFileSystem =
        window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(
        window.TEMPORARY,
        1000 * 1024 * 1024,
        onInitFs,
        errorHandler
    );

}

function onInitFs(fs) {
    console.log(fs);
    var flag = false;
    let lat = localStorage.getItem('lat');
    let long = localStorage.getItem('long');
    var key = '';
    let upload_url = localStorage.getItem('Video_upload_url');
    $(document).keydown(function(e) {
        key = e.key;
    });
    var options = {
        controls: true,
        bigPlayButton: false,
        width: 560,
        height: 360,
        fluid: false,
        controlBar: {
            fullscreenToggle: false,
        },
        plugins: {
            record: {
                audio: true,
                video: true,
                maxLength: 600,
                debug: true
            }
        }
    };
    player = videojs(video, options, function() {
        var msg = 'Using video.js ' + videojs.VERSION +
            ' with videojs-record ' + videojs.getPluginVersion('record') +
            ' and recordrtc ' + RecordRTC.version;
        videojs.log(msg);
    });
    player.on('deviceError', function() {
        console.log('device error:', player.deviceErrorCode);
    });

    player.on('error', function(element, error) {
        console.error(error);
    });

    player.on('progressRecord', function() {

    })

    player.on('startRecord', function() {
        data.CandidateAssessmentData.PracticalAssessment.AssessmentEvents.push({
            DateTime: moment().format("DD-MMM-YYYY h:mm:ss a"),
            SubTypeId: 19,
            SectionId: parseInt(
                data.CandidateAssessmentData.PracticalAssessment.Sections[sec].SectionId
            ),
            SectionIndex: sec,
            QuestionId: parseInt(
                data.CandidateAssessmentData.PracticalAssessment.Sections[sec].Questions[
                    index
                ].QuestionId
            ),
            Description: 'Candidate has started capturing the video',
            QuestionIndex: index,
            ActualResponse: parseInt(
                data.CandidateAssessmentData.PracticalAssessment.Sections[sec].Questions[
                    index
                ].CandidateActualResponseOption
            ),
            KeyboardKey: key,
            Latitude: lat,
            Longitude: long,
        });
        console.log('started recording!');
    });

    player.on('finishRecord', function() {
        data.CandidateAssessmentData.PracticalAssessment.AssessmentEvents.push({
            DateTime: moment().format("DD-MMM-YYYY h:mm:ss a"),
            SubTypeId: 20,
            SectionId: parseInt(
                data.CandidateAssessmentData.PracticalAssessment.Sections[sec].SectionId
            ),
            SectionIndex: sec,
            QuestionId: parseInt(
                data.CandidateAssessmentData.PracticalAssessment.Sections[sec].Questions[
                    index
                ].QuestionId
            ),
            QuestionIndex: index,
            Description: 'Candidate has stopped capturing the video',
            ActualResponse: parseInt(
                data.CandidateAssessmentData.PracticalAssessment.Sections[sec].Questions[
                    index
                ].CandidateActualResponseOption
            ),
            KeyboardKey: key,
            Latitude: lat,
            Longitude: long,
        });
        player.recordedData.name = 'REG' + data.CandidateAssessmentData.RegistrationId + "_Q" + data.CandidateAssessmentData.PracticalAssessment
            .Sections[sec].Questions[index].QuestionId + "_PracVideo.mp4";
        data.CandidateAssessmentData.PracticalAssessment
            .Sections[sec].Questions[index].CandidateResponseVideoFileName = player.recordedData.name;
        var reader = new FileReader();
        var base64data;
        reader.readAsDataURL(player.recordedData);
        reader.onloadend = function() {
            base64data = reader.result;
            document.getElementById(video).setAttribute('src', reader.result);
            WriteFileToFileSystem(fs, player.recordedData.name, base64data);
        }
        var sections = 'sec' + (sec + 1) + '_' + (index + 1);
        document.getElementById(sections).className = 'btn btn-success px-3';
        data.CandidateAssessmentData.PracticalAssessment
            .Sections[sec].Questions[index].CandidateActualResponseOption = "1";
        localStorage.setItem("Response_data", JSON.stringify(data));
        $.event.trigger({
            type: "VideoRecordCompletedEvent",
            message: 'RECORDED'
        });
        player.record().stopStream();
    });
    localStorage.setItem("Response_data", JSON.stringify(data));

}

function WriteFileToFileSystem(varFs, fileName, fileContent) {
    varFs.root.getFile('/' + fileName, { create: true }, function(fileEntry) {

        // Create a FileWriter object for our FileEntry (log.txt).
        fileEntry.createWriter(function(fileWriter) {

            fileWriter.onwriteend = function(e) {
                console.log('Write completed.');
            };

            fileWriter.onerror = function(e) {
                console.log('Write failed: ' + e.toString());
            };

            var blob = new Blob([fileContent], { type: 'text/plain' })

            fileWriter.write(blob);

        }, errorHandler);

    }, errorHandler);
}

function errorHandler(err) {
    console.log(err);
}