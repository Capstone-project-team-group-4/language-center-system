package com.PhanLam.backend.controller.DTO;

import java.util.ArrayList;
import java.util.List;

public class SpareTimeRegisterRequest {
    private int spareTimeRegisterId;
    private List<Integer> listCourseTypeId = new ArrayList<>();
    private List<Integer> listSlotId = new ArrayList<>();

    public List<Integer> getListSlotId() {
        return listSlotId;
    }

    public void setListSlotId(List<Integer> listSlotId) {
        this.listSlotId = listSlotId;
    }

    public List<Integer> getListCourseTypeId() {
        return listCourseTypeId;
    }

    public void setListCourseTypeId(List<Integer> listCourseTypeId) {
        this.listCourseTypeId = listCourseTypeId;
    }

    public int getSpareTimeRegisterId() {
        return spareTimeRegisterId;
    }

    public void setSpareTimeRegisterId(int spareTimeRegisterId) {
        this.spareTimeRegisterId = spareTimeRegisterId;
    }
}
