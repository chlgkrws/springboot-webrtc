function setupDataChannel() {
    dataChannel.onerror = function (error) {
        console.log("Error:", error);
    };

    dataChannel.onclose = function () {
        console.log("Data channel is closed");
    };

    dataChannel.onopen = function () {
        console.log("데이터 채널이 열렸습니다.");
    };

    dataChannel.onmessage = function (event) {
        const receivedMessage = event.data;
        console.log("메시지 수신:", receivedMessage);
        const receivedMessagesDiv = document.getElementById("receivedMessages");
        receivedMessagesDiv.innerHTML += `<p>${receivedMessage}</p>`;
    };

    document.getElementById("sendButton").onclick = function () {
        console.log(dataChannel.readyState);
        const messageInput = document.getElementById("messageInput");
        const message = messageInput.value;
        if (dataChannel.readyState === "open") {
            dataChannel.send(message);
            console.log("전송된 메시지:", message);
            messageInput.value = ""; // 입력 필드 비우기
        } else {
            console.error("데이터 채널이 열려 있지 않아 메시지를 전송할 수 없습니다.");
        }
    };
}
