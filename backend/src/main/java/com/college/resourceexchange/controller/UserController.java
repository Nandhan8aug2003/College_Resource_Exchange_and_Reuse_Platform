package com.college.resourceexchange.controller;

import com.college.resourceexchange.dto.LoginRequest;
import com.college.resourceexchange.dto.LoginResponse;
import com.college.resourceexchange.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService;

    UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/api/login")
    public ResponseEntity<LoginResponse> userLoginRequest(@RequestBody LoginRequest loginRequest){
        LoginResponse loginResponse = userService.userLoginRequest(loginRequest);
        return ResponseEntity.ok(loginResponse);
    }

}
