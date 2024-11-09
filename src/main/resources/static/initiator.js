function initializeAsInitiator() {
    dataChannel = peerConnection.createDataChannel("dataChannel", {reliable: true});

    peerConnection.createOffer()
        .then(offer => {
            send({
                event: "offer",
                data: offer
            });
            return peerConnection.setLocalDescription(offer);
        })
        .catch(error => {
            console.error("오퍼 생성 오류:", error);
        });

    peerConnection.onicecandidate = function (event) {
        if (event.candidate) {
            send({
                event: "candidate",
                data: event.candidate
            });
        }
    };
}

function handleAnswer(message) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(message.data));
}
