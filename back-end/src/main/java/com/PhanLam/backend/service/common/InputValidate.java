/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service.common;

// Import package members section:
import com.PhanLam.backend.controller.exception.InvalidRequestArgumentException;
import com.PhanLam.backend.model.QuestionOption;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Phan Lam
 */
@Service
@Transactional (propagation = Propagation.SUPPORTS)
public class InputValidate {
    
    public void validateQuestionOption (
            List<QuestionOption> questionOptionHolder
    ){
        boolean alreadyExist;
        Set<String> checkExistenceSet;
        int numberOfCorrectAnswer;
        
        checkExistenceSet = new HashSet<> ();
        alreadyExist = false;
        for (QuestionOption questionOption : questionOptionHolder){
            if (checkExistenceSet.add (
                    questionOption.getContent ()
            ) == false){
                alreadyExist = true;
                break;
            }
        }
        if (alreadyExist == true){
            throw new InvalidRequestArgumentException (
                    "The quiz question cannot contain "
                    + "duplicate question options."
            );
        }
        else {
            numberOfCorrectAnswer = 0;
            for (QuestionOption questionOption : questionOptionHolder){
                if (questionOption.getIsCorrectAnswer () == true){
                    numberOfCorrectAnswer++;
                }
            }
            if (numberOfCorrectAnswer == 0){
                throw new InvalidRequestArgumentException (
                        "Please provide at least one question option "
                        + "as correct answer."
                );
            }
            else if (numberOfCorrectAnswer == 4){
                throw new InvalidRequestArgumentException (
                        "The question cannot have all 4 question option "
                        + "as correct answer."
                );
            }
        }
    }
}
