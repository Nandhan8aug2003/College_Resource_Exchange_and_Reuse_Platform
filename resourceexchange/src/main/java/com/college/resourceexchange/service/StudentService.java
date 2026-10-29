package com.college.resourceexchange.service;

import com.college.resourceexchange.entity.Student;
import com.college.resourceexchange.repository.StudentRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.college.resourceexchange.dto.StudentRegistrationRequest;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import org.springframework.web.multipart.MultipartFile;
import com.college.resourceexchange.dto.PendingStudentResponse;
import com.college.resourceexchange.entity.RegistrationStatus;
import java.util.List;

@Service
public class StudentService{

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    StudentService(StudentRepository studentRepository, PasswordEncoder passwordEncoder){
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;

    }

    private String saveIdCard(MultipartFile file) throws IOException {
        Path uploadDirectory = Paths.get("uploads").toAbsolutePath().normalize();

        Files.createDirectories(uploadDirectory);

        String fileName = UUID.randomUUID() + "_" +
                Path.of(file.getOriginalFilename()).getFileName();

        Path filePath = uploadDirectory.resolve(fileName).normalize();

        file.transferTo(filePath);

        return filePath.toString();
    }

    public boolean isUsnRegistered(String usn){
        return studentRepository.existsByUsn(usn);
    }

    public boolean isCollegeEmailRegistered(String collegeEmail){
        return studentRepository.existsByCollegeEmail(collegeEmail);
    }

    public String registerStudent(StudentRegistrationRequest request) {

        if (request.getUsn() == null || request.getUsn().isBlank()
                || request.getCollegeEmail() == null
                || request.getCollegeEmail().isBlank()
                || request.getPassword() == null
                || request.getPassword().isBlank()
                || request.getCollegeIdCard() == null
                || request.getCollegeIdCard().isEmpty()) {
            return "Required fields are missing";
        }

        if (isUsnRegistered(request.getUsn())) {
            return "USN already registered";
        }

        if (isCollegeEmailRegistered(request.getCollegeEmail())) {
            return "College email already registered";
        }

        try {
            String idCardPath = saveIdCard(request.getCollegeIdCard());

            Student student = new Student();
            student.setFirstName(request.getFirstName());
            student.setLastName(request.getLastName());
            student.setUsn(request.getUsn());
            student.setCollegeEmail(request.getCollegeEmail());
            student.setPhoneNumber(request.getPhoneNumber());
            student.setDepartment(request.getDepartment());
            student.setCollegeIdCard(idCardPath);
            student.setPassword(passwordEncoder.encode(request.getPassword()));

            studentRepository.save(student);

            return "Registration successful";

        } catch (IOException e) {
            return "Failed to save college ID card";
        }
    }

    public List<PendingStudentResponse> getPendingStudents() {
        return studentRepository
                .findByRegistrationStatus(RegistrationStatus.PENDING)
                .stream()
                .map(student -> {
                    PendingStudentResponse response =
                            new PendingStudentResponse();

                    response.setStudentId(student.getStudentId());
                    response.setFirstName(student.getFirstName());
                    response.setLastName(student.getLastName());
                    response.setUsn(student.getUsn());
                    response.setCollegeEmail(student.getCollegeEmail());
                    response.setPhoneNumber(student.getPhoneNumber());
                    response.setDepartment(student.getDepartment());

                    return response;
                })
                .toList();
    }
}
