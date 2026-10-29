package com.college.resourceexchange.repository;

import com.college.resourceexchange.entity.RegistrationStatus;
import com.college.resourceexchange.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    boolean existsByUsn(String usn);
    boolean existsByCollegeEmail(String collegeEmail);

    List<Student> findByRegistrationStatus(
            RegistrationStatus registrationStatus);
}