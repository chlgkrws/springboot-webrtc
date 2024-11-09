package com.learn.springbootwebrtc.signaling

import org.springframework.stereotype.Component
import org.springframework.web.reactive.socket.WebSocketHandler
import org.springframework.web.reactive.socket.WebSocketSession
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Component
class SocketHandler : WebSocketHandler {
    var sessions: MutableMap<String, WebSocketSession> = mutableMapOf()

    override fun handle(session: WebSocketSession): Mono<Void> {
        val id = session.id

        return session
            .receive()
            .doOnSubscribe {
                sessions.putIfAbsent(id, session)
            }.flatMap { message ->
                Flux
                    .fromIterable(sessions.values)
                    .filter { it.isOpen && it.id != id }
                    .flatMap { socketSession ->
                        socketSession.send(
                            Mono.just(session.textMessage(message.payloadAsText)),
                        )
                    }.then()
            }.doOnTerminate {
                sessions.remove(id)
            }.then()
    }
}
