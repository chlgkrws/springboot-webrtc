function initializeAsReceiver() {
    peerConnection.ondatachannel = function (event) {
        console.log("ondatachannel");
        dataChannel = event.channel;
        setupDataChannel();
    };
}

function handleOffer(message) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(message.data));
    peerConnection.createAnswer(function (answer) {
        peerConnection.setLocalDescription(answer);
        send({
            event: "answer",
            data: answer
        });
    }, function (error) {
        console.error("오퍼 처리 오류:", error);
    });
}
