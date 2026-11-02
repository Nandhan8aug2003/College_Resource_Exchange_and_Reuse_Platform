package com.college.resourceexchange.controller;

import com.college.resourceexchange.dto.StudentResponse;
import com.college.resourceexchange.entity.RegistrationStatus;
import com.college.resourceexchange.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.college.resourceexchange.dto.StudentRegistrationRequest;

import java.util.List;

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

    @GetMapping("/admin/status/{status}")
    public ResponseEntity<List<StudentResponse>> getStudentsByStatus(
            @PathVariable RegistrationStatus status) {

        List<StudentResponse> students =
                studentService.getStudentsByStatus(status);

        return ResponseEntity.ok(students);
    }
}