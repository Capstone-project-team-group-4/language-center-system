package com.PhanLam.backend.controller.DTO;

import javax.validation.constraints.NotNull;

public class ClassSessionRequest {
    @NotNull
    private Integer slotID;
    @NotNull
    private Integer courseID;
    @NotNull
    private Integer spareTimeRegisterID;

    public Integer getSlotID() {
        return slotID;
    }

    public void setSlotID(Integer slotID) {
        this.slotID = slotID;
    }

    public Integer getCourseID() {
        return courseID;
    }

    public void setCourseID(Integer courseID) {
        this.courseID = courseID;
    }

    public Integer getSpareTimeRegisterID() {
        return spareTimeRegisterID;
    }

    public void setSpareTimeRegisterID(Integer spareTimeRegisterID) {
        this.spareTimeRegisterID = spareTimeRegisterID;
    }
}
