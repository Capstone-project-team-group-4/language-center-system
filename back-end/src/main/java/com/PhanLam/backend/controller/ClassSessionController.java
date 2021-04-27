package com.PhanLam.backend.controller;

import com.PhanLam.backend.controller.DTO.ClassSessionRequest;
import com.PhanLam.backend.model.ClassSession;
import com.PhanLam.backend.model.DataPage;
import com.PhanLam.backend.service.ClassSessionService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/class-sessions")
public class ClassSessionController {
    ClassSessionService classSessionService;

    public ClassSessionController(ClassSessionService classSessionService) {
        this.classSessionService = classSessionService;
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void createClassSession(@RequestBody @Valid ClassSessionRequest classSessionRequest
    ) {
        classSessionService.createClassSession(classSessionRequest);
    }

    @DeleteMapping("{classSessionID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeClassSession(@PathVariable int classSessionID
    ) {
        classSessionService.deleteClassById(classSessionID);
    }

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public DataPage<ClassSession> getAllClassSession(
            @RequestParam int pageNumber
            , @RequestParam int pageSize
            , @RequestParam(required = false) Integer userID
            , @RequestParam(required = false) String role
            , @RequestParam String searchParam
    ) {
        DataPage<ClassSession> classSessionDataPage;
        classSessionDataPage = classSessionService.getAllClassSession(
                pageNumber
                , pageSize
                , userID
                , role
                , searchParam

        );
        return classSessionDataPage;
    }

    @PatchMapping("{classSessionId}:cancel")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void cancelClass(
            @PathVariable int classSessionId
    ) {
        classSessionService.cancelClassSession(classSessionId);
    }
}
