let conn;
let peerConnection;
let dataChannel;
const signalingServer = "{signaling server or 127.0.0.1:8080}";
const signalingServerUrl = `ws://${signalingServer}/socket`;
const configuration = {
    iceServers: [
        {urls: "stun:stun.l.google.com:19302"}, // google stun 서버
        {
            urls: "turn:{turn server url}",
            username: "{user}",
            credential: "{password}"
        }
    ]
};

function send(message) {
    conn.send(JSON.stringify(message));
}

async function initializeConnection() {
    conn = new WebSocket(signalingServerUrl);
    peerConnection = new RTCPeerConnection(configuration);

    peerConnection.ontrack = function (event) {
        document.getElementById('remoteVideo').srcObject = event.streams[0];
    };

    conn.onmessage = handleSignalingMessage;

    conn.onopen = async function () {
        await initializeMediaStream(); // 미디어 스트림 초기화 후 데이터 채널 설정
        initializeAsInitiator(); // 데이터 채널 생성
    };
}

async function initializeMediaStream() {
    try {
        const localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        document.getElementById('localVideo').srcObject = localStream;
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
    } catch (error) {
        console.error("미디어 스트림을 가져오는 데 실패했습니다:", error);
    }
}

function handleSignalingMessage(e) {
    const message = JSON.parse(e.data);
    console.log(message);

    if (message.event === "candidate") {
        handleIceCandidate(message);
    } else if (message.event === "offer") {
        initializeAsReceiver();
        handleOffer(message);
    } else if (message.event === "answer") {
        setupDataChannel();
        handleAnswer(message);
    }
}

function handleIceCandidate(message) {
    const candidate = new RTCIceCandidate(message.data);
    peerConnection.addIceCandidate(candidate)
        .then(() => {
            console.log("ICE 후보가 추가되었습니다:", candidate);
        })
        .catch(error => {
            console.error("ICE 후보 추가 오류:", error);
        });
}
