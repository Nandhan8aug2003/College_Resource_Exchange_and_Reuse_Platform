package com.college.resourceexchange.repository;

import com.college.resourceexchange.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    //check students usn and admin login id
    boolean existsByLoginId(String loginId);

    //returns the User object
    Optional<User> findByLoginId(String loginId);
}
