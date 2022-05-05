package com.PhanLam.backend.controller.DTO;

import javax.validation.constraints.NotNull;

public class CommentRequest {
    @NotNull
    private Integer classID;
    @NotNull
    private Integer userID;

    private String content;

    public Integer getClassID() {
        return classID;
    }

    public void setClassID(Integer classID) {
        this.classID = classID;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
