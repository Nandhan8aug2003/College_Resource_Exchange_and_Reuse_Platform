package com.college.resourceexchange.repository;

import com.college.resourceexchange.entity.RegistrationStatus;
import com.college.resourceexchange.entity.Student;
import com.college.resourceexchange.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    boolean existsByCollegeEmail(String collegeEmail);

    List<Student> findByRegistrationStatus(
            RegistrationStatus registrationStatus);

    Optional<Student> findByUser_LoginId(String loginId);
}