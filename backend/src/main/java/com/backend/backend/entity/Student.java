package com.backend.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String usn;
    private String password;

    public Long getId() {
        return id;
    }

    public String getUsn() {
        return usn;
    }

    public String getPassword() {
        return password;
    }

    public void setUsn(String usn) {
        this.usn = usn;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

