package com.PhanLam.backend.controller.DTO;

import java.util.ArrayList;
import java.util.List;

public class SpareTimeRegisterRequest {
    private int spareTimeRegisterId;
    private Integer courseTypeId ;
    private List<Integer> listSlotId = new ArrayList<>();

    public List<Integer> getListSlotId() {
        return listSlotId;
    }

    public void setListSlotId(List<Integer> listSlotId) {
        this.listSlotId = listSlotId;
    }

    public Integer getCourseTypeId() {
        return courseTypeId;
    }

    public void setCourseTypeId(Integer courseTypeId) {
        this.courseTypeId = courseTypeId;
    }

    public int getSpareTimeRegisterId() {
        return spareTimeRegisterId;
    }

    public void setSpareTimeRegisterId(int spareTimeRegisterId) {
        this.spareTimeRegisterId = spareTimeRegisterId;
    }
}
