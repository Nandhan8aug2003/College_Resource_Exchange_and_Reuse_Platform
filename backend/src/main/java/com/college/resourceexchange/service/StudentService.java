package com.college.resourceexchange.service;

<<<<<<< HEAD
import com.college.resourceexchange.entity.RoleType;
=======
import com.college.resourceexchange.dto.StudentIdCardResponse;
>>>>>>> main
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
import com.college.resourceexchange.dto.PendingStudentResponse;
import com.college.resourceexchange.entity.RegistrationStatus;
import java.util.List;

@Service
public class StudentService{

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

<<<<<<< HEAD
    StudentService(StudentRepository studentRepository, PasswordEncoder passwordEncoder, UserRepository userRepository){
=======
    //constructor injection
    StudentService(StudentRepository studentRepository, PasswordEncoder passwordEncoder){
>>>>>>> main
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    //method may throw exception the calling method need to handle using try catch,
    //saving files
    //creating dir
    private String saveIdCard(MultipartFile file) throws IOException {
        Path uploadDirectory = Paths.get("uploads").toAbsolutePath().normalize();

        Files.createDirectories(uploadDirectory);

        String fileName = UUID.randomUUID() + "_" +
                Path.of(file.getOriginalFilename()).getFileName();

        Path filePath = uploadDirectory.resolve(fileName).normalize();

        file.transferTo(filePath);

        return filePath.toString();
    }

<<<<<<< HEAD
    public boolean isUsnRegistered(String usn) {
        return userRepository.existsByLoginId(usn);
    }

    public boolean isCollegeEmailRegistered(String collegeEmail) {
        return studentRepository.existsByCollegeEmail(collegeEmail);
    }

    @Transactional
=======
    //checks the db for usn isPresent
    public boolean isUsnRegistered(String usn){
        return studentRepository.existsByUsn(usn);
    }

    //checks the db for college email isPresent
    public boolean isCollegeEmailRegistered(String collegeEmail){
        return studentRepository.existsByCollegeEmail(collegeEmail);
    }

    //controller calls this method for registration
>>>>>>> main
    public String registerStudent(StudentRegistrationRequest request) {

        //checks any field is empty
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

        //file handling exception
        try {
            String idCardPath = saveIdCard(request.getCollegeIdCard());

            User user = new User();
            user.setLoginId(request.getUsn());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRole(RoleType.STUDENT);
            Student student = new Student();
            student.setFirstName(request.getFirstName());
            student.setLastName(request.getLastName());
            student.setCollegeEmail(request.getCollegeEmail());
            student.setPhoneNumber(request.getPhoneNumber());
            student.setDepartment(request.getDepartment());
            student.setCollegeIdCard(idCardPath);
<<<<<<< HEAD
=======

            //password hashing as bcry
            student.setPassword(passwordEncoder.encode(request.getPassword()));
>>>>>>> main

            User savedUser = userRepository.save(user);
            student.setUser(savedUser);
            studentRepository.save(student);

            return "Registration successful";

        } catch (IOException e) {
            return "Failed to save college ID card";
        }
    }

    public List<PendingStudentResponse> getPendingStudents() {
        return studentRepository
                .findByRegistrationStatus(RegistrationStatus.PENDING)
                //creates data pipe line
                .stream()
                .map(student -> {
                    PendingStudentResponse response =
                            new PendingStudentResponse();

                    response.setStudentId(student.getStudentId());
                    response.setFirstName(student.getFirstName());
                    response.setLastName(student.getLastName());
                    response.setCollegeEmail(student.getCollegeEmail());
                    response.setPhoneNumber(student.getPhoneNumber());
                    response.setDepartment(student.getDepartment());

                    return response;
                })
                .toList();
    }

    //sends the image bytes and image type
    public StudentIdCardResponse getStudentIdCard(Long studentId)
            throws IOException {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Path imagePath = Paths.get(student.getCollegeIdCard());

        StudentIdCardResponse response = new StudentIdCardResponse();
        response.setImageData(Files.readAllBytes(imagePath));
        response.setContentType(Files.probeContentType(imagePath));

        return response;
    }
}
