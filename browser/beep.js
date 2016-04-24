var beep = (function () {
    var context = new AudioContext();
    var beepBuffer;
    {
        var request_1 = new XMLHttpRequest();
        request_1.open('GET', 'beep.wav', true);
        request_1.responseType = 'arraybuffer';
        request_1.onload = function () {
            context.decodeAudioData(request_1.response, function (buffer) { beepBuffer = buffer; }, function (err) { alert("The file beep.wav could not be downloaded or decoded.\nError: " + err); });
        };
        request_1.send();
    }
    return function () {
        try {
            var source = context.createBufferSource();
            source.buffer = beepBuffer;
            source.connect(context.destination);
            source.start(0);
        }
        catch (e) {
            console.log("beep: " + e);
        }
    };
})();
