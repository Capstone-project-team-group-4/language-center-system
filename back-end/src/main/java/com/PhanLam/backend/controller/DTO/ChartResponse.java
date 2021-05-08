package com.PhanLam.backend.controller.DTO;

public class ChartResponse {
    private Object valueX;
    private Object valueY;

    public ChartResponse(Object valueX, Object valueY) {
        this.valueX = valueX;
        this.valueY = valueY;
    }

    public Object getValueX() {
        return valueX;
    }

    public void setValueX(Object valueX) {
        this.valueX = valueX;
    }

    public Object getValueY() {
        return valueY;
    }

    public void setValueY(Object valueY) {
        this.valueY = valueY;
    }
}
