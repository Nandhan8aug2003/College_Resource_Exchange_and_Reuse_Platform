package com.backend.backend.service;

import com.backend.backend.dto.UserRegistrationRequest;
import com.backend.backend.entity.User;
import com.backend.backend.repository.UserRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;
    UserRepository userRepository;

    UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User studentReg(UserRegistrationRequest userRegistrationRequest){
        User user = new User();
        user.setFirstName(userRegistrationRequest.getFirstName());
        user.setLastName(userRegistrationRequest.getLastName());
        user.setUsn(userRegistrationRequest.getUsn());
        user.setCollegeEmail(userRegistrationRequest.getCollegeEmail());
        user.setPhoneNumber(userRegistrationRequest.getPhoneNumber());
        user.setApprovalStatus("pending");
        user.setRole("student");
        user.setPassword(passwordEncoder.encode(userRegistrationRequest.getPassword()));

        User userSaved = userRepository.save(user);

        return userSaved;
    }
}