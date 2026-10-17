package com.backend.backend.controller;

import com.backend.backend.dto.LoginRequest;
import com.backend.backend.service.AuthService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;

    AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {

        String isLoginSuccess = authService.login(request);

        return isLoginSuccess;
    }
}

