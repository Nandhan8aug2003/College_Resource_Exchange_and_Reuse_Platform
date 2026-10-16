package com.backend.backend.controller;

import com.backend.backend.dto.LoginRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return "Request received for USN: " + request.getUsn();
    }
}

