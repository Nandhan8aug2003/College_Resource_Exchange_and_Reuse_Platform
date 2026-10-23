package com.backend.backend.controller;

import com.backend.backend.dto.UserRegistrationRequest;
import com.backend.backend.service.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String userReg(
            @RequestPart("user") UserRegistrationRequest userRegistrationRequest,
            @RequestPart("collegeIdCard") MultipartFile collegeIdCard) {

        userService.userReg(userRegistrationRequest, collegeIdCard);

        return "Registration submitted successfully. Awaiting admin approval.";
    }
}