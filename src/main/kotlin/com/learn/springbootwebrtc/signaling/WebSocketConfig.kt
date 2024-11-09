package com.learn.springbootwebrtc.signaling

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.HandlerMapping
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter

@Configuration
class WebSocketConfig {
    @Bean
    fun handlerMapping(socketHandler: SocketHandler): HandlerMapping {
        val map = mapOf("/socket" to socketHandler)
        val order = -1

        return SimpleUrlHandlerMapping(map, order)
    }

    @Bean
    fun handlerAdapter() = WebSocketHandlerAdapter()
}
