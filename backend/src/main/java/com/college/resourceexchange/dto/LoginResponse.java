package com.college.resourceexchange.dto;

import com.college.resourceexchange.entity.RoleType;

public class LoginResponse {
    private RoleType roleType;
    private String message;

    public RoleType getRoleType() {
        return roleType;
    }

    public void setRoleType(RoleType roleType) {
        this.roleType = roleType;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
