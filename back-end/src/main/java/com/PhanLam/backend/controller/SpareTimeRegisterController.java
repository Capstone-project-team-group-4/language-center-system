package com.PhanLam.backend.controller;


import com.PhanLam.backend.controller.DTO.SpareTimeRegisterRequest;
import com.PhanLam.backend.model.DataPage;
import com.PhanLam.backend.model.SpareTimeRegister;
import com.PhanLam.backend.service.SpareTimeRegisterService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import java.security.Principal;


/**
 * @author Phan Lam
 */
@RestController
@RequestMapping("/spare-time-registers")
public class SpareTimeRegisterController {
    // Variables declaration:
    private SpareTimeRegisterService spareTimeService;

    public SpareTimeRegisterController(SpareTimeRegisterService spareTimeService, EntityManager entityManager) {
        this.spareTimeService = spareTimeService;
    }

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public DataPage<SpareTimeRegister> getAllSpareTime(
            @RequestParam int pageNumber
            , @RequestParam int pageSize
            , @RequestParam(required = false) Integer teacherId
    ) {
        DataPage<SpareTimeRegister> spareTimeRegisterHolder;

        spareTimeRegisterHolder = spareTimeService.getAllSpareTime(
                teacherId
                , pageNumber
                , pageSize

        );
        return spareTimeRegisterHolder;
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void createSpareTimeRegister(
            Principal principal
            , @RequestBody SpareTimeRegisterRequest spareTimeRegisterRequest
    ) {
        spareTimeService.createSpareTimeRegister(spareTimeRegisterRequest, principal);
    }

    @DeleteMapping("/{spareTimeID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeSpareTimeRegister(
            @PathVariable int spareTimeID
    ) {
        spareTimeService.removeSpareTimeRegister(spareTimeID);
    }

    @PutMapping()
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void editSpareTimeRegister(
            @RequestBody SpareTimeRegisterRequest spareTimeRegisterRequest
    ) {
        spareTimeService.editSpareTimeRegister(spareTimeRegisterRequest);
    }

    @PatchMapping("{spareTimeID}:reject")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void rejectTimeSpare(
            @PathVariable int spareTimeID
    ) {
        spareTimeService.rejectSpareTimeById(spareTimeID);
    }
}
