package com.college.resourceexchange.service;

import com.college.resourceexchange.dto.LoginRequest;
import com.college.resourceexchange.dto.LoginResponse;
import com.college.resourceexchange.entity.RegistrationStatus;
import com.college.resourceexchange.entity.RoleType;
import com.college.resourceexchange.entity.Student;
import com.college.resourceexchange.entity.User;
import com.college.resourceexchange.repository.StudentRepository;
import com.college.resourceexchange.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final StudentRepository studentRepository;

    UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, StudentRepository studentRepository){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.studentRepository = studentRepository;
    }

    public LoginResponse userLoginRequest(LoginRequest loginRequest){

        Optional<User> user = userRepository.findByLoginId(loginRequest.getLoginId());

        LoginResponse loginResponse = new LoginResponse();

        if(user.isEmpty()){
            loginResponse.setMessage("You don't have an account. Please register");
            return loginResponse;
        }

        if(!passwordEncoder.matches(loginRequest.getPassword(), user.get().getPassword())){
            loginResponse.setMessage("Incorrect password");
            return loginResponse;
        }

        if(user.get().getRole() == RoleType.STUDENT){

            Optional<Student> student = studentRepository.findByUser_LoginId(loginRequest.getLoginId());

            if(student.isEmpty()){
                loginResponse.setMessage("Record not found");
                return loginResponse;
            }

            if (student.get().getRegistrationStatus() == RegistrationStatus.PENDING ){
                loginResponse.setMessage("registration pending approval");
                return loginResponse;
            }

            if (student.get().getRegistrationStatus() == RegistrationStatus.REJECTED ){
                loginResponse.setMessage("registration rejected");
                return loginResponse;
            }

            if (student.get().getRegistrationStatus() == RegistrationStatus.APPROVED ){
                loginResponse.setMessage("Login successful");
                loginResponse.setRoleType(RoleType.STUDENT);
            }
        }else {
            loginResponse.setMessage("Login successful");
            loginResponse.setRoleType(RoleType.ADMIN);
        }
        System.out.println("Message: " + loginResponse.getMessage());
        System.out.println("Role: " + loginResponse.getRoleType());
        return loginResponse;
    }
}
