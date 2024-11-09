# WebRTC Video Chat Application

Peer-to-Peer 화상 통화와 실시간 채팅이 가능한 WebRTC 기반 Sample 애플리케이션입니다.

### Server Configuration
- STUN Server: Google에서 제공하는 Public STUN 서버를 사용합니다
- TURN Server: [coturn](https://github.com/coturn/coturn)을 사용하여 별도 구축이 필요합니다

## Features

- Real-time P2P Video Call
- Text Chat
- WebSocket Signaling Server
- STUN/TURN Server Support

## Requirements

- Java 21
- Kotlin 1.9.25
- Spring Boot 3.3.5 (with webflux)
- Modern Web Browser (WebRTC 지원)

## Configuration

`common.js` 아래 설정값 입력:

```javascript
const signalingServer = "{signaling server or 127.0.0.1:8080}";
const signalingServerUrl = `ws://${signalingServer}/socket`;
const configuration = {
    iceServers: [
        {urls: "stun:stun.l.google.com:19302"},
        {
            urls: "turn:{turn server url}",
            username: "{user}",
            credential: "{password}"
        }
    ]
};
```
- {signaling server or 127.0.0.1:8080} - 시그널링 서버 주소 (기본값: localhost:8080)
- {turn server url} - TURN 서버 URL 
- {user} - TURN 서버 사용자 이름 
- {password} - TURN 서버 비밀번호

## Architecture

### Backend

1. **WebSocket Signaling Server**
   - Peer Connection Management
   - WebSocket Session Handler
   - Signaling Message Relay

2. **Spring Boot Application**
   - Static Content Server
   - WebSocket Handler
   - Session State Management

### Html/JavaScript

1. **Connection Manager**
   - WebSocket Setup
   - RTCPeerConnection Config
   - ICE Candidate Handler

2. **Media Handler**
   - Video Stream Controller
   - Data Channel Setup
   - Media Track Manager

## Setup & Run

1. Repository Clone
2. STUN/TURN 설정 (`common.js`)
3. Application 실행:
```bash
./gradlew bootRun
```

4. `http://localhost:8080/view.html` 접속

## Flow

1. WebSocket Connection
2. Signaling Process
3. WebRTC Peer Connection
4. Media Stream & Data Channel
5. P2P Communication
