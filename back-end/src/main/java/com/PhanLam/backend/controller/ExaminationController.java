/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.controller;

// Import package members section:
import com.PhanLam.backend.model.DataPage;
import com.PhanLam.backend.model.Examination;
import com.PhanLam.backend.service.ExaminationService;
import java.security.Principal;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Phan Lam
 */
@RestController
public class ExaminationController {
    
    // Variables declaration:
    private ExaminationService examinationService; 

    public ExaminationController (ExaminationService examinationService){
        this.examinationService = examinationService;
    }
    
    @PostMapping ("/courses/{courseID}/examinations")
    @ResponseStatus (HttpStatus.CREATED)
    public void createNewExamInCourse (
            @PathVariable int courseID
            , @Valid @RequestBody Examination exam
    ){
        examinationService.createExamInCourse (courseID, exam);
    }
    
    @GetMapping ("/examinations")
    @ResponseStatus (HttpStatus.OK)
    public DataPage<Examination> getAllExam (
            @RequestParam int pageIndex
            , @RequestParam int pageSize
    ){
        DataPage<Examination> examDataPage;
        
        examDataPage = examinationService.getAllExam (pageIndex, pageSize);
        return examDataPage;
    }
    
    @GetMapping ("/courses/{courseID}/examinations")
    @ResponseStatus (HttpStatus.OK)
    public DataPage<Examination> getAllExamByCourseID (
            @PathVariable int courseID
            , @RequestParam int pageIndex
            , @RequestParam int pageSize
    ){
        DataPage<Examination> examDataPage;
        
        examDataPage = examinationService.getAllExamByCourseID (
                courseID
                , pageIndex
                , pageSize
        );
        return examDataPage;
    }
    
    @GetMapping ("/examinations:by-logged-in-student")
    @ResponseStatus (HttpStatus.OK)
    public DataPage<Examination> getAllExamByCurrentLoggedInStudent (
            Principal principal
            , @RequestParam int pageIndex
            , @RequestParam int pageSize
    ){
        DataPage<Examination> examDataPage;
        
        examDataPage = examinationService.getAllExamByStudentID (
                principal
                , pageIndex
                , pageSize
        );
        return examDataPage;
    }  
    
    @PutMapping ("/courses/{courseID}/examinations/{examID}") 
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void updateExamInCourse (
            @PathVariable int courseID
            , @PathVariable int examID
            , @Valid @RequestBody Examination updatedExam 
    ){
        examinationService.updateExamInCourse (courseID, examID, updatedExam);
    }
    
    @PatchMapping ("/examinations/{examID}:add-a-quiz")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void addAQuizToExam (
            @RequestParam int questionID
            , @PathVariable int examID
    ){
        examinationService.addQuizToExam (questionID, examID);
    }
    
    @PatchMapping ("/examinations/{examID}:remove-a-quiz")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void removeAQuizFromExam (
            @RequestParam int questionID
            , @PathVariable int examID
    ){
        examinationService.removeQuizFromExam (questionID, examID);
    }
    
    @DeleteMapping ("/courses/{courseID}/examinations/{examID}")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void deleteExamInCourse (
            @PathVariable int courseID
            , @PathVariable int examID
    ){
        examinationService.deleteExamInCourse (courseID, examID);
    }
}
