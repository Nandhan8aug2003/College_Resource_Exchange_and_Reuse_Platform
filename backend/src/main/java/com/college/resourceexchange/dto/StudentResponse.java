package com.college.resourceexchange.dto;

import java.time.LocalDateTime;

public class StudentResponse {
    private String firstName;
    private String lastName;
    private String loginId;
    private String collegeEmail;
    private String phoneNumber;
    private String department;
    private byte[] idCardimage;
    private LocalDateTime registeredAt;

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }

    public void setCollegeEmail(String collegeEmail) {
        this.collegeEmail = collegeEmail;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setIdCardimage(byte[] idCardimage) {
        this.idCardimage = idCardimage;
    }

    public void setRegisteredAt(LocalDateTime registeredAt) {
        this.registeredAt = registeredAt;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getLoginId() {
        return loginId;
    }

    public String getCollegeEmail() {
        return collegeEmail;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getDepartment() {
        return department;
    }

    public byte[] getIdCardimage() {
        return idCardimage;
    }

    public LocalDateTime getRegisteredAt() {
        return registeredAt;
    }
}
