package com.college.resourceexchange.repository;

import com.college.resourceexchange.entity.RegistrationStatus;
import com.college.resourceexchange.entity.Student;
import com.college.resourceexchange.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    //check student collegeEmail
    boolean existsByCollegeEmail(String collegeEmail);

    Optional<Student> findByUser_LoginId(String loginId);

    //find student by registration status
    List<Student> findByRegistrationStatus(RegistrationStatus registrationStatus);
}