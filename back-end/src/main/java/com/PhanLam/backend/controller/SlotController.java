package com.PhanLam.backend.controller;

import com.PhanLam.backend.model.Slot;
import com.PhanLam.backend.service.SlotService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SlotController {
    // Variables declaration:
    private SlotService slotService;

    public SlotController (SlotService slotService){
        this.slotService = slotService;
    }
    @GetMapping("/slots-for-create-class")
    @ResponseStatus(HttpStatus.OK)
    public List<Slot> getAllCourseAvailableToCreateClass (@RequestParam Integer spareTimeId
    ){
        return slotService.getAllSlotAvailableToCreateClass(spareTimeId);
    }
}
