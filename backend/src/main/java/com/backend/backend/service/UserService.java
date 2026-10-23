    package com.backend.backend.service;

    import com.backend.backend.dto.UserRegistrationRequest;
    import com.backend.backend.entity.User;
    import com.backend.backend.repository.UserRepository;
    import org.springframework.stereotype.Service;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.web.multipart.MultipartFile;

    import java.io.File;
    import java.io.IOException;
    import java.util.UUID;

    @Service
    public class UserService {

        private final PasswordEncoder passwordEncoder;
        private final UserRepository userRepository;

        UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
            this.userRepository = userRepository;
            this.passwordEncoder = passwordEncoder;
        }

        public User userReg(
                UserRegistrationRequest request,
                MultipartFile collegeIdCard) {

            try {
                String folder = System.getProperty("user.dir") + "/uploads/college-ids/";
                new File(folder).mkdirs();

                String fileName = UUID.randomUUID() + "_" +
                        collegeIdCard.getOriginalFilename();

                File file = new File(folder + fileName);
                collegeIdCard.transferTo(file);

                User user = new User();
                user.setFirstName(request.getFirstName());
                user.setLastName(request.getLastName());
                user.setUsn(request.getUsn());
                user.setCollegeEmail(request.getCollegeEmail());
                user.setPhoneNumber(request.getPhoneNumber());
                user.setDepartment(request.getDepartment());
                user.setApprovalStatus("pending");
                user.setRole("student");
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                user.setCollegeIdCardPath(file.getPath());

                return userRepository.save(user);

            } catch (IOException e) {
                throw new RuntimeException("Failed to save college ID card.", e);
            }
        }
    }