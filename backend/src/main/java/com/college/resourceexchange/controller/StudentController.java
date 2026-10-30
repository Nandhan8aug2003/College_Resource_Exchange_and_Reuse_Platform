package com.college.resourceexchange.controller;

import com.college.resourceexchange.dto.PendingStudentResponse;
import com.college.resourceexchange.dto.StudentIdCardResponse;
import com.college.resourceexchange.service.StudentService;
import org.springframework.web.bind.annotation.*;
import com.college.resourceexchange.dto.StudentRegistrationRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.io.IOException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    //constructor injection
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/register")
    public String registerStudent(
            //maps to the java obj used when frontend sends uploaded file with json
            @ModelAttribute StudentRegistrationRequest request) {
        return studentService.registerStudent(request);
    }

    @GetMapping("/admin/pending")
    public List<PendingStudentResponse> getPendingStudents() {
        return studentService.getPendingStudents();
    }

    @GetMapping("/admin/{studentId}/id-card")
    public ResponseEntity<byte[]> getStudentIdCard(
            @PathVariable Long studentId) throws IOException {

        StudentIdCardResponse response =
                studentService.getStudentIdCard(studentId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(response.getContentType()))
                .body(response.getImageData());
    }
}