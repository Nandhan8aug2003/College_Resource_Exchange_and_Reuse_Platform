package com.college.resourceexchange.service;

import com.college.resourceexchange.entity.RoleType;
import com.college.resourceexchange.entity.Student;
import com.college.resourceexchange.entity.User;
import com.college.resourceexchange.repository.StudentRepository;
import com.college.resourceexchange.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.college.resourceexchange.dto.StudentRegistrationRequest;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import org.springframework.web.multipart.MultipartFile;
import com.college.resourceexchange.dto.StudentResponse;
import com.college.resourceexchange.entity.RegistrationStatus;
import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    StudentService(StudentRepository studentRepository, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    //id card storing in the backend server folder
    private String saveIdCard(MultipartFile file) throws IOException {
        Path uploadDirectory = Paths.get("uploads").toAbsolutePath().normalize();

        Files.createDirectories(uploadDirectory);

        //creates random password uuid
        String fileName = UUID.randomUUID() + "_" +
                Path.of(file.getOriginalFilename()).getFileName();

        Path filePath = uploadDirectory.resolve(fileName).normalize();

        file.transferTo(filePath);

        return filePath.toString();
    }

    //check student already present throw usn
    public boolean isUsnRegistered(String usn) {
        return userRepository.existsByLoginId(usn);
    }

    //check student already present throw collegeEmail
    public boolean isCollegeEmailRegistered(String collegeEmail) {
        return studentRepository.existsByCollegeEmail(collegeEmail);
    }

    //multiple data operations in single method student register in user and student table
    @Transactional
    public String registerStudent(StudentRegistrationRequest request) {

        if (request.getLoginId() == null || request.getLoginId().isBlank()
                || request.getCollegeEmail() == null
                || request.getCollegeEmail().isBlank()
                || request.getPassword() == null
                || request.getPassword().isBlank()
                || request.getCollegeIdCard() == null
                || request.getCollegeIdCard().isEmpty()) {
            return "Required fields are missing";
        }

        if (isUsnRegistered(request.getLoginId())) {
            return "USN already registered";
        }

        if (isCollegeEmailRegistered(request.getCollegeEmail())) {
            return "College email already registered";
        }

        try {
            String idCardPath = saveIdCard(request.getCollegeIdCard());

            User user = new User();
            user.setLoginId(request.getLoginId());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRole(RoleType.STUDENT);
            Student student = new Student();
            student.setFirstName(request.getFirstName());
            student.setLastName(request.getLastName());
            student.setCollegeEmail(request.getCollegeEmail());
            student.setPhoneNumber(request.getPhoneNumber());
            student.setDepartment(request.getDepartment());
            student.setCollegeIdCard(idCardPath);

            User savedUser = userRepository.save(user);
            student.setUser(savedUser);
            studentRepository.save(student);

            return "Registration successful...";

        } catch (IOException e) {
            return "Failed to save college ID card";
        }
    }

    private byte[] readIdCard(String imagePath) throws IOException {
        return Files.readAllBytes(Paths.get(imagePath));
    }

    // Find students based on registration status
    public List<StudentResponse> getStudentsByStatus(RegistrationStatus status) {

        List<Student> students =
                studentRepository.findByRegistrationStatus(status);

        List<StudentResponse> responses = students.stream()
                .map(student -> {
                    StudentResponse response = new StudentResponse();

                    response.setFirstName(student.getFirstName());
                    response.setLastName(student.getLastName());
                    response.setLoginId(student.getUser().getLoginId());
                    response.setCollegeEmail(student.getCollegeEmail());
                    response.setPhoneNumber(student.getPhoneNumber());
                    response.setDepartment(student.getDepartment());
                    response.setRegisteredAt(student.getRegisteredAt());

                    try {
                        response.setIdCardimage(readIdCard(student.getCollegeIdCard()));
                    } catch (IOException e) {
                        throw new RuntimeException("Unable to read ID card", e);
                    }
                    return response;
                })
                .toList();
        return responses;
    }
}