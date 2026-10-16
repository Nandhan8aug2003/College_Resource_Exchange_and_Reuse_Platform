package com.backend.backend.service;

import com.backend.backend.dto.LoginRequest;
import com.backend.backend.entity.Student;
import com.backend.backend.repository.StudentRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final StudentRepository studentRepository;

    public AuthService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public String login(LoginRequest request) {

        Student student =
                studentRepository.findByUsn(request.getUsn());

        if (student == null) {
            return "Invalid USN or password";
        }

        if (!student.getPassword().equals(request.getPassword())) {
            return "Invalid USN or password";
        }

        return "Login successful";
    }
}