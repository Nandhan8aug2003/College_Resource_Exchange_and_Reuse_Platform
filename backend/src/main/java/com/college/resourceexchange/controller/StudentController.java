package com.college.resourceexchange.controller;

import com.college.resourceexchange.service.StudentService;
import org.springframework.web.bind.annotation.*;
import com.college.resourceexchange.dto.StudentRegistrationRequest;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/register")
    public String registerStudent(
            @ModelAttribute StudentRegistrationRequest request) {
        return studentService.registerStudent(request);
    }
}