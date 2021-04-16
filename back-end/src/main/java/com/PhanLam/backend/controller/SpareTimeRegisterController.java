package com.PhanLam.backend.controller;


import com.PhanLam.backend.controller.DTO.SpareTimeRegisterRequest;
import com.PhanLam.backend.model.DataPage;
import com.PhanLam.backend.model.QCourseType;
import com.PhanLam.backend.model.QSpareTimeRegister;
import com.PhanLam.backend.model.SpareTimeRegister;
import com.PhanLam.backend.service.SpareTimeRegisterService;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.validation.Valid;
import java.security.Principal;
import java.util.List;


/**
 * @author Phan Lam
 */
@RestController
public class SpareTimeRegisterController {
    // Variables declaration:
    private SpareTimeRegisterService spareTimeService;
    private JPAQueryFactory queryFactory;


    public SpareTimeRegisterController(SpareTimeRegisterService spareTimeService, EntityManager entityManager) {
        this.spareTimeService = spareTimeService;
        queryFactory = new JPAQueryFactory(entityManager);
    }

    @GetMapping("/spare-time-register")
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

    @PostMapping("/spare-time-register")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void createSpareTimeRegister(
            Principal principal
            , @RequestBody SpareTimeRegisterRequest spareTimeRegisterRequest
    ) {
        spareTimeService.createSpareTimeRegister(spareTimeRegisterRequest, principal);
    }

    @DeleteMapping("/spare-time-register/{spareTimeID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeSpareTimeRegister(
            @PathVariable int spareTimeID
    ) {
        spareTimeService.removeSpareTimeRegister(spareTimeID);
    }
    @PutMapping("/spare-time-register")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void editSpareTimeRegister(
            @RequestBody SpareTimeRegisterRequest spareTimeRegisterRequest
    ) {
        spareTimeService.editSpareTimeRegister(spareTimeRegisterRequest);
    }

}
