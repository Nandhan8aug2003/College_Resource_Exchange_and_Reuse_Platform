package com.backend.backend.controller;

import com.backend.backend.dto.UserRegistrationRequest;
import com.backend.backend.entity.User;
import com.backend.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/register")
    public String userReg(@RequestBody UserRegistrationRequest userRegistrationRequest){
        userService.userReg(userRegistrationRequest);
        return "Registration submitted successfully. Awaiting admin approval.";
    }
}
